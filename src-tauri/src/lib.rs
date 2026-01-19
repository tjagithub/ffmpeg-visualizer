use dotenv::dotenv;
use std::env;
use tauri::{Manager, Theme};

mod websocket;
use websocket::WebSocketServer;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn start_websocket_server() -> Result<String, String> {
    let addr = "127.0.0.1:8080";
    
    // Spawn the WebSocket server in a background task
    std::thread::spawn(move || {
        let rt = tokio::runtime::Runtime::new().expect("Failed to create Tokio runtime");
        rt.block_on(async {
            let server = WebSocketServer::new();
            match server.start(addr).await {
                Ok(_) => {
                    // Accept connections
                    if let Ok(listener) = tokio::net::TcpListener::bind(addr).await {
                        let _ = WebSocketServer::accept_connections(listener).await;
                    }
                }
                Err(e) => eprintln!("Failed to start WebSocket server: {}", e),
            }
        });
    });

    Ok(format!("WebSocket server starting on {}", addr))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    dotenv().ok(); // Load .env file

    // Example: read a variable
    if let Ok(val) = env::var("MY_VARIABLE") {
        println!("MY_VARIABLE from .env: {}", val);
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, start_websocket_server])
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                // Prevent the window from closing immediately
                api.prevent_close();
                // Exit the app gracefully
                window.app_handle().exit(0);
                window.app_handle().set_theme(Some(Theme::Dark));
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

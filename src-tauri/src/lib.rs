use dotenv::dotenv;
use std::env;
use tauri::{Manager, Theme};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
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
        .invoke_handler(tauri::generate_handler![greet])
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

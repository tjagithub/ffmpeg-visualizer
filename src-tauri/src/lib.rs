use dotenv::dotenv;
use ffmpeg_next as ffmpeg;
use image::ImageOutputFormat;
use std::env;
use std::sync::Mutex;
use tauri::State;
use tauri::{Manager, Theme};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn extract_frame(path: String, time: f64) -> Result<Vec<u8>, String> {
    ffmpeg::init().map_err(|e| format!("FFmpeg init error: {}", e))?;
    let mut ictx = ffmpeg::format::input(&path).map_err(|e| format!("Input error: {}", e))?;
    let stream = ictx
        .streams()
        .best(ffmpeg::media::Type::Video)
        .ok_or("No video stream found")?;
    let video_stream_index = stream.index();
    let decoder = ffmpeg::codec::context::Context::from_parameters(stream.parameters())
        .map_err(|e| format!("Decoder error: {}", e))?
        .decoder()
        .video()
        .map_err(|e| format!("Video decoder error: {}", e))?;
    let seek_ts = (time * f64::from(stream.time_base().denominator())
        / f64::from(stream.time_base().numerator())) as i64;
    ictx.seek(seek_ts, ..seek_ts)
        .map_err(|e| format!("Seek error: {}", e))?;
    for (stream, packet) in ictx.packets() {
        if stream.index() == video_stream_index {
            let mut decoder = decoder.clone();
            decoder
                .send_packet(&packet)
                .map_err(|e| format!("Send packet error: {}", e))?;
            let mut frame = ffmpeg::util::frame::video::Video::empty();
            if decoder.receive_frame(&mut frame).is_ok() {
                let mut buf = Vec::new();
                let rgb = image::RgbImage::from_raw(
                    frame.width(),
                    frame.height(),
                    frame.data(0).to_vec(),
                )
                .ok_or("Failed to convert frame")?;
                image::DynamicImage::ImageRgb8(rgb)
                    .write_to(&mut buf, ImageOutputFormat::Png)
                    .map_err(|e| format!("Image write error: {}", e))?;
                return Ok(buf);
            }
        }
    }
    Err("No frame found at specified time".to_string())
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
        .invoke_handler(tauri::generate_handler![greet, extract_frame])
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

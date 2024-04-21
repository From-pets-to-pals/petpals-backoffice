// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::WindowEvent;

/**
#[tauri::command]
async fn get_from_rest() -> String {
    let res = request::get("http://my.api.host/data.json").await;
    println!("{:?}", res.status()); // e.g. 200
    println!("{:?}", res.text().await);
    res.text().await
}
*/

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
    .on_window_event(|e| {
                if let WindowEvent::Resized(_) = e.event() {
                    std::thread::sleep(std::time::Duration::from_nanos(1));
                }
            })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

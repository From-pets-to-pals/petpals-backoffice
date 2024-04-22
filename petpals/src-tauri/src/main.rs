// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest::Client;
use reqwest::header::{HeaderMap, HeaderValue};
use tauri::{State, WindowEvent};
use tauri::async_runtime::Mutex;

struct HttpClient {
    client: Mutex<Client>,
}

#[tauri::command]
async fn get_from_rest<'r>(client: State<'r, HttpClient>) ->Result< String, ()> {
    let  res = client.client.lock().await.get("http://127.0.0.1:8070/hello").send().await.unwrap();
    let to_return = res.text().await.unwrap();
    println!("{:?}", to_return );
    Ok(to_return)
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let mut map = HeaderMap::new();
    map.insert(
        "API-KEY", HeaderValue::from_static("caregivers-0.1.0")
    );
    let client_built: Client = Client::builder().default_headers(map).build().unwrap();
    tauri::Builder::default()
        .manage(HttpClient { client: Mutex::new(client_built) })
    .on_window_event(|e| {
                if let WindowEvent::Resized(_) = e.event() {
                    std::thread::sleep(std::time::Duration::from_nanos(1));
                }
            })
        .invoke_handler(tauri::generate_handler![greet,get_from_rest])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

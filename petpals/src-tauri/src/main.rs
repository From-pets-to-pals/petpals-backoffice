// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate dotenv;

use std::env;

use dotenv::dotenv;
use reqwest::{Client, Response};
use reqwest::header::{HeaderMap, HeaderValue};
use serde::{Deserialize, Serialize};
use tauri::{State, WindowEvent};
use tauri::async_runtime::Mutex;

use crate::models::create_caregiver::caregivers_create::CreateCaregiver;
use crate::models::tauri_response::tauri_response::TauriResponse;

mod models;

struct HttpClient {
    client: Mutex<Client>,
}

#[tauri::command]
async fn get_from_rest<'r>(client: State<'r, HttpClient>) ->Result< String, ()> {
    let mut url = env::var("API_URL").unwrap();
    url.push_str("hello");

    let  res = client.client.lock().await.get(url)
        .send
    ().await.unwrap();
    let to_return = res.text().await.unwrap();
    Ok(to_return)
}

#[tauri::command]
async fn create_caregiver<'r>(client: State<'r, HttpClient>, create_caregiver: CreateCaregiver)
    -> Result<TauriResponse, TauriResponse> {
    let mut url = env::var("API_URL").unwrap();
    url.push_str("caregivers");
    let query = client.client.lock().await.post(url).json
    (&create_caregiver)
        .send
        ().await.unwrap();
    let  res:TauriResponse =  TauriResponse::new(query.status()
                                                     .as_u16(), query.text().await.unwrap());
    Ok(res)
}



// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet<'r>(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    dotenv().ok();
    let mut map = HeaderMap::new();
    map.insert(
        "API-KEY", HeaderValue::from_str(&env::var("API_KEY").expect("Missing API_KEY")).expect
        ("Unable to build header")
    );
    let client_built: Client = Client::builder().default_headers(map).build().unwrap();
    tauri::Builder::default()
        .manage(HttpClient { client: Mutex::new(client_built) })
    .on_window_event(|e| {
                if let WindowEvent::Resized(_) = e.event() {
                    std::thread::sleep(std::time::Duration::from_nanos(1));
                }
            })
        .invoke_handler(tauri::generate_handler![greet,get_from_rest,create_caregiver])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

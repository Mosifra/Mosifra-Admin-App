mod api;
mod auth;
mod commands;

use crate::auth::login;
use crate::commands::{create_company, create_university};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            create_university,
            create_company,
            login
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

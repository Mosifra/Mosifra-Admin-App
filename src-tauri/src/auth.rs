use std::env;

use dotenvy::dotenv;
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct Claims {
    session_id: String,
    user_type: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct LoginResponse {
    success: bool,
    jwt: Option<String>,
}

pub async fn create_jwt() -> Result<String, String> {
    dotenv().ok();
    let secret = env::var("JWT_SECRET").map_err(|_| "JWT_SECRET non trouvé".to_string())?;
    let claims = Claims {
        session_id: "placeholder".to_string(),
        user_type: "admin".to_string(),
    };
    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .unwrap();
    Ok(token)
}

pub async fn check_password(attempt: String) -> Result<bool, String> {
    dotenv().ok();
    let secret = env::var("ADMIN_PWD").map_err(|_| "ADMIN_PWD non trouvé".to_string())?;
    Ok(attempt == secret)
}

#[tauri::command]
pub async fn login(attempt: String) -> LoginResponse {
    if check_password(attempt).await.unwrap() {
        LoginResponse {
            success: true,
            jwt: Some(create_jwt().await.unwrap()),
        }
    } else {
        LoginResponse {
            success: false,
            jwt: None,
        }
    }
}

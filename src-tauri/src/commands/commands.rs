use crate::api::api::create_university_request;

#[tauri::command]
async fn create_university() -> Result<String, reqwest::Error> {
    let body = create_university_request().await?;
    Ok(body.get("password").unwrap().to_string())
}

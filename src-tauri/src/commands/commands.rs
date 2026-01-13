use crate::api::api::{create_company_request, create_university_request};

#[tauri::command]
///We could use a domain like we did in the main app backend
///for now get should do the work
async fn create_university() -> Result<String, reqwest::Error> {
    let body = create_university_request().await?;
    Ok(body.get("password").unwrap().to_string())
}
async fn create_company() -> Result<String, reqwest::Error> {
    let body = create_company_request().await?;
    Ok(body.get("password").unwrap().to_string())
}

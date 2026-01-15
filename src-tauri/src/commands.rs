use crate::api::{create_company_request, create_university_request};

#[tauri::command]
pub async fn create_university(
    login: String,
    mail: String,
    name: String,
) -> Result<String, String> {
    let body = create_university_request(login, mail, name)
        .await
        .map_err(|e| e.to_string())?;
    Ok(body.password)
}
#[tauri::command]
pub async fn create_company(login: String, mail: String, name: String) -> Result<String, String> {
    let body = create_company_request(login, mail, name)
        .await
        .map_err(|e| e.to_string())?;
    Ok(body.password)
}

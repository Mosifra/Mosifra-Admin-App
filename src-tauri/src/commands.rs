use std::env;

use dotenvy::dotenv;

use crate::{
    api::{
        create_company_request, create_university_request, delete_company_request,
        delete_university_request, fetch_companies_request, fetch_universities_request,
    },
    domain::{Company, University},
};

#[tauri::command]
pub async fn create_university(
    login: String,
    mail: String,
    name: String,
    jwt: String,
) -> Result<String, String> {
    let body = create_university_request(login, mail, name, jwt)
        .await
        .map_err(|e| e.to_string())?;
    Ok(body.password)
}

#[tauri::command]
pub async fn create_company(
    login: String,
    mail: String,
    name: String,
    jwt: String,
) -> Result<String, String> {
    let body = create_company_request(login, mail, name, jwt)
        .await
        .map_err(|e| e.to_string())?;
    Ok(body.password)
}

pub async fn get_base_url() -> Result<String, String> {
    let url = env::var("API_BASEURL").map_err(|_| "Erreur en récupérant l'url de base")?;
    Ok(url)
}

#[tauri::command]
pub async fn get_universities(jwt: String) -> Result<Vec<University>, String> {
    match fetch_universities_request(jwt).await {
        Ok(response) => Ok(response.universities),
        Err(err) => {
            eprintln!("Erreur fetch_universities_request: {:?}", err);
            Err("Erreur lors du fetch des universités".to_string())
        }
    }
}

#[tauri::command]
pub async fn get_companies(jwt: String) -> Result<Vec<Company>, String> {
    match fetch_companies_request(jwt).await {
        Ok(response) => Ok(response.companies),
        Err(err) => {
            eprintln!("Erreur fetch_companies_request: {:?}", err);
            Err("Erreur lors du fetch des entreprises".to_string())
        }
    }
}

#[tauri::command]
pub async fn delete_university(jwt: String, id: String) -> Result<bool, String> {
    match delete_university_request(jwt, id).await {
        Ok(response) => Ok(response.success),
        Err(err) => {
            eprintln!("Erreur delete universities: {:?}", err);
            Err("Erreur lors de la suppression des entreprises".to_string())
        }
    }
}

#[tauri::command]
pub async fn delete_company(jwt: String, id: String) -> Result<bool, String> {
    match delete_company_request(jwt, id).await {
        Ok(response) => Ok(response.success),
        Err(err) => {
            eprintln!("Erreur delete companies: {:?}", err);
            Err("Erreur lors de la suppression des entreprises".to_string())
        }
    }
}

use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct CreateUniversityResponse {
    pub success: bool,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct CreateCompanyResponse {
    pub success: bool,
    pub password: String,
}

pub async fn create_university_request(
    login: String,
    mail: String,
    name: String,
) -> Result<CreateUniversityResponse, reqwest::Error> {
    let mut body = HashMap::new();
    body.insert("login", login);
    body.insert("mail", mail);
    body.insert("name", name);
    let url = "http://localhost:8000/create/university";
    let client = reqwest::Client::new();
    let body = client.post(url).json(&body).send().await?.json().await?;
    Ok(body)
}

pub async fn create_company_request(
    login: String,
    mail: String,
    name: String,
) -> Result<CreateCompanyResponse, reqwest::Error> {
    let mut body = HashMap::new();
    body.insert("login", login);
    body.insert("mail", mail);
    body.insert("name", name);
    let url = "http://localhost:8000/create/company";
    let client = reqwest::Client::new();
    let body = client.post(url).json(&body).send().await?.json().await?;
    Ok(body)
}

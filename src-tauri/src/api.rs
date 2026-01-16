use dotenvy::dotenv;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::env;

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
    jwt: String,
) -> Result<CreateUniversityResponse, reqwest::Error> {
    let mut body = HashMap::new();
    body.insert("login", login);
    body.insert("mail", mail);
    body.insert("name", name);
    dotenv().ok();
    let mut url = env::var("API_BASEURL").unwrap();
    url.push_str("/create/university");
    let client = reqwest::Client::new();
    let body = client
        .post(url)
        .bearer_auth(jwt)
        .json(&body)
        .send()
        .await?
        .json()
        .await?;
    Ok(body)
}

pub async fn create_company_request(
    login: String,
    mail: String,
    name: String,
    jwt: String,
) -> Result<CreateCompanyResponse, reqwest::Error> {
    let mut body = HashMap::new();
    body.insert("login", login);
    body.insert("mail", mail);
    body.insert("name", name);
    let mut url = env::var("API_BASEURL").unwrap();
    url.push_str("/create/company");
    let client = reqwest::Client::new();
    let body = client
        .post(url)
        .bearer_auth(jwt)
        .json(&body)
        .send()
        .await?
        .json()
        .await?;
    Ok(body)
}

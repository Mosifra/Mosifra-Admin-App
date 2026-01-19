use crate::commands::get_base_url;
use crate::domain::{
    CreateCompanyResponse, CreateUniversityResponse, FetchCompaniesResponse,
    FetchUniversitiesResponse,
};
use std::collections::HashMap;

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
    let mut url = get_base_url().await.unwrap();
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
    let mut url = get_base_url().await.unwrap();
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

pub async fn fetch_universities_request(
    jwt: String,
) -> Result<FetchUniversitiesResponse, reqwest::Error> {
    let mut url = get_base_url().await.unwrap();
    url.push_str("/user/universities");
    let client = reqwest::Client::new();
    let body = client
        .get(url)
        .bearer_auth(jwt)
        .send()
        .await?
        .json()
        .await?;
    Ok(body)
}

pub async fn fetch_companies_request(
    jwt: String,
) -> Result<FetchCompaniesResponse, reqwest::Error> {
    let mut url = get_base_url().await.unwrap();
    url.push_str("/user/company");
    let client = reqwest::Client::new();
    let body = client
        .get(url)
        .bearer_auth(jwt)
        .send()
        .await?
        .json()
        .await?;
    Ok(body)
}

use reqwest;
use serde_json::{json, Value};

pub async fn create_university_request() -> Result<Value, reqwest::Error> {
    let payload = json!({
        "test":"test"
    });
    let url = "urlquiseraremplie";
    let body = reqwest::get(url).await?.json().await?;
    Ok(body)
}

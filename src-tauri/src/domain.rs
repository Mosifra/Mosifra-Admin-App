use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateUniversityResponse {
	pub success: bool,
	pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateCompanyResponse {
	pub success: bool,
	pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FetchUniversitiesResponse {
	pub universities: Vec<University>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FetchCompaniesResponse {
	pub companies: Result<Vec<Company>, String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct University {
	pub login: String,
	pub mail: String,
	pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Company {
	pub login: String,
	pub mail: String,
	pub name: String,
}

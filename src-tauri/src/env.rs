use dotenvy::dotenv;
use std::env;

pub fn load_env() {
    if let Ok(exe_path) = env::current_exe() {
        if let Some(exe_dir) = exe_path.parent() {
            let env_path = exe_dir.join(".env");
            if env_path.exists() {
                dotenvy::from_path(env_path).ok();
                return;
            }
        }
    }
    dotenv().ok();
}

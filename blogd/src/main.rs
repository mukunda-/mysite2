use axum::{http::StatusCode, Json, Router};
use std::{fs, sync::OnceLock};

//----------------------------------------------------------------------------------------
#[derive(serde::Deserialize)]
struct Config {
    content_location: String,
}

//----------------------------------------------------------------------------------------
impl Config {
    fn get() -> &'static Config {
        static CONFIG: OnceLock<Config> = OnceLock::new();
        CONFIG.get_or_init(|| {
            let config_str =
                fs::read_to_string("blogd-config.yaml").expect("Failed to read config file");
            serde_yaml::from_str(&config_str).expect("Failed to parse config file")
        })
    }
}

//----------------------------------------------------------------------------------------
async fn latest() -> String {
    "Hello, World!".to_string()
}

//----------------------------------------------------------------------------------------
async fn index() -> String {
    "Hello, World!".to_string()
}

//----------------------------------------------------------------------------------------
async fn content() -> String {
    "Hello, World!".to_string()
}

//----------------------------------------------------------------------------------------
#[tokio::main]
async fn main() {
    let config = Config::get();
    println!("Content location: {}", config.content_location);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let port = listener.local_addr().unwrap().port();
    println!("Listening on port: {}", port);

    // build our application with a route
    let app = Router::new()
        .route("/latest", axum::routing::get(latest))
        .route("/index", axum::routing::get(index))
        .route("/content/{name}", axum::routing::get(content));

    tokio::spawn(async move {
        axum::serve(listener, app).await.unwrap();
    });

    println!("Hello, world!");

    #[cfg(unix)] // production
    {
        fastcgi::run(|req| handle_request(req));
    }

    #[cfg(windows)] // debug
    {
        tokio::signal::ctrl_c().await.unwrap();
    }
}

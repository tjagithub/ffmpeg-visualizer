use futures::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::net::{TcpListener, TcpStream};
use tokio::sync::RwLock;
use tokio_tungstenite::accept_async;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Message {
    pub msg_type: String,
    pub data: serde_json::Value,
}

pub struct WebSocketServer {
    listener: Arc<RwLock<Option<TcpListener>>>,
}

impl WebSocketServer {
    pub fn new() -> Self {
        WebSocketServer {
            listener: Arc::new(RwLock::new(None)),
        }
    }

    pub async fn start(&self, addr: &str) -> Result<(), Box<dyn std::error::Error>> {
        let listener = TcpListener::bind(addr).await?;
        println!("WebSocket server listening on {}", addr);

        let mut listener_guard = self.listener.write().await;
        *listener_guard = Some(listener);

        Ok(())
    }

    pub async fn accept_connections(
        listener: TcpListener,
    ) -> Result<(), Box<dyn std::error::Error>> {
        loop {
            let (stream, peer_addr) = listener.accept().await?;
            println!("New connection from: {}", peer_addr);

            tokio::spawn(async move {
                if let Err(e) = Self::handle_client(stream).await {
                    eprintln!("Error handling client {}: {}", peer_addr, e);
                }
            });
        }
    }

    async fn handle_client(stream: TcpStream) -> Result<(), Box<dyn std::error::Error>> {
        let ws_stream = accept_async(stream).await?;
        println!("WebSocket connection established");

        let (mut ws_sender, mut ws_receiver) = ws_stream.split();

        while let Some(msg) = ws_receiver.next().await {
            match msg? {
                tokio_tungstenite::tungstenite::Message::Text(text) => {
                    println!("Received message: {}", text);

                    // Echo back a response
                    let response = format!("Echo: {}", text);
                    ws_sender
                        .send(tokio_tungstenite::tungstenite::Message::Text(response))
                        .await?;
                }
                tokio_tungstenite::tungstenite::Message::Binary(data) => {
                    println!("Received binary data: {} bytes", data.len());
                    ws_sender
                        .send(tokio_tungstenite::tungstenite::Message::Binary(data))
                        .await?;
                }
                tokio_tungstenite::tungstenite::Message::Close(_) => {
                    println!("Client closed connection");
                    break;
                }
                _ => {}
            }
        }

        Ok(())
    }
}

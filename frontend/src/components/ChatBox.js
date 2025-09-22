import React, { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const userId = "user1"; // In production, generate unique IDs per user/session

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const messageToSend = input;
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, message: messageToSend }),
      });

      const data = await response.json();

      // Add bot response to chat
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, the server is not responding." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={{
      width: "350px",
      height: "450px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Chat Messages */}
      <div style={{
        flex: 1,
        padding: "10px",
        overflowY: "auto"
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "8px"
            }}
          >
            <div style={{
              backgroundColor: msg.sender === "user" ? "#4f46e5" : "#e5e5ea",
              color: msg.sender === "user" ? "white" : "black",
              padding: "8px 12px",
              borderRadius: "15px",
              maxWidth: "80%",
              wordBreak: "break-word"
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            flex: 1,
            border: "none",
            padding: "10px",
            fontSize: "14px",
            outline: "none"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "0 15px",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

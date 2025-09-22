import React from "react";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "30px", fontFamily: "Arial, sans-serif" }}>
        Campus Chatbot
      </h1>
      <ChatWidget />
    </div>
  );
}

export default App;

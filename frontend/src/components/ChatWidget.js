import { useState } from "react";
import ChatBox from "./ChatBox";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#4f46e5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "30px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            zIndex: 1000
          }}
        >
          💬
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          zIndex: 1000
        }}>
          <div style={{
            position: "relative"
          }}>
            <ChatBox />
            {/* Close Button */}
            <div
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                color: "#fff",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
              }}
            >
              ×
            </div>
          </div>
        </div>
      )}
    </>
  );
}
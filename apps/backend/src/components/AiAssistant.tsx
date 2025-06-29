"use client"

import type React from "react"
import { useState } from "react"
import { useChat } from "ai/react"

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/ai/chat",
  })

  return (
    <div className="ai-assistant">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ai-assistant__toggle"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 1000,
        }}
      >
        AI
      </button>

      {isOpen && (
        <div
          className="ai-assistant__panel"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "400px",
            height: "500px",
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid #e5e7eb",
              fontWeight: "bold",
            }}
          >
            AI Writing Assistant
          </div>

          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
            }}
          >
            {messages.length === 0 ? (
              <div style={{ color: "#6b7280", textAlign: "center", marginTop: "50px" }}>
                Ask me anything about writing, content ideas, or improvements!
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    marginBottom: "12px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    backgroundColor: message.role === "user" ? "#f3f4f6" : "#eff6ff",
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                    {message.role === "user" ? "You" : "AI"}
                  </div>
                  <div>{message.content}</div>
                </div>
              ))
            )}
            {isLoading && <div style={{ textAlign: "center", color: "#6b7280" }}>AI is thinking...</div>}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              padding: "16px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask for help with your content..."
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: "8px 16px",
                backgroundColor: "#6366f1",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AiAssistant

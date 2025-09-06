import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, loading]);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5050/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      setHistory((prev) => [
        ...prev,
        { role: "user", content: prompt },
        {
          role: "assistant",
          content: data.response,
          inputTokens: data.inputTokens,
          outputTokens: data.outputTokens,
          cost: data.cost,
        },
      ]);
      setPrompt("");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const calculateTotals = () => {
    return history.reduce(
      (acc, msg) => {
        if (msg.role === "assistant") {
          acc.inputTokens += msg.inputTokens;
          acc.outputTokens += msg.outputTokens;
          acc.totalCost += parseFloat(msg.cost.totalCost);
        }
        return acc;
      },
      { inputTokens: 0, outputTokens: 0, totalCost: 0 }
    );
  };

  const totals = calculateTotals();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [prompt]);

  return (
    <div className="app-container">
      {/* Glassmorphism Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>AI Token Counter</h2>
          <p>Track your AI usage costs in real-time</p>
        </div>
        
        <div className="sidebar-menu">
          <button 
            className={activeTab === "chat" ? "menu-btn active" : "menu-btn"}
            onClick={() => setActiveTab("chat")}
          >
            <span>💬</span> Chat
          </button>
          <button 
            className={activeTab === "stats" ? "menu-btn active" : "menu-btn"}
            onClick={() => setActiveTab("stats")}
          >
            <span>📊</span> Statistics
          </button>
          <button 
            className={activeTab === "settings" ? "menu-btn active" : "menu-btn"}
            onClick={() => setActiveTab("settings")}
          >
            <span>⚙️</span> Settings
          </button>
          <button 
            className={activeTab === "history" ? "menu-btn active" : "menu-btn"}
            onClick={() => setActiveTab("history")}
          >
            <span>🕒</span> History
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="usage-stats">
            <h3>Total Usage</h3>
            <div className="stat-item">
              <span>Input Tokens:</span>
              <span className="stat-value">{totals.inputTokens}</span>
            </div>
            <div className="stat-item">
              <span>Output Tokens:</span>
              <span className="stat-value">{totals.outputTokens}</span>
            </div>
            <div className="stat-item">
              <span>Total Cost:</span>
              <span className="stat-value">${totals.totalCost.toFixed(6)}</span>
            </div>
          </div>
          <button className="clear-btn" onClick={clearHistory}>
            <span>🗑️</span> Clear History
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Glassmorphism Header */}
        <header className="header">
          <div className="header-left">
            <h1>AI Chat</h1>
            <span className="model-badge">gemini-1.5-flash</span>
          </div>
          <div className="header-right">
            <div className="connection-status">
              <span className="status-dot"></span>
              Connected to API
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="chat-area">
          {history.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🚀</div>
              <h2>Welcome to AI Token Counter</h2>
              <p>Start a conversation with our AI and track your token usage and costs in real-time.</p>
            </div>
          ) : (
            <div className="chat-messages">
              {history.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${msg.role === "user" ? "user-message" : "ai-message"} ${idx === history.length - 1 ? 'highlight' : ''}`}
                >
                  <div className="message-avatar">
                    {msg.role === "user" ? "👤" : "🤖"}
                  </div>
                  <div className="message-content">
                    <div className="message-text">{msg.content}</div>
                    {msg.role === "assistant" && (
                      <div className="message-stats">
                        <div className="stat-item">
                          <span className="stat-label">Input Tokens</span>
                          <span className="stat-value">{msg.inputTokens}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Output Tokens</span>
                          <span className="stat-value">{msg.outputTokens}</span>
                        </div>
                        <div className="stat-item cost">
                          <span className="stat-label">Total Cost</span>
                          <span className="stat-value">${msg.cost.totalCost} USD</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {loading && (
            <div className="loading-indicator">
              <div className="typing-animation">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>thinking...</p>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-container">
          <div className="input-box">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message here..."
              rows="1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <button 
              onClick={handleSubmit} 
              disabled={loading || !prompt.trim()}
              className="send-button"
            >
              {loading ? (
                <div className="button-spinner"></div>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
          <div className="input-footer">
            <span>⏎ Press Enter to send</span>
            <span>⇧ Shift + Enter for new line</span>
            <span>✨ Powered by Gemini AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
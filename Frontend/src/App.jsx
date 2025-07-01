import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}

// Example usage
const result = sum(5, 3);
console.log(result);`);
  const [review, setReview] = useState(``);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    if (!code.trim()) {
      setError("Please enter some code to review");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://code-review-5bpq.onrender.com/ai/get-review",
        { code }
      );
      setReview(response.data);
    } catch (err) {
      setError("Failed to get code review. Please try again.");
      console.error("Review error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const clearCode = () => {
    setCode("");
    setReview("");
    setError("");
  };

  return (
    <div
      className="app"
      style={{ backgroundColor: "#1a1a1a", color: "#e0e0e0" }}
    >
      <header
        className="app-header"
        style={{ backgroundColor: "#121212", borderBottom: "1px solid #333" }}
      >
        <div className="header-content">
          <h1 className="app-title" style={{ color: "#ffffff" }}>
            <span className="title-icon">🔍</span>
            Code Review AI
          </h1>
          <p className="app-subtitle" style={{ color: "#aaaaaa" }}>
            Get intelligent feedback on your code instantly
          </p>
        </div>
      </header>

      <main className="main-content">
        <div
          className="editor-section"
          style={{ backgroundColor: "#252525", border: "1px solid #333" }}
        >
          <div
            className="section-header"
            style={{
              backgroundColor: "#1e1e1e",
              borderBottom: "1px solid #333",
            }}
          >
            <h2 className="section-title" style={{ color: "#ffffff" }}>
              <span className="section-icon">💻</span>
              Code Editor
            </h2>
            <button
              className="clear-btn"
              onClick={clearCode}
              title="Clear code"
              style={{ color: "#ffffff", backgroundColor: "#333" }}
            >
              <span>🗑️</span>
            </button>
          </div>

          <div className="code-editor">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={20}
              className="editor"
              placeholder="Enter your code here..."
              style={{
                fontFamily:
                  '"JetBrains Mono", "Fira Code", "Consolas", monospace',
                fontSize: 14,
                lineHeight: 1.6,
                minHeight: "400px",
                backgroundColor: "#1e1e1e",
                color: "#d4d4d4",
              }}
            />
          </div>

          <div className="action-buttons">
            <button
              className={`review-btn ${isLoading ? "loading" : ""}`}
              onClick={reviewCode}
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? "#555" : "#3a3a3a",
                color: "#ffffff",
              }}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="btn-icon">🚀</span>
                  Review Code
                </>
              )}
            </button>
          </div>

          {error && (
            <div
              className="error-message"
              style={{
                backgroundColor: "#3a1a1a",
                color: "#ff6b6b",
                borderLeft: "4px solid #ff3b3b",
              }}
            >
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
        </div>

        <div
          className="review-section"
          style={{ backgroundColor: "#252525", border: "1px solid #333" }}
        >
          <div
            className="section-header"
            style={{
              backgroundColor: "#1e1e1e",
              borderBottom: "1px solid #333",
            }}
          >
            <h2 className="section-title" style={{ color: "#ffffff" }}>
              <span className="section-icon">📝</span>
              AI Review
            </h2>
          </div>

          <div
            className="review-content"
            style={{
              color: "#e0e0e0",
              maxHeight: "400px",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            {review ? (
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            ) : (
              <div className="empty-state" style={{ color: "#aaaaaa" }}>
                <div className="empty-icon">🤖</div>
                <h3 style={{ color: "#ffffff" }}>Ready to review your code!</h3>
                <p>
                  Enter your code in the editor and click "Review Code" to get
                  AI-powered feedback and suggestions.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

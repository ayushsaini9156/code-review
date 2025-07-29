import { useEffect, useState } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  const reviewCode = async () => {
    if (!code.trim()) {
      return setError("⚠️ Please enter code to review.");
    }

    const isLikelyCode =
      /[\{\};()=]|function|const|let|var|class|#include/.test(code);

    if (!isLikelyCode) {
      return setError(
        "🚫 Only code is accepted for review. Please paste valid code."
      );
    }

    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "https://code-review-5bpq.onrender.com/ai/get-review",
        {
          code,
          language: "javascript",
        }
      );
      setReview(res.data);
    } catch {
      setError("🚫 Failed to get code review. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearEditor = () => {
    setCode("");
    setReview("");
    setError("");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#0f0f0f",
        color: "#f0f0f0",
      }}
    >
      {/* Header */}
      <header
        style={{
          height: "60px",
          backgroundColor: "#181818",
          borderBottom: "1px solid #2c2c2c",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          flexShrink: 0,
        }}
      >
        <h1 style={{ fontSize: "1.2rem", color: "#ffffff", margin: 0 }}>
          🔍 Code Reviewer
        </h1>
      </header>

      {/* Main Body */}
      <div style={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Code Editor */}
        <div style={{ flex: 1, padding: "16px", backgroundColor: "#1a1a1a" }}>
          <h2 style={{ marginBottom: "12px", color: "#fff" }}>
            💻 Code Editor
          </h2>
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={16}
            placeholder="Write your code here..."
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 14,
              height: "calc(100vh - 200px)",
              backgroundColor: "#121212",
              color: "#e0e0e0",
              borderRadius: "8px",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
              overflow: "auto",
            }}
          />
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <button
              onClick={reviewCode}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: isLoading ? "#444" : "#3a3a3a",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              {isLoading ? "🔎 Reviewing..." : "🚀 Review Code"}
            </button>
            <button
              onClick={clearEditor}
              style={{
                padding: "10px 16px",
                background: "#2a2a2a",
                border: "1px solid #444",
                color: "#fff",
                borderRadius: "6px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* AI Review Panel */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            backgroundColor: "#1c1c1c",
            borderLeft: "1px solid #333",
            overflowY: "auto",
            maxHeight: "calc(100vh - 60px)",
          }}
        >
          <h2 style={{ marginBottom: "12px", color: "#fff" }}>📝 AI Review</h2>

          {error && (
            <div
              style={{
                marginBottom: "12px",
                color: "#ff6b6b",
                fontSize: "0.85rem",
                background: "#2a1a1a",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #882222",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ paddingRight: "8px" }}>
            {review ? (
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            ) : (
              <div style={{ color: "#999" }}>
                <p>🤖 Ready to review your code.</p>
                <p>
                  Paste some code and click <strong>"Review Code"</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

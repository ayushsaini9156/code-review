import React, { useState } from "react";
import { Sparkles, Code2, FileCode, Trash2, Send, Loader2 } from "lucide-react";

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reviewCode = async () => {
    if (!code.trim()) {
      return;
    }

    setIsLoading(true);
    setReview("");

    // Simulated API call - replace with your actual endpoint
    setTimeout(() => {
      setReview(`## Code Review

### ✅ Strengths
- Clean and simple function implementation
- Good naming convention for the function

### 💡 Suggestions
- Consider adding input validation
- Add JSDoc comments for better documentation
- Handle edge cases (null, undefined)

### 🔧 Improved Version
\`\`\`javascript
/**
 * Adds two numbers together
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return a + b;
}
\`\`\`

**Overall Rating:** 7/10`);
      setIsLoading(false);
    }, 2000);
  };

  const clearEditor = () => {
    setCode("");
    setReview("");
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative w-full border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30 flex-shrink-0">
        <div className="w-full px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Code Reviewer
              </h1>
              <p className="text-xs text-slate-400">Powered by advanced AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative w-full grid grid-cols-2 gap-6 px-8 py-6 flex-1 min-h-0 max-w-full">
        {/* Editor Section */}
        <div className="flex flex-col gap-4 min-h-0">
          <div className="flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-slate-200">
                Code Editor
              </h2>
            </div>
            <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
              JavaScript
            </span>
          </div>

          <div className="flex-1 relative group min-h-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-6 bg-transparent text-slate-200 font-mono text-sm resize-none focus:outline-none custom-scrollbar"
                placeholder="Paste your code here..."
                spellCheck={false}
              />
            </div>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={reviewCode}
              disabled={isLoading}
              className="flex-1 relative group overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50 disabled:shadow-none disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Review Code
                  </>
                )}
              </span>
            </button>

            <button
              onClick={clearEditor}
              className="px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-300 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Review Section */}
        <div className="flex flex-col gap-4 min-h-0">
          <div className="flex items-center gap-2 flex-shrink-0">
            <FileCode className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-slate-200">
              AI Analysis
            </h2>
          </div>

          <div className="flex-1 relative group min-h-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl">
              <div className="h-full overflow-y-auto p-6 prose prose-invert max-w-none custom-scrollbar">
                {review ? (
                  <div className="space-y-3 animate-fadeIn">
                    {review.split("\n").map((line, idx) => {
                      if (line.startsWith("## ")) {
                        return (
                          <h2
                            key={idx}
                            className="text-xl font-bold text-slate-100 mt-4 mb-3"
                          >
                            {line.replace("## ", "")}
                          </h2>
                        );
                      } else if (line.startsWith("### ")) {
                        return (
                          <h3
                            key={idx}
                            className="text-lg font-semibold text-slate-200 mt-3 mb-2"
                          >
                            {line.replace("### ", "")}
                          </h3>
                        );
                      } else if (line.startsWith("```")) {
                        return null;
                      } else if (line.startsWith("- ")) {
                        return (
                          <li key={idx} className="text-slate-300 ml-4 text-sm">
                            {line.replace("- ", "")}
                          </li>
                        );
                      } else if (line.startsWith("**")) {
                        return (
                          <p
                            key={idx}
                            className="text-slate-200 font-semibold text-sm"
                          >
                            {line.replace(/\*\*/g, "")}
                          </p>
                        );
                      } else if (line.trim()) {
                        return (
                          <p key={idx} className="text-slate-300 text-sm">
                            {line}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center">
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium">
                          Ready to analyze
                        </p>
                        <p className="text-slate-500 text-sm mt-1">
                          Paste your code and click Review to get started
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.5);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.7);
        }
      `}</style>
    </div>
  );
}

export default App;

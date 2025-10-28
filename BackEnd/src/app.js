const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const aiRoutes = require("./routes/ai.routes");

const app = express();

// ✅ Apply middlewares
app.use(cors());
app.use(express.json());

// ✅ Optional: Apply rate limiter (prevents abuse)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per minute
  message: "Too many requests. Please try again later.",
});
app.use(limiter);

// ✅ Base route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// ✅ AI routes
app.use("/ai", aiRoutes);

// ✅ Error handling middleware (recommended)
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message || err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;

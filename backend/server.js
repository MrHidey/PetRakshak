const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load env variables
dotenv.config();

const app = express();

// Global request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
  }
  next();
});

// Middleware
app.use(cors({ 
  origin: "http://localhost:3000", 
  credentials: true 
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/test", (req, res) => {
  console.log("🔥 Main test route hit");
  res.json({ message: "Server is running!", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/volunteers", require("./routes/volunteers"));
app.use('/api/rescue-team', require('./routes/rescue-team'));
// Gemini AI Route
if (process.env.GEMINI_API_KEY) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const SYSTEM_PROMPT = `
You are a helpful and knowledgeable pet care assistant.
Only answer questions related to pets such as dogs, cats, birds, rabbits, reptiles, etc.
If a question is not related to pets, respond with: "I'm here to help only with pet-related questions!"
`;

  app.post("/ask", async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nUser: ${question}`);
      res.json({ answer: result.response.text() });
    } catch (err) {
      console.error("❌ Gemini Error:", err.message);
      res.status(500).json({ error: "Failed to get response from Gemini" });
    }
  });
} else {
  console.warn("⚠️ GEMINI_API_KEY not found - AI chat will not work");
}

// 404 handler
app.use("*", (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    message: "Route not found",
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ 
    message: "Internal server error",
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start server
const PORT = process.env.PORT || 'http://localhost:5000 ';
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: http://localhost:3000`);
});
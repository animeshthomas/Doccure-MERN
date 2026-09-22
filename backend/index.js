import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import bookingRoute from "./Routes/booking.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import chatRoute from "./Routes/message.js";
import insightRoute from "./Routes/insight.js";
import prescriptionRoute from "./Routes/prescription.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// CORS configuration - allow all origins for API & credentials
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
};

// Database state tracking
let isDbConnected = false;
let dbErrorDetails = null;

// Health & Status Endpoints
const getHealthStatus = () => ({
  status: "online",
  service: "Doccure-MERN Backend API",
  database: isDbConnected ? "connected" : "disconnected",
  dbError: dbErrorDetails || undefined,
  timestamp: new Date().toISOString(),
  env: process.env.NODE_ENV || "development"
});

app.get("/", (req, res) => {
  res.status(200).json(getHealthStatus());
});

app.get("/health", (req, res) => {
  res.status(200).json(getHealthStatus());
});

app.get("/api/v1/health", (req, res) => {
  res.status(200).json(getHealthStatus());
});

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/insights", insightRoute);
app.use("/api/v1/prescriptions", prescriptionRoute);

// Global 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

// MongoDB Connection with auto-detection of multiple environment variable names
mongoose.set("strictQuery", false);

// Connection event listeners
mongoose.connection.on("connected", () => {
  isDbConnected = true;
  dbErrorDetails = null;
  console.log("✅ MongoDB database is connected successfully");
});

mongoose.connection.on("error", (err) => {
  isDbConnected = false;
  dbErrorDetails = err.message;
  console.error("❌ MongoDB connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  isDbConnected = false;
  console.warn("⚠️ MongoDB disconnected");
});

const connectDB = async () => {
  // Support DB_URL, MONGO_URI, MONGODB_URI, and DATABASE_URL
  const dbUri =
    process.env.DB_URL ||
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    process.env.DATABASE_URL;

  if (!dbUri) {
    dbErrorDetails = "No database connection string found in environment variables (DB_URL, MONGO_URI, MONGODB_URI, or DATABASE_URL).";
    console.warn("⚠️ Warning:", dbErrorDetails);
    console.warn("➡️ Please configure DB_URL or MONGO_URI in your Render Dashboard -> Environment.");
    return;
  }

  try {
    console.log("Attempting MongoDB connection...");
    await mongoose.connect(dbUri);
    isDbConnected = true;
    dbErrorDetails = null;
    console.log("✅ MongoDB database is connected");
  } catch (err) {
    isDbConnected = false;
    dbErrorDetails = err.message;
    console.error("❌ MongoDB connection failed:", err.message);
    console.warn("Server remains online to serve health checks and requests. Will retry on next cycle.");
  }
};

// Start server on 0.0.0.0 for Render compatibility
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Doccure-MERN server is running on port: ${port}`);
  connectDB();
});
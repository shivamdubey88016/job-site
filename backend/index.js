import dotenv from "dotenv";
import express from "express";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import applicationRoute from "./routes/application.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import userRoute from "./routes/user.route.js";
import connectDB from "./utils/db.js";

const __dirname = path.resolve();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS: allow localhost for dev and deployed frontend
app.use(cors({
  origin: "https://job-site-1.onrender.com",
  credentials: true
}));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve frontend (React/Vite build)
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Dynamic port
const PORT = process.env.PORT || 5000;

// Connect DB first, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to DB:", err);
});

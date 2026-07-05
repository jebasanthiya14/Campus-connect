import "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import eventRoutes from "./routes/event.routes.js";
import authRoutes from "./routes/auth.routes.js";
import reviewRoutes from "./routes/review.routes.js"; // NEW

import cgpaRoutes from "./routes/cgpa.routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Existing Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// NEW Route
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Campus Connect API Running 🚀",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.use("/api/cgpa", cgpaRoutes);
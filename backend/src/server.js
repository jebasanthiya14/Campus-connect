import "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import registrationRoutes from "./routes/registration.routes.js";
import adminAuthRoutes from "./routes/adminAuth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import authRoutes from "./routes/auth.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import lostFoundRoutes from "./routes/lostfound.routes.js";

import cgpaRoutes from "./routes/cgpa.routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Make uploaded images accessible
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Existing Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminAuthRoutes);

// NEW Lost & Found Route
app.use("/api/lostfound", lostFoundRoutes);
app.use("/api/registrations", registrationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Campus Connect API Running 🚀",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.use("/api/cgpa", cgpaRoutes);
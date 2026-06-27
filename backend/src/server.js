import "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/event.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Campus Connect API Running 🚀" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
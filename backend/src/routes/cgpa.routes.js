import express from "express";
import {
  saveCGPA,
  getCGPA,
} from "../controllers/cgpa.controller.js";

const router = express.Router();

router.post("/", saveCGPA);
router.get("/:id", getCGPA);

export default router;
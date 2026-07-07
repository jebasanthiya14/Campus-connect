import express from "express";

import {
  registerEvent,
  getRegistrations,
} from "../controllers/registration.controller.js";

const router = express.Router();

// Register Event
router.post("/", registerEvent);

// Get registrations department-wise
router.get("/:department", getRegistrations);

export default router;
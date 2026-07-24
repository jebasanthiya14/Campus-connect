import express from "express";

import {
  getCalendar,
  addCalendar,
  updateCalendar,
  deleteCalendar,
} from "../controllers/calendar.controller.js";

const router = express.Router();

router.get("/", getCalendar);

router.post("/", addCalendar);

router.put("/:id", updateCalendar);

router.delete("/:id", deleteCalendar);

export default router;
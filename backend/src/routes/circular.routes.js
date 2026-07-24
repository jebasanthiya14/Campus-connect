import express from "express";

import {
  getCirculars,
  addCircular,
  updateCircular,
  deleteCircular,
} from "../controllers/circular.controller.js";

const router = express.Router();

router.get("/", getCirculars);

router.post("/", addCircular);

router.put("/:id", updateCircular);

router.delete("/:id", deleteCircular);

export default router;

import express from "express";

import {
  upload,
  addFoundItem,
  getFoundItems,
  verifyItem,
} from "../controllers/lostfound.controller.js";

const router = express.Router();

// ================= ADD FOUND ITEM =================
router.post(
  "/",
  upload.single("image"),
  addFoundItem
);

// ================= GET ALL FOUND ITEMS =================
router.get(
  "/",
  getFoundItems
);

// ================= VERIFY ITEM =================
router.post(
  "/verify/:id",
  verifyItem
);

export default router;
import express from "express";

import {
  addReview,
  getFacultyReviews,
  getPendingReviews,
  getAllReviews,
  approveReview,
  deleteReview
} from "../controllers/review.controller.js";

const router = express.Router();

// Student

router.post("/", addReview);
router.get("/my-feedback/:adminId", getFacultyReviews);

// Admin

router.get("/admin/pending", getPendingReviews);

router.put("/admin/approve/:id", approveReview);

router.delete("/admin/delete/:id", deleteReview);
router.get("/admin/all", getAllReviews);

export default router;
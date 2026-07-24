import express from "express";

import {

addReview,

getFacultyReviews,

getPendingReviews,

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

export default router;
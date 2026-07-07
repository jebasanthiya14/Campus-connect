import express from "express";
import {
  adminRegister,
  adminLogin,
  getAdminsByDepartment,
} from "../controllers/adminAuth.controller.js";

const router = express.Router();

// ================= ADMIN REGISTER =================
router.post("/register", adminRegister);

// ================= ADMIN LOGIN =================
router.post("/login", adminLogin);

// ================= GET ADMINS BY DEPARTMENT =================
router.get("/faculty/:department", getAdminsByDepartment);

export default router;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

// ================= ADMIN REGISTER =================

export const adminRegister = async (req, res) => {
  try {
    const { full_name, email, password, department } = req.body;

    if (!full_name || !email || !password || !department) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if admin already exists
    const adminExists = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );

    if (adminExists.rows.length > 0) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin
    const newAdmin = await pool.query(
      `INSERT INTO admins
      (full_name, email, password, department)
      VALUES ($1,$2,$3,$4)
      RETURNING id, full_name, email, department`,
      [full_name, email, hashedPassword, department]
    );

    res.status(201).json({
      message: "Admin registered successfully",
      admin: newAdmin.rows[0],
    });

  } catch (err) {
    console.error("Admin Register Error:", err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// ================= ADMIN LOGIN =================

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );

    if (admin.rows.length === 0) {
      return res.status(400).json({
        message: "Admin not found",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      admin.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: admin.rows[0].id,
        email: admin.rows[0].email,
        department: admin.rows[0].department,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Admin Login Successful",
      token,
      admin: {
        id: admin.rows[0].id,
        full_name: admin.rows[0].full_name,
        email: admin.rows[0].email,
        department: admin.rows[0].department,
      },
    });

  } catch (err) {
    console.error("Admin Login Error:", err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// ================= GET ADMINS BY DEPARTMENT =================

export const getAdminsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    const result = await pool.query(
      `SELECT id, full_name
       FROM admins
       WHERE department = $1
       ORDER BY full_name ASC`,
      [department]
    );

    res.status(200).json(result.rows);

  } catch (err) {
    console.error("Get Admins Error:", err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
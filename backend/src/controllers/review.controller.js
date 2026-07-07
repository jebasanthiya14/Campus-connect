import { pool } from "../config/db.js";

// Simple bad word list
const badWords = [
  "idiot",
  "stupid",
  "hate",
  "worst",
  "useless",
  "fool",
  "abuse",
];

// =======================
// Student submits feedback
// =======================
export const addReview = async (req, res) => {
  try {
    const {
      admin_id,
      faculty_name,
      department,
      review,
    } = req.body;

    if (!admin_id || !faculty_name || !department || !review) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const text = review.toLowerCase();

    const containsBadWord = badWords.some((word) =>
      text.includes(word)
    );

    const status = containsBadWord ? "pending" : "approved";

    const result = await pool.query(
      `INSERT INTO staff_reviews
      (admin_id, faculty_name, department, review, status)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        admin_id,
        faculty_name.trim(),
        department.trim(),
        review.trim(),
        status,
      ]
    );

    res.status(201).json({
      message:
        status === "approved"
          ? "Feedback submitted successfully"
          : "Feedback sent for admin approval",
      data: result.rows[0],
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to submit feedback",
    });
  }
};

// =======================
// Logged-in Admin Views Own Feedback
// =======================
export const getFacultyReviews = async (req, res) => {
  try {
    const { adminId } = req.params;

    const result = await pool.query(
      `SELECT
        review,
        created_at
       FROM staff_reviews
       WHERE admin_id = $1
       AND status='approved'
       ORDER BY created_at DESC`,
      [adminId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to fetch feedback",
    });
  }
};

// =======================
// Pending Reviews
// =======================
export const getPendingReviews = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM staff_reviews
       WHERE status='pending'
       ORDER BY created_at DESC`
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to fetch pending feedback",
    });
  }
};

// =======================
// Approve Review
// =======================
export const approveReview = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `UPDATE staff_reviews
       SET status='approved'
       WHERE id=$1`,
      [id]
    );

    res.json({
      message: "Feedback Approved",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to approve",
    });
  }
};

// =======================
// Delete Review
// =======================
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `DELETE FROM staff_reviews
       WHERE id=$1`,
      [id]
    );

    res.json({
      message: "Feedback Deleted",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to delete",
    });
  }
};
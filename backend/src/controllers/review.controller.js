import { pool } from "../config/db.js";

// Simple bad word list
const badWords = [
  "idiot",
  "stupid",
  "hate",
  "worst",
  "useless",
  "fool",
  "abuse"
];

// =======================
// Student submits feedback
// =======================
export const addReview = async (req, res) => {
  try {
    const { faculty_name, department, review } = req.body;

    if (!faculty_name || !department || !review) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const text = review.toLowerCase();

    const containsBadWord = badWords.some(word =>
      text.includes(word)
    );

    const status = containsBadWord ? "pending" : "approved";

    const result = await pool.query(
      `INSERT INTO staff_reviews
      (faculty_name, department, review, status)
      VALUES ($1,$2,$3,$4)
      RETURNING *`,
      [
        faculty_name.trim(),
        department.trim(),
        review.trim(),
        status
      ]
    );

    res.status(201).json({
      message:
        status === "approved"
          ? "Feedback submitted successfully"
          : "Feedback sent for admin approval",
      data: result.rows[0]
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to submit feedback"
    });

  }
};


// =======================
// Faculty view approved feedback
// =======================
export const getFacultyReviews = async (req, res) => {

  try {

    const { facultyName } = req.params;

    const result = await pool.query(

      `SELECT review,created_at
       FROM staff_reviews
       WHERE LOWER(faculty_name)=LOWER($1)
       AND status='approved'
       ORDER BY created_at DESC`,

      [facultyName]

    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to fetch feedback"
    });

  }

};


// =======================
// Admin Pending Reviews
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
      message: "Unable to fetch pending feedback"
    });

  }

};


// =======================
// Admin Approve
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
      message: "Feedback Approved"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to approve"
    });

  }

};


// =======================
// Admin Delete
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
      message: "Feedback Deleted"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to delete"
    });

  }

};
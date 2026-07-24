import { pool } from "../config/db.js";

// Get All Circulars
export const getCirculars = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM circulars ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add Circular
export const addCircular = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const result = await pool.query(
      `INSERT INTO circulars(title,description,date)
       VALUES($1,$2,$3)
       RETURNING *`,
      [title, description, date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Circular
export const updateCircular = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

    const result = await pool.query(
      `UPDATE circulars
       SET title=$1,
           description=$2,
           date=$3
       WHERE id=$4
       RETURNING *`,
      [title, description, date, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Circular
export const deleteCircular = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM circulars WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Circular Deleted"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
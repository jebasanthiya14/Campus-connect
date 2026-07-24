import { pool } from "../config/db.js";

// Get Calendar
export const getCalendar = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM calendar ORDER BY date ASC"
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add Calendar Event
export const addCalendar = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const result = await pool.query(
      `INSERT INTO calendar(title,description,date)
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

// Update Calendar Event
export const updateCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

    const result = await pool.query(
      `UPDATE calendar
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

// Delete Calendar Event
export const deleteCalendar = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM calendar WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Calendar Event Deleted"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
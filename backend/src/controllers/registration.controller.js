import { pool } from "../config/db.js";

// ================= REGISTER EVENT =================

export const registerEvent = async (req, res) => {
  try {
    const {
      event_id,
      student_name,
      roll_no,
      department,
    } = req.body;

    await pool.query(
      `INSERT INTO registrations
      (event_id, student_name, roll_no, department)
      VALUES ($1,$2,$3,$4)`,
      [
        event_id,
        student_name,
        roll_no,
        department,
      ]
    );

    res.status(201).json({
      message: "Registration Successful",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= GET REGISTRATIONS BY ADMIN DEPARTMENT =================

export const getRegistrations = async (req, res) => {
  try {

    const { department } = req.params;

    const result = await pool.query(
      `
      SELECT
        registrations.id,
        registrations.student_name,
        registrations.roll_no,
        registrations.department AS student_department,
        registrations.registered_at,
        events.title,
        events.location,
        events.event_date

      FROM registrations

      JOIN events
      ON registrations.event_id = events.id

      WHERE events.admin_department = $1

      ORDER BY registrations.registered_at DESC
      `,
      [department]
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to fetch registrations",
    });

  }
};
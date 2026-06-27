import { pool } from "../config/db.js";

// ================= GET ALL EVENTS =================

export const getEvents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY event_date ASC"
    );

    res.status(200).json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching events",
    });
  }
};


// ================= ADD EVENT =================

export const addEvent = async (req, res) => {
  try {

    const {
      title,
      description,
      department,
      location,
      event_date,
      registration_deadline,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO events
      (title, description, department, location, event_date, registration_deadline)

      VALUES($1,$2,$3,$4,$5,$6)

      RETURNING *`,
      [
        title,
        description,
        department,
        location,
        event_date,
        registration_deadline,
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to add event",
    });
  }
};


// ================= UPDATE EVENT =================

export const updateEvent = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      title,
      description,
      department,
      location,
      event_date,
      registration_deadline,
    } = req.body;

    const result = await pool.query(
      `UPDATE events
       SET
       title=$1,
       description=$2,
       department=$3,
       location=$4,
       event_date=$5,
       registration_deadline=$6
       WHERE id=$7
       RETURNING *`,
      [
        title,
        description,
        department,
        location,
        event_date,
        registration_deadline,
        id,
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to update event",
    });
  }
};


// ================= DELETE EVENT =================

export const deleteEvent = async (req, res) => {
  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM events WHERE id=$1",
      [id]
    );

    res.json({
      message: "Event Deleted Successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to delete event",
    });
  }
};
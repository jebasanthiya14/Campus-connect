import { pool } from "../config/db.js";

export const saveCGPA = async (req, res) => {
  try {
    const { userId, cgpa } = req.body;

    await pool.query(
      "UPDATE users SET cgpa=$1 WHERE id=$2",
      [cgpa, userId]
    );

    res.json({
      message: "CGPA Saved Successfully"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Unable to save CGPA"
    });
  }
};

export const getCGPA = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT cgpa FROM users WHERE id=$1",
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Unable to fetch CGPA"
    });
  }
};
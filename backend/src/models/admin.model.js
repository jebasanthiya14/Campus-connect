import pool from "../config/db.js";

export const createAdmin = async (full_name, email, password, department) => {
  const query = `
    INSERT INTO admins (full_name, email, password, department)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [full_name, email, password, department];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAdminByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM admins WHERE email = $1",
    [email]
  );

  return result.rows[0];
};
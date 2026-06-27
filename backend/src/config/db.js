import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// TEST CONNECTION IMMEDIATELY
pool.connect()
  .then((client) => {
    console.log("✅ PostgreSQL Connected Successfully");
    client.release();
  })
  .catch((err) => {
    console.error("❌ PostgreSQL Connection Failed:", err.message);
  });
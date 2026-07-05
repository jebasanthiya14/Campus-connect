import { pool } from "../config/db.js";
import multer from "multer";
import path from "path";

// ================= MULTER CONFIG =================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage,
});

// ================= ADD FOUND ITEM =================

export const addFoundItem = async (req, res) => {
  try {
    const {
      item_name,
      colour,
      category,
      description,
      pickup_location,
    } = req.body;

    const image = req.file
      ? req.file.filename
      : "";

    const result = await pool.query(
      `INSERT INTO found_items
      (
        image,
        item_name,
        colour,
        category,
        description,
        pickup_location
      )

      VALUES($1,$2,$3,$4,$5,$6)

      RETURNING *`,
      [
        image,
        item_name,
        colour,
        category,
        description,
        pickup_location,
      ]
    );

    res.status(201).json({
      message: "Item uploaded successfully",
      item: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to upload item",
    });

  }
};

// ================= GET ALL ITEMS =================

export const getFoundItems = async (req, res) => {

  try {

    const result = await pool.query(
      `SELECT
      id,
      image,
      category,
      created_at
      FROM found_items
      ORDER BY created_at DESC`
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to fetch items",
    });

  }

};

// ================= VERIFY OWNER =================

export const verifyItem = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      item_name,
      colour,
      description,
    } = req.body;

    const result = await pool.query(
      "SELECT * FROM found_items WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        message: "Item not found",
      });

    }

    const item = result.rows[0];

    let score = 0;

    if (
      item.item_name.trim().toLowerCase() ===
      item_name.trim().toLowerCase()
    ) {
      score++;
    }

    if (
      item.colour.trim().toLowerCase() ===
      colour.trim().toLowerCase()
    ) {
      score++;
    }

    if (
      item.description.trim().toLowerCase() ===
      description.trim().toLowerCase()
    ) {
      score++;
    }

    if (score >= 2) {

      return res.json({
        success: true,
        pickup_location: item.pickup_location,
      });

    }

    res.json({
      success: false,
      message: "Verification Failed",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
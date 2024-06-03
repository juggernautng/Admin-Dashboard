import express from "express";
import { pool } from "../createPool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [signalementsData] = await connection.query("SELECT * FROM signalements");
    connection.release();
    res.status(200).json(signalementsData);
  } catch (error) {
    console.error("Error retrieving signalements data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

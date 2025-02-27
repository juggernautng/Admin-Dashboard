import express from "express";
import { pool } from "../createPool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [trajets] = await connection.query("SELECT * FROM trajets");
    connection.release();

    res.status(200).json(trajets);
  } catch (error) {
    console.error("Error fetching trajets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id_trajet", async (req, res) => {
  const trajetId = req.params.id_trajet;

  try {
    const connection = await pool.getConnection();
    await connection.query("DELETE FROM reservations WHERE id_trajet = ?", [trajetId]);
    await connection.query("DELETE FROM trajets WHERE id_trajet = ?", [trajetId]);
    connection.release();

    res.status(200).json({ message: "Trajet deleted successfully" });
  } catch (error) {
    console.error("Error deleting trajet:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

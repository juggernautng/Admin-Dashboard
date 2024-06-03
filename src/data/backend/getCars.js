import express from "express";
import { pool } from "../createPool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [trajets] = await connection.query("SELECT * FROM voitures");
    connection.release();

    res.status(200).json(trajets);
  } catch (error) {
    console.error("Error fetching trajets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:matricule", async (req, res) => {
  const matricule = req.params.matricule;

  try {

    const traietsCnt = await pool.getConnection();
    await traietsCnt.query(`
      DELETE reservations
      FROM reservations
      JOIN trajets ON trajets.id_trajet = reservations.id_trajet
      WHERE trajets.id_voiture = ?
    `, [matricule]);
    
    await traietsCnt.query("DELETE FROM trajets WHERE id_voiture = ?", [matricule]);
    traietsCnt.release();

    // Delete the car
    const carConnection = await pool.getConnection();
    const [deleteResult] = await carConnection.query(
      "DELETE FROM voitures WHERE matricule = ?",
      [matricule]
    );
    carConnection.release();

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

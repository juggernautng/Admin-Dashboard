import express from "express";
import { pool } from "../createPool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usersConnection = await pool.getConnection();
    const [allcars] = await usersConnection.query("SELECT * FROM voitures WHERE voiture_certificat IS NOT NULL AND voiture_est_certifie = 0 ORDER BY matricule");
    usersConnection.release();
    res.status(200).json(allcars);
  } catch (error) {
    console.error("Error retrieving users data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:matricule", async (req, res) => {
    const { matricule } = req.params;
  
    try {
      const userConnection = await pool.getConnection();
      const [existingUser] = await userConnection.query("SELECT * FROM voitures WHERE matricule = ?", [matricule]);
      userConnection.release();
  
      if (existingUser.length === 0) {
        return res.status(404).json({ error: "matricule not found" });
      }
  
      const updateUserConnection = await pool.getConnection();
      await updateUserConnection.query("UPDATE Voitures SET voiture_est_certifie = 1 WHERE matricule = ?", [matricule]);
      updateUserConnection.release();
  
      res.status(200).json({ message: "matricule certification status updated successfully" });
    } catch (error) {
      console.error("Error updating user certification status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

  

export default router;

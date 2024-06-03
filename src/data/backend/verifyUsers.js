import express from "express";
import { pool } from "../createPool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usersConnection = await pool.getConnection();
    const [allUsers] = await usersConnection.query("SELECT * FROM Utilisateurs WHERE idCard IS NOT NULL AND est_certifie = 0 ORDER BY id_uti");
    usersConnection.release();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error retrieving users data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log(userId)
  
    try {
      const userConnection = await pool.getConnection();
      const [existingUser] = await userConnection.query("SELECT * FROM Utilisateurs WHERE id_uti = ?", [userId]);
      userConnection.release();
  
      if (existingUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const updateUserConnection = await pool.getConnection();
      await updateUserConnection.query("UPDATE Utilisateurs SET est_certifie = 1 WHERE id_uti = ?", [userId]);
      updateUserConnection.release();
  
      res.status(200).json({ message: "User certification status updated successfully" });
    } catch (error) {
      console.error("Error updating user certification status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

  

export default router;

import express from "express";
import { pool } from "../createPool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usersConnection = await pool.getConnection();
    const [allUsers] = await usersConnection.query("SELECT * FROM Utilisateurs ORDER BY id_uti");
    usersConnection.release();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error retrieving users data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:email", async (req, res) => {
  const { email } = req.params;
  console.log(email)

  try {
    await pool.query("SET FOREIGN_KEY_CHECKS = 0");

    const userConnection = await pool.getConnection();
    const [existingUser] = await userConnection.query(
      "SELECT * FROM Utilisateurs WHERE email = ?",
      [email]
    );

    if (existingUser.length === 0) {
      userConnection.release();
      return res.status(404).json({ error: "User not found" });
    }

    await userConnection.query(
      "DELETE FROM reservations WHERE id_reserveur = ?",
      [existingUser[0].id_uti]
    );

    await userConnection.query(
      "DELETE FROM voitures WHERE id_prop = ?",
      [existingUser[0].id_uti]
    );

    await userConnection.query(
      "DELETE FROM trajets WHERE id_conducteur = ?",
      [existingUser[0].id_uti]
    );

    await userConnection.query(
      "DELETE FROM signalements WHERE TargetUserID = ? OR SignalerUserID = ?",
      [existingUser[0].id_uti, existingUser[0].id_uti]
    );

    await userConnection.query(
      "DELETE FROM Utilisateurs WHERE email = ?",
      [email]
    );
    userConnection.release();

    await pool.query("SET FOREIGN_KEY_CHECKS = 1");

    res.status(200).json({ message: "User and associated records deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

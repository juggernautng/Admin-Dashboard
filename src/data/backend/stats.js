import express from "express";
import { pool } from "../createPool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usersConnection = await pool.getConnection();
    
    const [countUsers] = await usersConnection.query("SELECT Count(*) AS count FROM Utilisateurs");
    const [countCars] = await usersConnection.query("SELECT Count(*) AS count FROM Voitures");
    const [countReports] = await usersConnection.query("SELECT Count(*) AS count FROM Signalements");
    const [countTrajets] = await usersConnection.query("SELECT Count(*) AS count FROM trajets");
    const [reservations] = await usersConnection.query("SELECT Count(*) AS count FROM reservations");
    const [demandeVerif] = await usersConnection.query("SELECT Count(*) AS count FROM Utilisateurs where idCard IS NOT NULL AND est_certifie = 0");
    const [unvUsers] = await usersConnection.query("SELECT Count(*) AS count FROM Utilisateurs where est_certifie = 0");
    const [verUsers] = await usersConnection.query("SELECT Count(*) AS count FROM Utilisateurs where est_certifie = 1");
    const [avRating] = await usersConnection.query("SELECT AVG(total_rating) AS average_rating FROM Utilisateurs;");
    const [unvCars] = await usersConnection.query("SELECT Count(*) AS count FROM Voitures where voiture_est_certifie = 0");
    const [verCars] = await usersConnection.query("SELECT Count(*) AS count FROM Voitures where voiture_est_certifie = 1");

    
    usersConnection.release();
    
    const result = {
      users: countUsers[0].count,
      cars: countCars[0].count,
      reports: countReports[0].count,
      trajets: countTrajets[0].count,

      reservations: reservations[0].count,
      demandeVerif: demandeVerif[0].count,
      unvUsers: unvUsers[0].count,
      verUsers: verUsers[0].count,
      avRating: parseFloat(avRating[0].average_rating).toFixed(1),
      unvCars: unvCars[0].count,
      verCars: verCars[0].count,
    };

    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

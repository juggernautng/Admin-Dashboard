import express from "express";
import cors from "cors";

import getUsersRouter from "./backend/getUsers.js";
import statsRouter from "./backend/stats.js";
import trajetRouter from "./backend/trajets.js";
import verifyUsersRouter from "./backend/verifyUsers.js";
import getReportsRouter from "./backend/getReports.js";
import getCarsRouter from "./backend/getCars.js";
import verifyCarsRouter from "./backend/verifyCars.js";





const app = express();
const port = 3002;

app.use(cors({
  origin: "*" // Allow all origins
}));

app.use(express.json());

app.use("/api/getusers", getUsersRouter);
app.use("/api/stats", statsRouter);
app.use("/api/trajets", trajetRouter);
app.use("/api/verifyUsers", verifyUsersRouter);
app.use("/api/getReports", getReportsRouter);
app.use("/api/getCars", getCarsRouter);
app.use("/api/verifyCars", verifyCarsRouter);





app.listen(port, () => {
  console.log(`Server is running on http://192.168.1.107:${port}`);
});

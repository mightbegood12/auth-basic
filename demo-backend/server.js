import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import pool from "./config/postgresConfig.js";
import noteRouter from "./routers/noteRouter.js";

const app = express();
dotenv.config();

pool.on("connect", (client) => {
  client.query("SET search_path TO public");
});

pool
  .connect()
  .then(() => {
    console.log("Connected to supabase Postgres DB");
  })
  .catch((err) => {
    console.log("Error connecting the PostgresDB", err);
  });
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//routes
app.use("/api/user", userRouter);
app.use("/api/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(5000, () => {
  console.log("Listening to port 5000");
});

import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import client from "./config/postgresConfig.js";

const app = express();
dotenv.config();
client
  .connect()
  .then(() => {
    console.log("Connected to local Postgres DB");
  })
  .catch((err) => {
    console.log("Error connecting the PostgresDB", err);
  });
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(5000, () => {
  console.log("Listening to port 5000");
});

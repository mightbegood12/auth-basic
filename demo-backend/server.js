import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
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

import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import bodyParser from "body-parser";

const app = express();

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

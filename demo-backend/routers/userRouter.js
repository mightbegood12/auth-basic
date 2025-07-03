import express from "express";
import { signInUser } from "../controller/signInUser.js";

const userRouter = express.Router();

userRouter.post("/signin", signInUser);

export default userRouter;

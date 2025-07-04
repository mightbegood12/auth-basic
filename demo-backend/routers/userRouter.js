import express from "express";
import {
  signInUser,
  registerUser,
  getUserDetails,
} from "../controllers/userController.js";
import verifyJwtToken from "../middleware/verifyJwtToken.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/signin", signInUser);
userRouter.get("/getData", verifyJwtToken, getUserDetails);

export default userRouter;

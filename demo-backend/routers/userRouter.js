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
userRouter.get("/getDetails", verifyJwtToken, getUserDetails);
userRouter.get("/auth", verifyJwtToken, (req, res) => {
  res.json({ success: true, message: "Authorized", user: req.user });
});

export default userRouter;

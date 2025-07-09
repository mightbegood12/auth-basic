import express from "express";
import verifyJwtToken from "../middleware/verifyJwtToken.js";
import { createNewNote } from "../controllers/notesController.js";

const noteRouter = express.Router();

noteRouter.post("/createNote", verifyJwtToken, createNewNote);

export default noteRouter;

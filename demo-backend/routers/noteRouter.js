import express from "express";
import verifyJwtToken from "../middleware/verifyJwtToken.js";
import { createNewNote, fetchNotes } from "../controllers/notesController.js";

const noteRouter = express.Router();

noteRouter.post("/createNote", verifyJwtToken, createNewNote);
noteRouter.get("/fetchNotes", verifyJwtToken, fetchNotes);

export default noteRouter;

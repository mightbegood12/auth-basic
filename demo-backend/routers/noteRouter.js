import express from "express";
import verifyJwtToken from "../middleware/verifyJwtToken.js";
import {
  fetchNotes,
  fetchNoteById,
  deleteNoteById,
  createNewAndUpdateNote,
} from "../controllers/notesController.js";

const noteRouter = express.Router();

noteRouter.put("/createAndUpdateNote", verifyJwtToken, createNewAndUpdateNote);
noteRouter.get("/fetchNotes", verifyJwtToken, fetchNotes);
noteRouter.get("/fetchNoteById", verifyJwtToken, fetchNoteById);
noteRouter.delete("/deleteNote", verifyJwtToken, deleteNoteById);

export default noteRouter;

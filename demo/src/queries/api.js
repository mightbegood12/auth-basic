import { axiosInstance } from "./axiosInstance.js";
import { v4 as uuidv4 } from "uuid";

const createNewNote = async (note_title, note_content) => {
  const note_id = uuidv4();
  const response = await axiosInstance.put("/api/notes/createAndUpdateNote", {
    note_id: note_id,
    note_content,
    note_title,
  });
  // fetchAllNotes();
  return response.data;
};

const fetchAllNotes = async () => {
  const response = await axiosInstance.get("/api/notes/fetchNotes");
  return response.data;
  // Have to set all notes
  // if (response.data.success) {
  //   setAllNotes(response.data.notes);
  // }
};

const deleteNote = async (note_id) => {
  const response = await axiosInstance.delete("/api/notes/deleteNote", {
    params: {
      id: note_id,
    },
  });
  // fetchAllNotes();
  return response.data;
};

const updateNote = async (note_id, note_title, note_content) => {
  const response = await axiosInstance.put("/api/notes/createAndUpdateNote", {
    note_id: note_id,
    note_content,
    note_title,
  });
  // fetchAllNotes();
  return response.data;
};

const fetchNoteById = async (note_id) => {
  const response = await axiosInstance.get("/api/notes/fetchNoteById", {
    params: {
      id: note_id,
    },
  });
  return response.data;
};

export { fetchAllNotes, fetchNoteById, updateNote, deleteNote, createNewNote };

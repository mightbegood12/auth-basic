import { axiosInstance } from "./axiosInstance.js";
import { v4 as uuidv4 } from "uuid";

const createNewNote = async (note_title, note_content) => {
  const note_id = uuidv4();
  const response = await axiosInstance.put("/api/notes/createAndUpdateNote", {
    note_id: note_id,
    note_content,
    note_title,
  });
  return response.data;
};

const fetchAllNotes = async () => {
  const response = await axiosInstance.get("/api/notes/fetchNotes");
  return response.data;
};

const deleteNote = async (note_id) => {
  const response = await axiosInstance.delete("/api/notes/deleteNote", {
    params: {
      id: note_id,
    },
  });
  return response.data;
};

const updateNote = async (note_id, note_title, note_content) => {
  const response = await axiosInstance.put("/api/notes/createAndUpdateNote", {
    note_id: note_id,
    note_content,
    note_title,
  });
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

const getUserDetails = async () => {
  const response = await axiosInstance.get("/api/user/getDetails");
  return response.data;
};

const loginUser = async ({ email, password }) => {
  const response = await axiosInstance.post("/api/user/signin", {
    email,
    password,
  });
  return response.data;
};

const registerUser = async ({ name, email, password }) => {
  const response = await axiosInstance.post("/api/user/register", {
    name,
    email,
    password,
  });
  return response.data;
};

const authenticateUser = async () => {
  const response = await axiosInstance.get("/api/user/auth");
  return response.data;
};

export {
  fetchAllNotes,
  fetchNoteById,
  updateNote,
  deleteNote,
  createNewNote,
  getUserDetails,
  loginUser,
  registerUser,
  authenticateUser,
};

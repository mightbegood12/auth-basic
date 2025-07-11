import axios from "axios";
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { toast } from "sonner";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allNotes, setAllNotes] = useState([]);

  const createNewNote = async (note_title, note_content) => {
    const noteId = uuidv4();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/notes/createNote",
        {
          note_id: noteId,
          note_content,
          note_title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Note created successfully:", response.data);
      fetchAllNotes();
      return response.data; // Return the response data
    } catch (err) {
      console.error("Error creating note:", err.response?.data || err.message);
      throw err; // Re-throw so calling code can handle it
    }
  };
  const fetchAllNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:5000/api/notes/fetchNotes",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setAllNotes(response.data.notes);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        isLoading,
        allNotes,
        setIsLoading,
        createNewNote,
        fetchAllNotes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within App Provider");
  }
  return context;
};

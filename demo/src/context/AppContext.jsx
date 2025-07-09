import axios from "axios";
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { toast } from "sonner";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createNewNote = async ({ user_id }) => {
    const noteId = uuidv4();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/notes/createNote",
        { noteId, user_id }
      );
      console.log(response);
    } catch (err) {}
  };

  return (
    <AppContext.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        isLoading,
        setIsLoading,
        createNewNote,
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

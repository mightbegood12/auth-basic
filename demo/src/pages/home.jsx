import NotesSideBar from "../components/NotesSideBar";
import { NotesContainer } from "../components/NotesContainer";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { isAuthorized, fetchAllNotes } = useAppContext();
  useEffect(() => {
    if (isAuthorized) fetchAllNotes();
  }, []);

  return (
    <div className="home-container">
      <NotesSideBar />
      <NotesContainer />
    </div>
  );
};

export default Home;

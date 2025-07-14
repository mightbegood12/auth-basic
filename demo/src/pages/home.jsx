import NotesSideBar from "../components/NotesSideBar";
import { NotesContainer } from "../components/NotesContainer";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { fetchAllNotes } = useAppContext();

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <div className="home-container">
      <NotesSideBar />
      <NotesContainer />
    </div>
  );
};

export default Home;

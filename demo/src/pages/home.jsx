// import axios from "axios";
// import { useState } from "react";
import NotesSideBar from "../components/NotesSideBar";
import { NotesContainer } from "../components/NotesContainer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { noteId } = useParams();
  const { fetchAllNotes } = useAppContext();

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <div className="home-container">
      <NotesSideBar />
      <NotesContainer noteId={noteId} />
    </div>
  );
};

export default Home;

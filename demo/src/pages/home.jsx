import NotesSideBar from "../components/NotesSideBar";
import { NotesContainer } from "../components/NotesContainer";
import { useQuery } from "@tanstack/react-query";
import { fetchAllNotes } from "../queries/api";

const Home = () => {
  const fetchNotesQuery = useQuery({
    queryKey: ["allNotes"],
    queryFn: fetchAllNotes,
  });
  return (
    <div className="home-container">
      <NotesSideBar fetchNotesQuery={fetchNotesQuery} />
      <NotesContainer />
    </div>
  );
};

export default Home;

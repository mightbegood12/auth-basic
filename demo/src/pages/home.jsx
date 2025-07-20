import NotesSideBar from "../components/NotesSideBar";
import { NotesContainer } from "../components/NotesContainer";

const Home = () => {
  return (
    <div className="home-container">
      <NotesSideBar />
      <NotesContainer />
    </div>
  );
};

export default Home;

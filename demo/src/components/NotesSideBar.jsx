import { toast } from "sonner";
import { NotesLink } from "./NotesLink";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const NotesSideBar = () => {
  const { createNewNote, allNotes } = useAppContext();
  const navigate = useNavigate();
  const handleCreatingNote = async () => {
    try {
      toast.info("Creating a note for you!");
      const data = await createNewNote("Title", "Empty");
      navigate(`/notes/${data.note_id}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="recent-notes">
      <div className="heading">
        Recent Notes
        <img
          src="/new_item.png"
          alt="new note"
          onClick={handleCreatingNote}
          className="create-Btn"
        />
      </div>
      {allNotes.map((notes, index) => (
        <NotesLink
          id={notes.note_id}
          key={index}
          title={notes.note_title}
          content={notes.note_content.slice(0, 80)}
        />
      ))}
    </div>
  );
};

export default NotesSideBar;

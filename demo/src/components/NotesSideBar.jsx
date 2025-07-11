import { toast } from "sonner";
import { NotesLink } from "./NotesLink";
import { useAppContext } from "../context/AppContext";

const NotesSideBar = () => {
  const { createNewNote, allNotes } = useAppContext();
  const handleCreatingNote = async () => {
    try {
      toast.info("Creating a note for you!");
      createNewNote("Title", "Empty");
    } catch (e) {
      console.log(e.message);
    }
  };
  console.log(allNotes);

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
          content={notes.note_content}
        />
      ))}
    </div>
  );
};

export default NotesSideBar;

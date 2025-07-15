import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

export const NotesLink = ({ title, content, id }) => {
  const { deleteNote, allNotes } = useAppContext();
  const navigate = useNavigate();

  const handleDeleteNote = async () => {
    try {
      toast.info("Deleting note!");
      deleteNote(id);
      navigate(`/notes/${allNotes[0]?.note_id}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="notes-link-container">
      <NavLink to={`/notes/${id}`} className="notes-link">
        <div className="text-title">{title}</div>
        <div className="text-one-line">{content}</div>
      </NavLink>
      <div className="delete-btn">
        <img
          src="/delete_btn.png"
          alt="delete note"
          onClick={handleDeleteNote}
          className="delete-note"
        />
      </div>
    </div>
  );
};

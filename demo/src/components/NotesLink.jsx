import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../queries/api.js";

export const NotesLink = ({ title, content, id }) => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["allNotes"],
    queryFn: () => [],
    enabled: false,
  });
  const queryClient = useQueryClient();
  const handleDeleteNote = async () => {
    try {
      toast.info("Deleting note!");
      await deleteNote(id);
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
      navigate(`/notes/${data.notes[1]?.note_id}`);
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

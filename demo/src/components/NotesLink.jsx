import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote, fetchAllNotes } from "../queries/api.js";

export const NotesLink = ({ title, content, id }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      toast.success("Note");
      await queryClient.invalidateQueries({ queryKey: ["allNotes"] });
      const updatedData = await queryClient.ensureQueryData({
        queryKey: ["allNotes"],
        queryFn: fetchAllNotes,
      });
      toast.success("Note deleted!");
      const remainingNotes = updatedData.notes ?? [];
      if (remainingNotes.length > 0) {
        navigate(`/notes/${remainingNotes[0].note_id}`);
      } else {
        navigate("/notes/noteId");
      }
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleDeleteNote = async () => {
    mutation.mutate(id);
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

import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote, fetchAllNotes } from "../queries/api.js";
import { useCallback } from "react";
import filterMarkdownText from "../utils/filterMarkdownText.js";

export const NotesLink = ({ title, content, id }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const filteredContent = filterMarkdownText(content);
  // console.log(filteredContent);

  const { mutate: deleteNoteMutation } = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
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

  const handleDeleteNote = useCallback(() => {
    deleteNoteMutation(id);
  }, [deleteNoteMutation]);

  return (
    <div className="notes-link-container">
      <NavLink to={`/notes/${id}`} className="notes-link">
        <div className="text-title">{title}</div>
        <div className="text-one-line">{filteredContent}</div>
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

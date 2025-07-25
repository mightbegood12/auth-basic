import { toast } from "sonner";
import { NotesLink } from "./NotesLink";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewNote } from "../queries/api.js";
import SyncLoader from "react-spinners/SyncLoader";

const NotesSideBar = ({ fetchNotesQuery }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createNewNote,
    onSuccess: async (data) => {
      toast.success("Note created successfully!");
      navigate(`/notes/${data.note_id}`);
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
  const handleCreatingNote = async () => {
    try {
      mutation.mutate("Title", "Empty");
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
      {fetchNotesQuery.isPending ? (
        <SyncLoader color="#ffc90f" />
      ) : (
        (fetchNotesQuery.data?.notes ?? []).map((notes) => (
          <NotesLink
            id={notes.note_id}
            key={notes.note_id}
            title={notes.note_title}
            content={notes.note_content?.slice(0, 80) ?? ""}
          />
        ))
      )}
      {fetchNotesQuery.error && <div>Oops! Something went wrong!</div>}
    </div>
  );
};

export default NotesSideBar;

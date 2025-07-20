import { toast } from "sonner";
import { NotesLink } from "./NotesLink";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createNewNote, fetchAllNotes } from "../queries/api.js";
import SyncLoader from "react-spinners/SyncLoader";

const NotesSideBar = () => {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useSuspenseQuery({
    queryKey: ["allNotes"],
    queryFn: fetchAllNotes,
  });

  const navigate = useNavigate();
  const handleCreatingNote = async () => {
    try {
      toast.info("Creating a note for you!");
      const data = await createNewNote("Title", "Empty");
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
      await navigate(`/notes/${data.note_id}`);
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
      {isPending ? (
        <SyncLoader color="#ffc90f" />
      ) : (
        data?.notes.map((notes, index) => (
          <NotesLink
            id={notes.note_id}
            key={index}
            title={notes.note_title}
            content={notes.note_content.slice(0, 80)}
          />
        ))
      )}
      {error && <div>Oops! Something went wrong!</div>}
    </div>
  );
};

export default NotesSideBar;

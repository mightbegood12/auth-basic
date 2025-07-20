import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNoteById, updateNote } from "../queries/api";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SyncLoader from "react-spinners/SyncLoader";

export const NotesContainer = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const params = useParams();
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["noteData", params.noteId],
    queryFn: ({ queryKey }) => fetchNoteById(queryKey[1]),
  });

  useEffect(() => {
    if (data?.note) {
      const note = data.note;
      setTitle(note.note_title);
      setContent(note.note_content);
      const originalDate = new Date(note.updated_at);
      const curr_date = originalDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
      setDate(curr_date);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong!", error);
    }
  }, [error]);

  const handleUpdate = async () => {
    try {
      await updateNote(params.noteId, title, content);
      queryClient.invalidateQueries({ queryKey: ["noteData", params.noteId] });
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
      toast.info("Note updated!");
    } catch (e) {
      console.log("Something went wrong: ", e);
    }
  };

  return (
    <div className="note-view">
      <div className="heading">
        Note View
        <div className="sync-btn">
          <img
            src="/sync_icon.png"
            alt="save changes"
            onClick={handleUpdate}
            className="sync-note"
          />
          <div className="tooltip sync-tt">Sync Changes</div>
        </div>
      </div>{" "}
      {!isPending ? (
        <div className="notes-container">
          <input
            type="text"
            className="notes-title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <textarea
            name="content"
            className="notes-text"
            placeholder="Empty"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
      ) : (
        <div className="loading-container">
          <SyncLoader color="#ffc90f" />
        </div>
      )}
      <div className="time-stamp">Last updated at {date}</div>
    </div>
  );
};

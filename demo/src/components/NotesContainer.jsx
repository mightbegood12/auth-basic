import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

export const NotesContainer = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const params = useParams();
  const { updateNote, fetchNoteById } = useAppContext();

  const handlefetchNoteById = async (noteId) => {
    const data = await fetchNoteById(noteId);
    if (data) {
      const note = data.note;
      setTitle(note.note_title);
      setContent(note.note_content);
      const originalDate = new Date(note.updated_at);
      const curr_date = originalDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
      setDate(curr_date);
    } else {
      toast.error("Failed to load note.");
    }
  };
  const handleUpdate = async () => {
    try {
      await updateNote(params.noteId, title, content);
      toast.info("Note updated!");
      await handlefetchNoteById(params.noteId);
    } catch (e) {
      console.log("Something went wrong: ", e);
    }
  };

  useEffect(() => {
    if (params.noteId) handlefetchNoteById(params.noteId);
  }, [params.noteId]);

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
      </div>
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
        <div className="time-stamp">Last updated at {date}</div>
      </div>
    </div>
  );
};

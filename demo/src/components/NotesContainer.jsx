import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchNoteById, updateNote } from "../queries/api";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SyncLoader from "react-spinners/SyncLoader";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

export const NotesContainer = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const params = useParams();
  const queryClient = useQueryClient();
  const editorRef = useRef();

  const { data, isPending, error } = useQuery({
    queryKey: ["noteData", params.noteId],
    queryFn: ({ queryKey }) => fetchNoteById(queryKey[1]),
  });

  // Load note content when data arrives
  useEffect(() => {
    if (data?.note && editorRef.current) {
      const note = data.note;
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(note.note_content ?? ""); // ✅ set editor content
      setTitle(note.note_title);
      const originalDate = new Date(note.updated_at);
      const curr_date = originalDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
      setDate(curr_date);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong!");
    }
  }, [error]);

  const handleUpdate = async () => {
    try {
      const editorInstance = editorRef.current.getInstance();
      const newContent = editorInstance.getMarkdown(); // ✅ always pull fresh

      await updateNote(params.noteId, title, newContent);

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
          <div className="tooltip sync-tt">Save Changes</div>
        </div>
      </div>

      {isPending ? (
        <div className="loading-container">
          <SyncLoader color="#ffc90f" />
        </div>
      ) : (
        <div className="notes-container">
          <div className="notes-title-container">
            <input
              type="text"
              className="notes-title"
              placeholder="Title"
              value={title}
              maxLength={32}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="title-counter">
              {32 - title.length} charaters remaining.
            </div>
          </div>
          <div className="editor">
            <Editor
              key={params.noteId}
              initialValue={data.note.note_content ?? "Type here!"}
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              ref={editorRef}
              height="100%"
              usageStatistics={false}
              toolbarItems={[
                ["heading", "bold", "italic", "strike"],
                ["hr", "quote"],
                ["ul", "ol", "task"],
                ["table", "link"],
                ["code", "codeblock"],
              ]}
            />
          </div>
          <div className="time-stamp">Last updated at {date}</div>
        </div>
      )}
    </div>
  );
};

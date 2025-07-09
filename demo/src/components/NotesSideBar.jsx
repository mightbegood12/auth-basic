import { toast } from "sonner";

const handleCreatingNote = async () => {
  try {
    toast.info("Creating a note for you!");
  } catch (e) {
    console.log(e.message);
  }
};

const NotesSideBar = () => {
  return (
    <div className="recent-notes">
      <div className="heading">Recent Notes</div>
      {/* <NotesLink title="Title" content="Empty" />
      <NotesLink title="Title" content="Empty" />
      <NotesLink title="Title" content="Empty" />
      <NotesLink title="Title" content="Empty" />
      <NotesLink title="Title" content="Empty" />
      <NotesLink title="Title" content="Empty" />
      <NotesLink title="Title" content="Empty" />
      <NotesLink title="Title" content="Empty" /> */}
      <div className="note-btn-container">
        <div onClick={handleCreatingNote} className="create-Btn">
          Create New Note
        </div>
      </div>
    </div>
  );
};

export default NotesSideBar;

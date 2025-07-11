import axios from "axios";
import { useState } from "react";

export const NotesContainer = (noteId) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const fetchNoteById = async() =>{
  //   try{
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get()
  //   }
  // }
  return (
    <div className="note-view">
      <div className="heading">Note View</div>
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
    </div>
  );
};

import React from "react";
import { NavLink } from "react-router-dom";
import { NotesLink } from "./NotesLink";

const NotesSideBar = () => {
  return (
    <div className="recent-notes">
      <div className="heading">Recent Notes</div>
      <NotesLink />
      <NotesLink />
      <NotesLink />
      <NotesLink />
      <NotesLink />
      <NotesLink />
      <NotesLink />
      <NotesLink />
      <NotesLink />
      <NotesLink />
    </div>
  );
};

export default NotesSideBar;

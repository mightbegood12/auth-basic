import { NavLink } from "react-router-dom";

export const NotesLink = ({ title, content }) => {
  return (
    <NavLink to="/notes/:noteId" className="notes-link">
      <div className="text-title">{title}</div>
      <div className="text-one-line">{content}</div>
    </NavLink>
  );
};

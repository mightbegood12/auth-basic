import { NavLink } from "react-router-dom";

export const NotesLink = ({ title, content, id }) => {
  return (
    <NavLink to={`/notes/${id}`} className="notes-link">
      <div className="text-title">{title}</div>
      <div className="text-one-line">{content}</div>
    </NavLink>
  );
};

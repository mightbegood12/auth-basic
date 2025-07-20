import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const navigate = useNavigate();
  const { setIsAuthorized } = useAppContext();
  const { data } = useQuery({
    queryKey: ["allNotes"],
    queryFn: () => [],
    enabled: false,
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("User Logged out!");
    navigate("/login");
    setIsAuthorized(false);
  };
  return (
    <div className="navbar">
      <div className="round-nav"></div>
      <NavLink
        to={`/notes/${data?.notes[0] ? data?.notes[0].note_id : "noteId"}`}
        className="title-nav"
      >
        <img src="/notes_icon.png" alt="Profile" width="16px" height="16px" />
        {"    "}eNotes
      </NavLink>
      <div className="button-group">
        <NavLink className="nav-btn" to="/profile">
          <img src="/profile.png" alt="Profile" width="16px" height="16px" />
          <div className="tooltip profile-tt">Profile</div>
        </NavLink>
        <button className="nav-btn" onClick={handleLogout}>
          <img src="/logout.png" alt="Profile" width="16px" height="16px" />
          <div className="tooltip logout-tt">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

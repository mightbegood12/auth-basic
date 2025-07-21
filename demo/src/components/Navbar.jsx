import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllNotes } from "../queries/api";

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setIsAuthorized } = useAppContext();
  const { data: notesData } = useQuery({
    queryKey: ["allNotes"],
    queryFn: fetchAllNotes,
    staleTime: 1000 * 60,
    enabled: !!localStorage.getItem("token"),
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("User Logged out!");
    queryClient.clear();
    navigate("/login");
    setIsAuthorized(false);
  };

  return (
    <div className="navbar">
      <div className="round-nav"></div>
      <NavLink
        to={`/notes/${notesData?.notes?.[0]?.note_id || "noteId"}`}
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

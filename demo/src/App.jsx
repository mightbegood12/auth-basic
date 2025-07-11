import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppContext } from "./context/AppContext";
import { toast, Toaster } from "sonner";

function App() {
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized } = useAppContext();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("User Logged out!");
    navigate("/login");
    setIsAuthorized(false);
  };
  return (
    <>
      <Toaster position="top-center" richColors />
      {isAuthorized && (
        <div className="navbar">
          <div className="round-nav"></div>
          <NavLink to="/notes/:id" className="title-nav">
            eNotes
          </NavLink>
          <div className="button-group">
            <NavLink className="logout-btn" to="/profile">
              <img
                src="/profile.png"
                alt="Profile"
                width="16px"
                height="16px"
              />
              <div className="tooltip profile-tt">Profile</div>
            </NavLink>
            <button className="logout-btn" onClick={handleLogout}>
              <img src="/logout.png" alt="Profile" width="16px" height="16px" />
              <div className="tooltip logout-tt">Logout</div>
            </button>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/:noteId"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <div>404 Page not Found</div>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;

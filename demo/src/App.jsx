import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ProtectedRoute from "./components/ProtectedRoute";
import { DataView } from "./pages/dataView";
import { useAppContext } from "./context/AppContext";

function App() {
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized } = useAppContext();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsAuthorized(false);
  };
  return (
    <>
      {isAuthorized && (
        <div className="navbar">
          Demo Auth App <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data"
          element={
            <ProtectedRoute>
              <DataView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

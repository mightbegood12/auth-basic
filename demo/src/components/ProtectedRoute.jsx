import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const { isAuthorized, setIsAuthorized } = useAppContext();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/api/user/auth",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success) {
          setIsAuthorized(true);
          // console.log("Authenticated:", response.data);
        } else {
          setIsAuthorized(false);
        }
      } catch (e) {
        console.error("Authentication error:", e);
        setIsAuthorized(false);
      }
    };

    authenticateUser();
  }, [setIsAuthorized]);

  if (isAuthorized === null) {
    return (
      <div className="loading-screen">
        <PacmanLoader color="#ffb118" />
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

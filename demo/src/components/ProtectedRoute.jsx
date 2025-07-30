import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { authenticateUser } from "../queries/api";
import PacmanLoader from "react-spinners/PacmanLoader";

const ProtectedRoute = ({ children }) => {
  const { isAuthorized, setIsAuthorized } = useAppContext();
  useEffect(() => {
    const authorizeUser = async () => {
      try {
        const data = await authenticateUser();
        if (data?.success) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthorized(false);
      }
    };
    authorizeUser();
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

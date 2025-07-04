import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { useEffect } from "react";
const ProtectedRoute = ({ children }) => {
  const { isAuthorized, setIsAuthorized } = useAppContext();
  const authenticateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = axios.get("http://localhost:5000/api/user/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setIsAuthorized(response.data.success);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    authenticateUser();
  });
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div className="navbar">
        Demo Auth App <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="home-container">
        <div>You are in Home Page</div>
      </div>
    </>
  );
};

export default Home;

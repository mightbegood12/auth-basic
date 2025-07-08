import axios from "axios";
import { useState } from "react";
import NotesSideBar from "../components/NotesSideBar";
import { NotesContainer } from "../components/NotesContainer";

const Home = () => {
  const [fetchedData, setFetchedData] = useState("");
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://localhost:5000/api/user/getData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setFetchedData(response.data.details);
      } else {
        setFetchedData("Unauthorized!");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="home-container">
        <NotesSideBar />
        <NotesContainer />
      </div>
    </>
  );
};

export default Home;

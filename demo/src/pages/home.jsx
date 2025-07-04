import axios from "axios";
import { useState } from "react";

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
        <div>You are in Home Page</div>
        <button onClick={fetchData}>Click here to see data</button>
        {fetchedData && <div>{fetchedData}</div>}
      </div>
    </>
  );
};

export default Home;

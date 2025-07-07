import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationError, setAuthenticationError] = useState(false);
  const { setIsAuthorized } = useAppContext();
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signin",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setIsAuthorized(true);
        navigate("/");
      } else {
        setAuthenticationError(true);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <form
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
        className="form"
      >
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type="submit" value="Login" />
      </form>
      {authenticationError && <div className="warning">Wrong credentials!</div>}
    </div>
  );
};

export default Login;

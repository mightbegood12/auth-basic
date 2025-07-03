import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000" + "/api/user/signin"
    );
    if (response.data.success) {
      navigate("/home");
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;

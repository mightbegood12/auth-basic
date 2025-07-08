import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSigned, setIsSigned] = useState("Sign Up");
  const [authenticationError, setAuthenticationError] = useState(false);
  const { setIsAuthorized, isLoading, setIsLoading } = useAppContext();
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isSigned === "Login" && email !== "") {
        setIsLoading(true);
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
          setIsLoading(false);
        } else {
          setAuthenticationError(true);
          localStorage.removeItem("token");
          setIsLoading(false);
        }
      } else if (isSigned === "Sign Up" && name !== "") {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/user/register",
          {
            name: name,
            email: email,
            password: password,
          }
        );
        if (response.data.success) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          setIsAuthorized(true);
          navigate("/");
          setIsLoading(false);
        } else {
          setAuthenticationError(true);
          setIsLoading(false);
          localStorage.removeItem("token");
        }
      } else {
        setAuthenticationError(true);
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
        {isSigned !== "Sign Up" ? (
          ""
        ) : (
          <>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
            />
          </>
        )}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input type="submit" value={isLoading ? "Loading.." : isSigned} />
        {isSigned === "Sign Up" ? (
          <div className="change-login" onClick={() => setIsSigned("Login")}>
            Already a User?
          </div>
        ) : (
          <div className="change-login" onClick={() => setIsSigned("Sign Up")}>
            New User? Create an account
          </div>
        )}
      </form>
      {authenticationError && <div className="warning">Wrong credentials!</div>}
    </div>
  );
};

export default Login;

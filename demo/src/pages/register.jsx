import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewNote, registerUser } from "../queries/api";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthorized } = useAppContext();
  const queryClient = useQueryClient();

  //Creating new note
  const createNewNotemutation = useMutation({
    mutationFn: createNewNote,
    onSuccess: async (data) => {
      toast.success("Note created successfully!");
      navigate(`/notes/${data.note_id}`);
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        setIsAuthorized(true);
        toast.success("User registered successfully!");
        createNewNotemutation.mutate("Title");
      } else {
        toast.error("Registration failed.");
      }
    },
    onError: () => {
      toast.error("Registration error. Try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name, email, password });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form">
        <label>Name</label>
        <input
          type="text"
          className="login-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <label>Email</label>
        <input
          type="email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <label>Password</label>
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="submit"
          value={mutation.isPending ? "Registering..." : "Sign Up"}
        />
        <div className="change-login" onClick={() => navigate("/login")}>
          Already a user? Login here
        </div>
      </form>
    </div>
  );
};

export default Register;

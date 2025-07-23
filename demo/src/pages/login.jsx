import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllNotes, loginUser } from "../queries/api";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthorized } = useAppContext();
  const queryClient = useQueryClient();

  //login function
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        setIsAuthorized(true);
        toast.success("Login successful!");
        const notesData = await queryClient.fetchQuery({
          queryKey: ["allNotes"],
          queryFn: fetchAllNotes,
        });
        const firstNoteId = notesData?.notes?.[0]?.note_id;

        if (firstNoteId) {
          navigate(`/notes/${firstNoteId}`);
        } else {
          navigate("/notes/noteId");
        }
      } else {
        toast.error("Login failed.");
      }
    },
    onError: () => {
      toast.error("Login failed. Check credentials.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form">
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
          value={mutation.isPending ? "Logging in..." : "Login"}
        />
        <div className="change-login" onClick={() => navigate("/register")}>
          New User? Create an account
        </div>
      </form>
    </div>
  );
};

export default Login;

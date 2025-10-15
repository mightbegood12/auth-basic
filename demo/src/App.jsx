import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import { useAppContext } from "./context/AppContext";
import Register from "./pages/register";
import AudioView from "./pages/audioView";
import { Route, Routes } from "react-router-dom";
import RootRedirect from "./components/RootRedirect";

function App() {
  const { isAuthorized } = useAppContext();
  return (
    <>
      <Toaster position="top-center" richColors duration={1000} />
      {isAuthorized && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/:noteId"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RootRedirect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audio"
          element={
            <ProtectedRoute>
              <AudioView />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <div>404 Page not Found</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

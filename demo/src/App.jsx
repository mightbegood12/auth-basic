import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

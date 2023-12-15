import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import { TOKEN_KEY } from "../constant/localStorageKey";
import Layout from "./layout";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentToken = localStorage.getItem(TOKEN_KEY);
    const isHomePage = location.pathname === "/";
    if (!currentToken) {
      if (location.pathname === "/login") {
        navigate("/login");
      } else {
        navigate("/register");
      }
    } else if (currentToken && isHomePage) {
      navigate("/home");
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Layout />} />
    </Routes>
  );
}

export default App;

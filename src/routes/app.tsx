import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Layout from "./layout";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // 判断是否登录，没有登录跳转到登录页
  // 判断在登录页是否已登录，已登录则跳转主页
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isHomePage = location.pathname === "/";
    if (!token) {
      navigate("/login");
    } else if (token && isHomePage) {
      navigate("/home");
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/login" element={<SignUp />} />
      <Route path="*" element={<Layout />} />
    </Routes>
  );
}

export default App;

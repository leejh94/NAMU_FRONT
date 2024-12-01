// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useGlobalState } from "./context/GlobalStateContext";
import LoadingSpinner from "./components/LoadingSpinner";
import Layout from "./layout/Layout";
import Main from "./pages/Main";
import Search from "./pages/Search/Search";
import Stats from "./pages/Stats/Stats";
import Board from "./pages/Board/Board";
import Board2 from "./pages/Board/Board2";
import BoardAdd from "./pages/Board/BoardAdd";
import HelpInfo from "./pages/HelpInfo/HelpInfo";
import HelpInfoAdmin from "./pages/HelpInfo/HelpInfoAdmin";
import Login from "./pages/Login/Login";
import KakaoRedirect from "./pages/Login/KakaoRedirect";
import Cookies from "js-cookie";
import "./App.scss";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function App() {
  const { updateGlobalState } = useGlobalState();

  useEffect(() => {
    // 새로고침 시 쿠키나 localStorage를 통해 전역 상태 복구
    const jwtToken = Cookies.get("jwt");
    const nickName = localStorage.getItem("nickName");
    const role = localStorage.getItem("role");

    if (jwtToken) {
      updateGlobalState("isLoggedIn", true);
      updateGlobalState("nickName", nickName || "");
      updateGlobalState("role", role || "");
    }
  }, []);

  return (
    <Router>
      <Layout>
        <LoadingSpinner />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/helpInfo" element={<HelpInfo />} />
          <Route path="/helpInfoAdmin" element={<HelpInfoAdmin />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board2" element={<Board2 />} />
          <Route path="/boardAdd" element={<BoardAdd />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/login/callback" element={<KakaoRedirect />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

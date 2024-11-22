// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalStateProvider } from "./context/GlobalStateContext"; // 전역변수
import LoadingSpinner from "./components/LoadingSpinner"; // 로딩스피너
import Layout from "./layout/Layout";
import Main from "./pages/Main";
import Search from "./pages/Search/Search";
import Stats from "./pages/Stats/Stats";
import Stats2 from "./pages/Stats/Stats2";
import Board from "./pages/Board/Board";
import HelpInfo from "./pages/HelpInfo/HelpInfo";
import Login from "./pages/Login/Login";
import KakaoRedirect from "./pages/Login/KakaoRedirect";
import "./App.scss"; // SCSS 파일 import
import "primereact/resources/themes/saga-blue/theme.css"; // 테마 CSS
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // 아이콘 CSS
import "primeflex/primeflex.css"; // PrimeFlex 유틸리티 CSS

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Layout>
          <LoadingSpinner />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/stats" element={<Stats />} />
            {/* <Route path="/Stats2" element={<Stats2 />} /> */}
            <Route path="/helpInfo" element={<HelpInfo />} />
            <Route path="/board" element={<Board />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/login/callback" element={<KakaoRedirect />} />
          </Routes>
        </Layout>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;

// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Main from "./pages/Main";
import Search from "./pages/Search/Search"; // Search 페이지 import
import Stats from "./pages/Stats/Stats"; // Stats 페이지 import
import Stats2 from "./pages/Stats/Stats2"; // Stats 페이지 import
import Info from "./pages/Info"; // Search 페이지 import
import "./App.scss"; // SCSS 파일 import
import "primereact/resources/themes/saga-blue/theme.css"; // 테마 CSS
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // 아이콘 CSS
import "primeflex/primeflex.css"; // PrimeFlex 유틸리티 CSS (선택 사항)

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/Stats" element={<Stats />} />
          <Route path="/Stats2" element={<Stats2 />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

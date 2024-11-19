import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./Header.scss";

function Header() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const location = useLocation(); // 현재 경로를 얻기 위해 useLocation 사용

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          <img src={require("../assets/logo.png")} alt="로고" />
        </Link>
      </div>

      {/* 큰 화면에서만 보이는 네비게이션 */}
      <nav className="header__nav header__nav--large">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          홈
        </Link>
        <Link
          to="/search"
          className={location.pathname === "/search" ? "active" : ""}
        >
          프랜차이즈 검색
        </Link>
        <Link
          to="/stats"
          className={location.pathname === "/stats" ? "active" : ""}
        >
          프랜차이즈 통계
        </Link>
        <Link
          to="/info"
          className={location.pathname === "/info" ? "active" : ""}
        >
          사이트 소개
        </Link>
        <Link
          to="/login"
          className={location.pathname === "/login" ? "active" : ""}
        >
          로그인
        </Link>
      </nav>

      {/* 작은 화면에서만 보이는 커스텀 햄버거 버튼 */}
      <Button
        type="button"
        onClick={() => setIsSidebarVisible(true)}
        icon="pi pi-bars"
        // rounded
        outlined
        className="header__menu-toggle"
      ></Button>

      {/* Sidebar로 작은 화면에서 표시될 네비게이션 */}
      <Sidebar
        visible={isSidebarVisible}
        onHide={() => setIsSidebarVisible(false)}
        position="right"
        className="sidebar"
      >
        <div className="sidebar__header">
          <img
            src={require("../assets/logo.png")}
            alt="로고"
            className="logo"
          />
          <div className="description">당신의 프랜차이즈 정보를 한눈에</div>
        </div>

        <nav className="sidebar__nav">
          <Link
            to="/"
            onClick={() => setIsSidebarVisible(false)}
            className={location.pathname === "/" ? "active" : ""}
          >
            <span className="icon pi pi-home"></span> 홈
          </Link>
          <Link
            to="/search"
            onClick={() => setIsSidebarVisible(false)}
            className={location.pathname === "/search" ? "active" : ""}
          >
            <span className="icon pi pi-search"></span> 프랜차이즈 검색
          </Link>
          <Link
            to="/stats"
            onClick={() => setIsSidebarVisible(false)}
            className={location.pathname === "/stats" ? "active" : ""}
          >
            <span className="icon pi pi-chart-bar"></span> 프랜차이즈 통계
          </Link>
          <Link
            to="/info"
            onClick={() => setIsSidebarVisible(false)}
            className={location.pathname === "/info" ? "active" : ""}
          >
            <span className="icon pi pi-info-circle"></span> 사이트 소개
          </Link>
          <Link
            to="/login"
            onClick={() => setIsSidebarVisible(false)}
            className={location.pathname === "/login" ? "active" : ""}
          >
            <span className="icon pi pi-info-circle"></span> 로그인
          </Link>
        </nav>
      </Sidebar>
    </header>
  );
}

export default Header;

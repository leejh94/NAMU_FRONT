import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useGlobalState } from "../context/GlobalStateContext";
import Cookies from "js-cookie"; // 쿠키 관리 라이브러리
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./Header2.scss";

function Header() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // 사이드바 상태
  const { globalState, updateGlobalState } = useGlobalState(); // 글로벌 상태 및 업데이트 함수
  const location = useLocation(); // 현재 경로를 얻기 위해 useLocation 사용

  const handleLogout = () => {
    // JWT 토큰 쿠키 삭제
    Cookies.remove("jwt"); // 쿠키 이름에 따라 삭제
    // 로그아웃 시 글로벌 상태 초기화
    updateGlobalState("isLoggedIn", false);
    updateGlobalState("nickName", "");
  };

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
          <span className="icon pi pi-home"></span>
        </Link>
        <Link
          to="/search"
          className={location.pathname === "/search" ? "active" : ""}
        >
          <span className="icon pi pi-search"></span>
        </Link>
        <Link
          to="/stats"
          className={location.pathname === "/stats" ? "active" : ""}
        >
          <span className="icon pi pi-chart-bar"></span>
        </Link>
        <span
          className="header__menu-toggle icon pi pi-bars"
          onClick={() => setIsSidebarVisible(true)}
        ></span>
      </nav>

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
          {/* 사이드바에서도 로그인 여부에 따라 표시 */}
          {globalState.isLoggedIn ? (
            <Link
              onClick={() => {
                setIsSidebarVisible(false);
                handleLogout();
              }}
            >
              <span className="icon pi pi-sign-out"></span> 로그아웃
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsSidebarVisible(false)}
              className={location.pathname === "/login" ? "active" : ""}
            >
              <span className="icon pi pi-sign-in"></span> 로그인
            </Link>
          )}
        </nav>
      </Sidebar>
    </header>
  );
}

export default Header;

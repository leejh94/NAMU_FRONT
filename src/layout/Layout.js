// src/layout/Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.scss"; // SCSS 파일 import

function Layout({ children }) {
  return (
    <div className="layout custom-scrollbar">
      <div className="layout__header">
        <Header />
      </div>
      <main className="layout__content">{children}</main>
      <div className="layout__footer">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;

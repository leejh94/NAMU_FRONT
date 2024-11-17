// src/layout/Footer.js
import React from "react";
import "./Footer.scss"; // SCSS 파일 import

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__info">
        <p>대표자 : LeeJaeHoon</p>
        <p>주소 : 서울특별시 은평구 역촌동</p>
      </div>
      <div className="footer__contact">
        <p>고객센터: 010.8791.1614</p>
      </div>
    </footer>
  );
}

export default Footer;

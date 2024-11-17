// src/pages/Main.js
import React from "react";
import "./Info.scss";
import firstImage from "../assets/ani_01.gif";

function Info() {
  return (
    <div className="info-page">
      <div className="info-text">
        <span>프랜차이즈 정보를 모아 볼 수 있는 사이트 입니다.</span>
        <br />
        <span>현재 버그 및 미개발 기능이 많으며, 배포 테스트 중 입니다.</span>
      </div>
    </div>
  );
}

export default Info;

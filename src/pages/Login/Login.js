// src/pages/Login/Login.js
import React from "react";
import "./Login.scss";
import kakaoLoginImage from "../../assets/kakao_login_large_wide.png";

function Login() {
  // 환경별 redirect_uri 설정
  // npm start = development / npm run build = production
  const redirectUri =
    process.env.NODE_ENV === "production"
      ? "http://jaehoon.site/api/auth/login/callback" // 배포 환경
      : "http://localhost:3000/api/auth/login/callback"; // 로컬 환경

  const onKakaoLoginClick = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=3a7e59018561c06437688195b7fb9377&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h4>로그인</h4>
        <div className="login-item">
          <img
            src={kakaoLoginImage}
            alt="카카오 로그인 이미지"
            onClick={onKakaoLoginClick}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;

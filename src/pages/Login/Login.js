// src/pages/Login/Login.js
import React from "react";
import "./Login.scss";
import kakaoLoginImage from "../../assets/kakao_login_large_wide.png";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const { handleKakaoLogin } = useLogin();

  const onKakaoLoginClick = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=3a7e59018561c06437688195b7fb9377&redirect_uri=http://localhost:3000/auth/login/callback&response_type=code`;
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

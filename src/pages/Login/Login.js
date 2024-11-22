// // src/pages/Login/Login.js
import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./Login.scss";
import kakaoLoginImage from "../../assets/kakao_login_large_wide.png";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });
  const { handleAdminLogin } = useLogin();

  const redirectUri =
    process.env.NODE_ENV === "production"
      ? "http://jaehoon.site/auth/login/callback"
      : "http://localhost:3000/auth/login/callback";

  const onKakaoLoginClick = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=3a7e59018561c06437688195b7fb9377&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  const items = [
    { label: "일반회원", icon: "pi pi-user" },
    { label: "관리자", icon: "pi pi-lock" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials({ ...adminCredentials, [name]: value });
  };

  const onAdminLoginClick = () => {
    const { username, password } = adminCredentials;
    handleAdminLogin(username, password);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />
        {activeIndex === 0 ? (
          <div className="login-item">
            <img
              src={kakaoLoginImage}
              alt="카카오 로그인 이미지"
              onClick={onKakaoLoginClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        ) : (
          <div className="admin-login-form">
            <div className="p-inputgroup">
              <InputText
                type="text"
                placeholder="아이디"
                name="username"
                value={adminCredentials.username}
                onChange={handleInputChange}
                className="admin-input"
              />
            </div>
            <div className="p-inputgroup">
              <InputText
                type="password"
                placeholder="비밀번호"
                name="password"
                value={adminCredentials.password}
                onChange={handleInputChange}
                className="admin-input"
              />
            </div>
            <Button
              label="로그인"
              icon="pi pi-sign-in"
              className="login-button"
              onClick={onAdminLoginClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

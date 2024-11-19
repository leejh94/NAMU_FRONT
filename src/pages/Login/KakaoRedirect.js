// src/pages/Login/KakaoRedirect.js
import React, { useEffect, useCallback } from "react";
import { useLogin } from "../../hooks/useLogin";

function KakaoRedirect() {
  const { handleKakaoLogin } = useLogin();

  // useCallback으로 handleKakaoLogin의 종속성 관리
  const processLogin = useCallback(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    console.log(code);

    if (code) {
      handleKakaoLogin(code);
    }
  }, [handleKakaoLogin]);

  // useEffect 실행을 한 번만 제한
  useEffect(() => {
    processLogin();
  }, [processLogin]);

  return <div>로그인 처리 중...</div>;
}

export default KakaoRedirect;

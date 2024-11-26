// src/hooks/useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authLogin, adminLogin, roleCheck } from "../service/loginApi";
import { useGlobalState } from "../context/GlobalStateContext";
import Cookies from "js-cookie"; // 쿠키 관리 라이브러리

export function useLogin() {
  const navigate = useNavigate();
  const { updateGlobalState } = useGlobalState(); // 글로벌 상태 업데이트 함수
  // let isProcessing = false; // API 중복 호출 방지 플래그

  const [isProcessing, setIsProcessing] = useState(false);

  const handleKakaoLogin = async (code) => {
    if (isProcessing) return; // 이미 처리 중이면 함수 종료
    setIsProcessing(true);

    try {
      updateGlobalState("isLoading", true);
      const data = await authLogin("kakao", code);

      if (data.code === 200) {
        // 로그인 성공: 글로벌 상태 업데이트
        updateGlobalState("isLoggedIn", true);
        updateGlobalState("nickName", data.data.nickname);
        updateGlobalState("role", data.data.role);

        // 쿠키에 jwt 토큰 저장 (1시간)
        const jwtToken = data.data.jwtToken;
        Cookies.set("jwt", jwtToken, {
          expires: 1 / 24,
        });

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("nickName", data.data.nickname);
        localStorage.setItem("role", data.data.role);

        // 로그인 성공 시 페이지 이동
        navigate("/");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/"); // 실패 시에도 홈으로 이동
      }
    } catch (error) {
      console.error("로그인 처리 중 오류 발생:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      // isProcessing = false; // 요청 완료 후 플래그 초기화
      updateGlobalState("isLoading", false);
    }
  };

  const handleAdminLogin = async (username, password) => {
    if (isProcessing) return; // 이미 처리 중이면 함수 종료

    try {
      setIsProcessing(true);
      const data = await adminLogin(username, password);

      if (data.code === 200) {
        // 로그인 성공: 글로벌 상태 업데이트
        updateGlobalState("isLoggedIn", true);
        updateGlobalState("nickName", data.data.nickname);
        updateGlobalState("role", data.data.role);

        // 쿠키에 jwt 토큰 저장 (1시간)
        const jwtToken = data.data.jwtToken;
        Cookies.set("jwt", jwtToken, {
          expires: 1 / 24,
        });

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("nickName", data.data.nickname);
        localStorage.setItem("role", data.data.role);

        navigate("/");
      } else {
        alert("관리자 로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("관리자 로그인 처리 중 오류 발생:", error);
      alert("관리자 로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      // isProcessing = false; // 요청 완료 후 플래그 초기화
      setIsProcessing(false);
    }
  };

  const adminCheck = async () => {
    try {
      setIsProcessing(true);
      const data = await roleCheck();
      if (data.data === "ADMIN" || data.data === "MASTER") {
        alert("관리자 권한 확인 완료.");
      } else {
        alert("관리자 권한이 없습니다. 메인 페이지로 돌아갑니다.");
        navigate("/");
      }
    } catch (error) {
      console.error("관리자 페이지 진입 오류 :", error);
      alert("관리자 페이지 진입 오류. 메인 페이지로 돌아갑니다.");
      navigate("/");
    } finally {
      setIsProcessing(false);
    }
  };

  return { handleKakaoLogin, handleAdminLogin, adminCheck };
}

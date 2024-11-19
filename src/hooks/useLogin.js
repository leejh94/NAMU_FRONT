// src/hooks/useLogin.js
import { useNavigate } from "react-router-dom";
import apiClient from "../service/axiosConfig";

export function useLogin() {
  const navigate = useNavigate();
  let isProcessing = false; // API 중복 호출 방지 플래그

  const handleKakaoLogin = async (code) => {
    if (isProcessing) return; // 이미 처리 중이면 함수 종료
    isProcessing = true;

    try {
      const response = await apiClient.post("/auth/oauth/login", {
        provider: "kakao",
        code,
      });
      console.log(response.data);

      if (response.data.code === 200) {
        // 로그인 성공 시 페이지 이동
        navigate("/");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/"); // 실패 시에도 홈으로 이동 (필요 시 수정 가능)
      }
    } catch (error) {
      console.error("로그인 처리 중 오류 발생:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      isProcessing = false; // 요청 완료 후 플래그 초기화
    }
  };

  return { handleKakaoLogin };
}

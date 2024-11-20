// src/service/loginApi.js
import { apiClient } from "./axiosConfig";

export const authLogin = async (provider, code) => {
  try {
    const response = await apiClient.post("/auth/oauth/login", {
      provider,
      code,
    });
    return response.data; // 서버로부터 응답 데이터를 반환
  } catch (error) {
    console.error("OAuth 로그인 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

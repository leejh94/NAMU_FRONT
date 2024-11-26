// src/service/loginApi.js
import { apiClient, authApiClient } from "./axiosConfig";

// 일반 회원 OAuth 로그인 API
export const authLogin = async (provider, code) => {
  try {
    const response = await apiClient.post("/auth/oauth/login", {
      provider,
      code,
    });
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("OAuth 로그인 API 호출 오류:", error);
    throw error; // 오류 처리 위임
  }
};

// 관리자 로그인 API
export const adminLogin = async (username, password) => {
  try {
    const response = await apiClient.post("/auth/admin/login", {
      username,
      password,
    });
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("관리자 로그인 API 호출 오류:", error);
    throw error; // 오류 처리 위임
  }
};

// 권한 확인 API 호출
export const roleCheck = async () => {
  try {
    const response = await authApiClient.get("/auth/roleCheck");
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("권한 확인 API 호출 오류:", error);
    throw error;
  }
};

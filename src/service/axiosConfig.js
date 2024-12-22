// src/service/axiosConfig.js
import axios from "axios";

// 공통 설정
const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://jaehoon.site/api" // 배포용 URL
    : "http://localhost:8080/api"; // 로컬용 URL

// 비회원용 API 클라이언트
const apiClient = axios.create({
  baseURL, // 공통 URL 사용
  timeout: 50000, // 요청 제한 시간 설정 50초
  headers: {
    "Content-Type": "application/json", // JSON 요청을 위한 기본 Content-Type
  },
});

// 회원용 API 클라이언트
const authApiClient = axios.create({
  baseURL, // 공통 URL 사용
  timeout: 50000, // 요청 제한 시간 설정 50초
  headers: {
    "Content-Type": "application/json", // JSON 요청을 위한 기본 Content-Type
  },
});

// 쿠키에서 JWT 토큰 가져오기 함수
const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : null;
};

// 회원 - 요청 전 인터셉터 설정
authApiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("jwt"); // 쿠키에서 JWT 토큰 가져오기
    if (!token) {
      // JWT 토큰이 없을 경우 /login으로 리다이렉트
      window.location.href = "/login";
      alert("로그인이 필요합니다.");
      return Promise.reject(
        new Error("JWT 토큰이 없습니다. 로그인 페이지로 이동합니다.")
      );
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 회원 - 응답 후 인터셉터 설정
authApiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// 비회원 - 요청 전 인터셉터 설정
apiClient.interceptors.request.use(
  (config) => {
    // 요청 전 로직
    return config;
  },
  (error) => Promise.reject(error)
);

// 비회원 - 응답 후 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export { apiClient, authApiClient };

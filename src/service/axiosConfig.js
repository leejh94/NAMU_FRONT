// src/service/axiosConfig.js
import axios from "axios";

// 로컬용
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // API의 기본 URL
  timeout: 5000, // 요청 제한 시간 설정
});

// 배포용;
// const apiClient = axios.create({
//   baseURL: "http://jaehoon.site/api", // API의 기본 URL
//   timeout: 5000, // 요청 제한 시간 설정
// });

// 요청 전 인터셉터 설정
apiClient.interceptors.request.use(
  (config) => {
    // 요청 전 로직
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 후 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiClient;

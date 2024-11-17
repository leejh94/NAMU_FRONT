// src/service/api.js
import axios from "axios";

// 회사명 목록을 가져오는 API 호출 함수
export const getCompanyNameList = async (searchType, searchWord) => {
  try {
    const response = await axios.get("/api/companyNameList", {
      params: {
        searchType,
        searchWord,
      },
    });
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

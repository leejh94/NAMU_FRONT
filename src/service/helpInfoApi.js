// src/service/helpInfoApi.js
import { apiClient, authApiClient } from "./axiosConfig";

// 유용한 사이트 목록 가져오기
export const getInfoSiteList = async (searchType, searchWord) => {
  try {
    const response = await apiClient.get("/helpInfo/infoSiteList");
    console.log(response.data.data);
    return response.data.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("검색 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

// 사이트 추가
export const siteAdd = async (img, link, title, description) => {
  try {
    const response = await authApiClient.post("/helpInfo/siteAdd", {
      img,
      link,
      title,
      description,
    });

    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("사이트 추가 API 호출 오류:", error);
    throw error;
  }
};

// 유용한 사이트 삭제
export const siteDelete = async (id) => {
  try {
    const response = await apiClient.get("/helpInfo/deleteSiteInfo");
    console.log(response.data.data);
    return response.data.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("검색 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

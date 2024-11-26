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
    const response = await authApiClient.post("/helpInfo/siteInfoAdd", {
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
export const siteDelete = async (siteInfoId) => {
  try {
    console.log(siteInfoId);
    const response = await authApiClient.delete("/helpInfo/deleteSiteInfo", {
      params: {
        siteInfoId,
      },
    });
    console.log(response.data);
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("검색 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};
// 유용한 사이트 목록 순서 변경
export const siteNewOrderSave = async (siteList) => {
  try {
    console.log(siteList);
    const response = await authApiClient.post(
      "/helpInfo/saveSiteNewOrder",
      siteList
    );
    console.log(response);
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

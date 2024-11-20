// src/service/statsApi.js
import { apiClient } from "./axiosConfig";

// 통계 페이지에서 사용 매출 상위 가게 정보
export const getTopStoresBySales = async (region, industry, limit) => {
  try {
    const response = await apiClient.get("/common/topStoresBySales", {
      params: {
        region,
        industry,
        limit,
      },
    });
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("매출정보 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

// 통계 페이지에서 사용 업종별 매출 평균 및 신규 오픈매장 수 (15개)
export const getIndustryAvgSalesInfo = async (region) => {
  try {
    const response = await apiClient.get("/common/industryAvgSalesInfo", {
      params: {
        region,
      },
    });
    console.log(response.data.data);
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

// 통계 페이지에서 사용 가맹 부담금이 가장 낮고 월평균 매출이 있는 매장 목록
export const getLowestFranchiseFeeStores = async (region, industry, limit) => {
  try {
    const response = await apiClient.get("/common/lowestFranchiseFeeStores", {
      params: {
        region,
        industry,
        limit,
      },
    });
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("매출정보 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

export const getIndustryNewOpeningsCount = async () => {
  try {
    const response = await apiClient.get("/common/industryNewOpeningsCount", {
      params: {},
    });
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("매출정보 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

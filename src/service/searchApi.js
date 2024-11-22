// src/service/searchApi.js
import { apiClient } from "./axiosConfig";

// 회사명 목록을 가져오는 API 호출 함수
export const getCompanyNameList = async (searchType, searchWord) => {
  try {
    const response = await apiClient.get("/search/companyNameList", {
      params: {
        searchType,
        searchWord,
      },
    });
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("검색 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

export const getCompanyBasicInfo = async (companyNo) => {
  try {
    const response = await apiClient.get("/search/companyBasicInfo", {
      params: {
        companyNo,
      },
    });
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("브랜드정보 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

export const getCompanySalesInfo = async (companyNo, region) => {
  try {
    const response = await apiClient.get("/search/companySalesInfo", {
      params: {
        companyNo,
        region,
      },
    });
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("매출정보 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

export const getCompanyRegionTotalCount = async (companyNo) => {
  try {
    const response = await apiClient.get("/search/companyRegionTotalCount", {
      params: {
        companyNo,
      },
    });
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("매출정보 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

export const getFranchiseFee = async (companyNo) => {
  try {
    const response = await apiClient.get("/search/franchiseFee", {
      params: {
        companyNo,
      },
    });
    return response.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("매출정보 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

export const getNaverNewsList = async (companyNo, count) => {
  try {
    // API 호출
    const response = await apiClient.get("/search/naverNewsList", {
      params: {
        companyNo, // 회사고유번호
        count, // 반환할 데이터 개수
      },
    });
    console.log(response.data.data);
    return response.data.data; // 서버로부터의 응답 데이터 반환
  } catch (error) {
    console.error("네이버 뉴스 API 호출 오류:", error);
    throw error; // 호출하는 곳에서 오류 처리할 수 있도록 오류 던지기
  }
};

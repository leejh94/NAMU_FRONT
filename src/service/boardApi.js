// src/service/boardhApi.js
import { apiClient, authApiClient } from "./axiosConfig";

// 게시글 목록 가져오기
export const getPosts = async (channelId, sortType, page, limit) => {
  try {
    const response = await apiClient.get("/board/list", {
      params: {
        channelId,
        sortType,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시글 목록 API 호출 오류:", error);
    throw error;
  }
};

// 게시글 추가
export const addPost = async (post) => {
  try {
    const response = await authApiClient.post("/board/add", post);
    return response.data;
  } catch (error) {
    console.error("게시글 추가 API 호출 오류:", error);
    throw error;
  }
};

// 게시글 추천
export const recommendPost = async (postId) => {
  try {
    const response = await authApiClient.post("/board/recommend", {
      postId,
    });
    return response.data;
  } catch (error) {
    console.error("게시글 추천 API 호출 오류:", error);
    throw error;
  }
};

// 게시글 상세
export const getPost = async (postId) => {
  try {
    const response = await authApiClient.get("/board/detail", {
      params: { postId },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("게시글 상세 API 호출 오류:", error);
    throw error;
  }
};

// 게시글 조회수 증가
export const incrementViewCount = async (postId) => {
  try {
    const response = await authApiClient.get("/board/incrementViewCount", {
      params: { postId },
    });
    return response.data.data;
  } catch (error) {
    console.error("게시글 조회수 증가 API 호출 오류:", error);
    throw error;
  }
};

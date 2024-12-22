import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, addPost, getPost, recommendPost } from "../service/boardApi";
import { useGlobalState } from "../context/GlobalStateContext";

export function useBoard() {
  const { updateGlobalState } = useGlobalState(); // 글로벌 상태 업데이트 함수
  const navigate = useNavigate();
  const [channel, setChannel] = useState({ channelName: "자유", channelId: 1 });
  const [posts, setPosts] = useState([]); // 게시글 목록
  const [post, setPost] = useState({});
  const [sortType, setSortType] = useState("recent"); // 정렬 방식
  const [page, setPage] = useState(1); // 현재 페이지
  const [loading, setLoading] = useState(false); // 데이터 로드 중 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 여부
  const limit = 5; // 한 번에 로드할 데이터 개수

  // 게시글 상세 가져오기
  const fetchPost = async (postId) => {
    updateGlobalState("isLoading", true);
    try {
      const response = await getPost(postId);
      setPost(response); // post 상태에 상세 데이터 저장
    } catch (error) {
      console.error("게시글 상세 로드 오류:", error);
    } finally {
      updateGlobalState("isLoading", false);
    }
  };

  // 게시글 목록 가져오기
  const fetchPosts = async () => {
    setLoading(true);
    // updateGlobalState("isLoading", true);
    try {
      const response = await getPosts(channel.channelId, sortType, page, limit);
      const newPosts = response.data;

      if (newPosts.length < limit) {
        setHasMore(false); // 데이터가 더 이상 없음을 표시
      }

      setPosts((prevPosts) => {
        const postIds = new Set(prevPosts.map((post) => post.postId));
        const filteredPosts = newPosts.filter(
          (post) => !postIds.has(post.postId)
        );
        return [...prevPosts, ...filteredPosts];
      });

      setPage((prevPage) => prevPage + 1); // 다음 페이지 설정
    } catch (error) {
      console.error("게시글 추가 로드 오류:", error);
    } finally {
      setLoading(false);
      // updateGlobalState("isLoading", false);
    }
  };

  // 게시글 추가 함수
  const createPost = async (newPost) => {
    setLoading(true);
    updateGlobalState("isLoading", true);
    try {
      console.log(newPost);
      const response = await addPost(newPost); // boardApi 호출
      console.log(response);
      alert("게시글이 등록되었습니다.");
      navigate("/board"); // 게시글 등록 후 게시판 페이지로 이동
      return response;
    } catch (error) {
      console.error("게시글 추가 오류:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
      throw error;
    } finally {
      setLoading(false);
      updateGlobalState("isLoading", false);
    }
  };

  // 게시글 추천 처리
  const postRecommend = async (postId) => {
    if (post.isRecommended) return; // 이미 추천한 경우 아무 작업도 하지 않음
    try {
      await recommendPost(postId); // 추천 API 호출
      // UI 상에서만 추천 상태와 추천 수 업데이트
      setPost((prevPost) => ({
        ...prevPost,
        isRecommended: true, // 추천 상태 변경
        recommendationCount: prevPost.recommendationCount + 1, // 추천 수 증가
      }));
    } catch (error) {
      console.error("추천 실패:", error);
      alert("추천 작업 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const loadInitialPosts = async () => {
      setPosts([]);
      setLoading(true);
      updateGlobalState("isLoading", true);
      setHasMore(true);
      setPage(1); // 페이지 초기화
      try {
        const response = await getPosts(channel.channelId, sortType, 1, limit);
        setPosts(response.data);
      } catch (error) {
        console.error("초기 데이터 로드 오류:", error);
      } finally {
        setLoading(false);
        updateGlobalState("isLoading", false);
      }
    };

    loadInitialPosts();
  }, [channel, sortType]);

  return {
    channel,
    setChannel,
    posts,
    sortType,
    setSortType,
    fetchPosts,
    fetchPost,
    hasMore,
    loading,
    createPost,
    post,
    postRecommend,
  };
}

// src/hooks/useHelpInfo.js
import { useState, useEffect } from "react";
import { getInfoSiteList, siteAdd, siteDelete } from "../service/helpInfoApi";

export function useHelpInfo() {
  const [siteList, setSiteList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 사이트 목록 불러오는 함수
  const fetchSiteList = async () => {
    setLoading(true);
    try {
      const data = await getInfoSiteList();
      setSiteList(data); // 사이트 목록 상태 업데이트
    } catch (error) {
      console.error("데이터 로드 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 사이트 추가 함수
  const addSite = async (img, link, title, description) => {
    setLoading(true);
    try {
      const data = await siteAdd(img, link, title, description);
      if (data.code === 200) {
        fetchSiteList(); // 추가 후 목록 갱신
      }
      return data;
    } catch (error) {
      console.error("사이트 추가 실패:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 사이트 삭제 함수
  const deleteSite = async (siteId) => {
    setLoading(true);
    try {
      const data = await siteDelete(siteId);
      if (data.code === 200) {
        fetchSiteList(); // 삭제 후 목록 갱신
      }
      return data;
    } catch (error) {
      console.error("사이트 삭제 실패:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 목록을 불러옴
  useEffect(() => {
    fetchSiteList();
  }, []);

  return { siteList, addSite, deleteSite, loading };
}

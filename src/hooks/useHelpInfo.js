// src/hooks/useHelpInfo.js"
import { useState, useEffect, useRef } from "react";
import {
  getInfoSiteList,
  siteAdd,
  siteDelete,
  siteNewOrderSave,
  siteUpdate,
  getSupportBoardList,
  supportBoardAdd,
  supportBoardUpdate,
  supporBoardDelete,
} from "../service/helpInfoApi";
import { useGlobalState } from "../context/GlobalStateContext";

export function useHelpInfo() {
  const { updateGlobalState } = useGlobalState(); // 글로벌 상태 업데이트 함수
  const [siteList, setSiteList] = useState([]);
  const [region, setRegion] = useState("전체");
  const [supportList, setSupportList] = useState([]);

  const isInitialRender = useRef(true); // 초기 렌더링 여부 저장

  useEffect(() => {
    fetchSiteList(); // 항상 초기 로드
    fetchSupportList(region); // 초기 지원 게시글 로드
  }, []); // 초기 렌더링 시에만 실행

  useEffect(() => {
    console.log(region);
    if (isInitialRender.current) {
      isInitialRender.current = false; // 초기 렌더링 이후 false로 설정
    } else {
      fetchSupportList(region); // 초기 렌더링 이후 region 변경 시 호출
    }
  }, [region]); // region이 변경될 때만 실행

  const fetchSiteList = async () => {
    updateGlobalState("isLoading", true);
    try {
      const data = await getInfoSiteList();
      setSiteList(data);
    } catch (error) {
      console.error("데이터 로드 오류:", error);
    } finally {
      updateGlobalState("isLoading", false);
    }
  };

  const addSite = async (img, link, title, description) => {
    updateGlobalState("isLoading", true);
    try {
      const data = await siteAdd(img, link, title, description);
      if (data.code === 200) {
        fetchSiteList();
      }
      return data;
    } catch (error) {
      console.error("사이트 추가 실패:", error);
      throw error;
    } finally {
      updateGlobalState("isLoading", false);
    }
  };

  const deleteSite = async (siteId) => {
    updateGlobalState("isLoading", true);
    try {
      const data = await siteDelete(siteId);
      if (data.code === 200) {
        fetchSiteList();
      }
      return data;
    } catch (error) {
      console.error("사이트 삭제 실패:", error);
      throw error;
    } finally {
      updateGlobalState("isLoading", false);
    }
  };

  const saveNewOrder = async () => {
    updateGlobalState("isLoading", true);
    try {
      const orderPayload = siteList.map((site) => ({
        siteInfoId: site.siteInfoId,
        indexOrder: site.indexOrder,
      }));

      const data = await siteNewOrderSave(orderPayload);
      if (data.code === 200) {
        console.log("순서 저장 완료:", siteList);
      } else {
        console.error("순서 저장 실패:", data.message);
      }
      return data;
    } catch (error) {
      console.error("순서 저장 API 호출 오류:", error);
      throw error;
    } finally {
      updateGlobalState("isLoading", false);
    }
  };

  const updateSite = async (siteInfoId, img, link, title, description) => {
    updateGlobalState("isLoading", true);
    try {
      const data = await siteUpdate(siteInfoId, img, link, title, description);
      if (data.code === 200) {
        fetchSiteList();
      }
      return data;
    } catch (error) {
      console.error("사이트 수정 실패:", error);
      throw error;
    } finally {
      updateGlobalState("isLoading", false);
    }
  };

  const fetchSupportList = async (region) => {
    updateGlobalState("isLoading", true);
    try {
      const data = await getSupportBoardList(region);
      setSupportList(data);
    } catch (error) {
      console.error("데이터 로드 오류:", error);
    } finally {
      updateGlobalState("isLoading", false);
    }
  };

  const addSupportBoard = async (title, link, region) => {
    updateGlobalState("isLoading", true);
    try {
      const data = await supportBoardAdd(title, link, region);
      if (data.code === 200) {
        // fetchSupportList(region);
        setRegion(region);
      }
      return data;
    } catch (error) {
      console.error("지원 게시글 추가 실패:", error);
      throw error;
    } finally {
      updateGlobalState("isLoading", false);
    }
  };

  const deleteSupportBoard = async (supportId) => {
    updateGlobalState("isLoading", true);
    try {
      const data = await supporBoardDelete(supportId);
      if (data.code === 200) {
        fetchSupportList(region);
      }
      return data;
    } catch (error) {
      console.error("지원 게시글 삭제 실패:", error);
      throw error;
    } finally {
      updateGlobalState("isLoading", false);
    }
  };

  const updatesupportBoard = async (supportId, title, link, region) => {
    updateGlobalState("isLoading", true);

    try {
      const data = await supportBoardUpdate(supportId, title, link, region);
      console.log(data);
      if (data.code === 200) {
        fetchSupportList(region);
      }
      return data;
    } catch (error) {
      console.error("사이트 수정 실패:", error);
      throw error;
    } finally {
      updateGlobalState("isLoading", false);
    }
  };

  return {
    region,
    setRegion,
    siteList,
    setSiteList,
    addSite,
    deleteSite,
    saveNewOrder,
    updateSite,
    supportList,
    setSupportList,
    fetchSupportList,
    addSupportBoard,
    deleteSupportBoard,
    updatesupportBoard,
  };
}

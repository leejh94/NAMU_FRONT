import { useState, useEffect } from "react";
import {
  getInfoSiteList,
  siteAdd,
  siteDelete,
  siteNewOrderSave,
  siteUpdate, // 업데이트 API 추가
} from "../service/helpInfoApi";
import { useGlobalState } from "../context/GlobalStateContext";

export function useHelpInfo() {
  const [siteList, setSiteList] = useState([]);
  const { updateGlobalState } = useGlobalState(); // 글로벌 상태 업데이트 함수

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

  useEffect(() => {
    fetchSiteList();
  }, []);

  return {
    siteList,
    setSiteList,
    addSite,
    deleteSite,
    saveNewOrder,
    updateSite, // 수정 기능 추가
  };
}

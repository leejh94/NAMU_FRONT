// src/hooks/useHelpInfo.js
import { useState, useEffect } from "react";
import {
  getInfoSiteList,
  siteAdd,
  siteDelete,
  siteNewOrderSave,
} from "../service/helpInfoApi";

export function useHelpInfo() {
  const [siteList, setSiteList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSiteList = async () => {
    setLoading(true);
    try {
      const data = await getInfoSiteList();
      setSiteList(data);
    } catch (error) {
      console.error("데이터 로드 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSite = async (img, link, title, description) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const deleteSite = async (siteId) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const saveNewOrder = async () => {
    try {
      const orderPayload = siteList.map((site) => ({
        siteInfoId: site.siteInfoId,
        indexOrder: site.indexOrder,
      }));

      const data = await siteNewOrderSave(orderPayload);
      console.log(data);
      if (data.code === 200) {
        console.log("순서 저장 완료:", siteList);
      } else {
        console.error("순서 저장 실패:", data.message);
      }
      return data;
    } catch (error) {
      console.error("순서 저장 API 호출 오류:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSiteList();
  }, []);

  return {
    siteList,
    setSiteList,
    loading,
    addSite,
    deleteSite,
    saveNewOrder,
  };
}

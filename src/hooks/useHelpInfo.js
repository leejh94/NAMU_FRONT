// src/hooks/useLogin.js
import { useState, useEffect, useRef } from "react";
import { getInfoSiteList } from "../service/helpInfoApi";
import { useGlobalState } from "../context/GlobalStateContext";
import Cookies from "js-cookie"; // 쿠키 관리 라이브러리

export function useHelpInfo() {
  const [siteList, setSiteList] = useState([]);

  useEffect(() => {
    const fetchSiteList = async () => {
      try {
        let data = await getInfoSiteList();
        setSiteList(data);
      } catch (error) {
        console.error("데이터 로드 오류:", error);
      }
    };
    fetchSiteList();
    alert("현재 작업 중인 페이지 입니다.");
  }, []); // 최초 로드 시에만 호출

  return { siteList };
}

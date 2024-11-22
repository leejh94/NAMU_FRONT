// src/hooks/useSearch.js
import { useState, useEffect, useRef } from "react";
import {
  getCompanyNameList,
  getCompanyBasicInfo,
  getCompanySalesInfo,
  getCompanyRegionTotalCount,
  getFranchiseFee,
  getNaverNewsList,
} from "../service/searchApi";
import { useGlobalState } from "../context/GlobalStateContext";

export function useSearch() {
  const { updateGlobalState } = useGlobalState(); // 글로벌 상태 업데이트 함수

  const [searchType, setSearchType] = useState("brand");
  const [searchWord, setSearchWord] = useState("");
  const [companyNo, setCompanyNo] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const suggestionRefs = useRef([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [basicInfo, setBasicInfo] = useState();
  const [salesInfo, setSalesInfo] = useState();
  const [costInfo, setCostInfo] = useState({ data: [] });
  const [feeInfo, setFeeInfo] = useState();
  const [salesInfoRegion, setSaleInfoRegion] = useState("전체");
  const [newsData, setNewsData] = useState([]);

  // 입력이 변경될 때 추천 목록을 업데이트하는 함수
  const handleInputChange = async (value) => {
    setSearchWord(value);
    setHighlightIndex(-1);

    if (value.trim() === "") {
      // 입력값이 없으면 목록을 숨김
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const data = await getCompanyNameList(searchType, value);
      setSuggestions(data.data || []);
      setShowSuggestions(data.data && data.data.length > 0); // 추천 목록이 있으면 표시
    } catch (error) {
      console.error("추천 목록 조회 오류:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // 추천 목록을 클릭했을 때 선택된 항목으로 설정
  const handleSuggestionClick = (suggestion) => {
    setSearchWord(suggestion.name);
    setCompanyNo(suggestion.fir_mst_sn);
    setShowSuggestions(false); // 추천 목록 숨김
    setSuggestions([]); // 추천 목록 초기화
    setSelectedTab("brandInfo");
    setHighlightIndex(-1);
    fetchTabData("brandInfo", suggestion.fir_mst_sn);
  };

  // API 데이터 로딩
  const fetchTabData = async (tab, companyNo) => {
    try {
      updateGlobalState("isLoading", true);

      let data;
      if (tab === "sales") {
        data = await getCompanySalesInfo(companyNo, salesInfoRegion);
        setSalesInfo(data);
      } else if (tab === "cost") {
        data = await getCompanyRegionTotalCount(companyNo);
        let data2 = await getFranchiseFee(companyNo);
        setCostInfo(data);
        setFeeInfo(data2);
      } else if (tab === "brandInfo") {
        data = await getCompanyBasicInfo(companyNo);
        let data2 = await getNaverNewsList(companyNo, 6);
        setBasicInfo(data);
        setNewsData(data2);
      }
    } catch (error) {
      console.error(`API 오류 (${tab}):`, error);
    } finally {
      updateGlobalState("isLoading", false);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (companyNo) {
      fetchTabData(tab, companyNo);
    }
  };

  // 매출 정보 지역 변경 시 호출
  const handleSalesInfoRegionChange = async (region) => {
    setSaleInfoRegion(region);
    if (companyNo) {
      try {
        const data = await getCompanySalesInfo(companyNo, region);
        setSalesInfo(data);
      } catch (error) {
        console.error("매출 정보 지역 변경 중 오류:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === "ArrowDown") {
        setHighlightIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        setHighlightIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
        );
      } else if (e.key === "Enter" && highlightIndex >= 0) {
        handleSuggestionClick(suggestions[highlightIndex]);
      }
    }
  };

  useEffect(() => {
    if (highlightIndex >= 0 && suggestionRefs.current[highlightIndex]) {
      suggestionRefs.current[highlightIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightIndex]);

  return {
    searchType,
    searchWord,
    suggestions,
    companyNo,
    showSuggestions,
    selectedTab,
    setSelectedTab,
    setSearchType,
    setSearchWord,
    highlightIndex,
    suggestionRefs,
    handleInputChange,
    handleSuggestionClick,
    handleKeyDown,
    handleTabChange,
    basicInfo,
    setBasicInfo,
    salesInfoRegion,
    salesInfo,
    handleSalesInfoRegionChange,
    costInfo,
    setCostInfo,
    setSuggestions,
    setShowSuggestions,
    feeInfo,
    setFeeInfo,
    newsData,
  };
}

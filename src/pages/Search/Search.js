import React, { useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { TabView, TabPanel } from "primereact/tabview";
import { useSearch } from "../../hooks/useSearch";
import { useLocation } from "react-router-dom";
import "./Search.scss";
import BrandInfo from "./components/BrandInfo";
import CostInfo from "./components/CostInfo";
import SalesInfo from "./components/SalesInfo";

function Search() {
  const {
    searchType,
    searchWord,
    suggestions,
    companyNo,
    showSuggestions,
    setShowSuggestions,
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
    salesInfoRegion,
    salesInfo,
    handleSalesInfoRegionChange,
    setSuggestions,
    costInfo,
    feeInfo,
    newsData,
  } = useSearch({});

  const location = useLocation();
  const inputRef = useRef(null);
  const tapRef = useRef(null);
  const isInitialLoad = useRef(true); // 초기 로드인지 확인하는 변수

  // URL 파라미터에서 storeName을 추출하여 searchWord에 설정
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const storeName = params.get("storeName");

    if (storeName) {
      setSearchWord(storeName);
      handleInputChange(storeName);
      isInitialLoad.current = true;
    } else {
      isInitialLoad.current = false;
    }
  }, [location, setSearchWord]);

  // suggestions가 업데이트되었을 때 첫 번째 suggestion 자동 클릭 (초기 로드 시에만)
  useEffect(() => {
    if (isInitialLoad.current && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
      isInitialLoad.current = false;
    }
  }, [suggestions]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const searchOptions = [{ label: "브랜드명", value: "brand" }];

  return (
    <div className="search-page">
      <div className="search-bar">
        <Dropdown
          value={searchType}
          options={searchOptions}
          onChange={(e) => setSearchType(e.value)}
          placeholder="검색 기준 선택"
          className="search-dropdown"
        />

        <div className="input-container">
          <InputText
            ref={inputRef}
            value={searchWord}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력해주세요."
            className="search-input"
          />

          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.fir_mst_sn}
                  ref={(el) => (suggestionRefs.current[index] = el)}
                  onClick={() => {
                    handleSuggestionClick(suggestion);
                  }}
                  className={highlightIndex === index ? "highlight" : ""}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="search-detail" ref={tapRef}>
        <TabView
          activeIndex={
            selectedTab === "sales"
              ? 0
              : selectedTab === "cost"
              ? 1
              : selectedTab === "brandInfo"
              ? 2
              : ""
          }
          onTabChange={(e) => {
            const tabs = ["sales", "cost", "brandInfo"];
            handleTabChange(tabs[e.index]);
          }}
        >
          <TabPanel header="매출 정보" disabled={!companyNo}>
            <SalesInfo
              salesInfoRegion={salesInfoRegion}
              handleSalesInfoRegionChange={handleSalesInfoRegionChange}
              salesInfo={salesInfo ? salesInfo.data : {}}
            />
          </TabPanel>
          <TabPanel header="가맹 현황" disabled={!companyNo}>
            <CostInfo
              costInfo={costInfo ? costInfo.data : []}
              feeInfo={feeInfo ? feeInfo.data : {}}
            />
          </TabPanel>
          <TabPanel header="브랜드 정보" disabled={!companyNo}>
            <BrandInfo
              basicInfo={basicInfo ? basicInfo.data : {}}
              newsData={newsData ? newsData : {}}
            />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default Search;

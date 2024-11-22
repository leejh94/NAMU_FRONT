// src/hooks/useStats.js
import { useState, useEffect } from "react";
import {
  getTopStoresBySales,
  getIndustryAvgSalesInfo,
  getLowestFranchiseFeeStores,
  getIndustryNewOpeningsCount,
} from "../service/statsApi";
import { useGlobalState } from "../context/GlobalStateContext";

export function useStats() {
  const { updateGlobalState } = useGlobalState(); // 글로벌 상태 업데이트 함수
  // 상태 값
  const [topSales, setTopSales] = useState([]);
  const [avgSalesInfo, setAvgSalesInfo] = useState([]);
  const [lowestFranchiseFeeStores, setLowestFranchiseFeeStores] = useState([]);
  const [newOpeningsCount, setNewOpeningsCount] = useState([]);

  // 드롭다운 필터 값
  const [region, setRegion] = useState("전체");
  const [industry, setIndustry] = useState("전체");
  const [limit, setLimit] = useState(10);

  // 매출 상위 매장 목록 API 호출
  useEffect(() => {
    const fetchTopSales = async () => {
      try {
        updateGlobalState("isLoading", true);
        const response = await getTopStoresBySales(region, industry, limit);
        setTopSales(response.data);
      } catch (error) {
        console.error("매출 상위 매장 데이터 로드 오류:", error);
      } finally {
        updateGlobalState("isLoading", false);
      }
    };
    fetchTopSales();
  }, [region, industry, limit]); // 필터 값 변경 시마다 호출

  // 업종별 매출 평균 API 호출
  useEffect(() => {
    const fetchAvgSalesInfo = async () => {
      try {
        updateGlobalState("isLoading", true);
        const response = await getIndustryAvgSalesInfo(region);
        setAvgSalesInfo(response.data);
      } catch (error) {
        console.error("업종별 매출 평균 데이터 로드 오류:", error);
      } finally {
        updateGlobalState("isLoading", false);
      }
    };
    fetchAvgSalesInfo();
  }, [region]); // 지역 변경 시마다 호출

  // 가맹 부담금이 낮은 매장 목록 API 호출
  useEffect(() => {
    const fetchLowestFranchiseFeeStores = async () => {
      try {
        const response = await getLowestFranchiseFeeStores(
          region,
          industry,
          limit
        );
        setLowestFranchiseFeeStores(response.data);
      } catch (error) {
        console.error("가맹 부담금 낮은 매장 데이터 로드 오류:", error);
      }
    };
    fetchLowestFranchiseFeeStores();
  }, [region, industry, limit]); // 필터 값 변경 시마다 호출

  // 업종별 신규 개점 수 API 호출
  useEffect(() => {
    const fetchNewOpeningsCount = async () => {
      try {
        const response = await getIndustryNewOpeningsCount();
        setNewOpeningsCount(response.data);
      } catch (error) {
        console.error("신규 개점 수 데이터 로드 오류:", error);
      }
    };
    fetchNewOpeningsCount();
  }, []); // 최초 로드 시에만 호출

  return {
    topSales,
    avgSalesInfo,
    lowestFranchiseFeeStores,
    newOpeningsCount,
    region,
    setRegion,
    industry,
    setIndustry,
    limit,
    setLimit,
  };
}

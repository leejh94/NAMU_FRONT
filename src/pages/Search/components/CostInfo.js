import React, { useEffect, useState } from "react";
import "./CostInfo.scss";
import { ReactComponent as SouthKoreaMap } from "../../../assets/map/korea-map2.svg"; // SVG 지도 파일 import
import { formatCurrency } from "../../../util/formatCurrency";

function CostInfo({ costInfo = [], feeInfo }) {
  const [labelPositions, setLabelPositions] = useState({});

  // 화면 크기에 따라 좌표 값을 조정하는 함수
  const updateLabelPositions = () => {
    if (window.innerWidth <= 480) {
      setLabelPositions({
        강원: { x: 55, y: 15 },
        경기: { x: 40, y: 28 },
        경남: { x: 55, y: 60 },
        경북: { x: 63, y: 38 },
        광주: { x: 34, y: 64 },
        대구: { x: 48, y: 46 },
        대전: { x: 43, y: 42 },
        부산: { x: 68, y: 67 },
        서울: { x: 42, y: 20 },
        세종: { x: 41, y: 36 },
        울산: { x: 68, y: 56 },
        인천: { x: 32, y: 22 },
        전남: { x: 42, y: 64 },
        전북: { x: 41, y: 54 },
        제주: { x: 34, y: 88 },
        충남: { x: 35, y: 40 },
        충북: { x: 48, y: 36 },
      });
    } else if (window.innerWidth <= 768) {
      setLabelPositions({
        강원: { x: 58, y: 16 },
        경기: { x: 44, y: 29 },
        경남: { x: 55, y: 59 },
        경북: { x: 64, y: 39 },
        광주: { x: 33, y: 64 },
        대구: { x: 49, y: 47 },
        대전: { x: 42, y: 45 },
        부산: { x: 67, y: 66 },
        서울: { x: 42, y: 20 },
        세종: { x: 40, y: 36 },
        울산: { x: 69, y: 57 },
        인천: { x: 33, y: 23 },
        전남: { x: 42, y: 65 },
        전북: { x: 41, y: 54 },
        제주: { x: 35, y: 88 },
        충남: { x: 35, y: 41 },
        충북: { x: 49, y: 37 },
      });
    } else {
      setLabelPositions({
        강원: { x: 60, y: 17 },
        경기: { x: 43, y: 30 },
        경남: { x: 56, y: 60 },
        경북: { x: 65, y: 40 },
        광주: { x: 34, y: 64 },
        대구: { x: 50, y: 48 },
        대전: { x: 43, y: 43 },
        부산: { x: 68, y: 67 },
        서울: { x: 42, y: 20 },
        세종: { x: 41, y: 37 },
        울산: { x: 70, y: 58 },
        인천: { x: 33, y: 23 },
        전남: { x: 43, y: 66 },
        전북: { x: 42, y: 55 },
        제주: { x: 35, y: 90 },
        충남: { x: 35, y: 41 },
        충북: { x: 49, y: 37 },
      });
    }
  };

  useEffect(() => {
    updateLabelPositions();
    window.addEventListener("resize", updateLabelPositions);
    return () => window.removeEventListener("resize", updateLabelPositions);
  }, []);

  return (
    <div className="cost-info-container">
      {/* 창업 비용 영역 */}
      <div className="cost-info-card">
        <h4>창업 비용</h4>
        <div className="cost-info-details">
          <div className="cost-info-item">
            <span className="cost-label">가맹비</span>
            <span className="cost-value">
              {formatCurrency(feeInfo.entry_fee)}
            </span>
          </div>
          <div className="cost-info-item">
            <span className="cost-label">교육비</span>
            <span className="cost-value">
              {formatCurrency(feeInfo.education_fee)}
            </span>
          </div>
          <div className="cost-info-item">
            <span className="cost-label">보증금</span>
            <span className="cost-value">
              {formatCurrency(feeInfo.deposit)}
            </span>
          </div>
          <div className="cost-info-item">
            <span className="cost-label">
              인테리어({feeInfo.standard_store_area}평 기준)
            </span>
            <span className="cost-value">
              {formatCurrency(feeInfo.interior_cost)}
            </span>
          </div>
          <div className="cost-info-item">
            <span className="cost-label">기타비용</span>
            <span className="cost-value">
              {formatCurrency(feeInfo.other_costs - feeInfo.interior_cost)}
            </span>
          </div>
          <div className="cost-info-item total">
            <span className="cost-label">합계</span>
            <span className="cost-value">
              {formatCurrency(feeInfo.franchise_fee)}
            </span>
          </div>
        </div>
      </div>
      {/* 가맹 분포 영역 */}
      <div className="cost-info-card">
        <h4>가맹 분포</h4>
        <div className="map-container">
          <SouthKoreaMap className="map-svg" />
          {costInfo
            .filter((item) => item.locale !== "전체")
            .map((item) => (
              <div
                key={item.locale}
                className="label-box"
                style={{
                  left: `${labelPositions[item.locale]?.x}%`,
                  top: `${labelPositions[item.locale]?.y}%`,
                }}
              >
                <span className="locale-name">{item.locale}</span>
                <span className="store-count">{item.count}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CostInfo;

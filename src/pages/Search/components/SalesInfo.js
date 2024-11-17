import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Chart } from "primereact/chart"; // Chart를 직접 가져오기
import "./SalesInfo.scss";
import { formatCurrency } from "../../../util/formatCurrency"; // 포맷 함수 import

function SalesInfo({
  salesInfo,
  salesInfoRegion,
  setSaleInfoRegion,
  handleSalesInfoRegionChange,
}) {
  const searchOptions = [
    { label: "지역전체", value: "전체" },
    { label: "서울", value: "서울" },
    { label: "부산", value: "부산" },
    { label: "대구", value: "대구" },
    { label: "인천", value: "인천" },
    { label: "광주", value: "광주" },
    { label: "대전", value: "대전" },
    { label: "울산", value: "울산" },
    { label: "세종", value: "세종" },
    { label: "경기", value: "경기" },
    { label: "강원", value: "강원" },
    { label: "충북", value: "충북" },
    { label: "충남", value: "충남" },
    { label: "전북", value: "전북" },
    { label: "전남", value: "전남" },
    { label: "경북", value: "경북" },
    { label: "경남", value: "경남" },
    { label: "제주", value: "제주" },
  ];

  // 첫 번째 차트 데이터 설정
  const monthlySalesLabels = [
    "평균 매출액",
    `(${salesInfo?.industry}) 업종 평균`,
  ];
  const monthlySalesData = [
    salesInfo?.avg_monthly_sales || 0,
    salesInfo?.industry_avg_monthly_sales || 0,
  ];

  // 두 번째 차트 데이터 설정
  const areaSalesLabels = [
    "1평당 평균 매출액",
    `(${salesInfo?.industry}) 업종 평균`,
  ];
  const areaSalesData = [
    salesInfo?.avg_monthly_sales_per_area || 0,
    salesInfo?.industry_avg_monthly_sales_per_area || 0,
  ];

  // 차트 데이터를 구성하는 함수
  const getChartData = (labels, data) => {
    const maxDataValue = Math.max(...data);
    const backgroundColors = data.map((value) =>
      value === maxDataValue ? "#d9534f" : "#337ab7"
    );

    return {
      labels,
      datasets: [
        {
          label: "차트 데이터",
          backgroundColor: backgroundColors,
          borderColor: "#1E88E5",
          borderWidth: 1,
          data,
        },
      ],
    };
  };

  // 차트 옵션 설정
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "Maplestory Bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "Maplestory Bold",
          },
          callback: (value) => formatCurrency(value),
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: "Maplestory Bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          family: "Maplestory Bold",
        },
        bodyFont: {
          family: "Maplestory Bold",
        },
      },
    },
  };

  // 조건부 스타일 설정
  const getTextColor = (value, compareValue) => {
    if (value > compareValue) return { color: "#d9534f" };
    if (value < compareValue) return { color: "#337ab7" };
    return { color: "black" };
  };

  return (
    <div className="sales-info-container">
      {/* 매출 정보 카드 */}
      <div className="sales-info-card">
        <h4>월 매출 평균</h4>
        <Dropdown
          value={salesInfoRegion}
          options={searchOptions}
          onChange={(e) => handleSalesInfoRegionChange(e.value)}
          className="search-dropdown"
        />
        <div className="sales-info-summary-wrap">
          <div className="sales-info-summary">
            <div className="sales-info-box">
              <p>평균 매출액</p>
              <p
                style={getTextColor(
                  salesInfo?.avg_monthly_sales,
                  salesInfo?.industry_avg_monthly_sales
                )}
              >
                {formatCurrency(salesInfo?.avg_monthly_sales || 0)}
              </p>
            </div>
            <div className="sales-info-box">
              <p>({salesInfo?.industry}) 업종 평균</p>
              <p
                style={getTextColor(
                  salesInfo?.industry_avg_monthly_sales,
                  salesInfo?.avg_monthly_sales
                )}
              >
                {formatCurrency(salesInfo?.industry_avg_monthly_sales || 0)}
              </p>
            </div>
          </div>
          <div className="sales-info-summary">
            <div className="sales-info-box">
              <p>1평당 평균 매출액</p>
              <p
                style={getTextColor(
                  salesInfo?.avg_monthly_sales_per_area,
                  salesInfo?.industry_avg_monthly_sales_per_area
                )}
              >
                {formatCurrency(salesInfo?.avg_monthly_sales_per_area || 0)}
              </p>
            </div>
            <div className="sales-info-box">
              <p>({salesInfo?.industry}) 업종 평균</p>
              <p
                style={getTextColor(
                  salesInfo?.industry_avg_monthly_sales_per_area,
                  salesInfo?.avg_monthly_sales_per_area
                )}
              >
                {formatCurrency(
                  salesInfo?.industry_avg_monthly_sales_per_area || 0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 매출 그래프 카드 */}
      <div className="sales-info-card sales-info-chart">
        <h4>매출 그래프</h4>
        <div className="sales-charts">
          <Chart
            type="bar"
            data={getChartData(monthlySalesLabels, monthlySalesData)}
            options={chartOptions}
          />
          <Chart
            type="bar"
            data={getChartData(areaSalesLabels, areaSalesData)}
            options={chartOptions}
          />
        </div>
      </div>

      {/* 정보 카드 */}
      <div className="sales-info-card sales-info-details">
        <h4>참고</h4>
        <ul>
          <li>
            해당 데이터는 공정거래위원회에서 제공하는 정보공개서를 기반으로
            합니다.
          </li>
          <li>정보공개서에 데이터가 없을 수도 있습니다.</li>
          <li>
            해당 데이터는 {salesInfo?.report_year || "연도 정보 없음"}년
            기준입니다.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SalesInfo;

// src/pages/Stats/Stats.js
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import "./Stats2.scss";
import { useStats } from "../../hooks/useStats";
import { formatCurrency } from "../../util/formatCurrency";
import { useNavigate } from "react-router-dom";

function Stats() {
  const {
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
  } = useStats();

  const [isTopSalesExpanded, setIsTopSalesExpanded] = useState(false);
  const [isLowestFeeExpanded, setIsLowestFeeExpanded] = useState(false);

  const regionOptions = [
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

  const industryOptions = [
    { label: "업종전체", value: "전체" },
    { label: "한식", value: "한식" },
    { label: "커피", value: "커피" },
    { label: "기타 외식", value: "기타 외식" },
    { label: "치킨", value: "치킨" },
    { label: "주점", value: "주점" },
    { label: "일식", value: "일식" },
    { label: "분식", value: "분식" },
    { label: "중식", value: "중식" },
    { label: "기타 외국식", value: "기타 외국식" },
    { label: "제과제빵", value: "제과제빵" },
    { label: "피자", value: "피자" },
    { label: "패스트푸드", value: "패스트푸드" },
    { label: "서양식", value: "서양식" },
    { label: "아이스크림/빙수", value: "아이스크림/빙수" },
    { label: "음료 (커피 외)", value: "음료 (커피 외)" },
  ];

  const limitOptions = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 100, value: 100 },
  ];

  const navigate = useNavigate();

  const validSalesInfo = avgSalesInfo.filter(
    (info) =>
      info.industry_avg_monthly_sales !== undefined &&
      info.industry_avg_monthly_sales !== null
  );
  const totalAverageSales =
    validSalesInfo.length > 0
      ? validSalesInfo.reduce(
          (sum, info) => sum + info.industry_avg_monthly_sales,
          0
        ) / validSalesInfo.length
      : 0;
  const specificIndustryInfo = avgSalesInfo.find(
    (info) => info.industry === industry
  );
  const specificIndustrySales =
    industry === "전체"
      ? totalAverageSales
      : specificIndustryInfo
      ? specificIndustryInfo.industry_avg_monthly_sales
      : 0;

  const difference = specificIndustrySales - totalAverageSales;
  const isHigher = difference > 0;

  const comparisonIndicator = isHigher ? "▲" : "▼";
  const comparisonText = `${comparisonIndicator} ${formatCurrency(
    Math.abs(difference)
  )}`;

  const combinedData = {
    labels: avgSalesInfo.map((info) => info.industry),
    datasets: [
      {
        label: "평균 매출액",
        data: avgSalesInfo.map((info) => info.industry_avg_monthly_sales),
        backgroundColor: "#42A5F5",
        yAxisID: "y-axis-sales",
      },
      {
        label: "신규 개점 수",
        data: newOpeningsCount.map((opening) => opening.new_openings_count),
        backgroundColor: "#66BB6A",
        yAxisID: "y-axis-openings",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
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
    scales: {
      x: {
        ticks: {
          font: {
            family: "Maplestory Bold",
          },
        },
      },
      "y-axis-sales": {
        type: "linear",
        position: "left",
        ticks: {
          font: {
            family: "Maplestory Bold",
          },
          callback: function (value) {
            return formatCurrency(value);
          },
        },
      },
      "y-axis-openings": {
        type: "linear",
        position: "right",
        ticks: {
          font: {
            family: "Maplestory Bold",
          },
          callback: function (value) {
            return value + "개";
          },
        },
      },
    },
  };

  const handleStoreNameClick = (storeName) => {
    navigate(`/search?storeName=${encodeURIComponent(storeName)}`);
  };

  return (
    <div className="stats-container">
      <div className="stats-header card">
        <span className="header-title">프랜차이즈 통계</span>
        <div className="header-selects">
          <Dropdown
            value={region}
            options={regionOptions}
            onChange={(e) => setRegion(e.value)}
            placeholder="지역 선택"
            className="dropdown"
          />
          <Dropdown
            value={industry}
            options={industryOptions}
            onChange={(e) => setIndustry(e.value)}
            placeholder="업종 선택"
            className="dropdown"
          />
          <Dropdown
            value={limit}
            options={limitOptions}
            onChange={(e) => setLimit(e.value)}
            placeholder="표시 갯수 선택"
            className="dropdown"
          />
        </div>
      </div>

      <div className="stats-summary card">
        <div className="summary-box">
          <h4>{region} 지역 전체 업종 월매출</h4>
          <p>{formatCurrency(totalAverageSales)}</p>
        </div>
        <div className="summary-box">
          <h4>
            {region} 지역 {industry} 업종 월매출
          </h4>
          <p>
            {formatCurrency(specificIndustrySales)}
            {difference !== 0 && (
              <span
                className="comparison"
                style={{ color: isHigher ? "red" : "blue" }}
              >
                {comparisonText}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="table-card card">
        <Panel
          header="업종별 매출 평균 및 신규 개점 수"
          toggleable
          className="chart-panel"
        >
          <Chart type="bar" data={combinedData} options={chartOptions} />
        </Panel>
      </div>

      {/* 매출 상위 매장 */}
      <div className="table-card card">
        <Panel header="매출 상위 매장" toggleable className="table-panel">
          <DataTable value={topSales} paginator rows={5} className="table">
            <Column
              field="store_name"
              header="매장명"
              body={(rowData) => (
                <span
                  className="store-link"
                  onClick={() => handleStoreNameClick(rowData.store_name)}
                >
                  {rowData.store_name}
                </span>
              )}
            />
            <Column
              field="avg_monthly_sales"
              header="평균 매출액"
              body={(rowData) => formatCurrency(rowData.avg_monthly_sales)}
            />
            <Column
              field="franchise_fee"
              header="가맹 부담금"
              body={(rowData) => formatCurrency(rowData.franchise_fee)}
            />
            <Column field="store_count" header="매장 수" />
          </DataTable>
        </Panel>
      </div>

      {/* 가맹 부담금이 낮은 매장 */}
      <div className="table-card card">
        <Panel
          header="가맹 부담금이 낮은 매장"
          toggleable
          className="table-panel"
        >
          <DataTable
            value={lowestFranchiseFeeStores}
            paginator
            rows={5}
            className="table"
          >
            <Column
              field="store_name"
              header="매장명"
              body={(rowData) => (
                <span
                  className="store-link"
                  onClick={() => handleStoreNameClick(rowData.store_name)}
                >
                  {rowData.store_name}
                </span>
              )}
            />
            <Column
              field="avg_monthly_sales"
              header="평균 매출액"
              body={(rowData) => formatCurrency(rowData.avg_monthly_sales)}
            />
            <Column
              field="franchise_fee"
              header="가맹 부담금"
              body={(rowData) => formatCurrency(rowData.franchise_fee)}
            />
            <Column field="industry" header="업종" />
          </DataTable>
        </Panel>
      </div>
    </div>
  );
}

export default Stats;

// // src/pages/Stats/Stats.js
// import React from "react";
// import { Dropdown } from "primereact/dropdown";
// import { Panel } from "primereact/panel";
// import { Card } from "primereact/card";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Chart } from "primereact/chart";
// import "./Stats.scss";
// import { useStats } from "../../hooks/useStats";
// import { formatCurrency } from "../../util/formatCurrency";
// import { useNavigate } from "react-router-dom";

// function Stats() {
//   const {
//     topSales,
//     avgSalesInfo,
//     lowestFranchiseFeeStores,
//     newOpeningsCount,
//     region,
//     setRegion,
//     industry,
//     setIndustry,
//     limit,
//     setLimit,
//   } = useStats();

//   const regionOptions = [
//     { label: "지역전체", value: "전체" },
//     { label: "서울", value: "서울" },
//     { label: "부산", value: "부산" },
//     { label: "대구", value: "대구" },
//     { label: "인천", value: "인천" },
//     { label: "광주", value: "광주" },
//     { label: "대전", value: "대전" },
//     { label: "울산", value: "울산" },
//     { label: "세종", value: "세종" },
//     { label: "경기", value: "경기" },
//     { label: "강원", value: "강원" },
//     { label: "충북", value: "충북" },
//     { label: "충남", value: "충남" },
//     { label: "전북", value: "전북" },
//     { label: "전남", value: "전남" },
//     { label: "경북", value: "경북" },
//     { label: "경남", value: "경남" },
//     { label: "제주", value: "제주" },
//   ];

//   const industryOptions = [
//     { label: "업종전체", value: "전체" },
//     { label: "한식", value: "한식" },
//     { label: "커피", value: "커피" },
//     { label: "기타 외식", value: "기타 외식" },
//     { label: "치킨", value: "치킨" },
//     { label: "주점", value: "주점" },
//     { label: "일식", value: "일식" },
//     { label: "분식", value: "분식" },
//     { label: "중식", value: "중식" },
//     { label: "기타 외국식", value: "기타 외국식" },
//     { label: "제과제빵", value: "제과제빵" },
//     { label: "피자", value: "피자" },
//     { label: "패스트푸드", value: "패스트푸드" },
//     { label: "서양식", value: "서양식" },
//     { label: "아이스크림/빙수", value: "아이스크림/빙수" },
//     { label: "음료 (커피 외)", value: "음료 (커피 외)" },
//   ];

//   const limitOptions = [
//     { label: 10, value: 10 },
//     { label: 20, value: 20 },
//     { label: 100, value: 100 },
//   ];

//   const navigate = useNavigate();

//   // industry_avg_monthly_sales가 있는 항목만 포함하여 전체 업종의 평균 매출 계산
//   const validSalesInfo = avgSalesInfo.filter(
//     (info) =>
//       info.industry_avg_monthly_sales !== undefined &&
//       info.industry_avg_monthly_sales !== null
//   );
//   const totalAverageSales =
//     validSalesInfo.length > 0
//       ? validSalesInfo.reduce(
//           (sum, info) => sum + info.industry_avg_monthly_sales,
//           0
//         ) / validSalesInfo.length
//       : 0;
//   // 특정 업종의 평균 매출 찾기
//   const specificIndustryInfo = avgSalesInfo.find(
//     (info) => info.industry === industry
//   );
//   const specificIndustrySales =
//     industry === "전체"
//       ? totalAverageSales
//       : specificIndustryInfo
//       ? specificIndustryInfo.industry_avg_monthly_sales
//       : 0;

//   // 두 번째 항목이 첫 번째 항목보다 높거나 낮은 경우 표시할 차액과 방향 설정
//   const difference = specificIndustrySales - totalAverageSales;
//   const isHigher = difference > 0;

//   const comparisonIndicator = isHigher ? "▲" : "▼"; // 상승이면 위쪽 화살표, 하락이면 아래쪽 화살표
//   const comparisonText = `${comparisonIndicator} ${formatCurrency(
//     Math.abs(difference)
//   )}`; // 차액을 절대값으로 표시
//   // "업종별 매출 평균 및 신규 개점 수" 데이터를 위한 차트 데이터
//   const combinedData = {
//     labels: avgSalesInfo.map((info) => info.industry),
//     datasets: [
//       {
//         label: "평균 매출액",
//         data: avgSalesInfo.map((info) => info.industry_avg_monthly_sales),
//         backgroundColor: "#42A5F5", // 파란색
//         yAxisID: "y-axis-sales", // 첫 번째 Y축에 연결
//       },
//       {
//         label: "신규 개점 수",
//         data: newOpeningsCount.map((opening) => opening.new_openings_count),
//         backgroundColor: "#66BB6A", // 초록색
//         yAxisID: "y-axis-openings", // 두 번째 Y축에 연결
//       },
//     ],
//   };

//   const chartOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         labels: {
//           font: {
//             family: "Maplestory Bold",
//           },
//         },
//       },
//       tooltip: {
//         titleFont: {
//           family: "Maplestory Bold",
//         },
//         bodyFont: {
//           family: "Maplestory Bold",
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           font: {
//             family: "Maplestory Bold",
//           },
//         },
//       },
//       "y-axis-sales": {
//         type: "linear",
//         position: "left",
//         ticks: {
//           font: {
//             family: "Maplestory Bold",
//           },
//           callback: function (value) {
//             return formatCurrency(value);
//           },
//         },
//       },
//       "y-axis-openings": {
//         type: "linear",
//         position: "right",
//         ticks: {
//           font: {
//             family: "Maplestory Bold",
//           },
//           callback: function (value) {
//             return value + "개";
//           },
//         },
//       },
//     },
//   };

//   // 매장명을 클릭할 때 호출되는 함수
//   const handleStoreNameClick = (storeName) => {
//     navigate(`/search?storeName=${encodeURIComponent(storeName)}`);
//   };
//   return (
//     <div className="stats-page">
//       <div className="stats-title">
//         <span>프랜차이즈 통계</span>
//         <div className="stats-title-select">
//           <Dropdown
//             value={region}
//             options={regionOptions}
//             onChange={(e) => setRegion(e.value)}
//             placeholder="지역 선택"
//             className="stats-dropdown"
//             virtualScrollerOptions={{ itemSize: 30 }}
//           />

//           <Dropdown
//             value={industry}
//             options={industryOptions}
//             onChange={(e) => setIndustry(e.value)}
//             placeholder="업종 선택"
//             className="stats-dropdown"
//             virtualScrollerOptions={{ itemSize: 30 }}
//           />
//           <Dropdown
//             value={limit}
//             options={limitOptions}
//             onChange={(e) => setLimit(e.value)}
//             placeholder="표시 갯수 선택"
//             className="stats-dropdown"
//             virtualScrollerOptions={{ itemSize: 30 }}
//           />
//         </div>
//       </div>
//       <div className="stats-content1">
//         <div className="content1-box">
//           <div className="content1-box1-section">
//             <div className="box1-title-div">
//               <span className="box1-title-span">
//                 {region} 지역 전체 업종 월매출
//               </span>
//               <br />
//             </div>
//             <div>
//               <span className="box1-value-span">
//                 {formatCurrency(totalAverageSales)}
//               </span>
//             </div>
//           </div>
//           <div className="content1-box2-section">
//             <div className="box2-title-div">
//               <span className="box2-title-span">
//                 {region} 지역 {industry} 업종 월매출
//               </span>
//               <br />
//             </div>
//             <div className="box2-value-div">
//               <span className="box2-value-span">
//                 {formatCurrency(specificIndustrySales)}
//                 {difference !== 0 && (
//                   <span
//                     className="comparison"
//                     style={{ color: isHigher ? "red" : "blue" }} // 상승은 빨간색, 하락은 파란색
//                   >
//                     {" "}
//                     {comparisonText}
//                   </span>
//                 )}
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="content1-graph">
//           {/* 업종별 매출 평균 그래프 */}
//           <Panel
//             header="업종별 매출 평균 및 신규 개점 수"
//             toggleable
//             className="stats-panel"
//           >
//             <Chart type="bar" data={combinedData} options={chartOptions} />
//           </Panel>
//         </div>
//       </div>

//       <div className="stats-content2">
//         {/* 매출 상위 매장 테이블 */}
//         <div className="content2-table1">
//           <Panel header="매출 상위 매장" toggleable className="stats-panel">
//             <DataTable
//               value={topSales}
//               paginator
//               rows={5}
//               className="p-datatable-custom"
//             >
//               <Column
//                 field="store_name"
//                 header="매장명"
//                 body={(rowData) => (
//                   <span
//                     style={{ cursor: "pointer", color: "#007bff" }}
//                     onClick={() => handleStoreNameClick(rowData.store_name)}
//                   >
//                     {rowData.store_name}
//                   </span>
//                 )}
//               />
//               <Column
//                 field="avg_monthly_sales"
//                 header="평균 매출액"
//                 body={(rowData) => formatCurrency(rowData.avg_monthly_sales)}
//               />
//               <Column
//                 field="franchise_fee"
//                 header="가맹 부담금"
//                 body={(rowData) => formatCurrency(rowData.franchise_fee)}
//               />
//               <Column field="store_count" header="매장 수" />
//             </DataTable>
//           </Panel>
//         </div>
//         <div className="content2-table2">
//           {/* 가맹 부담금 낮은 매장 테이블 */}
//           <Panel
//             header="가맹 부담금이 낮은 매장"
//             toggleable
//             className="stats-panel"
//           >
//             <DataTable
//               value={lowestFranchiseFeeStores}
//               paginator
//               rows={5}
//               className="p-datatable-custom"
//             >
//               <Column
//                 field="store_name"
//                 header="매장명"
//                 body={(rowData) => (
//                   <span
//                     style={{ cursor: "pointer", color: "#007bff" }}
//                     onClick={() => handleStoreNameClick(rowData.store_name)}
//                   >
//                     {rowData.store_name}
//                   </span>
//                 )}
//               />
//               <Column
//                 field="avg_monthly_sales"
//                 header="평균 매출액"
//                 body={(rowData) => formatCurrency(rowData.avg_monthly_sales)}
//               />
//               <Column
//                 field="franchise_fee"
//                 header="가맹 부담금"
//                 body={(rowData) => formatCurrency(rowData.franchise_fee)}
//               />
//               <Column field="industry" header="업종" />
//             </DataTable>
//           </Panel>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Stats;

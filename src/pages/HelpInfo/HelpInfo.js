// src/pages/HelpInfo/HelpInfo.js
import { React, useState, useEffect } from "react";
import { useHelpInfo } from "../../hooks/useHelpInfo";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Carousel } from "primereact/carousel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./HelpInfo.scss";

function HelpInfo() {
  const { siteList, supportList, region, setRegion } = useHelpInfo();
  const [numVisible, setNumVisible] = useState(3); // 초기값 설정

  useEffect(() => {
    const updateNumVisible = () => {
      const width = window.innerWidth;
      if (width >= 1600) {
        setNumVisible(6); // 매우 큰 화면
      } else if (width >= 1200) {
        setNumVisible(4); // 큰 화면
      } else if (width >= 768) {
        setNumVisible(3); // 중간 화면
      } else if (width >= 500) {
        setNumVisible(2); // 중간 화면
      } else {
        setNumVisible(1); // 작은 화면
      }
    };

    // 초기 실행 및 리스너 등록
    updateNumVisible(); // 컴포넌트 마운트 시 호출
    window.addEventListener("resize", updateNumVisible);

    // 클린업
    return () => {
      window.removeEventListener("resize", updateNumVisible);
    };
  }, []);
  // 지역 선택 옵션
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

  const siteTemplate = (siteList) => (
    <div
      className="helpInfo-carousel-card card"
      onClick={() => window.open(siteList.siteLink, "_blank")}
    >
      <img
        src={siteList.imgLink}
        alt={siteList.siteName}
        className="helpInfo-carousel-img"
      />
      <h4 className="helpInfo-carousel-title">{siteList.siteName}</h4>
      <p className="helpInfo-carousel-description">
        {siteList.siteDescription}
      </p>
    </div>
  );

  return (
    <div className="pages-container">
      <div className="pages-header card">
        <span className="header-title">창업 지원 정보</span>
        <div className="header-selects">
          <Dropdown
            value={region}
            options={regionOptions}
            onChange={(e) => setRegion(e.value)}
            placeholder="지역 선택"
            className="dropdown"
          />
        </div>
      </div>
      <div className="card">
        <Panel header="유용한 사이트" toggleable className="panel">
          <Carousel
            key={numVisible}
            value={siteList}
            className="helpInfo-carousel"
            numVisible={numVisible}
            numScroll={1} // 항상 한 번에 하나씩 스크롤
            circular
            autoplayInterval={5000}
            itemTemplate={siteTemplate}
          />
        </Panel>
      </div>
      <div className="card">
        <Panel header="지원 게시글" toggleable className="panel">
          <DataTable
            value={supportList}
            paginator
            rows={5}
            className="basic-table"
            onRowClick={(e) => window.open(e.data.link, "_blank")}
            rowClassName={() => "table-row"}
            emptyMessage="게시글이 없습니다."
          >
            <Column field="title" header="제목" />
            <Column field="region" header="지역구분" />
            <Column field="createdAt" header="날짜" />
          </DataTable>
        </Panel>
      </div>
    </div>
  );
}

export default HelpInfo;

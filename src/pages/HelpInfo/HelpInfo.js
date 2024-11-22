// src/pages/HelpInfo/HelpInfo.js
import React, { useState } from "react";
import { useGlobalState } from "../../context/GlobalStateContext";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Carousel } from "primereact/carousel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./HelpInfo.scss";

function HelpInfo() {
  const { globalState } = useGlobalState(); // 글로벌 상태 및 업데이트 함수

  // globalState.role : 권한
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

  const [products, setProducts] = useState([
    { name: "1111", price: "1212" },
    { name: "2222", price: "1212" },
    { name: "3333", price: "1212" },
    { name: "4444", price: "1212" },
    { name: "5555", price: "1212" },
  ]);
  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img
            src={`https://i.ibb.co/QfCjzFd/no-Profile.jpg`}
            alt={product.name}
            className="w-6 shadow-2"
          />
        </div>
        <div>
          <h4 className="mb-1">{product.name}</h4>
          <h6 className="mt-0 mb-3">${product.price}</h6>
        </div>
      </div>
    );
  };

  return (
    <div className="stats-container">
      <div className="stats-header card">
        <span className="header-title">창업 지원 정보</span>
        <div className="header-selects">
          <Dropdown
            // value={region}
            options={regionOptions}
            // onChange={(e) => setRegion(e.value)}
            placeholder="지역 선택"
            className="dropdown"
          />
        </div>
      </div>
      <div className="table-card card">
        <Panel header="유용한 사이트" toggleable className="table-panel">
          <button>추가</button>
          <button>삭제</button>
          <Carousel
            value={products}
            numVisible={3}
            numScroll={3}
            className="custom-carousel"
            circular
            autoplayInterval={3000}
            itemTemplate={productTemplate}
          />
        </Panel>
      </div>
      <div className="table-card card">
        <Panel header="지원 게시글" toggleable className="table-panel">
          <DataTable value={null} paginator rows={5} className="table">
            <Column
              field="store_name"
              header="지역"
              body={(rowData) => (
                <span
                  className="store-link"
                  //   onClick={() => handleStoreNameClick(rowData.store_name)}
                >
                  {rowData.store_name}
                </span>
              )}
            />
            <Column field="avg_monthly_sales" header="제목" />
            <Column field="franchise_fee" header="날짜" />
            <Column field="store_count" header="매장 수" />
          </DataTable>
        </Panel>
      </div>
    </div>
  );
}

export default HelpInfo;

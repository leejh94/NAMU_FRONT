// src/pages/HelpInfo/HelpInfo.js
import React, { useState } from "react";
import { useGlobalState } from "../../context/GlobalStateContext";
import { useHelpInfo } from "../../hooks/useHelpInfo";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Carousel } from "primereact/carousel";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import "./HelpInfo.scss";

function HelpInfo() {
  const { globalState } = useGlobalState();
  const { siteList, addSite, deleteSite } = useHelpInfo();

  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    img: "",
    link: "",
    title: "",
    description: "",
  });
  const [fileError, setFileError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setFormData({ ...formData, img: reader.result });
    reader.onerror = () => setFileError("파일 업로드에 실패했습니다.");
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSite = async () => {
    try {
      const base64Image = formData.img.replace(/^data:image\/\w+;base64,/, "");
      await addSite(
        base64Image,
        formData.link,
        formData.title,
        formData.description
      );
      alert("사이트가 성공적으로 추가되었습니다.");
    } catch (error) {
      alert("사이트 추가 중 오류가 발생했습니다.");
    } finally {
      setShowDialog(false);
    }
  };

  const handleDeleteSite = async (siteId) => {
    try {
      await deleteSite(siteId);
      alert("사이트가 성공적으로 삭제되었습니다.");
    } catch (error) {
      alert("사이트 삭제 중 오류가 발생했습니다.");
    }
  };

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
    <div className="carousel-card" style={{ position: "relative" }}>
      <img
        src={siteList.imgLink}
        alt={siteList.siteName}
        className="carousel-img"
      />
      <h4 className="carousel-title">{siteList.siteName}</h4>
      <p className="carousel-description">{siteList.siteDescription}</p>
      {globalState.role === "ADMIN" && (
        <Button
          label="삭제"
          icon="pi pi-trash"
          className="carousel-delete-button"
          onClick={() => handleDeleteSite(siteList.id)}
        />
      )}
    </div>
  );

  return (
    <div className="helpInfo-container">
      <div className="helpInfo-header card">
        <span className="header-title">창업 지원 정보</span>
        <div className="header-selects">
          <Dropdown
            options={regionOptions}
            placeholder="지역 선택"
            className="dropdown"
          />
        </div>
      </div>
      <div className="table-card card">
        <Panel header="유용한 사이트" toggleable className="table-panel">
          {globalState.role === "ADMIN" && (
            <Button
              label="추가"
              icon="pi pi-plus"
              onClick={() => setShowDialog(true)}
            />
          )}
          <Carousel
            value={siteList}
            numVisible={3}
            numScroll={3}
            className="custom-carousel"
            circular
            autoplayInterval={3000}
            itemTemplate={siteTemplate}
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
                <span className="store-link">{rowData.store_name}</span>
              )}
            />
            <Column field="avg_monthly_sales" header="제목" />
            <Column field="franchise_fee" header="날짜" />
            <Column field="store_count" header="매장 수" />
          </DataTable>
        </Panel>
      </div>

      {/* 팝업 */}
      <Dialog
        header="사이트 추가"
        visible={showDialog}
        style={{ width: "400px" }}
        onHide={() => setShowDialog(false)}
      >
        <div className="p-field">
          <label htmlFor="img">이미지 업로드</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          {fileError && <small className="p-error">{fileError}</small>}
        </div>
        <div className="p-field">
          <label htmlFor="title">제목</label>
          <InputText
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="제목 입력"
          />
        </div>
        <div className="p-field">
          <label htmlFor="link">링크</label>
          <InputText
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="링크 입력"
          />
        </div>
        <div className="p-field">
          <label htmlFor="description">내용</label>
          <InputTextarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="내용 입력"
            rows={5}
          />
        </div>
        <div className="dialog-footer">
          <Button label="추가" icon="pi pi-check" onClick={handleAddSite} />
          <Button
            label="취소"
            icon="pi pi-times"
            className="p-button-secondary"
            onClick={() => setShowDialog(false)}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default HelpInfo;

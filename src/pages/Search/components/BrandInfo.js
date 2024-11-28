import React from "react";
import "./BrandInfo.scss";
import noImage from "../../../assets/noimage.jpg";

function BrandInfo({ basicInfo, newsData = [] }) {
  if (!basicInfo) {
    return <p>데이터를 불러오는 중입니다...</p>; // 데이터가 없을 때의 메시지
  }

  return (
    <div className="brand-info-container">
      {/* 브랜드 정보 카드 */}
      <div className="brand-info-card">
        <h4>브랜드 정보</h4>
        <div className="brand-info-item">
          <span className="brand-info-label">이미지</span>
          <div className="brand-info-image">
            <img
              src={basicInfo.imageUrl || noImage}
              alt="브랜드 이미지"
              width="200"
              height="200"
            />
          </div>
        </div>
        <div className="brand-info-item">
          <span className="brand-info-label">영업표지명 (브랜드명)</span>
          <span className="brand-info-value highlight ff-msl">
            {basicInfo.business_mark}
          </span>
        </div>
        <div className="brand-info-item">
          <span className="brand-info-label">회사분류</span>
          <span className="brand-info-value ff-msl">{basicInfo.industry}</span>
        </div>
        <div className="brand-info-item">
          <span className="brand-info-label">등록번호</span>
          <span className="brand-info-value ff-msl">
            {basicInfo.registration_number}
          </span>
        </div>
      </div>

      {/* 기업 정보 카드 */}
      <div className="brand-info-card">
        <h4>기업 정보</h4>
        <div className="brand-info-item">
          <span className="brand-info-label">상호명</span>
          <span className="brand-info-value highligh ff-msl">
            {basicInfo.company_name}
          </span>
        </div>
        <div className="brand-info-item">
          <span className="brand-info-label">대표자</span>
          <span className="brand-info-value ff-msl">
            {basicInfo.representative}
          </span>
        </div>
        <div className="brand-info-item">
          <span className="brand-info-label">사업자유형</span>
          <span className="brand-info-value ff-msl">
            {basicInfo.business_type}
          </span>
        </div>
        <div className="brand-info-item">
          <span className="brand-info-label">회사주소</span>
          <span className="brand-info-value ff-msl">{basicInfo.address}</span>
        </div>
        <div className="brand-info-item">
          <span className="brand-info-label">대표번호</span>
          <span className="brand-info-value ff-msl">
            {basicInfo.phone_number}
          </span>
        </div>
      </div>

      {/* 뉴스 카드 섹션 */}
      <div className="brand-info-card">
        <h4>관련 뉴스</h4>
        {newsData.length > 0 ? (
          <div className="news-grid">
            {newsData
              .slice()
              .reverse()
              .map((news, index) => (
                <div
                  key={index}
                  className="news-card"
                  onClick={() => window.open(news.link, "_blank")} // 클릭 시 새 탭에서 링크 열기
                >
                  <p className="news-title">{news.title}</p>
                  <p className="news-description ff-msl">{news.description}</p>
                  <p className="news-date">{news.pubDate}</p>
                </div>
              ))}
          </div>
        ) : (
          <div className="news-empty">
            <p>관련 뉴스가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandInfo;

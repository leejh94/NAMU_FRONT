// src/pages/Main.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.scss";
import firstImage from "../assets/ani_01.gif";
import secondImage from "../assets/graph.gif";
import fixImage from "../assets/fix.gif";
import CustomCard from "../components/CustomCard";

function Main() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <div className="main-page">
      <div className="card-area">
        <CustomCard
          title="프랜차이즈 검색"
          subTitle="프랜차이즈 정보를 한눈에!"
          image={firstImage}
          content="내가 아는 브랜드명을 검색해"
          buttonLabel="바로 가기"
          onButtonClick={() => navigate("/search")} // /search 페이지로 이동
        />
        <CustomCard
          title="프랜차이즈 통계"
          subTitle="프랜차이즈 정보를 한눈에!"
          image={secondImage}
          content="어떤 프랜차이즈가 매출이 높을까?"
          buttonLabel="바로 가기"
          onButtonClick={() => navigate("/stats")}
        />
        {/* <CustomCard
          title="창업 지원 정보"
          subTitle="제작 중인 페이지 입니다!"
          image={fixImage}
          content="나라에서 지원하는 창업 지원 정보를 확인하세요"
          buttonLabel="바로 가기"
          onButtonClick={() => alert("현재 개발 중인 페이지 입니다.")}
        />
        <CustomCard
          title="회원 게시판"
          subTitle="제작 중인 페이지 입니다!"
          image={fixImage}
          content="자유롭게 글을 작성하세요"
          buttonLabel="바로 가기"
          onButtonClick={() => alert("현재 개발 중인 페이지 입니다.")}
        /> */}
      </div>
    </div>
  );
}

export default Main;

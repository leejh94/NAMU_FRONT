// src/components/Slide.js
import React from "react";
import "./Slide.scss";
import CommonButton from "./CustomButton";

function Slide({ text, image, buttonText }) {
  return (
    <div className="slide">
      <div className="slide__content">
        <div className="slide__text">{text}</div>
        <CommonButton text="테마별 검색" size="medium" to="/search" />
      </div>
      <div className="slide__image-container">
        <img src={image} alt="Slide" className="slide__image" />
      </div>
    </div>
  );
}

export default Slide;

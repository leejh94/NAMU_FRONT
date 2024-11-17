// src/components/CustomCard.js
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CustomCard.scss"; // 스타일 파일을 만들어 추가적으로 설정

function CustomCard({
  title,
  subTitle,
  image,
  content,
  buttonLabel,
  onButtonClick,
}) {
  const header = (
    <img alt="Card Image" src={image} className="custom-card__image" />
  );

  const footer = (
    <div className="custom-card__footer">
      {/* <Button
        label={buttonLabel}
        // icon="pi pi-arrow-right"
        onClick={onButtonClick}
        className="p-button-primary"
      /> */}
    </div>
  );

  return (
    <Card
      title={title}
      subTitle={subTitle}
      header={header}
      footer={footer}
      className="custom-card"
      onClick={onButtonClick}
    >
      <p>{content}</p>
    </Card>
  );
}

export default CustomCard;

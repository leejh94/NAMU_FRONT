// src/components/CustomButton.js
import React from "react";
import { Button } from "primereact/button";

function CustomButton({ label, icon, onClick, className }) {
  return (
    <Button
      label={label}
      icon={icon}
      onClick={onClick}
      className={`${className}`}
    />
  );
}

export default CustomButton;

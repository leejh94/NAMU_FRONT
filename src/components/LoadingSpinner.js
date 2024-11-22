//src/components/LoadingSpinner.js
import React from "react";
import { useGlobalState } from "../context/GlobalStateContext";
import loadingGif from "../assets/loading.gif";
import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
  const { globalState } = useGlobalState();

  if (!globalState.isLoading) return null; // 로딩 중이 아닐 때 렌더링하지 않음

  return (
    <div className="loading-overlay">
      <img src={loadingGif} alt="Loading..." className="loading-spinner" />
    </div>
  );
};

export default LoadingSpinner;

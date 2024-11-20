//src/context/GlobalContext.js
import React, { createContext, useContext, useState } from "react";

// Context 생성
const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    isLoading: false, // 로딩 상태
    isLoggedIn: false, // 로그인 여부
    nickName: "", // 닉네임
  });

  // 전역 상태 업데이트 함수
  const updateGlobalState = (key, value) => {
    setGlobalState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <GlobalStateContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// 커스텀 훅: Context 사용
export const useGlobalState = () => useContext(GlobalStateContext);

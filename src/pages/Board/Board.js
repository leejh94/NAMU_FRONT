// src/pages/Main.js
import React, { useEffect } from "react";
import "./Board.scss";

function Board() {
  useEffect(() => {
    alert("현재 제작 중인 페이지 입니다.");
  }, []);

  return (
    <div className="board-page">
      <div className="board-card">
        <h4>회원게시판</h4>
      </div>
    </div>
  );
}

export default Board;

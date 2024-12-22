// src/pages/Board/BoardPost.js
import React, { useEffect } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { useBoard } from "../../hooks/useBoard";
import { useLocation } from "react-router-dom";
import "./BoardPost.scss";

function BoardPost() {
  const { post, fetchPost, postRecommend } = useBoard();
  const location = useLocation();
  const { postId, channelName } = location.state || {}; // postId를 state에서 가져옴

  useEffect(() => {
    if (postId) {
      fetchPost(postId); // postId로 게시글 상세 불러오기
    }
  }, [postId]);

  return (
    <div className="pages-container">
      <div className="post-page-header card">
        <p className="channelName">{channelName} </p>
        <p className="title">{post.title} </p>
        <p className="nickname">작성자 : {post.nickname} </p>
        <div className="post-pi-area">
          <div>
            <p className="pi pi-eye">
              <span className="ff-msl"> {post.viewCount}</span>
            </p>
            <p className="pi pi-thumbs-up">
              <span className="ff-msl">{post.recommendationCount}</span>
            </p>
            <p className="pi pi-comment">
              <span className="ff-msl">{post.commentCount}0</span>
            </p>
          </div>
          <p className="pi pi-calendar-clock">
            <span className="ff-msl">{post.createdAt}</span>
          </p>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        <div className="post-pi-area">
          <div>
            <div
              className={`pi pi-thumbs-up ${
                post.isRecommended ? "recommended" : ""
              }`}
              onClick={
                !post.isRecommended ? () => postRecommend(postId) : undefined
              } // 조건부 클릭 이벤트
              style={{
                cursor: post.isRecommended ? "not-allowed" : "pointer", // 추천 상태에 따라 커서 변경
              }}
            >
              <span className="ff-msl">좋아요</span>
              <span className="ff-msl">{post.recommendationCount}</span>
              {post.isRecommended && (
                <div className="tooltip">이미 추천 하셨습니다.</div> // 툴팁 추가
              )}
            </div>
            <p className="pi pi-comment">
              <span className="ff-msl">{post.commentCount || 0}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardPost;

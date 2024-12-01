// src/pages/Board/Board.js
import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { VirtualScroller } from "primereact/virtualscroller";
import { useBoard } from "../../hooks/useBoard";
import { useNavigate } from "react-router-dom";
import "./Board.scss";

function Board() {
  const {
    channel,
    setChannel,
    posts,
    sortType,
    setSortType,
    fetchPosts,
    hasMore,
    loading,
  } = useBoard();

  const navigate = useNavigate();

  const channelOptions = [
    { label: "자유", value: { channelName: "자유", channelId: 1 } },
    { label: "30대", value: { channelName: "30대", channelId: 2 } },
  ];

  const sortOptions = [
    { label: "최신순", value: "recent" },
    { label: "추천순 (오늘)", value: "recommend_today" },
    { label: "추천순 (이번주)", value: "recommend_week" },
    { label: "추천순 (한달)", value: "recommend_month" },
  ];

  // const itemTemplate = (post) => (
  //   <div className="post-item card">
  //     <div className="post-header">
  //       <p className="channel ff-msl">{channel.channelName}</p>
  //       <p className="title">{post.title}</p>
  //       <p className="title">{post.content}</p>
  //     </div>

  //     <div className="post-content">
  //       <p className="nickname ff-msl">작성자 : {post.nickname}</p>
  //     </div>

  //     <div className="post-footer">
  //       <div>
  //         <p className="pi pi-eye">
  //           <span className="ff-msl"> {post.viewCount}</span>
  //         </p>
  //         <p className="pi pi-thumbs-up">
  //           <span className="ff-msl">{post.viewCount}</span>
  //         </p>
  //         <p className="pi pi-comment">
  //           <span className="ff-msl">{post.commentCount}</span>
  //         </p>
  //       </div>
  //       <div>
  //         <p className="pi pi-calendar-clock">
  //           <span className="ff-msl">{post.createdAt}</span>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
  const itemTemplate = (post) => {
    // content에서 img 태그 추출
    const extractImages = (content) => {
      const imgTags =
        content.match(/<img [^>]*src=["']([^"']+)["'][^>]*>/g) || [];
      const imgSources = imgTags.map(
        (tag) => tag.match(/src=["']([^"']+)["']/)?.[1]
      );
      return imgSources;
    };

    // content에서 텍스트만 추출 (이미지 및 태그 제거)
    const extractText = (content) => {
      const text = content.replace(/<[^>]*>/g, ""); // 태그 제거
      return text.length > 30 ? `${text.slice(0, 30)}...` : text; // 30자 제한
    };

    const images = extractImages(post.content); // 이미지 소스 리스트
    const text = extractText(post.content); // 텍스트 내용
    const firstImage = images[0]; // 첫 번째 이미지
    const extraImagesCount = images.length > 1 ? `외 ${images.length - 1}` : ""; // 남은 이미지 개수

    return (
      <div className="post-item card">
        <div className="post-header">
          <p className="channel ff-msl">{channel.channelName}</p>
          <p className="title">{post.title}</p>
        </div>
        <div className="post-content">
          <div className="text-content">
            <p>{text}</p>
          </div>
          {firstImage && (
            <div className="image-content">
              <img src={firstImage} alt="첨부 이미지" />
              {extraImagesCount && (
                <span className="extra-images ff-msl">{extraImagesCount}</span>
              )}
            </div>
          )}
        </div>

        <div>
          <p className="nickname ff-msl">작성자: {post.nickname}</p>
        </div>
        <div className="post-footer">
          <div>
            <p className="pi pi-eye">
              <span className="ff-msl"> {post.viewCount}</span>
            </p>
            <p className="pi pi-thumbs-up">
              <span className="ff-msl">{post.recommendationCount}</span>
            </p>
            <p className="pi pi-comment">
              <span className="ff-msl">{post.commentCount}</span>
            </p>
          </div>
          <p className="pi pi-calendar-clock">
            <span className="ff-msl">{post.createdAt}</span>
          </p>
        </div>
      </div>
    );
  };

  const onScroll = (event) => {
    // 로딩 중이 아니고, 더 가져올 데이터가 있는 경우
    console.log("스크롤이벤트");
    if (!loading && hasMore) {
      console.log("추가데이터요청");
      fetchPosts(); // 추가 데이터 요청
    }
  };

  return (
    <div className="pages-container">
      <div className="pages-header card">
        <span className="header-title">회원게시판</span>
        <div className="header-selects">
          <Dropdown
            value={channel}
            options={channelOptions}
            onChange={(e) => setChannel(e.value)}
            placeholder="채널 선택"
            className="dropdown"
          />
          <Dropdown
            value={sortType}
            options={sortOptions}
            onChange={(e) => setSortType(e.value)}
            placeholder="정렬 방식 선택"
            className="dropdown"
          />
        </div>
      </div>
      <div className="card">
        <Panel header="글목록" toggleable className="panel">
          <div className="panel-header">
            <Button
              label="글 작성"
              icon="pi pi-plus"
              onClick={() => {
                navigate("/boardAdd", {
                  state: {
                    channelId: channel.channelId,
                    channelName: channel.channelName,
                  },
                });
              }}
            />
          </div>
          <VirtualScroller
            items={posts}
            itemSize={250}
            loading={loading}
            loadingIcon="pi pi-spin pi-spinner"
            onScroll={onScroll}
            itemTemplate={itemTemplate}
            className="board-scroll"
          />
        </Panel>
      </div>
    </div>
  );
}

export default Board;

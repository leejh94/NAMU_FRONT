// src/pages/Board/BoardAdd.js
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import heic2any from "heic2any"; // HEIC 파일 지원 라이브러리
import { useLocation, useNavigate } from "react-router-dom";
import { useBoard } from "../../hooks/useBoard";
import "./BoardAdd.scss";

function BoardAdd() {
  const navigate = useNavigate();
  const location = useLocation();
  const { channelId, channelName } = location.state || {};

  useEffect(() => {
    console.log(channelId);

    if (!channelId) {
      alert("잘못된 접근 입니다.");
      navigate("/board");
    }
  }, []);

  // 게시글 업로드 호출 함수를 useBoard에서 가져와서 사용
  const { createPost } = useBoard(); // 게시글 추가 함수 가져오기

  const [post, setPost] = useState({
    channelId: channelId,
    title: "",
    content: "",
  });

  const [imageCount, setImageCount] = useState(0); // 이미지 개수

  // 에디터 내용 변경
  const handleEditorChange = (e) => {
    const content = e.htmlValue || ""; // htmlValue가 null일 경우 빈 문자열로 처리

    // 글자 수 제한 (1000자)
    if (content.replace(/<[^>]*>?/gm, "").length > 1000) {
      alert("글자 수는 최대 1000자까지 입력 가능합니다.");
      return;
    }

    // 이미지 개수 동기화
    const imageTags =
      content.match(/<img [^>]*src=["']([^"']+)["'][^>]*>/g) || [];
    setImageCount(imageTags.length); // 이미지 태그의 개수로 이미지 개수 업데이트

    setPost((prev) => ({
      ...prev,
      content,
    }));
  };

  // 이미지 업로드 핸들러
  const uploadHandler = async (event) => {
    let file = event.files[0];

    // 파일 유효성 검증
    if (!file) {
      console.warn("업로드된 파일이 없습니다.");
      return;
    }

    // 이미지 등록 수 제한
    if (imageCount >= 4) {
      alert("이미지는 최대 4장까지만 등록할 수 있습니다.");
      return;
    }

    // HEIC 파일 변환 처리
    if (file.type === "image/heic") {
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
        });
        file = new File(
          [convertedBlob],
          file.name.replace(/\.heic$/i, ".jpg"),
          {
            type: "image/jpeg",
          }
        );
      } catch (error) {
        alert("HEIC 파일을 처리하는 중 오류가 발생했습니다.");
        return;
      }
    }

    // 확장자 검증
    const allowedExtensions = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedExtensions.includes(file.type)) {
      alert("JPEG, PNG, GIF 형식의 이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 검증 (5MB 제한)
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      alert("파일 크기가 5MB를 초과합니다. 더 작은 파일을 업로드해주세요.");
      return;
    }

    // 이미지 압축 처리
    const compressedImage = await compressImage(file);

    // 압축된 이미지를 Base64로 변환 및 삽입
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target.result;

      setPost((prev) => ({
        ...prev,
        content: `${prev.content}<img src="${base64String}" alt="첨부 이미지" />`,
      }));

      setImageCount((prevCount) => prevCount + 1); // 이미지 개수 증가
    };

    reader.readAsDataURL(compressedImage);
  };

  // 이미지 압축 함수
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 원본 이미지 크기 유지
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: file.type }));
          },
          file.type,
          0.7 // 이미지 품질 조정 (0.7 = 70%)
        );
      };

      reader.readAsDataURL(file);
    });
  };

  // 게시글 등록
  const handleSubmit = () => {
    if (!post.title.trim() || !post.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    createPost(post);
  };

  return (
    <div className="pages-container">
      <div className="pages-header card">
        <span className="header-title">게시글 작성 - {channelName}</span>
      </div>

      <div className="card">
        {/* 제목 입력 */}
        <div className="field">
          <label htmlFor="title" className="block font-bold mb-2">
            제목
          </label>
          <InputText
            id="title"
            name="title"
            value={post.title}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="제목을 입력하세요"
            className="ff-msl w-full"
          />
        </div>

        {/* 내용 입력 (에디터) */}
        <div className="field mt-4">
          <label htmlFor="content" className="block font-bold mb-2">
            내용
          </label>
          <Editor
            id="content"
            value={post.content}
            onTextChange={handleEditorChange}
            headerTemplate={
              <span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadHandler({ files: e.target.files })}
                  style={{ display: "none" }}
                  id="upload-image"
                />
                <label htmlFor="upload-image" className="pi pi-image"></label>
              </span>
            }
            style={{ height: "500px" }}
            placeholder={`이미지는 최대 4장까지 업로드 가능합니다.
이미지 한 장당 최대 5MB까지 업로드 가능합니다.`}
          />
        </div>

        <div className="field mt-4">
          <Button
            label="게시글 등록"
            icon="pi pi-check"
            className="p-button-success w-full"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default BoardAdd;

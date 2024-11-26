// src/pages/HelpInfo/HelpInfoAdmin.js
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useHelpInfo } from "../../hooks/useHelpInfo";
import { useLogin } from "../../hooks/useLogin";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./HelpInfoAdmin.scss";

function HelpInfoAdmin() {
  const {
    siteList,
    setSiteList,
    saveNewOrder,
    addSite,
    deleteSite,
    updateSite,
  } = useHelpInfo();

  const { adminCheck } = useLogin();

  useEffect(() => {
    adminCheck();
  }, []);

  const [showDialog, setShowDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부
  const [editingSite, setEditingSite] = useState(null); // 현재 수정 중인 사이트 정보
  const [formData, setFormData] = useState({
    img: "",
    link: "",
    title: "",
    description: "",
  });
  const [fileError, setFileError] = useState("");

  // 드래그 앤 드롭 핸들러
  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) return;

    const updatedList = Array.from(siteList);
    const [movedItem] = updatedList.splice(source.index, 1);
    updatedList.splice(destination.index, 0, movedItem);

    const reorderedList = updatedList.map((item, idx) => ({
      ...item,
      indexOrder: idx + 1,
    }));

    setSiteList(reorderedList);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, img: reader.result }); // base64로 변환된 이미지 설정
    };
    reader.onerror = () => setFileError("파일 업로드에 실패했습니다.");
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        // 수정 모드
        const img = formData.img
          ? formData.img.replace(/^data:image\/\w+;base64,/, "")
          : null; // 이미지가 변경되지 않았으면 null
        await updateSite(
          editingSite.siteInfoId,
          img,
          formData.link,
          formData.title,
          formData.description
        );
        alert("사이트가 성공적으로 수정되었습니다.");
      } else {
        // 추가 모드
        const base64Image = formData.img.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
        await addSite(
          base64Image,
          formData.link,
          formData.title,
          formData.description
        );
        alert("사이트가 성공적으로 추가되었습니다.");
      }
    } catch (error) {
      alert(
        isEditMode
          ? "사이트 수정 중 오류가 발생했습니다."
          : "사이트 추가 중 오류가 발생했습니다."
      );
    } finally {
      setShowDialog(false);
      setFormData({ img: "", link: "", title: "", description: "" });
      setIsEditMode(false);
      setEditingSite(null);
    }
  };

  const handleEdit = (site) => {
    setIsEditMode(true);
    setEditingSite(site);
    setFormData({
      img: "", // 기존 이미지를 유지하기 위해 기본값을 빈 문자열로 설정
      link: site.siteLink,
      title: site.siteName,
      description: site.siteDescription,
    });
    setShowDialog(true);
  };

  const handleDeleteSite = async (siteId) => {
    try {
      await deleteSite(siteId);
      alert("사이트가 성공적으로 삭제되었습니다.");
    } catch (error) {
      alert("사이트 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="pages-container">
      <div className="pages-header card">
        <span className="header-title">창업 지원 정보 - 관리자</span>
      </div>
      <div className="card">
        <Panel header="유용한 사이트" toggleable className="panel">
          <div className="panel-header">
            <Button
              label="추가"
              icon="pi pi-plus"
              onClick={() => {
                setIsEditMode(false);
                setShowDialog(true);
              }}
            />
            <Button
              label="순서 저장"
              icon="pi pi-save"
              onClick={saveNewOrder}
              className="p-button-success"
            />
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div
              className="scroll-container"
              style={{ overflowY: "auto", height: "700px" }}
            >
              <Droppable droppableId="siteList">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="editable-table"
                  >
                    {siteList.map((site, index) => (
                      <Draggable
                        key={site.siteInfoId}
                        draggableId={String(site.siteInfoId)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="draggable-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="site-item card">
                              <div className="content">
                                <img src={site.imgLink} alt={site.siteName} />
                                <div className="text">
                                  <span className="title">
                                    제목 : {site.siteName}
                                  </span>
                                  <span className="title">
                                    링크 : {site.siteLink}
                                  </span>
                                </div>
                              </div>
                              <div className="action">
                                <Button
                                  label="수정"
                                  icon="pi pi-pencil"
                                  className="p-button-text button"
                                  onClick={() => handleEdit(site)}
                                />
                                <Button
                                  label="삭제"
                                  icon="pi pi-trash"
                                  className="p-button-text p-button-danger button"
                                  onClick={() =>
                                    handleDeleteSite(site.siteInfoId)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </Panel>
      </div>

      <Dialog
        header={isEditMode ? "사이트 정보 수정" : "사이트 정보 추가"}
        visible={showDialog}
        onHide={() => {
          setShowDialog(false);
          setFormData({ img: "", link: "", title: "", description: "" });
          setEditingSite(null); // editingSite 초기화
        }}
        className="site-info-popup"
      >
        {/* 현재 이미지 */}
        {isEditMode && (
          <div className="p-field">
            <span>현재 이미지</span>
            <div>
              <img
                src={editingSite?.imgLink || ""}
                alt="현재 이미지"
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
        )}

        {/* 이미지 업로드 */}
        <div className="p-field">
          <span>
            {isEditMode ? (
              <>
                이미지 변경 <br />
                (선택 사항)
              </>
            ) : (
              "이미지 업로드"
            )}
          </span>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          {fileError && <small className="p-error">{fileError}</small>}
        </div>

        {/* 변경된 이미지 미리보기 */}
        {formData.img && (
          <div className="p-field">
            <span>{isEditMode ? "변경할 이미지" : "미리보기"}</span>
            <div>
              <img
                src={formData.img}
                alt="변경된 이미지"
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
        )}

        {/* 제목 입력 */}
        <div className="p-field">
          <span>제목</span>
          <InputText
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="제목 입력"
          />
        </div>

        {/* 링크 입력 */}
        <div className="p-field">
          <span>링크</span>
          <InputText
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="링크 입력"
          />
        </div>

        {/* 내용 입력 */}
        <div className="p-field">
          <span>내용</span>
          <InputTextarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="내용 입력"
            rows={2}
          />
        </div>

        {/* 저장 및 취소 버튼 */}
        <div className="dialog-footer">
          <Button label="저장" icon="pi pi-check" onClick={handleSave} />
          <Button
            label="취소"
            icon="pi pi-times"
            className="p-button-secondary"
            onClick={() => {
              setShowDialog(false);
              setFormData({ img: "", link: "", title: "", description: "" });
              setEditingSite(null); // editingSite 초기화
            }}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default HelpInfoAdmin;

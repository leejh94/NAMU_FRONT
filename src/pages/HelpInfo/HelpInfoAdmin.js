// src/pages/HelpInfo/HelpInfoAdmin.js
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useHelpInfo } from "../../hooks/useHelpInfo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./HelpInfoAdmin.scss";

function HelpInfoAdmin() {
  const { siteList, setSiteList, saveNewOrder, addSite, deleteSite } =
    useHelpInfo();

  const [showDialog, setShowDialog] = useState(false);
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

    // 리스트 순서 변경
    const updatedList = Array.from(siteList);
    const [movedItem] = updatedList.splice(source.index, 1);
    updatedList.splice(destination.index, 0, movedItem);

    // indexOrder 업데이트
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
    reader.onload = () => setFormData({ ...formData, img: reader.result });
    reader.onerror = () => setFileError("파일 업로드에 실패했습니다.");
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSite = async () => {
    try {
      const base64Image = formData.img.replace(/^data:image\/\w+;base64,/, "");
      await addSite(
        base64Image,
        formData.link,
        formData.title,
        formData.description
      );
      alert("사이트가 성공적으로 추가되었습니다.");
    } catch (error) {
      alert("사이트 추가 중 오류가 발생했습니다.");
    } finally {
      setShowDialog(false);
    }
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
              onClick={() => setShowDialog(true)}
            />
            <Button
              label="순서 저장"
              icon="pi pi-save"
              onClick={saveNewOrder} // useHelpInfo의 saveNewOrder 호출
              className="p-button-success"
            />
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div
              className="scroll-container"
              style={{ overflowY: "auto", height: "500px" }}
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
                              <img
                                src={site.imgLink}
                                alt={site.siteName}
                                style={{ width: "50px", height: "50px" }}
                              />
                              <span className="order">
                                순서 : {site.indexOrder}
                              </span>
                              <span className="title">
                                링크 : {site.siteLink}
                              </span>
                              <span className="title">
                                제목 : {site.siteName}
                              </span>
                              <span className="description">
                                내용 : {site.siteDescription}
                              </span>
                              <Button
                                label="수정"
                                icon="pi pi-pencil"
                                className="p-button-text"
                              />
                              <Button
                                label="삭제"
                                icon="pi pi-trash"
                                className="p-button-text p-button-danger"
                                onClick={() =>
                                  handleDeleteSite(site.siteInfoId)
                                }
                              />
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

      {/* 팝업 */}
      <Dialog
        header="사이트 추가"
        visible={showDialog}
        style={{ width: "400px" }}
        onHide={() => setShowDialog(false)}
      >
        <div className="p-field">
          <label htmlFor="img">이미지 업로드</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          {fileError && <small className="p-error">{fileError}</small>}
        </div>
        <div className="p-field">
          <label htmlFor="title">제목</label>
          <InputText
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="제목 입력"
          />
        </div>
        <div className="p-field">
          <label htmlFor="link">링크</label>
          <InputText
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="링크 입력"
          />
        </div>
        <div className="p-field">
          <label htmlFor="description">내용</label>
          <InputTextarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="내용 입력"
            rows={5}
          />
        </div>
        <div className="dialog-footer">
          <Button label="추가" icon="pi pi-check" onClick={handleAddSite} />
          <Button
            label="취소"
            icon="pi pi-times"
            className="p-button-secondary"
            onClick={() => setShowDialog(false)}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default HelpInfoAdmin;

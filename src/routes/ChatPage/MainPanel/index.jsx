import React, { useState } from "react";
import styled from "styled-components";
import ContentTitle from "../../../components/ContentTitle";
import ContentList from "../../../components/ContentList";
import ContentLayout from "../../../components/ContentLayout";
import Modal from "../../../components/Modal";
import { FilledButton } from "../../../components/Button";
import { useForm } from "react-hook-form";
import {
  ErrorMsg,
  OutlinedInput,
  OutlinedTxtArea,
  Title,
} from "../../../components/Inline";
import { useSelector } from "react-redux";
import { ref, onValue, push, child, update } from "firebase/database";
import { database } from "../../../firebase";

const MainPanel = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = (data) => {
    addChatRoom(data);
    reset((values) => ({ ...values, title: "", desc: "" }));
  };

  const addChatRoom = async (data) => {
    let key = push(child(ref(database), "chatRooms")).key;
    const newChatRoom = {
      id: key,
      title: data.title,
      description: data.desc,
      createdBy: {
        name: user.displayName,
        // image: user.photoURL
      },
    };

    try {
      await update(ref(database, "chatRooms/" + key), newChatRoom);
      setShowModal(false);
    } catch (error) {}
  };

  return (
    <Container>
      <ContentTitle>
        Chat Rooms
        <Control onClick={openModal}>
          <button />
        </Control>
        <Modal showModal={showModal} closeModal={closeModal}>
          <ModalContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Title>Create Chat Room</Title>
              <OutlinedInput
                type="text"
                placeholder="채팅방 이름을 입력해주세요"
                {...register("title", { required: true })}
              />
              <OutlinedTxtArea
                type="text"
                placeholder="채팅방 소개를 입력해주세요"
                maxLength={100}
                {...register("desc")}
              />
              {errors.title && errors.title.type === "required" && (
                <ErrorMsg>제목을 입력해주세요</ErrorMsg>
              )}
              <FilledButton type="submit">생성</FilledButton>
            </form>
          </ModalContent>
        </Modal>
      </ContentTitle>
      <ContentList>
        <li>First room </li>
        <li>First room </li>
        <li>First room </li>
        <li>First room </li>
        <li>First room </li>
        <li>First room </li>
        <li>First room </li>
        <li>First room </li>
        <li>First room </li>
        <li>First room </li>
        <li>First room </li>
        <li>First room </li>
      </ContentList>
    </Container>
  );
};

const Container = styled(ContentLayout)`
  li {
    padding: 10px 20px;
  }
`;
const Control = styled.div`
  z-index: 5;
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 10px;
  border-radius: 50px;
  background-color: black;

  button {
    width: 20px;
    height: 20px;
    background: url("/images/chat.png") center center no-repeat;
    background-size: contain;
  }
`;

const ModalContent = styled.section`
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;
export default MainPanel;

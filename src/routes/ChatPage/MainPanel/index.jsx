import React, { useEffect, useMemo, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { ref, push, child, update, onChildAdded, off } from "firebase/database";
import { database } from "../../../firebase";
import { setChatRoom } from "../../../features/chat/chatSlice";

const MainPanel = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const user = useSelector((state) => state.user.currentUser);
  const chatRooms = useSelector((state) => state.chat);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = (data) => {
    addChatRoom(data);
    setShowModal(false);
    reset((values) => ({ ...values, title: "", desc: "" }));
  };

  // 채팅방 생성
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
    } catch (error) {
      alert(`[addChatRoom] ${error}`);
    }
  };

  useEffect(() => {
    // 채팅방 추가 이벤트 리스너
    const chatRoomsRef = ref(database, "chatRooms");
    let chatRoomsArray = [];
    onChildAdded(chatRoomsRef, (snapshot) => {
      chatRoomsArray = [...chatRoomsArray, snapshot.val()];
      dispatch(setChatRoom(chatRoomsArray));
    });
    return () => off(chatRoomsRef, onChildAdded);
  }, [dispatch]);

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
        {chatRooms.length > 0 &&
          chatRooms.map((room) => <li key={room.id}>{room.title}</li>)}
        {chatRooms.length === 0 && (
          <li className="noData">생성된 채팅이 없습니다</li>
        )}
      </ContentList>
    </Container>
  );
};

const Container = styled(ContentLayout)`
  div.loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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

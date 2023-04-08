import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { noSearch, onSearch } from "../../../features/search/searchSlice";

const ChatHeader = ({ chatRoomInfo, handleSearchMessages }) => {
  const navigate = useNavigate();
  const { handleSubmit, register, reset, setFocus } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const isSearching = useSelector((state) => state.search);

  useEffect(() => {
    setFocus("search");
  });

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const onSubmit = (data) => {
    setKeyword(data.search);
    dispatch(onSearch());
    handleSearchMessages(data.search);
    closeModal();
    reset((values) => ({ ...values, search: "" }));
  };
  const cancelSearch = () => {
    dispatch(noSearch());
  };

  return (
    <Header>
      <Info>
        {isSearching ? (
          <span>{`'${keyword}'`} 검색 결과</span>
        ) : (
          <>
            <h2>{chatRoomInfo && chatRoomInfo.title}</h2>
            <p>{chatRoomInfo && chatRoomInfo.description}</p>
          </>
        )}
      </Info>
      <Control>
        {isSearching && <button className="cancel" onClick={cancelSearch} />}
        <button className="search" onClick={openModal} />
        <button className="exit" onClick={() => navigate("/chat")} />
      </Control>
      <Modal showModal={showModal} closeModal={closeModal}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="메시지 검색" {...register("search")} />
          </form>
        </ModalContent>
      </Modal>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: column;
  margin-bottom: 10px;
`;
const Info = styled.div`
  width: 100%;
  flex: 9;
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
    text-align: left;
  }
  p {
    font-size: 14px;
  }
`;
const Control = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex: 1;
  gap: 10px;
  button.cancel {
    background: url("/images/close.png") center center no-repeat;
    background-size: contain;
    width: 15px;
    height: 15px;
  }
  button.search {
    background: url("/images/search.png") center center no-repeat;
    background-size: contain;
    width: 17px;
    height: 17px;
  }
  button.exit {
    background: url("/images/exit.png") center center no-repeat;
    background-size: contain;
    width: 28px;
    height: 28px;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  input {
    height: 40px;
    padding-inline: 10px;
    box-sizing: border-box;
  }
`;
export default ChatHeader;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ChatHeader = ({ chatRoomInfo }) => {
  const navigate = useNavigate();

  return (
    <Header>
      <Info>
        <h2>{chatRoomInfo && chatRoomInfo.title}</h2>
        <p>{chatRoomInfo && chatRoomInfo.description}</p>
      </Info>
      <Control>
        <button className="search" />
        <button className="exit" onClick={() => navigate("/chat")} />
      </Control>
    </Header>
  );
};

const Header = styled.header`
  flex: 1;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
  }
`;
const Control = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  button.search {
    background: url("/images/search.png") center center no-repeat;
    background-size: contain;
    width: 17px;
    height: 17px;
  }
  button.exit {
    background: url("/images/exit.png") center center no-repeat;
    background-size: contain;
    width: 30px;
    height: 30px;
  }
`;
export default ChatHeader;

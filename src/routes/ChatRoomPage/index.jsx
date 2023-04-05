import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { ErrorMsg, Input } from "../../components/Inline";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { database } from "../../firebase";
import { push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { serverTimestamp } from "firebase/database";

const ChatRoomPage = () => {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  const chatRoomInfo = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user.currentUser);

  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const createMessage = (content, fileUrl = null) => {
    const message = {
      timestamp: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
    };
    // 채팅창에 이미지를 첨부 했을 경우
    if (fileUrl != null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = content;
    }
    return message;
  };

  const onSubmit = async (data) => {
    if (!data.chatInput || loading) {
      setErrors("빈칸");
      return;
    }
    setLoading(true);
    // Firebase에 메시지 저장
    try {
      await push(
        ref(database, "messages/" + chatRoomInfo.id),
        createMessage(data)
      );
      setLoading(false);
      setErrors("");
    } catch (error) {
      setErrors(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrors("");
      }, 3000);
    }

    reset((values) => ({ ...values, chatInput: "" }));
  };

  return (
    <Layout>
      <Wrapper>
        <ChatHeader>
          <Info>
            <h2>{chatRoomInfo && chatRoomInfo.title}</h2>
            <p>{chatRoomInfo && chatRoomInfo.description}</p>
          </Info>
          <Control>
            <button className="search" />
            <button className="exit" onClick={() => navigate("/chat")} />
          </Control>
        </ChatHeader>
        <ChatContainer>
          <Message>
            <You>모코코</You>: 케케켘ㅋㅋㅋㅋㅋㅋㅋㅋㅋ
          </Message>
          <Message>
            <Me>태태</Me>: 케케켘ㅋㅋㅋㅋㅋㅋㅋㅋㅋ
          </Message>
        </ChatContainer>
        <ChatInputContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="채팅을 입력해주세요"
              {...register("chatInput")}
            />
            <button>전송</button>
          </form>
          {errors && (
            <ErrorMsg>
              {errors === "빈칸"
                ? ""
                : "메시지 전송에 실패했습니다. 다시 시도해주세요"}
            </ErrorMsg>
          )}
        </ChatInputContainer>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
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
    background: url("images/search.png") center center no-repeat;
    background-size: contain;
    width: 17px;
    height: 17px;
  }
  button.exit {
    background: url("images/exit.png") center center no-repeat;
    background-size: contain;
    width: 30px;
    height: 30px;
  }
`;

const ChatContainer = styled.ul`
  flex: 9;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12px;
  overflow: scroll;
`;
const Message = styled.li`
  display: block;
  font-size: 14px;
`;
const Me = styled.span`
  background: var(--point-color);
  color: black;
  padding-inline: 3px;
`;
const You = styled.span``;

const ChatInputContainer = styled.div`
  flex: 1;
  border-top: 1px solid var(--point-color);
  box-sizing: border-box;
  margin-top: 15px;
  form {
    display: flex;
  }
  input {
    height: 40px;
    flex: 9;
  }
  button {
    flex: 1;
    &:hover {
      background-color: var(--point-color);
      color: black;
    }
  }
  span {
    font-size: 14px;
    text-align: center;
  }
`;

export default ChatRoomPage;

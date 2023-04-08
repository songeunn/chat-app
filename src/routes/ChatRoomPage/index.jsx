import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { ErrorMsg, Input } from "../../components/Inline";
import { useForm } from "react-hook-form";
import { database } from "../../firebase";
import { off, onChildAdded, push, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { serverTimestamp } from "firebase/database";
import ChatHeader from "./ChatHeader";
import { useParams } from "react-router-dom";
import Message from "./Message";
import Loading from "../../components/Loading";

const ChatRoomPage = () => {
  const { handleSubmit, register, reset } = useForm();
  const { id } = useParams();
  const scrollRef = useRef();
  const chatRoomInfo = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user.currentUser);
  const isSearching = useSelector((state) => state.search);

  const [errors, setErrors] = useState("");
  const [messages, setMessages] = useState({
    messages: [],
    messageLoading: false,
  });
  const [searchResults, setSearchResults] = useState({
    results: [],
    searchLoading: false,
  });

  const createMessage = (content, fileUrl = null) => {
    // 메시지 정보
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
    // Firebase에 메시지 저장(전송)
    if (!data.chatInput) {
      setErrors("empty");
      return;
    }
    try {
      await push(
        ref(database, "messages/" + chatRoomInfo.id),
        createMessage(data)
      );
      setErrors("");
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } catch (error) {
      setErrors(error.message);
      setTimeout(() => {
        setErrors("");
      }, 3000);
    }
    reset((values) => ({ ...values, chatInput: "" }));
  };

  const handleSearchMessages = (searchTerm) => {
    setSearchResults({ searchLoading: true });
    // 메시지 검색
    if (!messages.messageLoading) {
      const chatRoomMessages = [messages.messages];
      const regex = new RegExp(searchTerm, "gi");
      const searchResults = chatRoomMessages[0].reduce((acc, message) => {
        if (
          (message.content && message.content.chatInput.match(regex)) ||
          message.user.name.match(regex)
        ) {
          acc.push(message);
        }
        return acc;
      }, []);
      setSearchResults({ results: searchResults, searchLoading: false });
    }
  };

  useEffect(() => {
    // 메시지 추가 이벤트 리스너
    const messagesRef = ref(database, "messages/" + id);
    let messagesArray = [];
    onChildAdded(messagesRef, (snapshot) => {
      setMessages({ messageLoading: true });
      messagesArray = [...messagesArray, snapshot.val()];
      setMessages({ messages: messagesArray, messageLoading: false });
    });

    // 채팅방 스크롤 위치 최하단으로 조정
    setTimeout(() => {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 10);

    return () => off(messagesRef, onChildAdded);
  }, [chatRoomInfo, id]);

  const renderMessages = (messages) => {
    return messages.map((msg) => (
      <Message key={msg.timestamp} message={msg} user={msg.user} />
    ));
  };

  return (
    <Layout>
      <Wrapper>
        <ChatHeader
          chatRoomInfo={chatRoomInfo}
          handleSearchMessages={handleSearchMessages}
        />
        <ChatContainer ref={scrollRef}>
          {messages.messageLoading ? (
            <Loading />
          ) : isSearching ? (
            renderMessages(searchResults.results)
          ) : (
            renderMessages(messages.messages)
          )}
        </ChatContainer>
        <ChatInputContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="채팅을 입력해주세요"
              {...register("chatInput")}
            />
            <button type="submit">전송</button>
          </form>
          {errors && (
            <ErrorMsg>
              {errors === "empty"
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

const ChatContainer = styled.ul`
  flex: 9;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  overflow-y: scroll;
  gap: 12px;
  &::before {
    content: "";
    display: block;
    flex: 1 1 auto;
  }
`;
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

import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";

const Message = ({ message, user }) => {
  const { currentUser } = useSelector((state) => state.user);

  const timeFromNow = (timestamp) => moment(timestamp).fromNow();
  const sendedTime = timeFromNow(message.timestamp);

  const isSendByMe = (message) => {
    return message.user.id === currentUser.uid;
  };
  return (
    <MessageContainer>
      <SpaceBetween>
        <Chat>
          <AvatarImg src={user.image} alt="avatar" />
          <UserName isSendByMe={isSendByMe(message)}>{user.name}</UserName>:
          {!message.content.chatInput ? (
            <ChatImg src={message.content} alt="chatImage" />
          ) : (
            message.content.chatInput
          )}
        </Chat>
        <Time>{sendedTime}</Time>
      </SpaceBetween>
    </MessageContainer>
  );
};

const MessageContainer = styled.li`
  display: block;
  font-size: 14px;
  color: var(--point-color);
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Chat = styled.section`
  flex: 7;
  display: flex;
  justify-content: flex-start;
`;
const AvatarImg = styled.img`
  width: 8px;
  height: 8px;
  margin-right: 5px;
`;
const ChatImg = styled.img`
  width: 50%;
`;
const Time = styled.span`
  flex: 3;
  font-size: 13px;
  text-align: right;
`;

const UserName = styled.span`
  background-color: ${(props) => props.isSendByMe && `var(--point-color)`};
  color: ${(props) => (props.isSendByMe ? "black" : ``)};
  height: fit-content;
`;

export default Message;

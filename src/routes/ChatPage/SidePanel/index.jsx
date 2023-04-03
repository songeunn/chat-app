import React, { useState } from "react";
import styled from "styled-components";
import LogoutButton from "../../../components/LogoutButton";
import ContentList from "../../../components/ContentList";
import ContentTitle from "../../../components/ContentTitle";
import ContentLayout from "../../../components/ContentLayout";
import { useSelector } from "react-redux";

const SidePanel = () => {
  const [active, setActive] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <UserInfo onClick={() => setActive(!active)}>
        {currentUser.displayName}▾
        <ul className={active ? `dropdown active` : `dropdown`}>
          <li>
            <LogoutButton>로그아웃</LogoutButton>
          </li>
        </ul>
      </UserInfo>
      <Favorite>
        <ContentTitle>Favorite</ContentTitle>
        <ContentList>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
        </ContentList>
      </Favorite>
      <DirectMessage>
        <ContentTitle>Direct Message</ContentTitle>
        <ContentList>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
          <li>First romms</li>
        </ContentList>
      </DirectMessage>
    </Container>
  );
};

const Container = styled.section`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 20px;
  box-sizing: border-box;
  li {
    padding: 5px 10px;
  }
`;
const UserInfo = styled.section`
  border: 1px solid var(--point-color);
  padding-inline: 4px;
  padding-block: 5px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  ul.dropdown {
    display: none;
    margin-top: 5px;
  }
  ul.active {
    display: block;
  }
  li {
    padding: 0;
  }
`;

const Favorite = styled(ContentLayout)``;

const DirectMessage = styled(ContentLayout)``;

export default SidePanel;

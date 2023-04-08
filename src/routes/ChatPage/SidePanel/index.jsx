import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LogoutButton from "../../../components/LogoutButton";
import ContentList from "../../../components/ContentList";
import ContentTitle from "../../../components/ContentTitle";
import ContentLayout from "../../../components/ContentLayout";
import Dropdown from "../../../components/Dropdown";
import DropdownItem from "../../../components/DropdownItem";
import { useSelector } from "react-redux";

const SidePanel = () => {
  const [active, setActive] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <UserInfo onClick={() => setActive(!active)}>
        <img src={user.photoURL} alt="avatar" />
        {user.displayName}▾
        <Dropdown active={active}>
          <DropdownItem>
            <LogoutButton />
          </DropdownItem>
        </Dropdown>
      </UserInfo>
      <Favorite>
        <ContentTitle>Favorite</ContentTitle>
        <ContentList></ContentList>
      </Favorite>
      <DirectMessage>
        <ContentTitle>Direct Message</ContentTitle>
        <ContentList></ContentList>
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
`;
const UserInfo = styled.section`
  border: 1px solid var(--point-color);
  padding-inline: 4px;
  padding-block: 5px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  img {
    width: 10px;
    margin-right: 5px;
  }
`;

const Favorite = styled(ContentLayout)``;

const DirectMessage = styled(ContentLayout)``;

export default SidePanel;

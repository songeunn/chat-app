import React from "react";
import styled from "styled-components";
import ContentTitle from "../../../components/ContentTitle";
import ContentList from "../../../components/ContentList";
import ContentLayout from "../../../components/ContentLayout";

const MainPanel = () => {
  return (
    <Container>
      <ContentTitle>Chat Rooms</ContentTitle>
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
export default MainPanel;

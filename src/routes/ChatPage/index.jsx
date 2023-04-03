import React from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import MainPanel from "./MainPanel";
import SidePanel from "./SidePanel";

const ChatPage = () => {
  return (
    <Layout>
      <Wrapper>
        <SidePanel />
        <MainPanel />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`;
export default ChatPage;

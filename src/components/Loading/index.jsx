import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Wrap>
      <img src="/images/loading.gif" alt="loading" />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 35px;
    height: 35px;
  }
`;

export default Loading;

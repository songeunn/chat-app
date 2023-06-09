import React from "react";
import styled from "styled-components";

const ContentList = ({ children }) => {
  return (
    <ListContainer>
      <ul>{children}</ul>
    </ListContainer>
  );
};

const ListContainer = styled.section`
  font-size: 14px;
  height: 100%;
  ul {
    display: flex;
    flex-direction: column;
    height: 100%;
    li {
      cursor: pointer;
      padding: 7px 10px;

      &:hover {
        background-color: var(--point-color);
        color: black;
      }
    }
    .noData {
      height: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default ContentList;

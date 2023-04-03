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
  margin-top: 10px;
  font-size: 14px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    li {
      cursor: pointer;
      &:hover {
        background-color: var(--point-color);
        color: black;
      }
    }
  }
`;

export default ContentList;

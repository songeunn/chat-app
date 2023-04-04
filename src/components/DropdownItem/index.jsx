import React from "react";
import styled from "styled-components";

const DropdownItem = ({ children }) => {
  return <Item>{children}</Item>;
};

const Item = styled.li`
  color: var(--point-color);
  &:hover {
    background-color: var(--point-color);
    color: black;
  }
`;

export default DropdownItem;

import React from "react";
import styled from "styled-components";

const LogoutButton = ({ children }) => {
  return <Button>{children}</Button>;
};

const Button = styled.button`
  width: 100%;
  color: var(--point-color);
  &:hover {
    background-color: var(--point-color);
    color: black;
  }
`;

export default LogoutButton;

import React from "react";
import styled from "styled-components";

const Dropdown = ({ active, children }) => {
  return <Container className={active ? `active` : null}>{children}</Container>;
};

const Container = styled.ul`
  display: none;
  margin-top: 5px;
  &.active {
    display: block;
  }
`;

export default Dropdown;

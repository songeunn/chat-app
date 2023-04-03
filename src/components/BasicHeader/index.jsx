import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BasicHeader = ({ pageName }) => {
  const navigate = useNavigate();
  return (
    <Header>
      <img
        src="/images/home.png"
        alt="home"
        className="home"
        onClick={() => navigate("/")}
      />
      <h2>{pageName}</h2>
      <div />
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  img.home {
    width: 18px;
    cursor: pointer;
  }
  h2 {
    font-size: 18px;
  }
`;

export default BasicHeader;

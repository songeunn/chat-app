import React, { useEffect } from "react";
import Layout from "./components/Layout";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setUser } from "./features/user/userSlice";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // 로그인된 유저
      if (user) {
        dispatch(setUser(user));
        navigate("/chat");
      } else {
        navigate("/");
      }
    });
  }, [navigate, dispatch]);

  return (
    <Layout>
      <Wrapper>
        <Logo>
          <img src="/images/logo.png" alt="logo" />
          <h2>PIXEL CHAT</h2>
        </Logo>
        <ul>
          <li>
            <Link to="/signup">▶️ 회원가입</Link>
          </li>
          <li>
            <Link to="/login">▶️ 로그인</Link>
          </li>
        </ul>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    margin-bottom: 30px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  img {
    width: 50px;
  }
`;
export default App;

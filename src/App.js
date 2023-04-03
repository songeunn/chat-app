import React, { useEffect } from "react";
import Layout from "./components/Layout";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./features/user/userSlice";

const App = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      // 로그인된 유저
      if (user) {
        navigate("/chat");
        dispatch(setUser(user));
      } else {
        navigate("/");
      }
    });
  }, [navigate, dispatch]);

  return (
    <Layout>
      <Wrapper>
        <div>CHAT APP 로고</div>
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

export default App;

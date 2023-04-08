import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import MainPanel from "./MainPanel";
import SidePanel from "./SidePanel";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { loadingOff, loadingOn } from "../../features/loading/loadingSlice";
import { setUser } from "../../features/user/userSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(loadingOn());
    setTimeout(() => {
      onAuthStateChanged(auth, (user) => {
        // 로그인된 유저
        if (user) {
          dispatch(setUser(user));
          dispatch(loadingOff());
        } else {
          navigate("/");
        }
      });
    }, 1000);
  }, [currentUser, dispatch, navigate]);

  return (
    <Layout>
      <Wrapper>
        {loading ? (
          <Loading />
        ) : (
          <>
            <SidePanel />
            <MainPanel />
          </>
        )}
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

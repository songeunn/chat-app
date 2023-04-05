import React from "react";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { clearUser } from "../../features/user/userSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    signOut(auth);
  };
  return <Button onClick={handleLogout}>로그아웃</Button>;
};

const Button = styled.button`
  width: 100%;
  padding: 4px;
  color: var(--point-color);
  &:hover {
    color: black;
  }
`;

export default LogoutButton;

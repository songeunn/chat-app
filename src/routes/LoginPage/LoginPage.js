import React, { useLayoutEffect, useRef } from "react";
import Layout from "../../commons/components/Layout";
import styled from "styled-components";

const LoginPage = () => {
  const idRef = useRef(null);

  useLayoutEffect(() => {
    if (idRef.current !== null) idRef.current.focus();
  }, []);

  return (
    <Layout>
      <Wrapper>
        <form>
          <div className="inputWrapper">
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              ref={idRef}
            />
            <input type="password" placeholder="비밀번호를 입력해주세요" />
          </div>
          <button type="submit">로그인</button>
        </form>
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

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .inputWrapper {
      display: flex;
      flex-direction: column;
      margin: 45px 0;
      gap: 20px;
    }

    input {
      width: 200px;
      height: 40px;
      font-size: 15px;
      color: var(--point-color);
    }

    button {
      background-color: var(--point-color);
      border: 1px solid black;
      padding-inline: 10px;
      padding-block: 5px;
      &:hover {
        background-color: black;
        border: 1px solid var(--point-color);
        color: var(--point-color);
      }
    }
  }
`;

export default LoginPage;

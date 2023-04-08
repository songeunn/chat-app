import React, { useState } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { OutlinedButton } from "../../components/Button";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import BasicHeader from "../../components/BasicHeader";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorFromSubmit, setErrorFromSubmit] = useState("");

  let notUser;
  let wrongPw;
  let manyFailed;
  if (errorFromSubmit) {
    notUser = !!(errorFromSubmit === "Firebase: Error (auth/user-not-found).");
    wrongPw = !!(errorFromSubmit === "Firebase: Error (auth/wrong-password).");
    manyFailed = !!(
      errorFromSubmit ===
      "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
    );
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 3000);
    }
  };

  return (
    <Layout>
      <BasicHeader pageName="로그인" />
      <Wrapper>
        <FormLayout>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 이메일 */}
            <input
              type="email"
              placeholder="이메일"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && (
              <span className="error">이메일을 입력해주세요</span>
            )}

            {/* 비밀번호 */}
            <input
              type="password"
              placeholder="비밀번호"
              {...register("password", { required: true, minLength: 6 })}
            />
            {!errorFromSubmit &&
              errors.password &&
              errors.password.type === "required" && (
                <span className="error">비밀번호를 입력해주세요</span>
              )}

            {/* 로그인 실패 */}
            {errorFromSubmit && (notUser || wrongPw) && (
              <span className="error">로그인 정보를 확인해주세요</span>
            )}
            {errorFromSubmit && manyFailed && (
              <span className="error">
                로그인 실패 제한초과되어 일시적으로 계정이 비활성화 되었습니다.
                나중에 다시 시도해주세요
              </span>
            )}
            <OutlinedButton type="submit" disabled={loading}>
              로그인
            </OutlinedButton>
          </form>
        </FormLayout>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span.error {
    display: block;
    color: var(--error-color);
    font-size: 13px;
  }
  input {
    display: block;
    width: 100%;
    height: 40px;
    font-size: 15px;
    color: var(--point-color);
  }
  button {
    display: block;
    margin: 25px auto 0;
  }
`;

export default LoginPage;

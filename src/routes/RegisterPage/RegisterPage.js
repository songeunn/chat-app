import React, { useRef, useState } from "react";
import Layout from "../../commons/components/Layout";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterPage = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef(null);
  passwordRef.current = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let createdUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(createdUser.user, { displayName: data.name });

      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputWrapper">
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

            {/* 아이디 */}
            <input
              type="text"
              placeholder="닉네임"
              {...register("name", { required: true, maxLength: 10 })}
            />
            {errors.name && errors.name.type === "required" && (
              <span className="error">아이디를 입력해주세요</span>
            )}
            {errors.name && errors.name.type === "maxLength" && (
              <span className="error">아이디는 최대 10자까지 가능합니다</span>
            )}

            {/* 비밀번호 */}
            <input
              type="password"
              placeholder="비밀번호"
              ref={passwordRef}
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && errors.password.type === "required" && (
              <span className="error">비밀번호를 입력해주세요</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className="error">
                비밀번호는 최소 6자 이상이어야 합니다
              </span>
            )}

            {/* 비밀번호 확인 */}
            <input
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordConfirm", {
                required: true,
                validate: (value) => value === passwordRef.current,
              })}
            />
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === "required" && (
                <span className="error">비밀번호를 입력해주세요</span>
              )}
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === "validate" && (
                <span className="error">비밀번호가 일치하지 않습니다</span>
              )}

            {/* Firebase Error */}
            {errorFromSubmit && <span>{errorFromSubmit}</span>}
          </div>
          <button type="submit" disabled={loading}>
            가입
          </button>
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
      margin: 35px 0;
      gap: 10px;

      span.error {
        color: red;
        font-size: 13px;
      }
    }

    input {
      width: 200px;
      height: 30px;
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

export default RegisterPage;

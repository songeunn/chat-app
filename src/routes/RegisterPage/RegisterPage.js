import React, { useRef, useState } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { auth, database } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import md5 from "md5";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";
import { OutlinedButton } from "../../components/Button";

const RegisterPage = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const passwordRef = useRef(null);
  passwordRef.current = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // 유저 생성
      let createdUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // 유저 추가정보
      await updateProfile(createdUser.user, {
        displayName: data.name,
        photoURL: `https://api.dicebear.com/6.x/identicon/svg?seed=${md5(
          createdUser.user.email
        )}`,
      });
      // 유저 Firebase DB 저장
      await set(ref(database, "users/" + createdUser.user.uid), {
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL,
      });
      setLoading(false);
      setCompleted(true);
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
        {completed ? (
          <Completed>
            <h3>가입이 완료되었습니다!</h3>
            <Link to="/login">
              <OutlinedButton>로그인</OutlinedButton>
            </Link>
          </Completed>
        ) : (
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

              {/* 닉네임 */}
              <input
                type="text"
                placeholder="닉네임"
                {...register("name", { required: true, maxLength: 10 })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="error">닉네임을 입력해주세요</span>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <span className="error">닉네임은 최대 10자까지 가능합니다</span>
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
              {errorFromSubmit &&
                errorFromSubmit ===
                  `Firebase: Error (auth/email-already-in-use).` && (
                  <span className="error">이미 존재하는 계정입니다.</span>
                )}
              <OutlinedButton type="submit" disabled={loading}>
                가입
              </OutlinedButton>
            </form>
          </FormLayout>
        )}
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    width: 50%;
  }
`;

const FormLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  span.error {
    color: var(--error-color);
    font-size: 13px;
  }
  input {
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

const Completed = styled.section`
  text-align: center;
  button {
    margin-top: 25px;
  }
`;

export default RegisterPage;

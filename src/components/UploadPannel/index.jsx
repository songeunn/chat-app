import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const UploadPannel = () => {
  const inputOpenImageRef = useRef(null);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleUploadImage = async (e) => {
    // inputOpenImageRef.current.click();
    const file = e.target.files[0];
    if (!file) return;
    // const metadata = { contentType: mime.lookup(file.name) };

    try {
      // 스토리지에 파일 저장
      // let uploadTaskSnapshot = await firebase
      //   .storage()
      //   .ref()
      //   .child(`user_images/${user.uid}`)
      //   .put(file, metadata);
      // let downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
      // 리덕스에서 유저 이미지 교체
      // dispatch(setPhotoURL(downloadURL));
      // 데이터베이스에 이미지 URL 저장
      // await firebase.database().ref('users').child(user.uid).update({ image: downloadURL })
    } catch (error) {
      // 에러 처리
      alert(error);
    }
  };
  return (
    <Input
      type="file"
      accept="image/jpeg, image/png"
      ref={inputOpenImageRef}
      onChange={handleUploadImage}
    ></Input>
  );
};

const Input = styled.input`
  display: none;
`;

export default UploadPannel;

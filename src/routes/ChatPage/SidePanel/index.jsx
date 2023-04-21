import React, { useRef, useState } from "react";
import styled from "styled-components";
import LogoutButton from "../../../components/LogoutButton";
import ContentList from "../../../components/ContentList";
import ContentTitle from "../../../components/ContentTitle";
import ContentLayout from "../../../components/ContentLayout";
import Dropdown from "../../../components/Dropdown";
import DropdownItem from "../../../components/DropdownItem";
import { useDispatch, useSelector } from "react-redux";
import { database, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import mime from "mime-types";
import { updateProfile } from "firebase/auth";
import { setPhotoURL } from "../../../features/user/userSlice";
import { update } from "firebase/database";

const SidePanel = () => {
  const [active, setActive] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const inputOpenImgRef = useRef(null);
  const dispatch = useDispatch();

  /** 파일 선택창을 여는 함수 */
  const handleOpenImgRef = () => {
    inputOpenImgRef.current.click();
  };

  /** 프로필 이미지를 변경할 함수 */
  const handleUploadImg = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const metadata = { contentType: mime.lookup(file.name) };

    try {
      const storageRef = ref(storage, "user_image/" + user.uid);

      // 1. 스토리지에 업로드한 이미지 파일 저장하기 + 저장된 파일의 URL 가져오기
      let uploadTaskSnapshot = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(
        ref(storage, uploadTaskSnapshot.ref)
      );

      // 2. Auth 서비스에 유저 정보 업데이트 시켜주기
      updateProfile(user, {
        photoURL: downloadURL,
      });

      // 3. 리덕스에서 유저 이미지 교체해주기
      dispatch(setPhotoURL(downloadURL));

      // 4. 실시간데이터베이스에도 유저 정보 업데이트 시켜주기
      update(ref(database, "users/" + user.uid), { avatar: downloadURL });
    } catch (error) {
      // 에러 처리
      alert("이미지 파일을 업로드하는데 실패했습니다. 다시 시도해주세요");
    }
  };

  return (
    <Container>
      <UserInfo onClick={() => setActive(!active)}>
        <img src={user.photoURL} alt="avatar" />
        {user.displayName}▾
        <Dropdown active={active}>
          <DropdownItem>
            <input
              type="file"
              accept="image/jpeg, image/png"
              ref={inputOpenImgRef}
              onChange={(e) => handleUploadImg(e)}
              style={{ display: "none" }}
            />
            <button onClick={handleOpenImgRef}>프로필 변경</button>
          </DropdownItem>
          <DropdownItem>
            <LogoutButton />
          </DropdownItem>
        </Dropdown>
      </UserInfo>
      <Favorite>
        <ContentTitle>Favorite</ContentTitle>
        <ContentList></ContentList>
      </Favorite>
      <DirectMessage>
        <ContentTitle>Direct Message</ContentTitle>
        <ContentList></ContentList>
      </DirectMessage>
    </Container>
  );
};

const Container = styled.section`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 20px;
  box-sizing: border-box;
`;
const UserInfo = styled.section`
  border: 1px solid var(--point-color);
  padding-inline: 4px;
  padding-block: 5px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  img {
    width: 10px;
    margin-right: 5px;
  }
`;

const Favorite = styled(ContentLayout)``;

const DirectMessage = styled(ContentLayout)``;

export default SidePanel;

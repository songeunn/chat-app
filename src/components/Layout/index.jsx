import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Container>
      <RetroBox>
        <Wrapper>{children}</Wrapper>
      </RetroBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RetroBox = styled.div`
  background-color: black;
  border: 10px solid var(--point-color);
  border-radius: 5px;
  width: 500px;
  height: 400px;
  padding: 20px;
  box-sizing: border-box;
  color: var(--point-color);
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default Layout;

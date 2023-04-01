import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import router from "../../routes/router";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const thisPage = router.routes.filter((route) => route.path === pathname);

  return (
    <Container>
      <RetroBox>
        <Wrapper>
          {pathname === "/" ? (
            <>{children}</>
          ) : (
            <>
              <Header>
                <img
                  src="/images/home.png"
                  alt="home"
                  className="home"
                  onClick={() => navigate("/")}
                />
                <h2>{thisPage[0].name}</h2>
                <div />
              </Header>
              {children}
            </>
          )}
        </Wrapper>
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

const Header = styled.header`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  img.home {
    width: 20px;
    cursor: pointer;
  }
  h2 {
    font-size: 22px;
  }
`;

export default Layout;

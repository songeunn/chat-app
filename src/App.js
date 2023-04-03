import React from "react";
import Layout from "./components/Layout";
import styled from "styled-components";
import router from "./routes/router";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <Layout>
      <Wrapper>
        <ul>
          {router.routes.map((route, idx) =>
            route.path === "/" ? null : (
              <li key={idx}>
                <Link to={route.path}>▶️ {route.name}</Link>
              </li>
            )
          )}
        </ul>
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

  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export default App;

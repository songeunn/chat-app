import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ChatPage from "./ChatPage/ChatPage";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    name: "메인",
  },
  {
    path: "/register",
    element: <RegisterPage />,
    name: "회원가입",
  },
  {
    path: "/login",
    element: <LoginPage />,
    name: "로그인",
  },

  {
    path: "/chat",
    element: <ChatPage />,
    name: "채팅방",
  },
]);

export default router;

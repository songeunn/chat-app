import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ChatPage from "./ChatPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    name: "",
  },
  {
    path: "/signup",
    element: <SignupPage />,
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

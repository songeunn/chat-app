import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ChatPage from "./ChatPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ChatRoomPage from "./ChatRoomPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/chatroom",
    element: <ChatRoomPage />,
  },
]);

export default router;

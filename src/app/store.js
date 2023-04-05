import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import chatSlice from "../features/chat/chatSlice";

const rootReducer = {
  user: userSlice,
  chat: chatSlice,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

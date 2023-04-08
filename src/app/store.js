import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import chatSlice from "../features/chat/chatSlice";
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { combineReducers } from "@reduxjs/toolkit";
import searchSlice from "../features/search/searchSlice";
import loadingSlice from "../features/loading/loadingSlice";

const rootReducer = combineReducers({
  user: userSlice,
  chat: chatSlice,
  search: searchSlice,
  loading: loadingSlice,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

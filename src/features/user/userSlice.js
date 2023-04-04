import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      return state;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      return state;
    },
    setPhotoURL: (state, action) => {
      state.currentUser.photoURL = action.payload;
      state.isLoading = false;
      return state;
    },
  },
});

export const { setUser, clearUser, setPhotoURL } = userSlice.actions;

export default userSlice.reducer;

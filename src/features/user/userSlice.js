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
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

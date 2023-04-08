import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: true,
  reducers: {
    loadingOn: (state) => {
      state = true;
      return state;
    },
    loadingOff: (state) => {
      state = false;
      return state;
    },
  },
});

export const { loadingOn, loadingOff } = loadingSlice.actions;

export default loadingSlice.reducer;

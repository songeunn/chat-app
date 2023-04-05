import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: [],
  reducers: {
    setChatRoom: (state, action) => {
      state = action.payload;
      console.log("store state", state);
      return state;
    },
  },
});

export const { setChatRoom } = chatSlice.actions;

export default chatSlice.reducer;

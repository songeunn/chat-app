import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: [],
  reducers: {
    setCurrentChatRoom: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setCurrentChatRoom } = chatSlice.actions;

export default chatSlice.reducer;

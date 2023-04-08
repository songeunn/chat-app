import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: false,
  reducers: {
    onSearch: (state) => {
      return (state = true);
    },
    noSearch: (state) => {
      return (state = false);
    },
  },
});

export const { onSearch, noSearch } = searchSlice.actions;

export default searchSlice.reducer;

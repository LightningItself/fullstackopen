import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action) {
      const filter = action.payload;
      return filter;
    },
  },
});

export const { setFilter } = filterSlice.actions;
const filterReducer = filterSlice.reducer;
export default filterReducer;

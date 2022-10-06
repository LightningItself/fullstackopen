import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notify(state, action) {
      const message = action.payload;
      return message;
    },
  },
});

export default notificationSlice.reducer;
export const { notify } = notificationSlice.actions;

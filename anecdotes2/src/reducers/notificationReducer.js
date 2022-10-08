import { createSlice } from "@reduxjs/toolkit";

const initialState = "No notification...";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload;
      return message;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

const notificationReducer = notificationSlice.reducer;
export default notificationReducer;

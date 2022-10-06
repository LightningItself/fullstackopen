import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import App from "./App";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: { anecdotes: anecdoteReducer, notification: notificationReducer },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

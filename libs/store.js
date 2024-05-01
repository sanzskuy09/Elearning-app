import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counterSlice";
import authReducer from "./features/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      auth: authReducer,
    },
  });
};

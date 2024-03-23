import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./createUserSlice";

export const store = configureStore({
  reducer: {
    createUser: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

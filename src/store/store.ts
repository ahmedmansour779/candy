import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./slices/GlobalSlice";
import userSlice from "./slices/userSlice";
import starredSlice from "./slices/starredSlice";

export const store = configureStore({
  reducer: {
    GlobalReducer,
    user:userSlice,
    starred:starredSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

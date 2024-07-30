import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./slices/GlobalSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    GlobalReducer,
    user:userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./slices/GlobalSlice";

export const store = configureStore({
  reducer: {
    GlobalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  catchFile: string | null;
}

const initialState: initialStateTypes = {
  catchFile: null,
};

const GlobalReducer = createSlice({
  name: "GlobalReducer",
  initialState,
  reducers: {
    setCatchFile: (state, action) => {
      state.catchFile = action.payload;
    },
  },
});

export const { setCatchFile } = GlobalReducer.actions;
export default GlobalReducer.reducer;

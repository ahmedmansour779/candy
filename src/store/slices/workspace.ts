import { createSlice } from "@reduxjs/toolkit";

export const workspaceSlice = createSlice({
    name:"workspaceSlice",
    initialState:{},
    reducers:{
        addWorkspace:(state,action)=>{
            state = action.payload;
            return state;
        }
    }
})

export const {addWorkspace} = workspaceSlice.actions;
export default workspaceSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"userSlice",
    initialState:{},
    reducers:{
        addUser:(state,action)=>{
            state = action.payload;
            return state;
        },
        removeUser:(state)=>{
            state = {}
            return state;
        }
    }
})

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
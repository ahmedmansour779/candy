/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const starredSlice = createSlice({
    name:"userSlice",
    initialState:[],
    reducers:{
        addToStarred:(state:any,action:any)=>{
            const ele = state.find((item:any)=>item?.taggable_id===action.payload)
            if(!ele){
                const obj = action.payload
                state.push(obj)
            }
            return state;
        },
        removeFromStarred:(state,action)=>{
            state = state.filter((item:any)=>item?.taggable_id!==action.payload)
            return state;
        },
        getStarred:(state,action)=>{
            state = action.payload
            return state;
        }
    }
})

export const {addToStarred, removeFromStarred ,getStarred} = starredSlice.actions;
export default starredSlice.reducer;
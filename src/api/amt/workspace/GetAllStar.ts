/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getStarred } from "../../../store/slices/starredSlice";

export const fetchGetAllStar = (setData:any,dispatch:any)=>{
    const url = `${import.meta.env.VITE_API_URL}/v1/file-entries/stared`;

    axios.post(url,{},{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res=>{
        // console.log(res)
        setData([...res.data.results])
        dispatch(getStarred([...res.data.results]))
    })
    .catch(()=>console.log("Error Fetch Data"))
}
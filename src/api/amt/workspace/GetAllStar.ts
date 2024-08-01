/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getStarred } from "../../../store/slices/starredSlice";

export const fetchGetAllStar = (setData:any,dispatch:any)=>{
    const url = `${import.meta.env.VITE_API_URL}/v1/drive/file-entries?starredOnly=true`;

    axios.get(url,{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res=>{
        // console.log(res)
        setData([...res.data.data])
        dispatch(getStarred([...res.data.data]))
    })
    .catch(()=>console.log("Error Fetch Data"))
}
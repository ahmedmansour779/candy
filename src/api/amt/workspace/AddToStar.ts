/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { addToStarred } from "../../../store/slices/starredSlice";

export const fetchAddToStar = (id: string,dispatch:any)=>{
    const url = `${import.meta.env.VITE_API_URL}/v1/file-entries/star`;

    axios.post(url,{entryIds:[id]},{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res=>{
        console.log(res)
        dispatch(addToStarred({...res.data.tag,taggable_id:id}))
    })
    .catch(()=>console.log("Error Fetch Data"))
}
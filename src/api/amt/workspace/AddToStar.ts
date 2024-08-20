/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { addToStarred } from "../../../store/slices/starredSlice";
import Cookies from "js-cookie";

export const fetchAddToStar = (id: string,dispatch:any)=>{
    const url = `${import.meta.env.VITE_API_URL}/v1/file-entries/star`;
    const token = Cookies.get("user")
    axios.post(url,{entryIds:[id]},{
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res=>{
        console.log(res)
        dispatch(addToStarred({...res.data.tag,id:id}))
    })
    .catch(()=>console.log("Error Fetch Data"))
}
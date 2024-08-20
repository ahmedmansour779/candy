/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { removeFromStarred } from "../../../store/slices/starredSlice";
import Cookies from "js-cookie";

export const fetchRemoveFrStar = (myId:string,dispatch:any)=>{
    const url = `${import.meta.env.VITE_API_URL}/v1/file-entries/unstar`;
    const token = Cookies.get("user")
    axios.post(url,{entryIds:[myId]},{
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res=>{
        console.log(res)
        dispatch(removeFromStarred(myId))
    })
    .catch(()=>console.log("Error Fetch Data"))
}
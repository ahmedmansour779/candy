/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { removeFromStarred } from "../../../store/slices/starredSlice";

export const fetchRemoveFrStar = (myId:string,dispatch:any)=>{
    const url = `${import.meta.env.VITE_API_URL}/v1/file-entries/unstar`;

    axios.post(url,{entryIds:[myId]},{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res=>{
        console.log(res)
        dispatch(removeFromStarred(myId))
    })
    .catch(()=>console.log("Error Fetch Data"))
}
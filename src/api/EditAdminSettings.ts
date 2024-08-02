/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchEditAdminSetting = (data:string) => {
    const url = `${import.meta.env.VITE_API_URL}/allsettings`;

    axios.put(`${url}?${data}`,{},{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }).then(res=>{
        console.log(res)
    })
    .catch((err)=>console.log(err))
};
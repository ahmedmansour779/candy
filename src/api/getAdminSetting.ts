/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchAdminSetting = (setData:any) => {
    const url = `${import.meta.env.VITE_API_URL}/allsettings`;

    axios.get(url,{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }).then(res=>{
        console.log(res)
        setData(res.data)
    })
    .catch((err)=>console.log(err))
};
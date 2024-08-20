/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";

export const fetchAdminSetting = (setData:any) => {
    const url = `${import.meta.env.VITE_API_URL}/allsettings`;
    const token = Cookies.get("user")
    axios.get(url,{
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }).then(res=>{
        console.log(res)
        setData(res.data)
    })
    .catch((err)=>console.log(err))
};
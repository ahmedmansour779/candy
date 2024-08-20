/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";

export const fetchEditAdminSetting = (data:any) => {
    const url = `${import.meta.env.VITE_API_URL}/editsettings`;
    const token = Cookies.get("user")

    axios.put(`${url}`,{...data},{
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }).then(res=>{
        console.log(res)
    })
    .catch((err)=>console.log(err))
};
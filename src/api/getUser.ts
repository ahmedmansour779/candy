

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "axios";
import { addUser } from "../store/slices/userSlice";
import Cookies from "js-cookie";

export const fetchGetUser = () => {
    const url = `${import.meta.env.VITE_API_URL}/user_settings/1`;
    const token = Cookies.get("user")
    axios.get(url,{
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res=>{
        console.log(res);
    })
    .catch(err=>console.log('Error fetching data'))
};
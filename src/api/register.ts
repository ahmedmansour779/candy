/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

interface IProp {
    first_name:string;
    last_name:string;
    age:string;
    gender: string;
    email: string;
    password: string;
    password_confirmation: string;
    job_occubation: string;
    add_company: string;
    token_name: string;
}

export const fetchDataRegister = (data:IProp,navigate:any) => {
    const url = `${import.meta.env.VITE_API_URL}/v1/auth/register`;

    axios.post(url,{...data},{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res=>{
        // console.log(res)
        navigate("/login")
    })
    .catch((err)=>console.log(err))
};
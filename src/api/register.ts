/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

interface IProp {
    firstName:string;
    lastName:string;
    age:string;
    gender: string;
    email: string;
    password: string;
    job: string;
}

export const fetchDataRegister = (data:IProp,navigate:any) => {
    const url = `${import.meta.env.VITE_API_URL}/v1/auth/register`;

    axios.post(url,{...data},{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res=>{
        console.log(res)
        // navigate("/login")
    })
    .catch(()=>console.log('Error fetching data:'))
};
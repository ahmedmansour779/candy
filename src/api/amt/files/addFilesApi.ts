import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";

export const addFiles = async (setData: Dispatch<SetStateAction<string | null>>, formData: FormData) => {
    const url = `${import.meta.env.VITE_API_URL}/v1/files`;
    const token = Cookies.get("user")

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization":"Bearer "+token
            },
            body: formData
        });

        // if (!response.ok) {
        //     const errorMessage = `HTTP error! Status: ${response.status} - ${response.statusText}`;
        //     throw new Error(errorMessage);
        // }

        const data = await response.json();
        console.log(data)
        setData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        setData(null);
    }
};

import { Dispatch, SetStateAction } from "react";

export const addFiles = async (setData: Dispatch<SetStateAction<string | null>>, formData: FormData) => {
    const url = `${import.meta.env.VITE_API_URL}/v1/files`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorMessage = `HTTP error! Status: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        setData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        setData(null);
    }
};

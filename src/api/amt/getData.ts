import { Dispatch, SetStateAction } from "react";

export const fetchDataAboutUs = async (setData: SetStateAction<Dispatch<string | null>>) => {
    const url = `http://43.204.110.25/api/about-us`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setData(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
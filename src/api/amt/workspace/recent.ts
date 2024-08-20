/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";

export const fetchDataRecentView = async (setData: any) => {
    const url = `${import.meta.env.VITE_API_URL}/v1/drive/file-entries?recentOnly=true`;
    const token = Cookies.get("user")
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data)
        setData(data.data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
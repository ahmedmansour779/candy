import Cookies from "js-cookie";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const briefINfoAllInOne = async (setData: any) => {
    const url = `${import.meta.env.VITE_API_URL}/v1/admin/reports/mainReport`;
    const token = Cookies.get("user")
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":"Bearer "+token
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setData(data.headerReport)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
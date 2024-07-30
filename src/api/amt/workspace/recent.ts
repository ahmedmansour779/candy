/* eslint-disable @typescript-eslint/no-explicit-any */

export const fetchDataRecentView = async (setData: any) => {
    const url = `${import.meta.env.VITE_API_URL}/v1/drive/file-entries?recentOnly=true`;

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
        setData(data.data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
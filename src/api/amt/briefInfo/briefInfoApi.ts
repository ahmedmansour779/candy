export const briefINfoAllInOne = async (setData: any) => {
    const url = `${import.meta.env.VITE_API_URL}/v1/admin/reports/mainReport`;

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
        setData(data.headerReport)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
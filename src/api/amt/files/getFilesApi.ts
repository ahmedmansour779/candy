export const getFilesApi = async (setData: any) => {
    const url = `${import.meta.env.VITE_API_URL}/v1/drive/file-entries`;

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
export const getFilesApiForOne = async (setData: any,parentId:any) => {
    const url = `${import.meta.env.VITE_API_URL}/v1/drive/file-entries?parentIds=${parentId}`;

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

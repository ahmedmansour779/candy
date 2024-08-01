const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");

export const postShareWithEmail = async (emails: string[]) => {
    const url = `${import.meta.env.VITE_API_URL}/file-entries/62/share`
    const raw = JSON.stringify({
        "emails": emails,
        "permissions": [
            "edit"
        ]
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
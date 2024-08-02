const API_URL_SAVE = 'http://localhost:3000/api/save-note'
const API_URL_GET = 'http://localhost:3000/api/get-user-notes'

export const saveNote = async(nota, userName) => {
    try{
        const response = await fetch(API_URL_SAVE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nota, userName })
        })
        if(!response.ok) {
            throw new Error("Network response was not OK")
        }
        const data = await response.json()
        return data
    }catch (error){
        console.error("Fetch error: ", error)
        throw error
    }
}

export const getUserNotes = async (userName) => {
    try {
        const response = await fetch(`${API_URL_GET}?userName=${encodeURIComponent(userName)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

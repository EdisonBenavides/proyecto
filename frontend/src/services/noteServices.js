const API_URL_SAVE = 'http://localhost:3000/api/save-note'
const API_URL_GET = 'http://localhost:3000/api/get-user-notes'
const API_URL_DELETE = 'http://localhost:3000/api/delete-note'
const API_URL_UPDATE_NOTE = 'http://localhost:3000/api/update-note'

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

export const deleteNote = async (noteId) => {
    try {
      const response = await fetch(API_URL_DELETE, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error: ", error);
      throw error;
    }
};

export const updateNote = async (noteId, noteText) => {
    try {
      const response = await fetch(`${API_URL_UPDATE_NOTE}/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteText }),
      });
      if (!response.ok) {
        throw new Error('Error updating note');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};
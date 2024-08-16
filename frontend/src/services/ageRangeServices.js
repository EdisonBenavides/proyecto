const API_URL = 'http://localhost:3000/api/ages'
const API_URL_DELETE_AGE = 'http://localhost:3000/api/delete-age'
const API_URL_UPDATE_AGE = 'http://localhost:3000/api/update-age';
const API_URL_CREATE = 'http://localhost:3000/api/create-age'

export const getAgeRanges = async() => {
    try{
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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

export const deleteAgeRange = async (id) => {
    try {
      const response = await fetch(`${API_URL_DELETE_AGE}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
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

export const updateAgeRange = async (id, age) => {
    try {
      const response = await fetch(`${API_URL_UPDATE_AGE}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ age }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    }
};

export const createAgeRange = async(age) => {
    try {
      const response = await fetch(API_URL_CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ age })
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
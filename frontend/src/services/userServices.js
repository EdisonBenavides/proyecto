const API_URL_VALIDATE = 'http://localhost:3000/api/validate-user'
const API_URL_CREATE = 'http://localhost:3000/api/create-user'

export const validateUser = async(username, password) => {
    try{
        const response = await fetch(API_URL_VALIDATE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
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

export const createUser = async(username, password, name, email, age) => {
    try {
      const response = await fetch(API_URL_CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, name, email, age })
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
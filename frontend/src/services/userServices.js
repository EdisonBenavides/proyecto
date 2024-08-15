const API_URL_VALIDATE = 'http://localhost:3000/api/validate-user'
const API_URL_CREATE = 'http://localhost:3000/api/create-user'
const API_URL_GET_USERS = 'http://localhost:3000/api/users'
const API_URL_DELETE_USER = 'http://localhost:3000/api/delete-user'
const API_URL_UPDATE_USER = 'http://localhost:3000/api/update-user';

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

export const getAllUsers = async () => {
  try {
    const response = await fetch(API_URL_GET_USERS, {
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

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL_DELETE_USER}/${id}`, {
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

export const updateUser = async (id, username, password, name, email, age, status, profile) => {
  try {
    const response = await fetch(`${API_URL_UPDATE_USER}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, name, email, age, status, profile }),
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
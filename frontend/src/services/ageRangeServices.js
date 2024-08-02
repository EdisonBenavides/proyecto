const API_URL = 'http://localhost:3000/api/ages'

export const getAgeRanges = async() => {
    try{
        const response = await fetch(API_URL)
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
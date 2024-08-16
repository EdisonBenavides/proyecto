export const saveNoteToMongo = async (nota) => {
    try {
      const response = await fetch('http://localhost:3000/api/save-note-mongo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: nota }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al guardar la nota en MongoDB:', error);
      throw error;
    }
};

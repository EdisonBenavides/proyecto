const { getCollection } = require('../config/DatabaseMongo'); // Asegúrate de importar la función getCollection

// Definir la función para guardar una nota
const saveNote = async (text) => {
  try {
    // Obtener la colección 'registro'
    const collection = getCollection('registro');

    // Crear un documento de nota
    const nota = { text, createdAt: new Date() };

    // Insertar el documento en la colección
    await collection.insertOne(nota);
    
    return { message: 'Nota guardada exitosamente' };
  } catch (error) {
    console.error('Error al guardar la nota:', error);
    throw new Error('Error al guardar la nota');
  }
};

module.exports = { saveNote };



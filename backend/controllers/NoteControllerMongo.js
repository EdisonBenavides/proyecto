const { saveNote } = require('../models/NoteMongo');

// Controlador para manejar la solicitud de guardar una nota
const saveNoteHandler = async (req, res) => {
  try {
    const { text } = req.body;

    // Validar que 'text' no esté vacío y sea una cadena de texto
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ message: 'El texto de la nota es requerido y debe ser una cadena de texto' });
    }

    // Llamar a la función saveNote para guardar la nota en la base de datos
    const result = await saveNote(text);

    // Enviar respuesta con estado 201 Created
    res.status(201).json(result);
  } catch (error) {
    // Registrar el error y enviar respuesta con estado 500 Internal Server Error
    console.error('Error guardando la nota:', error);
    res.status(500).json({ message: 'Error al guardar la nota' });
  }
};

module.exports = { saveNoteHandler };

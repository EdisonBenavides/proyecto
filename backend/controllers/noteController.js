const Note = require('../models/Note');

exports.getUserNotes = async(req, res) => {
  const { userName } = req.query;
  try{
    const notes = await Note.getNotesByUser(userName);
    res.json(notes)
  }catch (error){
      console.log(error)
      res.status(500).json({error: "Error al obtener las notas"})
  }
}

exports.saveNote = async (req, res) => {
    const { nota, userName } = req.body;
    try {
      const success = await Note.saveNote({
        nota,
        userName
      });
      if (success) {
        res.json({ message: 'Nota guardada exitosamente' })
      } else{
        res.status(500).json({ error: 'Error al guardar la nota' });
      }
    } catch (error) {
      console.error('Error guardando nota:', error);
      res.status(500).json({ error: 'Error al guardar la nota' });
    }
};
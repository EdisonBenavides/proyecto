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

exports.deleteNote = async (req, res) => {
  const { noteId } = req.body;
  try {
    const result = await Note.deleteNoteById(noteId);
    if (result) {
      res.json({ message: 'Nota eliminada exitosamente' });
    } else {
      res.status(500).json({ error: 'Error al eliminar la nota' });
    }
  } catch (error) {
    console.error('Error eliminando nota:', error);
    res.status(500).json({ error: 'Error al eliminar la nota' });
  }
};

exports.updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { noteText } = req.body;
  try {
    const success = await Note.updateNoteById(noteId, noteText);
    if (success) {
      res.status(200).json({ message: 'Note updated successfully' });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Error updating note' });
  }
};
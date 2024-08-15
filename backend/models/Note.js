const oracledb = require('oracledb');
const connectToDatabase = require('../config/database');

async function getNotesByUser(userName) {
  let connection;

  try {
    connection = await connectToDatabase();
    if (connection) {
      const result = await connection.execute(
        'SELECT ID, NOTA FROM NOTAS WHERE USUARIO_ID = (SELECT ID FROM USUARIOS WHERE LOWER(:userName) = USUARIO)',
        [userName],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      return result.rows;
    }
  } catch (err) {
    console.error('Error fetching notes', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection', err);
      }
    }
  }
}

async function saveNote({ nota, userName }) {
  let connection;

  try {
    connection = await connectToDatabase();

    const result = await connection.execute(
      `INSERT INTO NOTAS (nota, usuario_id)
       VALUES (:nota, (SELECT ID FROM USUARIOS WHERE LOWER(:userName) = USUARIO))`,
      { nota, userName },
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  } catch (error) {
    console.error('Error al guardar nota:', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error cerrando conexión:', err);
      }
    }
  }
}

async function deleteNoteById(noteId) {
  let connection;
  try {
    connection = await connectToDatabase();
    if (connection) {
      const result = await connection.execute(
        'DELETE FROM NOTAS WHERE ID = :noteId',
        [noteId],
        { autoCommit: true }
      );
      return result.rowsAffected > 0;
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

async function updateNoteById(noteId, noteText) {
  let connection;

  try {
    connection = await connectToDatabase();
    const result = await connection.execute(
      `UPDATE NOTAS SET NOTA = :noteText WHERE ID = :noteId`,
      [noteText, noteId],
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  } catch (err) {
    console.error('Error updating note', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection', err);
      }
    }
  }
}

module.exports = { 
  getNotesByUser,
  saveNote,
  deleteNoteById,
  updateNoteById
};
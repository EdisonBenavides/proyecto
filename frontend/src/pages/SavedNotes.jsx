import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserNotes, deleteNote, updateNote } from "../services/noteServices";
import "./SavedNotes.css";

export default function SavedNotes() {
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false)
  const [editNoteId, setEditNoteId] = useState(null)
  const [editNoteText, setEditNoteText] = useState('')

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser.USUARIO);
      console.log('Usuario actual:', storedUser.USUARIO);
    }
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      if (currentUser) {
        try {
          const fetchedNotes = await getUserNotes(currentUser);
          setNotes(fetchedNotes);
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      }
    };

    fetchNotes();
  }, [currentUser]);

  const handleDelete = async (noteId) => {
    console.log('Note ID to delete:', noteId)
    try{
      await deleteNote(noteId)
      setNotes(notes.filter(note => note.ID !== noteId))
    } catch (error){
      console.error("Error deleting note: ", error)
    }
  }

  const handleEdit = (noteId, noteText) => {
    setIsEditing(true)
    setEditNoteId(noteId)
    setEditNoteText(noteText)
  }

  const handleUpdate = async() => {
    try{
      await updateNote(editNoteId, editNoteText)
      setNotes(notes.map(note =>
        note.ID === editNoteId ? { ...note, NOTA: editNoteText } : note
      ))
      setIsEditing(false)
      setEditNoteId(null)
      setEditNoteText('')
    } catch (error) {
      console.error('Error updating note: ', error)
    }
  }

  return (
    <>
    <div className="contenedor-notas-principal">
      <h1>Notas Guardadas</h1>
      <div className="contenedor-notas">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} className="notas">
              {isEditing && editNoteId === note.ID ? (
                <>
                  <textarea
                    value={editNoteText}
                    onChange={(e) => setEditNoteText(e.target.value)}
                  />
                  <div id="guardar">
                  <button id="guardarNota" onClick={handleUpdate}>Guardar</button>
                  </div>
                  
                </>
              ) : (
                <>
                
                <p>{note.NOTA}</p>
                  <div className="contenedor-editar">
                    <button
                      id="editar"
                      onClick={() => handleEdit(note.ID, note.NOTA)}
                    >
                      Editar
                    </button>
                    <button
                      id="eliminar"
                      onClick={() => handleDelete(note.ID)}
                    >
                      Eliminar
                    </button>
                  </div>

                </>
              )}
            </div>
          ))
        ) : (
          <div className="notas">
            <p>No hay notas guardadas</p>
          </div>
        )}
      </div>

      <div id="contenedor-botones">
        <Link to={"/diario"}>
          <button id="botonVolver">Volver</button>
        </Link>
        <div id="contenedor-salir">
          <Link to={"/"}>
            <button id="botonSalir">Salir</button>
          </Link>
        </div>
      </div>
    </div>
  </>
  );
}

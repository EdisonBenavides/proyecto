import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserNotes } from "../services/noteServices";
import "./SavedNotes.css";

export default function SavedNotes() {
  const [notes, setNotes] = useState([]);
  const userName = "EdinhoQB";

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getUserNotes(userName);
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [userName]);

  return (
    <>
      <div className="contenedor-notas-principal">
        <h1>Notas Guardadas</h1>
        <div className="contenedor-notas">
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <div key={index} className="notas">
                <p>{note.NOTA}</p>
              </div>
            ))
          ) : (
            <div className="notas">
              <p>No hay notas guardadas</p>
              <button id="eliminar">Eliminar</button>
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

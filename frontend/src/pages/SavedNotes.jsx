import React from "react"
import { Link } from "react-router-dom"
import './SavedNotes.css'

export default function SavedNotes() {
    return (

        <>
    
          <div class="contenedor-notas-principal">
            <h1>Notas Guardadas</h1>
            <div id="contenedorNotas" class="contenedor-notas">            
            </div>
            <Link to={'/diario'}>
                <button id="botonVolver">Volver</button>
            </Link>
          </div>
        </>
    
      )
}
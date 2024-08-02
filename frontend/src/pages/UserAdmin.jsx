import React from "react";
import { Link } from 'react-router-dom'; // Asegúrate de importar Link

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Usuario Administrador
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Crear Usuario
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listarUsuarios">Listar Usuarios</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

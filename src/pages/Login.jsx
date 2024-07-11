import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
  return (
    <div className='principal'>
      <div className="contenedor-inicio-sesion">
        <h1>Iniciar Sesión</h1>
        <form id="formularioInicioSesion">
          <label htmlFor="usuario">Usuario:</label>
          <input type="text" id="usuario" aria-label="usuario" required />
          <label htmlFor="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" aria-label="contraseña" required />
          <Link to={'/diario'}>
              <button type="submit">Entrar</button>
          </Link>
        </form>
        <Link to={'/registrarse'}>
          <button id="botonRegistro" title="Registrarse para una nueva cuenta">Registrarse</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
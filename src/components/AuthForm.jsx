import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
  
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes añadir la lógica de autenticación, como una llamada a la API
    if (isLogin) {
      // Lógica para iniciar sesión
      navigate('/diario');
    } else {
      // Lógica para registrarse
      navigate('/login');
    }
  };

  return (
    <div className='principal'>
      <div className="contenedor-auth-form">
        <h1 >{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h1>
        <form id="formularioAuth" onSubmit={handleSubmit}>
          <label htmlFor="usuario">{isLogin ? 'Usuario:' : 'Nuevo Usuario:'}</label>
          <input
            type='text'
            id='usuario'
            aria-label='usuario'
            required
          />
          <label htmlFor="contrasena">{isLogin ? 'Contraseña:' : 'Nueva Contraseña:'}</label>
          <input
            type='password'
            id='contrasena'
            aria-label='contrasena'
            required
          />
          {!isLogin && (
            <>
              <label htmlFor="confirmarContrasena">Confirmar Contraseña:</label>
              <input
                type='password'
                id='confirmarContrasena'
                aria-label='confirmar contrasena'
                required
              />
            </>
          )}
          <button  className='enter' type='submit'>{isLogin ? 'Entrar' : 'Registrarse'}</button>
        </form>
        <button className='register' onClick={toggleForm}>
          {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia Sesión'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;

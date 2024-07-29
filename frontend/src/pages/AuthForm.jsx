import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './AuthForm.css'

export default function AuthForm(){
  const [isLogin, setIsLogin] = useState(true)
  const tittle = isLogin ? "Diario Digital Tamagotchi" : "Crea una cuenta"
  const buttonText = isLogin ? "Crear cuenta nueva" : "Registrarte"

  const handleClick = () => {
    setIsLogin(!isLogin)
  }

  return(
    <div className='principal-container'>
      <div className='form-container'>
        <h1>{tittle}</h1>
        <form id='access-form'>
          <label htmlFor="user">Usuario:</label>
          <input type="text" id='user' aria-label='user' required />
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" aria-label="password" required />
          {isLogin ? (
            <Link to={'/diario'}>
              <button type="submit">Entrar</button>
            </Link>
          ) : (
            <>
            <h5>Datos Personales</h5>
            <label htmlFor="name">Nombre Completo</label>
            <input type='text' id='name' aria-label='name' required />
            <label htmlFor="name">Email</label>
            <input type='email' id='email' aria-label='email' required />
            <label htmlFor="age">Edad</label>
            <select id="age" name="age" aria-label="age" required>
              <option value="0-17">0 - 17 años</option>
              <option value="18-30">18 - 30 años</option>
              <option value="31-50">31 - 50 años</option>
              <option value="50+">Más de 50 años</option>
            </select>
            </>
          )}
        </form>
        <button onClick={handleClick} id="button-form">{buttonText}</button>
      </div>
    </div>
  )
}
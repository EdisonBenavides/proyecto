import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './AuthForm.css'
import { getAgeRanges } from '../services/ageRangeServices';
import { validateUser, createUser } from '../services/userServices';

export default function AuthForm(){
  const [isLogin, setIsLogin] = useState(true)
  const tittle = isLogin ? "Diario Digital Tamagotchi" : "Crea una cuenta"
  const buttonText = isLogin ? "Crear cuenta nueva" : "Registrarte"

  const [ageRanges, setAgeRanges] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgeRanges()
  }, []);

  const handleClick = async () => {
    if (isLogin) {
      setIsLogin(!isLogin)
    } else{
      try {
        const response = await createUser(username, password, name, email, age);
        if (response.message === 'User created successfully') {
          navigate('/diario');
        } else if (response.message === 'User already exists') {
          alert('El usuario ya existe');
        } else {
          alert('Error al crear usuario');
        }
      } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        alert('Error al manejar la solicitud');
      }
    }
  }

  const fetchAgeRanges = async() => {
    const ageRanges = await getAgeRanges();
    setAgeRanges(ageRanges);
    console.log(ageRanges);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await validateUser(username, password);
      if (response.message === 'Valid user credentials') {
        localStorage.setItem('currentUser', JSON.stringify({ USUARIO: username }));
        navigate('/diario');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al validar usuario:', error);
      alert('Error al validar usuario');
    }
  };

  return(
    <div className='principal-container'>
      <div className='form-container'>
        <h1>{tittle}</h1>
        <form id='access-form' onSubmit={handleSubmit}>
          <label htmlFor="user">Usuario:</label>
          <input 
            type="text" 
            id='user'
            aria-label='user'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password"
            id="password"
            aria-label="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLogin ? (
            <button type="submit">Entrar</button>
          ) : (
            <>
            <h5>Datos Personales</h5>
            <label htmlFor="name">Nombre Completo</label>
            <input
              type='text'
              id='name'
              aria-label='name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Email</label>
            <input
              type='email'
              id='email'
              aria-label='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="age">Edad</label>
            <select
              id="age"
              name="age"
              aria-label="age"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            >
            <option value="">Selecciona un rando de edad</option>
              {
                ageRanges.map((ageRange) => {
                  return(
                    <option key={ageRange.RANGOEDAD} value={ageRange.RANGOEDAD}>{ageRange.RANGOEDAD}</option>
                  )
                })
              }
            </select>
            </>
          )}
        </form>
        <button onClick={handleClick} id="button-form">{buttonText}</button>
      </div>
    </div>
  )
}
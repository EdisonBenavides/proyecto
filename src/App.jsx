import React from 'react';
import Login from './pages/Login';
import './index.css'

const App = () => {
  return (
    <div className="app">
      <div className="imagen-fondo">
        <img src="/public/img/fondo1.jpg" alt="Fondo decorativo de la aplicación" />
      </div>
      <Login />
    </div>
  );
}

export default App;
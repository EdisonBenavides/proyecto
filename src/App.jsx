import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import './App.css';
import IngresoNotas from './pages/IngresoNotas';
import NotaGuardada from './pages/NotaGuardada';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/registrarse" element={<AuthForm />} />
          <Route path="/diario" element={<IngresoNotas/>} />
          <Route path="/notas" element={<NotaGuardada/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

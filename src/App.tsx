import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login'; // Tu componente Login
import { authService } from './services/auth';
import Home from './pages/Home';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Inicializar como null para esperar la validación

  // Verificar token al inicio
  const checkAuthentication = async () => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    if (token) {
      const result = await authService.validateToken(token); // Verificar si el token es válido
      setIsAuthenticated(result); // Actualizar el estado de autenticación según el resultado
    } else {
      setIsAuthenticated(false); // Si no hay token, no está autenticado
    }
  };

  useEffect(() => {
    checkAuthentication(); // Realizar la comprobación al iniciar
  }, []);

  if (isAuthenticated === null) {
    return null; // Puedes retornar null o algo que indique que se está realizando la validación
  }

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login setAuth={setIsAuthenticated} />} />

        {/* Ruta protegida */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />

        <Route path="*" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

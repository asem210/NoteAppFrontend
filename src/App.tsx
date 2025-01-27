import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login'; // Tu componente Login
import { authService } from './services/auth';
import Home from './pages/Home';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Añadido el hook useNavigate

  // Verificar token al inicio
  const checkAuthentication = async () => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    if (token) {
      const result = await authService.validateToken(token); // Verificar si el token es válido
      if (result) {
        setIsAuthenticated(true); // Si el token es válido, el usuario está autenticado
      } else {
        setIsAuthenticated(false); // Si el token es inválido, redirigir al login
        localStorage.removeItem('token'); // Limpiar el token
        navigate("/");  // Redirigir al login si el token es inválido
      }
    } else {
      setIsAuthenticated(false); // Si no hay token, redirigir al login
      navigate("/");  // Redirigir al login si no hay token
    }
    setLoading(false); // Después de verificar, dejamos de cargar
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Puedes mostrar un cargador mientras se verifica el token
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
export default App
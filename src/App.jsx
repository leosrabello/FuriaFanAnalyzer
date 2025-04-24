import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import FanInfo from './Pages/FanInfo';
import Dashboard from './Pages/Dashboard';

function App() {
  const [logged, setLogged] = useState(undefined); // undefined = ainda carregando

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userLogged'));
    setLogged(user);
  }, []);

  if (logged === undefined) return null; // evita piscar tela branca

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/fan-info"
          element={logged?.type === 'fan' ? <FanInfo /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={logged?.type === 'admin' ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

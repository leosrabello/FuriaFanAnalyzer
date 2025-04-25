import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import FanInfo from './Pages/FanInfo';
import Dashboard from './Pages/Dashboard';

function App() {
  const [logged, setLogged] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = localStorage.getItem('userLogged');
      const user = data ? JSON.parse(data) : { type: null };
      setLogged(user);
    } catch (err) {
      console.error("Erro ao carregar userLogged:", err);
      setLogged({ type: null });
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading || logged === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-orbitron">
        Carregando...
      </div>
    );
  }

  return (
    <Router>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-black text-white font-orbitron">
            Carregando página...
          </div>
        }
      >
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
      </Suspense>
    </Router>
  );
}

export default App;
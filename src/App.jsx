import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import FanInfo from './Pages/FanInfo';

function App() {
  const userLogged = JSON.parse(localStorage.getItem('userLogged'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/fan-info" 
          element={
            userLogged?.type === 'fan' 
              ? <FanInfo /> 
              : <Navigate to="/" />
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

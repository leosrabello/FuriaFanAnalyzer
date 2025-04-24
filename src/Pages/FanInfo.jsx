import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FanInfo() {
  const navigate = useNavigate();
  const [fanData, setFanData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('loggedFan'));
    if (!data) {
      navigate('/');
    } else {
      setFanData(data);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedFan');
    localStorage.removeItem('userLogged');
    navigate('/');
  };

  if (!fanData) return null;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-orbitron">
      <h1 className="text-3xl text-purple-400 font-bold mb-6">
        Bem-vindo, {fanData.name}!
      </h1>
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <p><strong>Email:</strong> {fanData.email}</p>
        <p><strong>Senha:</strong> {fanData.password}</p>
        <button
          onClick={handleLogout}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default FanInfo;

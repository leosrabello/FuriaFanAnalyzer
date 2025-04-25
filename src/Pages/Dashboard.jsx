import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import furiaLogo from '../assets/furia-logo.png';
import furiaMascot from '../assets/furia-mascot.png';
import '../index.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Dashboard() {
  const [fans, setFans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('userLogged'));
      let rawFanList = JSON.parse(localStorage.getItem('fanList')) || [];

      if (!user || user.type !== 'admin') {
        navigate('/');
        return;
      }

      const calculateScore = (data) => {
        let score = 0;
        if (data.favoriteGame) score += 20;
        if (data.twitchUser) score += 20;
        if (data.tags) score += data.tags.split(',').length * 10;
        if (data.promoConsent) score += 20;
        if (data.discordMember) score += 20;
        if (data.twitter) score += 10;
        if (data.instagram) score += 10;
        return score;
      };

      const withScores = rawFanList.map(fan => ({
        ...fan,
        engagementScore: Number(fan.engagementScore) || calculateScore(fan)
      }));

      const updated = rawFanList.some((fan, i) => {
        const scoreNow = calculateScore(fan);
        return Number(fan.engagementScore) !== scoreNow;
      });

      if (updated) {
        localStorage.setItem('fanList', JSON.stringify(withScores));
      }

      setFans(withScores);
    } catch (err) {
      console.error('Erro ao carregar Dashboard:', err);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('loggedFan');
    navigate('/');
  };

  const barData = {
    labels: fans.map(fan => fan.name),
    datasets: [
      {
        label: 'Engajamento',
        data: fans.map(fan => Number(fan.engagementScore) || 0),
        backgroundColor: '#a144f6'
      }
    ]
  };

  const favoriteGameCounts = fans.reduce((acc, fan) => {
    const game = fan.favoriteGame || 'Indefinido';
    acc[game] = (acc[game] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(favoriteGameCounts),
    datasets: [
      {
        data: Object.values(favoriteGameCounts),
        backgroundColor: ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'],
        borderColor: '#1f2937'
      }
    ]
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-orbitron">
        <img src={furiaMascot} alt="Mascote FURIA" className="h-20 animate-bounce mb-4" />
        <p className="text-lg">Carregando dados dos fãs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-6 font-sans relative">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Sair
      </button>

      <div className="flex items-center mb-6 space-x-4">
        <img src={furiaMascot} alt="Mascote FURIA" className="h-16" />
        <div className="flex items-center space-x-2">
          <img src={furiaLogo} alt="Logo FURIA" className="h-10" />
          <div className="text-left leading-tight">
            <span className="text-purple-400 text-xl font-bold">Fan</span><br />
            <span className="text-purple-400 text-xl font-bold">Analyzer</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl shadow-lg p-6 w-full max-w-6xl space-y-8">
        {fans.map((fan, idx) => (
          <div
            key={idx}
            className="bg-zinc-800 p-4 rounded-lg shadow-md grid grid-cols-2 gap-4 items-center"
          >
            <div>
              <p className="text-lg font-semibold text-purple-300">{fan.name}</p>
              <p className="text-sm text-zinc-300"><span className="font-medium">Email:</span> {fan.email}</p>
              <p className="text-sm text-zinc-300"><span className="font-medium">Jogo favorito:</span> {fan.favoriteGame || 'Não informado'}</p>
              <p className="text-sm text-zinc-300"><span className="font-medium">Engajamento:</span> {fan.engagementScore || 0}</p>
            </div>
            <div className="flex justify-end">
              <div className="text-purple-400 bg-zinc-700 rounded-full px-4 py-2 font-semibold shadow-inner">
                {fan.engagementScore || 0} pts
              </div>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-800 p-4 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Pontuação de Engajamento</h2>
            <div className="w-full max-w-md">
              <Bar data={barData} />
            </div>
          </div>

          <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Jogos Preferidos</h2>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
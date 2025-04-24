import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundTexture from '../assets/texture.png';
import furiaMascot from '../assets/furia-mascot.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

function FanInfo() {
  const navigate = useNavigate();
  const [fanData, setFanData] = useState(null);
  const [formData, setFormData] = useState({
    favoriteGame: '',
    twitchUser: '',
    tags: '',
    promoConsent: false,
    discordMember: false,
    twitter: '',
    instagram: '',
    city: ''
  });
  const [engagementScore, setEngagementScore] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [fanLevel, setFanLevel] = useState('');

  useEffect(() => {
    const storedFan = JSON.parse(localStorage.getItem('loggedFan'));
    if (!storedFan) {
      navigate('/');
    } else {
      setFanData(storedFan);
      setFormData({
        favoriteGame: storedFan.favoriteGame || '',
        twitchUser: storedFan.twitchUser || '',
        tags: storedFan.tags || '',
        promoConsent: storedFan.promoConsent || false,
        discordMember: storedFan.discordMember || false,
        twitter: storedFan.twitter || '',
        instagram: storedFan.instagram || '',
        city: storedFan.city || ''
      });
      const score = calculateEngagementScore(storedFan);
      setEngagementScore(score);
      setFanLevel(determineFanLevel(score));
    }
  }, [navigate]);

  const calculateEngagementScore = (data) => {
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

  const determineFanLevel = (score) => {
    if (score >= 100) return '🔥 Super Fã';
    if (score >= 50) return '⭐ Curioso';
    return '💤 Novato';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    setFormData(updatedFormData);
    const score = calculateEngagementScore(updatedFormData);
    setEngagementScore(score);
    setFanLevel(determineFanLevel(score));
  };

  const handleSave = () => {
    const updatedFan = { ...fanData, ...formData, engagementScore };
    localStorage.setItem('fanData', JSON.stringify(updatedFan));
    localStorage.setItem('loggedFan', JSON.stringify(updatedFan));

    // ✅ Corrige também o fanList
    const fanList = JSON.parse(localStorage.getItem('fanList')) || [];
    const updatedFanList = fanList.map(f =>
      f.email === updatedFan.email ? updatedFan : f
    );
    localStorage.setItem('fanList', JSON.stringify(updatedFanList));

    setFanData(updatedFan);
    toast.success(`Você desbloqueou o nível: ${determineFanLevel(engagementScore)}`);
    setShowMessage(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedFan');
    localStorage.removeItem('userLogged');
    navigate('/');
  };

  if (!fanData) return null;

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col items-center justify-start font-orbitron relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${backgroundTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-all"
        >
          Sair
        </button>
      </div>

      <img src={furiaMascot} alt="Mascote FURIA" className="h-24 mt-2 mb-4 animate-bounce" />

      <h1 className="text-3xl text-purple-400 font-bold mb-4">
        Bem-vindo, {fanData.name}!
      </h1>

      {showMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative text-center text-white text-lg bg-zinc-900 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-purple-400 mb-2">
              Obrigado por se tornar um membro Furia, {fanData.name}! 🎉
            </h2>
            <p>
              Você ganhou{' '}
              <span className="text-purple-500 font-semibold">{engagementScore}</span> pontos de engajamento!
            </p>
            <p className="text-xl mt-2">Seu nível: {fanLevel}</p>
          </div>
        </div>
      )}

      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 z-10">
        <label>Jogo preferido:</label>
        <select
          name="favoriteGame"
          value={formData.favoriteGame}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 appearance-none"
        >
          <option value="">Selecione um jogo</option>
          <option value="CS:GO">CS:GO</option>
          <option value="Valorant">Valorant</option>
          <option value="PUBG">PUBG</option>
          <option value="League of Legends">League of Legends</option>
          <option value="Rocket League">Rocket League</option>
        </select>

        <label>Usuário na Twitch:</label>
        <input
          type="text"
          name="twitchUser"
          value={formData.twitchUser}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
        />

        <label>Twitter:</label>
        <input
          type="text"
          name="twitter"
          value={formData.twitter}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
        />

        <label>Instagram:</label>
        <input
          type="text"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
        />

        <label>Cidade:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
        />

        <label>Tags (separadas por vírgula):</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
        />

        <label className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            name="promoConsent"
            checked={formData.promoConsent}
            onChange={handleChange}
          />
          <span>Aceito receber emails promocionais da FURIA</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="discordMember"
            checked={formData.discordMember}
            onChange={handleChange}
          />
          <span>Sou membro da comunidade da FURIA no Discord</span>
        </label>

        <button
          onClick={handleSave}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
        >
          Salvar Informações
        </button>
      </div>

      <ToastContainer position="top-center" autoClose={6000} theme="dark" />
    </div>
  );
}

export default FanInfo;

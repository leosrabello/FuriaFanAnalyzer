import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import furiaLogo from '../assets/furia-logo.png';
import furiaMascot from '../assets/furia-mascot.png';
import backgroundTexture from '../assets/texture.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userLogged'));
    if (storedUser?.type === 'admin') navigate('/dashboard');
    else if (storedUser?.type === 'fan') navigate('/fan-info');
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleLogin = () => {
    const { email, password } = formData;

    // Admin login
    if (email === 'colaborador@furiagg.com' && password === 'furia123') {
      const adminUser = { email, name: 'Administrador', type: 'admin' };
      localStorage.setItem('userLogged', JSON.stringify(adminUser));
      navigate('/dashboard');
      return;
    }

    // Fan login
    const allFans = JSON.parse(localStorage.getItem('fanList')) || [];
    const matchedFan = allFans.find(f => f.email === email && f.password === password);
    if (matchedFan) {
      const fanUser = { email, name: matchedFan.name, type: 'fan' };
      localStorage.setItem('userLogged', JSON.stringify(fanUser));
      localStorage.setItem('loggedFan', JSON.stringify(matchedFan));
      navigate('/fan-info');
    } else {
      toast.error('Credenciais inválidas.', { position: 'top-center', autoClose: 3000, theme: 'dark' });
    }
  };

  const handleRegister = () => {
    const allFans = JSON.parse(localStorage.getItem('fanList')) || [];
    const existingFan = allFans.find(f => f.email === registerData.email);
    if (existingFan) {
      toast.error('Email já cadastrado!');
      return;
    }

    const newFan = {
      ...registerData,
      engagementScore: calculateEngagementScore(registerData),
      favoriteGame: '',
      twitchUser: '',
      tags: '',
      promoConsent: false,
      discordMember: false,
      twitter: '',
      instagram: '',
      city: ''
    };

    const updatedFans = [...allFans, newFan];
    localStorage.setItem('fanList', JSON.stringify(updatedFans));

    toast.success('Registro realizado com sucesso!', {
      position: 'top-center',
      autoClose: 3000,
      theme: 'dark'
    });

    // ✅ Retorna à tela de login com dados preenchidos
    setTimeout(() => {
      setShowRegister(false);
      setFormData({ email: newFan.email, password: newFan.password });
    }, 3000);
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center font-orbitron text-white"
        style={{
          backgroundImage: `url(${backgroundTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="bg-zinc-900 bg-opacity-80 p-6 rounded-xl shadow-lg w-96 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <img src={furiaMascot} alt="Mascote FURIA" className="h-14" />
            <img src={furiaLogo} alt="Logo FURIA" className="h-12" />
          </div>

          <AnimatePresence mode="wait">
            {!showRegister ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <h2 className="text-center text-2xl font-bold text-purple-400 mb-4">Login</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 rounded bg-zinc-800 border border-zinc-700"
                />
                <button
                  onClick={handleLogin}
                  className="w-full p-2 rounded bg-purple-600 hover:bg-purple-700 font-semibold"
                >
                  Acessar
                </button>
                <p
                  onClick={() => setShowRegister(true)}
                  className="text-center mt-3 text-sm text-purple-300 cursor-pointer hover:underline"
                >
                  Registrar
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <h2 className="text-center text-2xl font-bold text-purple-400 mb-4">Registro de Fã</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="w-full mb-4 p-2 rounded bg-zinc-800 border border-zinc-700"
                />
                <button
                  onClick={handleRegister}
                  className="w-full p-2 rounded bg-purple-600 hover:bg-purple-700 font-semibold"
                >
                  Registrar
                </button>
                <p
                  onClick={() => setShowRegister(false)}
                  className="text-center mt-3 text-sm text-purple-300 cursor-pointer hover:underline"
                >
                  Voltar ao Login
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Login;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import furiaLogo from '../assets/furia-logo.png';
import furiaMascot from '../assets/furia-mascot.png';
import backgroundTexture from '../assets/texture.png';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userLogged'));
    if (storedUser) {
      if (storedUser.type === 'admin') navigate('/dashboard');
      if (storedUser.type === 'fan') navigate('/fan-info');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    if (formData.email === 'colaborador@furiagg.com' && formData.password === 'furia123') {
      localStorage.setItem('userLogged', JSON.stringify({ type: 'admin' }));
      navigate('/dashboard');
    } else {
      const storedFan = JSON.parse(localStorage.getItem('fanData'));
      if (
        storedFan &&
        storedFan.email === formData.email &&
        storedFan.password === formData.password
      ) {
        localStorage.setItem('loggedFan', JSON.stringify(storedFan));
        localStorage.setItem('userLogged', JSON.stringify({ type: 'fan', name: storedFan.name }));
        navigate('/fan-info');
      } else {
        alert('Credenciais inválidas.');
      }
    }
  };

  const handleRegister = () => {
    const existingFan = JSON.parse(localStorage.getItem('fanData'));
    if (existingFan && existingFan.email === registerData.email) {
      toast.error('Email já cadastrado!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark'
      });
      return;
    }

    localStorage.setItem('fanData', JSON.stringify(registerData));
    toast.success('Registro realizado com sucesso!', {
      position: 'top-center',
      autoClose: 3000,
      theme: 'dark'
    });
    setTimeout(() => {
      setShowRegister(false);
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

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Login;

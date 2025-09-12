import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Login = () => {
  const { loginUser, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [medicineNames, setMedicineNames] = useState([]);
  const [medicineIcons, setMedicineIcons] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  // Floating medicine names & icons
  useEffect(() => {
    const names = [
      "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Metformin",
      "Insulin", "Vitamin C", "Vitamin D", "Omeprazole", "Atorvastatin",
      "Cardiology", "Diabetes", "Pain Relief", "Antibiotics", "Vitamins",
      "Supplements", "Skincare", "First Aid", "Respiratory", "Antihistamines"
    ];

    const nameElements = [];
    for (let i = 0; i < 25; i++) {
      nameElements.push({
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        animationDuration: 15 + Math.random() * 20,
        animationDelay: Math.random() * 5,
        fontSize: 0.8 + Math.random() * 1.2,
        opacity: 0.1 + Math.random() * 0.2
      });
    }
    setMedicineNames(nameElements);

    const icons = ["💊", "🧴", "🩹", "🧪"];
    const iconElements = [];
    for (let i = 0; i < 40; i++) {
      iconElements.push({
        id: i,
        icon: icons[Math.floor(Math.random() * icons.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 12 + Math.random() * 16,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
        opacity: 0.2 + Math.random() * 0.5
      });
    }
    setMedicineIcons(iconElements);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 overflow-hidden p-4">

      {/* Floating medicine names */}
      {medicineNames.map((item) => (
        <motion.span
          key={item.id}
          initial={{ y: 0 }}
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: item.animationDuration, repeat: Infinity, delay: item.animationDelay, ease: 'easeInOut' }}
          className="absolute select-none text-gray-400 font-semibold"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            fontSize: `${item.fontSize}rem`,
            opacity: item.opacity,
          }}
        >
          {item.name}
        </motion.span>
      ))}

      {/* Floating medicine icons */}
      {medicineIcons.map((item) => (
        <motion.span
          key={item.id}
          initial={{ x: 0, y: 0 }}
          animate={{ x: [0, 100, 0], y: [0, 100, 0] }}
          transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: 'linear' }}
          className="absolute select-none"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
          }}
        >
          {item.icon}
        </motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-blue-400"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            required
          />
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 rounded-xl font-medium shadow-lg transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 font-semibold hover:underline">
            Register
          </Link>
        </div>

        <div className="my-5 flex items-center justify-center text-gray-400">or</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline btn-accent w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all shadow-md hover:bg-red-50 hover:text-red-600"
        >
          <FcGoogle size={24} />
          Sign in with Google
        </button>
      </motion.div>
    </div>
  );
};

export default Login;

// src/routes/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('token', result.token);
        navigate('/home'); // Clean React Router navigation
      } else {
        setError(result.message || 'Authentication failed.');
      }
    } catch (err) {
      setError('Cannot connect to server. Ensure backend is running.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0B14] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6">
        
        {/* Header branding */}
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-wider text-[#FFB7C5]">QUPIT AGENT</h1>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">
            {isLogin ? 'Welcome back to the connection network' : 'Create your creative identity'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Input Form Layout */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {!isLogin && (
            <input
              name="username"
              type="text"
              required
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/30 transition-all"
            />
          )}
          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/30 transition-all"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/30 transition-all"
          />
          
          <button 
            type="submit" 
            className="w-full py-3 bg-[#FFB7C5] hover:bg-[#FFA4B5] text-[#0D0B14] font-bold rounded-xl shadow-lg transition-all transform active:scale-98"
          >
            {isLogin ? 'Sign In' : 'Get Started'}
          </button>
        </form>

        {/* Dynamic toggle trigger */}
        <div className="text-center text-xs text-white/40">
          {isLogin ? "Don't have an account?" : "Already joined?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-[#FFB7C5] font-bold hover:underline bg-transparent border-none outline-none cursor-pointer"
          >
            {isLogin ? 'Create Account' : 'Login'}
          </button>
        </div>

      </div>
    </div>
  );
};
// src/routes/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '',
    bio: '',
    avatarUrl: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert uploaded file to base64 string automatically
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, avatarUrl: reader.result });
    };
    reader.readAsDataURL(file);
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
        const decoded = jwtDecode(result.token);
        const extractedUserId = decoded.id || decoded._id || decoded.user?.id || decoded.user?._id;
        localStorage.setItem('userId', extractedUserId);
        navigate('/home');
      } else {
        setError(result.message || 'Authentication failed.');
      }
    } catch (err) {
      console.error("🔍 Hidden error:", err);
      setError('Cannot connect to server. Ensure backend is running.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0B14] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6">

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

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                name="username"
                type="text"
                required
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/30"
              />
              
              <textarea
                name="bio"
                placeholder="Tell us about your matrix node profile..."
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/30 h-20 resize-none"
              />

              <div className="space-y-1">
                <label className="text-[10px] text-white/40 uppercase font-bold tracking-wider block pl-1">
                  Profile Picture (Local File or URL)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                />
                <input
                  name="avatarUrl"
                  type="text"
                  placeholder="Or paste an external Image URL instead"
                  value={formData.avatarUrl.startsWith('data:') ? '' : formData.avatarUrl}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/30 mt-2"
                />
              </div>
            </>
          )}

          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/30"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/30"
          />

          <button type="submit" className="w-full py-3 bg-[#FFB7C5] hover:bg-[#FFA4B5] text-[#0D0B14] font-bold rounded-xl shadow-lg transition-all">
            {isLogin ? 'Sign In' : 'Get Started'}
          </button>
        </form>

        <div className="text-center text-xs text-white/40">
          {isLogin ? "Don't have an account?" : "Already joined?"}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-2 text-[#FFB7C5] font-bold hover:underline bg-transparent border-none">
            {isLogin ? 'Create Account' : 'Login'}
          </button>
        </div>

      </div>
    </div>
  );
};
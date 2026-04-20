import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await fetch('http://localhost:5000/api/userdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            username: username, // Send as 'username'
            email: email,       // Send as 'email'
            password: password 
        }),
    });
     const result = await response.json();

      if (result.success) {
        // Save token to localStorage for later requests
        localStorage.setItem('token', result.token);
        navigate('/'); // Go back to Home after success
      } else {
        alert(result.message || "Authentication failed");
      }
    } catch (err) {
      console.error("Auth Error:", err);
    }
};

 
  return (
    <div className="min-h-screen bg-[#14111E] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#1A1828]/80 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] shadow-2xl text-center">
          
          <h2 className="text-3xl font-serif text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Join Qupit'}
          </h2>
          <p className="text-[#A78BFA] text-sm mb-8 font-light italic">
            {isLogin ? 'Continue your journey of gratitude' : 'Start sharing your heart'}
          </p>

          {/* Social Buttons (Google placeholder) */}
          <button className="w-full py-3 mb-8 bg-white/5 border border-white/10 rounded-xl text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input 
                name="username"
                type="text" 
                placeholder="Username"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/50"
              />
            )}
            <input 
              name="email"
              type="email" 
              placeholder="Email address"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/50"
            />
            <input 
              name="password"
              type="password" 
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/50"
            />
            <button type="submit" className="w-full py-4 bg-[#FFB7C5] text-[#14111E] font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-sm text-white/40">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[#FFB7C5] hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthenticationPage;
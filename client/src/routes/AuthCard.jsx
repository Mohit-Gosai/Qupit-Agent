import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#14111E] flex items-center justify-center p-6">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FFB7C5] opacity-10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#A78BFA] opacity-10 blur-[100px]" />

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
            {isLogin ? 'Continue your journey of gratitude' : 'Start sharing your heart with the world'}
          </p>

          {/* Social Auth Buttons */}
          <div className="space-y-3 mb-8">
            <button className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all group">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
            <button className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5 h-5 invert" alt="GitHub" />
              <span className="text-sm font-medium">Continue with GitHub</span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#1A1828] px-4 text-white/30 tracking-widest">Or Magic Link</span></div>
          </div>

          {/* Email Input */}
          <form className="space-y-4">
            <input 
              type="email" 
              placeholder="Your email address"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/50 transition-all"
            />
            <button className="w-full py-4 bg-[#FFB7C5] text-[#14111E] font-bold rounded-xl shadow-lg hover:shadow-[#FFB7C5]/20 transition-all hover:scale-[1.02] active:scale-95">
              Send Magic Link
            </button>
          </form>

          <p className="mt-8 text-sm text-white/40">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[#FFB7C5] hover:underline transition-all"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthCard;
import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-4">
    <div className="max-w-6xl mx-auto bg-[#1A1828]/60 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-4 flex justify-between items-center">
      <div className="text-[#FFB7C5] font-serif text-2xl font-bold tracking-tighter">
        Qupit<span className="text-white/50 italic font-light">Agent</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm text-white/70 font-light">
        <Link to="/" className="hover:text-[#FFB7C5] transition-colors">Home</Link>
        <Link to="/about" className="hover:text-[#FFB7C5] transition-colors">About</Link>
        <Link to="/templates" className="hover:text-[#FFB7C5] transition-colors">Templates</Link>
        <Link to="/how-it-works" className="hover:text-[#FFB7C5] transition-colors">How it works</Link>
        <Link to="/community" className="hover:text-[#FFB7C5] transition-colors">Community</Link>
      </div>
      <div className="hidden md:flex gap-4">
      <Link to='login' className="text-xs font-bold uppercase tracking-widest text-white border border-white/20 px-5 py-2 rounded-lg hover:bg-white/5 transition-all">
        Login
      </Link>
      <Link to='login' className="text-xs font-bold uppercase tracking-widest text-white border border-white/20 px-5 py-2 rounded-lg hover:bg-white/5 transition-all">
        Signup
      </Link>
      </div>
    </div>
  </nav>
);
export default Navbar;
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="bg-[#14111E] min-h-screen selection:bg-[#FFB7C5]/30 selection:text-[#FFB7C5]">
      {!isLogin && <Navbar />}
      {/* The Outlet will render Home, About, Template, etc. based on the URL */}
      <Outlet context={{ isLogin, setIsLogin }} />

      {/* Simple Global Footer */}
      <footer className="py-10 border-t border-white/5 text-center text-white/20 text-xs tracking-widest uppercase">
        © 2026 Qupit Agent • Built with Heart
      </footer>
    </div>
  )
}
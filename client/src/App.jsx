import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Outlet, useLocation } from 'react-router-dom' // Add useLocation

export default function App() {
  const [isLogin, setIsLogin] = useState(true);


  const checkAuth = async () => {

    const token = localStorage.getItem('token');
  
    const response = await fetch('http://127.0.0.1:5000/api/userdata', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // This is what the Guard looks for
      }
    });
  }

  const location = useLocation(); // Get current URL path

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLogin(false);
        return;
      }
      try {
        const response = await fetch('http://127.0.0.1:5000/api/userdata', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (result.success) {
          setIsLogin(true);
        } else {
          localStorage.removeItem('token');
          setIsLogin(false);
        }
      } catch (err) {
        setIsLogin(false);
      }
    };
    verifySession();
  }, []);

  // Define which paths should NOT show the default Navbar
  const hideNavbarPaths = ['/dashboard'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  //  be8c7bd8fbb1fcaecb44520cc94fb04c3a9272e1

  return (
    <div className="bg-[#14111E] min-h-screen">
      {/* Logic: Only show Navbar if we are NOT on the dashboard */}
      {!shouldHideNavbar && <Navbar />}
      
      <Outlet context={{ isLogin, setIsLogin }} />

      {/* Footer logic: You might want to hide the footer on the dashboard too */}
      {!shouldHideNavbar && (
        <footer className="py-10 border-t border-white/5 text-center text-white/20 text-xs tracking-widest uppercase">
          © 2026 Qupit Agent • Built with Heart
        </footer>
      )}
    </div>
  )
}
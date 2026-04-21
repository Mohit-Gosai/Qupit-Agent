import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const ProtectRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Use navigate for a more "active" redirect
      navigate('/login', { replace: true, state: { from: location } });
    }
  }, [token, navigate, location]);

  if (!token) return null; // Don't render anything while redirecting

  return children;
};

export default ProtectRoute;
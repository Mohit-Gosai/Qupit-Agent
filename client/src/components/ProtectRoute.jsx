import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // No badge? Send them to the login desk.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Has badge? Let them in.
};

export default ProtectRoute;
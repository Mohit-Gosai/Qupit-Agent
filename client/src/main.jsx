// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import axios from 'axios';

// 1. Page Component Imports
import { AuthPage } from './routes/AuthPage';
import HomeFeed from './routes/HomeFeed';
import StudioPage from './routes/StudioPage.jsx';
import ProfilePage from './routes/ProfilePage';
import LetterBuilder from './components/studio/LetterBuilder.jsx';
import ImageCanvas from './components/studio/ImageCanvas.jsx';
import GeneralPostForm from './components/studio/GeneralPostForm.jsx';
import VideoSequencer from './components/studio/VideoSequence.jsx';


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = 'http://localhost:5000';


const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/auth" replace />;
};

const StoriesRoutePlaceholder = () => (
  <div className="text-xs font-mono text-gray-400 animate-fadeIn">
    📱 Mobile Story Node Router Target Instance Configured.
  </div>
);

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          { path: '/', element: <Navigate to="/home" replace /> },
          { path: 'home', element: <HomeFeed /> },
          { path: 'profile/:username', element: <ProfilePage /> },
        ]
      },
      {
        path: '/studio',
        element: <StudioPage />,
        children: [
          { path: 'letter', element: <LetterBuilder /> },
          { path: 'image', element: <ImageCanvas /> },
          { path: 'video', element: <VideoSequencer /> },
          { path: 'post', element: <GeneralPostForm /> },
          { path: 'stories', element: <StoriesRoutePlaceholder /> }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import our Tool Components
import { BackgroundTool } from '../components/EditorTools/BackgroundTool';
import { TextTool } from '../components/EditorTools/TextTool';
import { CanvasObjectTool } from '../components/EditorTools/CanvasObjectTool';
import { VisualCanvas } from '../components/VisualCanvas';
import { NewLetterModal } from '../components/Modals/NewLetterModal';

import { ExplorePanel } from '../components/ExplorePanel';
import { MissionsTable } from '../components/MissionsTable';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [letters, setLetters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop'); // 'desktop' or 'mobile'
  const [currentTab, setCurrentTab] = useState('missions'); // 'missions', 'explore', 'people'

  // inside UserDashboard.jsx

  const handleCreateDraft = (modalData) => {
    // 1. Create the temporary draft object
    const newDraft = {
      ...modalData,
      _isLocalDraft: true, // Internal flag to know it's not in DB yet
      id: `draft-${Date.now()}`,
      message: "",
      canvas: config.canvas,
      text: config.text
    };

    // 2. Save to Local Storage
    localStorage.setItem('active_draft', JSON.stringify(newDraft));

    // 3. Update State to trigger the UI shift
    setConfig(newDraft);
    setView('create');
    setIsModalOpen(false);
  };

  const handleFinalizeAndPush = async () => {
    try {
      const token = localStorage.getItem('token');
      const slug = config.title.toLowerCase().replace(/ /g, '-') + '-' + Date.now();
      const [currentTab, setCurrentTab] = useState('missions'); // 'missions', 'explore', 'people'

      const response = await fetch('http://127.0.0.1:5000/api/letters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...config, slug })
      });

      const result = await response.json();
      if (result.success) {
        // 1. Add the new letter to your local state list
        setLetters(prev => [result.data, ...prev]);

        // 2. Clear the local storage draft
        localStorage.removeItem('active_draft');

        // 3. Reset the view and config to 'empty'
        setView('list');
        setConfig({ /* reset to initial state */ });

        console.log("Mission Deployed! Redirecting to Dashboard...");
      }
    } catch (err) {
      console.error("Deployment failed:", err);
    }
  };


  // State aligned with lettersSchema.js
  const [config, setConfig] = useState({
    title: '',
    recipient: '',
    sender: 'User',
    message: '',
    relation: 'Friend',
    text: {
      fontStyle: 'serif',
      textColor: '#ffffff',
      textSize: 18,
      textType: 'Paragraph'
    },
    canvas: {
      background: '#1A1828',
      hasObject: false,
      objects: 'None',
      objectCount: 20,
      objectSize: 10,
      objectsMotion: 'Bounce',
      isFullScreen: true
    }
  });

  useEffect(() => {
    // Only auto-save if we are in 'create' mode and have a letter ID
    if (view === 'create' && config._id) {
      const delayDebounceFn = setTimeout(() => {
        saveDraftToDB();
      }, 1500); // Wait 1.5 seconds after the last change

      return () => clearTimeout(delayDebounceFn);
    }
  }, [config]);

  const saveDraftToDB = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://127.0.0.1:5000/api/letters/${config._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(config) // Sends the entire config aligned with your Schema
      });
      console.log("Draft Synced to Cloud");
    } catch (err) {
      console.warn("Auto-save failed:", err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Inside UserDashboard.jsx
  return (
    <div className="flex h-screen bg-[#0B0914] text-white overflow-hidden">

      <nav className="space-y-2 mt-8">
        <button
          onClick={() => setCurrentTab('missions')}
          className={`w-full text-left p-4 rounded-2xl transition-all ${currentTab === 'missions' ? 'bg-[#FFB7C5] text-[#14111E] font-bold' : 'text-white/40 hover:bg-white/5'}`}
        >
          📂 Active Missions
        </button>
        <button
          onClick={() => setCurrentTab('explore')}
          className={`w-full text-left p-4 rounded-2xl transition-all ${currentTab === 'explore' ? 'bg-[#FFB7C5] text-[#14111E] font-bold' : 'text-white/40 hover:bg-white/5'}`}
        >
          🌐 Explore Community
        </button>
      </nav>


      <main className="flex-1 bg-[#050505] overflow-y-auto">
        {currentTab === 'missions' && <MissionsTable letters={letters} />}
        {currentTab === 'explore' && <ExplorePanel />}
      </main>
    </div>
  );
};

export default UserDashboard;
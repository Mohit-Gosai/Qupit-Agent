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

import { LettersPanel } from '../components/LettersPanel';
import { Sidebar } from '../components/Sidebar';
import PeoplePanel from '../components/PeoplePanel'; // No curly braces

const UserDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [letters, setLetters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop'); // 'desktop' or 'mobile'
  const [currentTab, setCurrentTab] = useState('missions'); // 'missions', 'explore', 'people'
  // 'missions', 'explore', 'people'

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

      const response = await fetch('http://127.0.0.1:5000/api/letters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...config, slug })
      });
      if (!config.title) {
        alert("Please name your mission before deploying!");
        return;
      }

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

  useEffect(() => {
    const fetchUserMissions = async () => {
      try {
        const token = localStorage.getItem('token');
        // Update this endpoint to only fetch letters belonging to the logged-in user[cite: 2]
        const response = await fetch('http://127.0.0.1:5000/api/letters/my-missions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (result.success) {
          setLetters(result.data); // This populates the list from the DB
        }
      } catch (err) {
        console.error("Failed to load missions:", err);
      }
    };

    fetchUserMissions();
  }, []); // Empty dependency array means this runs once on mount/refresh

  const handleEditMission = (letterData) => {
    // 1. Set the editor configuration to the selected letter's data
    setConfig({
      ...letterData,
      // Ensure nested objects are preserved
      canvas: letterData.canvas,
      text: letterData.text
    });

    // 2. Switch to 'create' view (The Architect Workspace)
    setView('create');
  };

  // State aligned with lettersSchema.js
  const [config, setConfig] = useState({
    title: '',
    recipient: '',
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

  const handleEditExisting = (letter) => {
    // Populate the editor with existing letter data[cite: 4]
    setConfig({
      ...letter,
      _id: letter._id, // Critical for the PUT auto-save logic[cite: 4]
    });
    setView('create');
  };
  // Inside UserDashboard.jsx
  return (
    <div className="flex h-screen bg-[#0B0914] text-white overflow-hidden">

      {/* REFACTORED SIDEBAR */}
      <Sidebar
        view={view}
        setView={setView}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setIsModalOpen={setIsModalOpen}
        config={config}
        setConfig={setConfig}
        handleFinalizeAndPush={handleFinalizeAndPush}
      />

      <main className="flex-1 bg-[#050505] relative flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'list' ? (
            <motion.div key="dashboard-tabs" className="h-full overflow-y-auto">
              {currentTab === 'missions' && <MissionsTable letters={letters} onEdit={handleEditMission} />}
              {currentTab === 'explore' && <ExplorePanel />}
              {currentTab === 'people' && <PeoplePanel letters={letters} />}
            </motion.div>
          ) : (
            <motion.div key="architect-workspace" className="flex-1 flex flex-col h-full">
              {/* Architect Workspace Preview Logic ... */}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <NewLetterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(data) => {
          handleCreateDraft(data);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default UserDashboard;
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

      {/* LEFT SIDEBAR */}
      <aside className="w-80 border-r border-white/5 bg-[#14111E] flex flex-col z-30">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-[#FFB7C5] font-black text-2xl tracking-tighter">Qupit.</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          
          {view === 'list' ? (
            <nav className="space-y-2">
              <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] mb-4 ml-2">Terminal</p>
              {/* Primary Action Button in Sidebar */}
              {view === 'list' && (
                <button
                  onClick={() => {
                    console.log("Initiating Mission..."); // Debugging line
                    setIsModalOpen(true);
                  }}
                  className="w-full py-4 bg-[#FFB7C5] text-[#14111E] rounded-2xl font-black mb-8 
               hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#FFB7C5]/10"
                >
                  + Initiate New Mission
                </button>
              )}
              <button
                onClick={() => setCurrentTab('explore')}
                className={`w-full text-left p-4 rounded-2xl transition-all ${currentTab === 'explore' ? 'bg-white/5 text-[#FFB7C5] font-bold' : 'text-white/40 hover:bg-white/5'}`}
              >
                🌐 Explore Community
              </button>
            </nav>
          ) : (
            /* ARCHITECT TOOLS (Only shows when editing) */
            <div className="space-y-10">
              <button
                onClick={() => setView('list')}
                className="text-[10px] text-white/20 hover:text-white uppercase tracking-widest mb-10"
              >
                ← Back to Terminal
              </button>
              <BackgroundTool config={config} setConfig={setConfig} />
              <CanvasObjectTool config={config} setConfig={setConfig} />
              <TextTool config={config} setConfig={setConfig} />

              {/* Local Draft Status */}
              {config._isLocalDraft && (
                <div className="p-6 mt-4 bg-[#FFB7C5]/5 border border-[#FFB7C5]/20 rounded-2xl">
                  <p className="text-[10px] text-[#FFB7C5] uppercase tracking-widest mb-2">Draft Status: Local</p>
                  <button
                    onClick={handleFinalizeAndPush}
                    disabled={config.message.length < 50}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${config.message.length >= 50 ? 'bg-[#FFB7C5] text-[#14111E]' : 'bg-white/5 text-white/20'}`}
                  >
                    Push to Cloud
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 bg-[#050505] relative flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {/* VIEW 1: THE DASHBOARD TABS */}
          {view === 'list' ? (
            <motion.div
              key="dashboard-tabs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto"
            >
              {currentTab === 'missions' && (
                <MissionsTable
                  letters={letters}
                  onEdit={(letter) => {
                    setConfig(letter);
                    setView('create');
                  }}
                />
              )}
              {currentTab === 'explore' && <ExplorePanel />}
              {currentTab === 'people' && <PeoplePanel letters={letters} />}
            </motion.div>
          ) : (
            /* VIEW 2: THE ARCHITECT WORKSPACE (Canvas) */
            <motion.div
              key="architect-workspace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col h-full bg-[#050505]"
            >
              {/* Top Toolbar for Screen Size testing */}
              <div className="h-14 border-b border-white/5 flex items-center justify-center gap-4 bg-[#14111E]/40">
                <button onClick={() => setScreenSize('mobile')} className="p-2 hover:bg-white/5 rounded">📱</button>
                <button onClick={() => setScreenSize('desktop')} className="p-2 hover:bg-white/5 rounded">💻</button>
              </div>

              {/* THE DYNAMIC PREVIEW AREA */}
              <div className="flex-1 p-12 flex items-center justify-center overflow-hidden">
                <div
                  className={`transition-all duration-500 shadow-2xl rounded-[3rem] overflow-hidden relative ${screenSize === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full max-w-4xl aspect-video'
                    }`}
                  style={{ backgroundColor: config.canvas.background }}
                >
                  <VisualCanvas config={config} />
                  <div className="relative z-10 p-12 h-full flex items-center justify-center text-center">
                    <p style={{
                      fontFamily: config.text.fontStyle,
                      color: config.text.textColor,
                      fontSize: `${config.text.textSize}px`
                    }}>
                      {config.message || "Start typing your mission message..."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <NewLetterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(data) => {
          handleCreateDraft(data); // This switches view to 'create'
          setIsModalOpen(false);   // Closes modal after success
        }}
      />
    </div>
  );
};

export default UserDashboard;
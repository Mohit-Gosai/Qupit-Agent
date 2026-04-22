import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import our Tool Components
import { BackgroundTool } from '../components/EditorTools/BackgroundTool';
import { TextTool } from '../components/EditorTools/TextTool';
import { CanvasObjectTool } from '../components/EditorTools/CanvasObjectTool';
import { VisualCanvas } from '../components/VisualCanvas';
import { NewLetterModal } from '../components/Modals/NewLetterModal';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [letters, setLetters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop'); // 'desktop' or 'mobile'

  // inside UserDashboard.jsx

  const handleCreateDraft = async (modalData) => {
    try {
      const token = localStorage.getItem('token');

      // Auto-generate a slug from the title for the Schema requirement
      const slug = modalData.title.toLowerCase().replace(/ /g, '-') + '-' + Date.now();
      // Inside handleCreateDraft in UserDashboard.jsx
      const response = await fetch('http://127.0.0.1:5000/api/letters', {
        method: 'POST',
        // ... headers
        body: JSON.stringify({
          ...modalData,
          slug,
          // This is now 63 characters - satisfying the minLength: 50
          message: "This is a new draft mission. Your secret journey begins here. Stay safe agent.",
          canvas: config.canvas,
          text: config.text
        })
      });

      const result = await response.json();

      if (result.success) {
        // 1. Update the local letters list
        setLetters([result.data, ...letters]);
        // 2. Set the current editor config to this new letter's data
        setConfig(result.data);
        // 3. Shift the layout to the Architect view
        setView('create');
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to initiate mission:", err);
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

      {/* LEFT SIDEBAR: Context-Aware */}
      <aside className="w-80 border-r border-white/5 bg-[#14111E] flex flex-col z-30">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-[#FFB7C5] font-black text-2xl tracking-tighter">Qupit.</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {view === 'list' ? (
            // Default Dashboard Nav
            <nav className="space-y-4">
              <button onClick={() => setIsModalOpen(true)} className="w-full py-4 bg-[#FFB7C5] text-[#14111E] rounded-2xl font-black mb-4">+ New Letter</button>
              <button className="w-full text-left p-3 bg-white/5 rounded-xl">Active Letters</button>
            </nav>
          ) : (
            // ARCHITECT TOOLS (Moved to Sidebar for more Canvas room)
            <div className="space-y-10 animate-in slide-in-from-left-4">
              <button onClick={() => setView('list')} className="text-[10px] text-white/20 hover:text-white uppercase tracking-widest">← Back to List</button>
              <BackgroundTool config={config} setConfig={setConfig} />
              <CanvasObjectTool config={config} setConfig={setConfig} />
              <TextTool config={config} setConfig={setConfig} />
              {/* Responsiveness Tool (Next to build) */}
              <div className="pt-6 border-t border-white/5">
                <button className="w-full py-4 bg-white text-black font-black rounded-2xl">Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT: The Responsive Canvas */}
      <main className="flex-1 bg-[#050505] relative flex flex-col">
        <AnimatePresence mode="wait">
          {view === 'list' ? (
            <motion.div key="list" className="p-10 overflow-y-auto h-full">
              <h1 className="text-3xl font-bold mb-8">User Cluster</h1>
              {/* ... Letter List Cards ... */}
            </motion.div>
          ) : (
            <motion.div key="architect" className="flex-1 flex flex-col h-full bg-[#050505]">
              {/* Top Toolbar for Screen Size testing */}
              <div className="h-14 border-b border-white/5 flex items-center justify-center gap-4 bg-[#14111E]/40">
                <button onClick={() => setScreenSize('mobile')} className="p-2 hover:bg-white/5 rounded">📱</button>
                <button onClick={() => setScreenSize('desktop')} className="p-2 hover:bg-white/5 rounded">💻</button>
              </div>

              {/* THE DYNAMIC PREVIEW AREA */}
              <div className="flex-1 p-12 flex items-center justify-center overflow-hidden">
                <div className={`transition-all duration-500 shadow-2xl rounded-[3rem] overflow-hidden relative ${screenSize === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full max-w-4xl aspect-video'
                  }`} style={{ backgroundColor: config.canvas.background }}>
                  <VisualCanvas config={config} />
                  <div className="relative z-10 p-12 h-full flex items-center justify-center text-center">
                    <p style={{ fontFamily: config.text.fontStyle, color: config.text.textColor }}>{config.message}</p>
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
        onCreate={handleCreateDraft}
      />
    </div>
  );
};

export default UserDashboard;
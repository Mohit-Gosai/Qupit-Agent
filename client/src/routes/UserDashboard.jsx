import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import our Tool Components
import { VisualCanvas } from '../components/VisualCanvas';
import { NewLetterModal } from '../components/Modals/NewLetterModal';
import { ExplorePanel } from '../components/ExplorePanel';
import { MissionsTable } from '../components/MissionsTable';
import { Sidebar } from '../components/Sidebar';
import PeoplePanel from '../components/PeoplePanel';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list'); // 'list' or 'editor'
  const [letters, setLetters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('missions');

  // State aligned with your new Section-based Schema
  const [config, setConfig] = useState({
    title: '',
    recipient: '',
    relation: 'Friend',
    sections: [] // Array of storyboard scenes
  });
  // Inside UserDashboard.jsx
  const [activeSectionId, setActiveSectionId] = useState(null);

  // Helper to update the currently selected section
  const updateActiveSection = (updates) => {
    const updatedSections = config.sections.map(sec =>
      sec.id === activeSectionId ? { ...sec, ...updates } : sec
    );
    setConfig({ ...config, sections: updatedSections });
  };

  // Inside UserDashboard.jsx
  useEffect(() => {
    if (view === 'editor' && config.sections?.length > 0) {
      // Flag it as a local draft so it shows up in the table
      const draftToSave = { ...config, _isLocalDraft: true };
      localStorage.setItem('active_draft', JSON.stringify(draftToSave));
    }
  }, [config, view]);

  // Logic to load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('active_draft');
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      // Add the draft to the letters list so it appears in MissionsTable
      setLetters(prev => {
        const exists = prev.find(l => l.id === parsedDraft.id || l._isLocalDraft);
        return exists ? prev : [parsedDraft, ...prev];
      });
    }
  }, []);

  // Load missions from DB on mount
  // Inside UserDashboard.jsx

  // Modified: Load missions and draft on mount
  // Inside UserDashboard.jsx
  useEffect(() => {
    const fetchUserMissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:5000/api/letters/my-missions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();

        // 1. Start with API data
        let allMissions = result.success ? result.data : [];

        // 2. Check for the local draft[cite: 11]
        const savedDraft = localStorage.getItem('active_draft');
        if (savedDraft) {
          const parsedDraft = JSON.parse(savedDraft);

          // 3. MERGE LOGIC: Remove any existing version of this draft from the array first
          // then add the freshest version from localStorage at the top[cite: 11]
          allMissions = [
            parsedDraft,
            ...allMissions.filter(m => m._id !== parsedDraft._id && !m._isLocalDraft)
          ];
        }

        setLetters(allMissions);
      } catch (err) {
        console.error("Failed to load missions:", err);
      }
    };

    fetchUserMissions();
  }, []); // Runs once on mount
  // Modified: Auto-save watcher[cite: 6, 11]
  useEffect(() => {
    if (view === 'editor' && config.sections?.length > 0) {
      const draftToSave = { ...config, _isLocalDraft: true };
      localStorage.setItem('active_draft', JSON.stringify(draftToSave));

      // Update letters state immediately so the table reflects the changes live
      setLetters(prev => {
        const filtered = prev.filter(l => !l._isLocalDraft);
        return [draftToSave, ...filtered];
      });
    }
  }, [config, view]);
  const handleCreateDraft = (data) => {
    const newDraft = {
      ...data,
      sections: [
        {
          id: Date.now(),
          sectionName: "Intro",
          sectionType: "hero-reveal",
          background: "bg-slate-900", // Give it a default color instead of transparent
          canvas: { // Always include this to satisfy VisualCanvas[cite: 16, 17]
            hasObject: false,
            objects: 'None',
            objectCount: 30
          },
          content: {
            message: "It's Been 1 Month.",
            fontStyle: "font-serif",
            textColor: "#ffffff"
          }
        }
      ]
    };
    setConfig(newDraft);
    setView('editor');
  };

  const handleFinalizeAndPush = async () => {
    if (!config.title) return alert("Please name your mission!");
    try {
      const token = localStorage.getItem('token');
      const slug = config.title.toLowerCase().replace(/ /g, '-') + '-' + Date.now();

      const response = await fetch('http://127.0.0.1:5000/api/letters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...config, slug, _isLocalDraft: false }) // Remove draft flag
      });

      const result = await response.json();
      if (result.success) {
        localStorage.removeItem('active_draft'); // Clear the auto-save
        setLetters(prev => [result.data, ...prev.filter(l => !l._isLocalDraft)]);
        setView('list');
      }
    } catch (err) {
      console.error("Deployment failed:", err);
    }
  };
  return (
    <div className="flex h-screen bg-[#0B0914] text-white overflow-hidden font-sans">

      {/* 1. SIDEBAR INTEGRATION */}
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

      {/* 2. MAIN VIEWPORT */}
      {/* Restored Main Viewport Logic */}
      <main className="flex-1 overflow-y-auto bg-black">
        {view === 'editor' ? (
          /* 1. THE ARCHITECT EDITOR (The New Section System) */
          <div className="h-full snap-y snap-mandatory overflow-y-auto">
            {config.sections && config.sections.length > 0 ? (
              config.sections.map((section) => (
                <section
                  key={section.id}
                  className={`h-screen w-full flex items-center justify-center snap-start relative ${section.background}`}
                >
                  {/* VisualCanvas needs to be per-section now[cite: 19] */}
                  {section.canvas?.hasObject && <VisualCanvas config={section} />}

                  <motion.div
                    className={`${section.content.fontStyle} text-center z-10`}
                    style={{ color: section.content.textColor }}
                  >
                    <h1 className="text-5xl font-black">{section.content.message}</h1>
                  </motion.div>
                </section>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-white/20">
                Terminal Empty. Add a scene to begin.
              </div>
            )}
          </div>
        ) : (
          /* 2. THE DASHBOARD PANELS (Restoring your missing views[cite: 15, 17, 18]) */
          <div className="h-full">
            {currentTab === 'missions' && (
              <MissionsTable
                letters={letters}
                onEdit={(mission) => { setConfig(mission); setView('editor'); }}
              />
            )}

            {currentTab === 'people' && (
              <PeoplePanel letters={letters} />
            )}

            {currentTab === 'explore' && (
              <ExplorePanel />
            )}
          </div>
        )}
      </main>

      {/* 4. MODAL INTEGRATION */}
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
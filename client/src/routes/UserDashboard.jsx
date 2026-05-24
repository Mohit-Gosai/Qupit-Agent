import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import our Tool Components
import { VisualCanvas } from '../components/VisualCanvas';
import { NewLetterModal } from '../components/Modals/NewLetterModal';
import { ExplorePanel } from '../components/ExplorePanel';
import { MissionsTable } from '../components/MissionsTable';
import Sidebar from '../components/Sidebar';
import PeoplePanel from '../components/PeoplePanel';
import { ArchitectPreview } from '../components/ArchitectPreview'; //

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

  // Inside UserDashboard.jsx
  const handleCreateDraft = (data) => {
    const newDraft = {
      ...data,
      sections: [
        {
          id: Date.now(),
          sectionName: "Intro",
          background: "bg-slate-900",
          // UPGRADED: Always initialize with the modules array
          modules: [
            {
              id: 1,
              contentType: 'text',
              text: "It's Been 1 Month.",
              font: "font-serif",
              size: "text-5xl",
              color: "#ffffff",
              align: "text-center",
              mediaUrl: "",
              mediaType: "image"
            }
          ],
          canvas: {
            hasObject: false,
            objects: 'None',
            motion: 'Float'
          }
        }
      ]
    };
    setConfig(newDraft);
    setView('editor');
  };

  // Add a completely new scene

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

      <main className="flex-1 overflow-y-auto bg-black scrollbar-hide">
        {view === 'editor' ? (
          <div className="h-full snap-y snap-mandatory overflow-y-auto">
            {config.sections?.map((section) => (
              <section
                key={section.id}
                className={`h-screen w-full flex items-center justify-center snap-start relative ${section.background}`}
              >
                {section.canvas?.hasObject && <VisualCanvas config={section} />}

                {/* NEW GRID RENDERER */}
                {/* Replace the motion.div inside the editor view in UserDashboard.jsx */}
                <div className={`w-full h-full p-10 z-10 grid gap-6 ${section.modules?.length === 2 ? 'grid-cols-2' :
                    section.modules?.length === 3 ? 'grid-cols-3' : 'grid-cols-1'
                  }`}>
                  {section.modules?.map((module, i) => (
                    <motion.div
                      key={i}
                      className={`relative flex flex-col items-center justify-center p-6 rounded-3xl border border-white/5 backdrop-blur-sm bg-black/10 overflow-hidden`}
                    >
                      {module.contentType === 'media' ? (
                        <div className="w-full h-full flex items-center justify-center">
                          {module.mediaType === 'video' ? (
                            <video src={module.mediaUrl} autoPlay loop muted className="w-full h-full object-cover rounded-2xl" />
                          ) : (
                            <img src={module.mediaUrl} alt="" className="w-full h-full object-cover rounded-2xl" />
                          )}
                          {module.mediaCaption && (
                            <div className="absolute bottom-4 p-2 bg-black/60 rounded-lg text-xs">
                              {module.mediaCaption}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className={`flex flex-col justify-center h-full w-full ${module.align || 'text-center'}`}>
                          <h1
                            className={`${module.font || 'font-sans'} ${module.size || 'text-xl'} leading-tight`}
                            style={{ color: module.color || '#FFFFFF' }}
                          >
                            {module.text}
                          </h1>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* ... existing dashboard tabs (missions, people, explore) */
          <motion.div
            key="tabs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full"
          >
            {currentTab === 'missions' && (
              <MissionsTable
                letters={letters}
                onEdit={(mission) => {
                  setConfig(mission);
                  setView('editor');
                }}
              />
            )}

            {currentTab === 'people' && (
              <PeoplePanel letters={letters} />
            )}

            {currentTab === 'explore' && (
              <ExplorePanel />
            )}
          </motion.div>
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
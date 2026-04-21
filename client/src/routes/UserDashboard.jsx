import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import our Tool Components
import { BackgroundTool } from '../components/EditorTools/BackgroundTool';
import { TextTool } from '../components/EditorTools/TextTool';
import { CanvasObjectTool } from '../components/EditorTools/CanvasObjectTool';
import { VisualCanvas } from '../components/VisualCanvas';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list'); 
  const [letters, setLetters] = useState([]);
  
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#0B0914] text-white">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 bg-[#14111E] p-6 flex flex-col z-20">
        <div className="mb-10">
          <h2 className="text-[#FFB7C5] font-black text-2xl">Qupit.</h2>
          <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Agent Dashboard</p>
        </div>

        <button 
          onClick={() => setView('create')}
          className={`w-full py-4 rounded-2xl font-bold mb-8 transition-all ${
            view === 'create' ? 'bg-white text-black shadow-lg' : 'bg-[#FFB7C5] text-[#14111E]'
          }`}
        >
          {view === 'create' ? 'Architect Mode' : '+ New Letter'}
        </button>

        <nav className="flex-1">
          <button 
            onClick={() => setView('list')}
            className={`w-full text-left p-3 rounded-xl ${view === 'list' ? 'bg-white/5' : 'text-white/40'}`}
          >
            Active Missions
          </button>
        </nav>

        <button onClick={handleLogout} className="p-3 text-left text-white/20 hover:text-red-400 text-xs">
          Logout
        </button>
      </aside>

      {/* WORKSPACE */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'list' ? (
            /* LIST VIEW */
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-10">
              <h1 className="text-3xl font-bold mb-8">Your Deployments</h1>
              <div className="grid gap-4">
                {/* Your letters.map logic here */}
                <div className="border-2 border-dashed border-white/5 rounded-[3rem] py-20 text-center text-white/20">
                  Ready for a new mission.
                </div>
              </div>
            </motion.div>
          ) : (
            /* ARCHITECT VIEW */
            <motion.div key="create" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex h-full">
              
              {/* TOOLBAR */}
              <section className="w-80 border-r border-white/5 bg-[#14111E]/50 p-8 overflow-y-auto space-y-8">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB7C5]">Configuration</span>
                  <button onClick={() => setView('list')} className="text-[10px] text-white/20 hover:text-white">Exit</button>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] text-white/30 uppercase">Letter Title</label>
                   <input 
                     type="text" 
                     className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none" 
                     placeholder="Mission Name..."
                     onChange={(e) => setConfig({...config, title: e.target.value})}
                   />
                </div>

                <BackgroundTool config={config} setConfig={setConfig} />
                <CanvasObjectTool config={config} setConfig={setConfig} />
                <TextTool config={config} setConfig={setConfig} />

                <button className="w-full py-4 bg-white text-black font-black rounded-2xl hover:scale-[1.02] transition-all">
                  DEPLOY TO MONGODB
                </button>
              </section>

              {/* LIVE CANVAS PREVIEW */}
              <section className="flex-1 bg-[#050505] p-12 flex items-center justify-center">
                <div 
                  className="relative w-full max-w-md aspect-[3/4] rounded-[3rem] shadow-2xl overflow-hidden transition-colors duration-700"
                  style={{ backgroundColor: config.canvas.background }}
                >
                  {/* HTML5 CANVAS LAYER */}
                  <VisualCanvas config={config} />

                  {/* TEXT LAYER */}
                  <div className="relative z-10 h-full p-12 flex flex-col justify-center text-center">
                    <p 
                      style={{ 
                        fontFamily: config.text.fontStyle, 
                        color: config.text.textColor, 
                        fontSize: `${config.text.textSize}px` 
                      }}
                      className="leading-relaxed drop-shadow-md"
                    >
                      {config.message || "Your message appears here..."}
                    </p>
                  </div>
                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default UserDashboard;
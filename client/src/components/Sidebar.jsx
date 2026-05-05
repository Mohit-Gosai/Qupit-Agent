import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import verbatim tools
import { BackgroundTool } from './EditorTools/BackgroundTool';
import { TextTool } from './EditorTools/TextTool';
import { CanvasObjectTool } from './EditorTools/CanvasObjectTool';
import { ViewportTool } from './EditorTools/ViewPortTool';

export const Sidebar = ({
    view,
    setView,
    currentTab,
    setCurrentTab,
    setIsModalOpen,
    config,
    setConfig,
    handleFinalizeAndPush,
    screenSize,    // Pass these from Dashboard
    setScreenSize
}) => {
    // Track which section is being edited for granular tool control
    const [activeSectionId, setActiveSectionId] = useState(null);

    const addSection = (type) => {
        const newSection = {
            id: Date.now(),
            sectionName: `Section ${config.sections?.length + 1 || 1}`,
            sectionType: type,
            background: "bg-[#1A1828]",
            content: {
                message: type === 'hero-reveal' ? "It's Been 1 Month." : "Your message here...",
                fontStyle: "font-serif",
                textColor: "#ffffff"
            },
            canvas: {
                objects: 'None',
                hasObject: false
            }
        };
        setConfig({ ...config, sections: [...(config.sections || []), newSection] });
        setActiveSectionId(newSection.id); // Auto-focus new section
    };

    // Helper to update specific section data[cite: 4]
    const updateSection = (sectionId, updates) => {
        const updated = config.sections.map(s =>
            s.id === sectionId ? { ...s, ...updates } : s
        );
        setConfig({ ...config, sections: updated });
    };

    return (
        <aside className="w-80 border-r border-white/5 bg-[#14111E] flex flex-col z-30">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-[#FFB7C5] font-black text-2xl tracking-tighter uppercase">Qupit.</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {view === 'list' ? (
                    <nav className="space-y-2">
                        {/* Inside Sidebar.jsx Navigation[cite: 13] */}
                        <button onClick={() => setIsModalOpen(true)} className="w-full py-4 bg-[#FFB7C5] text-[#14111E] rounded-2xl font-black mb-8 hover:scale-[1.02] transition-all">+ New Mission</button>
                        <button onClick={() => setCurrentTab('missions')} className={`w-full text-left p-4 rounded-2xl ${currentTab === 'missions' ? 'bg-white/5 text-[#FFB7C5]' : 'text-white/40'}`}>📂 Missions</button>
                        <button onClick={() => setCurrentTab('people')} className={`w-full text-left p-4 rounded-2xl ${currentTab === 'people' ? 'bg-white/5 text-[#FFB7C5]' : 'text-white/40'}`}>👥 Network</button>
                        <button onClick={() => setCurrentTab('explore')} className={`w-full text-left p-4 rounded-2xl ${currentTab === 'explore' ? 'bg-white/5 text-[#FFB7C5]' : 'text-white/40'}`}>🌐 Explore</button>

                    </nav>
                ) : (
                    <div className="space-y-8 animate-in slide-in-from-left-4">
                        <button onClick={() => setView('list')} className="text-[10px] text-white/20 hover:text-white uppercase tracking-widest block">← Back to Terminal</button>

                        {/* 1. Global Viewport Control */}
                        <ViewportTool screenSize={screenSize} setScreenSize={setScreenSize} />

                        {/* 2. Storyboard Manager[cite: 4] */}
                        <div className="space-y-4">
                            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Build Storyboard</p>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => addSection('hero-reveal')} className="p-2 bg-white/5 border border-white/10 rounded-lg text-[9px] text-white/60 hover:border-[#FFB7C5]/50 transition-all">HERO</button>
                                <button onClick={() => addSection('single-column')} className="p-2 bg-white/5 border border-white/10 rounded-lg text-[9px] text-white/60 hover:border-[#FFB7C5]/50 transition-all">TEXT</button>
                                <button onClick={() => addSection('two-columns')} className="p-2 bg-white/5 border border-white/10 rounded-lg text-[9px] text-white/60 hover:border-[#FFB7C5]/50 transition-all">MEDIA</button>
                            </div>
                        </div>

                        {/* 3. Section List & Active Tools[cite: 4, 5, 8] */}
                        <div className="space-y-3">
                            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Active Scenes</p>
                            <div className="space-y-3">
                                {config.sections?.map((section) => (
                                    <div key={section.id} className="space-y-4">
                                        <button
                                            onClick={() => setActiveSectionId(activeSectionId === section.id ? null : section.id)}
                                            className={`w-full p-4 rounded-2xl border transition-all text-left group ${activeSectionId === section.id ? 'bg-[#FFB7C5]/10 border-[#FFB7C5]/50' : 'bg-white/5 border-white/10'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] text-[#FFB7C5] font-bold uppercase">{section.sectionType}</span>
                                                <span className="text-[10px] text-white/20 group-hover:text-white/60">{activeSectionId === section.id ? '▼' : '▶'}</span>
                                            </div>
                                            <p className="text-xs text-white/60 mt-1 truncate">{section.content.message}</p>
                                        </button>

                                        {/* CONTEXTUAL TOOLS: Only show for the active section[cite: 4] */}
                                        {/* Inside Sidebar.jsx mapping over config.sections */}
                                        <AnimatePresence>
                                            {activeSectionId === section.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    className="space-y-6 p-4 bg-black/20 rounded-xl border border-white/5"
                                                >
                                                    {/* CHANGE: Pass 'section' instead of 'config' */}
                                                    {/* CHANGE: Pass 'onUpdate' instead of 'setConfig' */}
                                                    <BackgroundTool
                                                        section={section}
                                                        onUpdate={(updates) => updateSection(section.id, updates)}
                                                    />

                                                    <TextTool
                                                        section={section}
                                                        onUpdate={(updates) => updateSection(section.id, updates)}
                                                    />

                                                    {/* Inside Sidebar.jsx mapping over sections */}

                                                    <CanvasObjectTool
                                                        section={section}
                                                        onUpdate={(updates) => updateSection(section.id, updates)}
                                                    />

                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={handleFinalizeAndPush} className="w-full py-4 bg-[#FFB7C5] text-[#14111E] rounded-2xl font-black mt-10 shadow-lg shadow-[#FFB7C5]/10 hover:scale-[1.02] transition-all underline decoration-2">DEPLOY TO CLOUD</button>
                    </div>
                )}
            </div>
        </aside>
    );
};
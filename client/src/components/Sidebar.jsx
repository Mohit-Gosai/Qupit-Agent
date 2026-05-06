import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

// Import verbatim tools
import { BackgroundTool } from './EditorTools/BackgroundTool';
import { TextTool } from './EditorTools/TextTool';
import { CanvasObjectTool } from './EditorTools/CanvasObjectTool';
import { ViewportTool } from './EditorTools/ViewPortTool';

const Sidebar = ({
    view,
    setView,
    currentTab,
    setCurrentTab,
    setIsModalOpen,
    config,
    setConfig,
    handleFinalizeAndPush,
    screenSize,
    setScreenSize
}) => {
    const [sidebarWidth, setSidebarWidth] = useState(320); 
    const isResizing = useRef(false);

    // Resizing Logic
    const startResizing = (e) => {
        isResizing.current = true;
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResizing);
        // Prevent text selection during drag
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
    };

    const resize = (e) => {
        if (isResizing.current) {
            const newWidth = Math.min(Math.max(e.clientX, 280), 600);
            setSidebarWidth(newWidth);
        }
    };

    const stopResizing = () => {
        isResizing.current = false;
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResizing);
        document.body.style.userSelect = 'auto';
        document.body.style.cursor = 'default';
    };

    const [activeSectionId, setActiveSectionId] = useState(null);

    const deleteSection = (id) => {
        if (config.sections.length <= 1) return alert("Your story needs at least one scene!");
        const updatedSections = config.sections.filter(s => s.id !== id);
        if (activeSectionId === id) setActiveSectionId(updatedSections[0].id);
        setConfig({ ...config, sections: updatedSections });
    };

    const addNewSection = () => {
        const newScene = {
            id: Date.now(),
            background: 'bg-slate-900',
            columns: 1,
            modules: [{ id: 1, text: "New Scene", font: "font-serif", size: "text-4xl" }],
            canvas: { hasObject: false, objects: 'None', motion: 'Float' }
        };
        setConfig({ ...config, sections: [...config.sections, newScene] });
        setActiveSectionId(newScene.id);
    };

    const addColumnToSection = (id) => {
        const updated = config.sections.map(s => {
            if (s.id === id) {
                const currentCols = s.modules?.length || 1;
                if (currentCols >= 3) return { ...s, modules: [s.modules[0]] };
                const newModule = {
                    id: currentCols + 1,
                    text: `Module ${currentCols + 1}`,
                    font: "font-sans",
                    size: "text-2xl"
                };
                return { ...s, modules: [...s.modules, newModule] };
            }
            return s;
        });
        setConfig({ ...config, sections: updated });
    };

    const updateSection = (id, updates) => {
        const updatedSections = config.sections.map((s) =>
            s.id === id ? { ...s, ...updates } : s
        );
        setConfig({ ...config, sections: updatedSections });
    };

    return (
        <aside 
            style={{ width: `${sidebarWidth}px` }}
            className="relative border-r border-white/5 bg-[#14111E] flex flex-col z-30 h-screen transition-[width] duration-75 ease-out"
        >
            {/* 1. THE RESIZE HANDLE */}
            <div 
                onMouseDown={startResizing}
                className="absolute right-[-2px] top-0 h-full w-[4px] cursor-col-resize z-50 group"
            >
                <div className="h-full w-full group-hover:bg-[#FFB7C5]/30 group-active:bg-[#FFB7C5] transition-colors" />
            </div>

            {/* 2. HEADER */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center shrink-0">
                <h2 className="text-[#FFB7C5] font-black text-2xl tracking-tighter uppercase">Qupit.</h2>
            </div>

            {/* 3. SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                {view === 'list' ? (
                    <nav className="space-y-2">
                        <button onClick={() => setIsModalOpen(true)} className="w-full py-4 bg-[#FFB7C5] text-[#14111E] rounded-2xl font-black mb-8 hover:scale-[1.02] transition-all">
                            + New Mission
                        </button>
                        {['missions', 'people', 'explore'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setCurrentTab(tab)}
                                className={`w-full text-left p-4 rounded-2xl capitalize transition-colors ${currentTab === tab ? 'bg-white/5 text-[#FFB7C5]' : 'text-white/40 hover:text-white'}`}
                            >
                                {tab === 'missions' ? '📂' : tab === 'people' ? '👥' : '🌐'} {tab}
                            </button>
                        ))}
                    </nav>
                ) : (
                    <div className="space-y-8 animate-in slide-in-from-left-4">
                        <button onClick={() => setView('list')} className="text-[10px] text-white/20 hover:text-white uppercase tracking-widest block">
                            ← Back to Terminal
                        </button>

                        <ViewportTool screenSize={screenSize} setScreenSize={setScreenSize} />

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Active Sections</label>
                                <button onClick={addNewSection} className="p-1 rounded-md bg-[#FFB7C5]/10 text-[#FFB7C5] hover:bg-[#FFB7C5]/20 transition-all">
                                    <Plus size={14} strokeWidth={3} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {config.sections.map((section, index) => (
                                    <div key={section.id} className="space-y-2">
                                        <div className="group flex items-center gap-2">
                                            <button
                                                onClick={() => setActiveSectionId(section.id)}
                                                className={`flex-1 p-3 rounded-xl border transition-all text-left ${activeSectionId === section.id ? 'bg-white/10 border-[#FFB7C5] text-white' : 'border-white/5 text-white/40 hover:border-white/10'}`}
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Scene {index + 1}</span>
                                                    <span className="text-[9px] opacity-60">{section.modules?.length || 1} Columns</span>
                                                </div>
                                            </button>
                                            <div className="flex flex-col gap-1">
                                                <button onClick={() => addColumnToSection(section.id)} className="p-1.5 rounded-md border border-white/5 text-white/20 hover:text-[#FFB7C5] hover:border-[#FFB7C5]/50 transition-all">
                                                    <Plus size={14} />
                                                </button>
                                                <button onClick={() => deleteSection(section.id)} className="p-1.5 rounded-md border border-white/5 text-white/10 hover:text-red-400 hover:border-red-400/50 transition-all">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {activeSectionId === section.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="space-y-6 p-4 mt-2 bg-black/20 rounded-xl border border-white/5">
                                                        <BackgroundTool section={section} onUpdate={(updates) => updateSection(section.id, updates)} />
                                                        <TextTool section={section} onUpdate={(updates) => updateSection(section.id, updates)} />
                                                        <CanvasObjectTool section={section} onUpdate={(updates) => updateSection(section.id, updates)} />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={handleFinalizeAndPush} className="w-full py-4 bg-[#FFB7C5] text-[#14111E] rounded-2xl font-black mt-10 shadow-lg shadow-[#FFB7C5]/10 hover:scale-[1.02] transition-all">
                            DEPLOY TO CLOUD
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
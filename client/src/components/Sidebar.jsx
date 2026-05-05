import React from 'react';
import { BackgroundTool } from './EditorTools/BackgroundTool';
import { TextTool } from './EditorTools/TextTool';
import { CanvasObjectTool } from './EditorTools/CanvasObjectTool';

export const Sidebar = ({
    view,
    setView,
    currentTab,
    setCurrentTab,
    setIsModalOpen,
    config,
    setConfig,
    handleFinalizeAndPush
}) => {
    return (
        <aside className="w-80 border-r border-white/5 bg-[#14111E] flex flex-col z-30">
            <div className="p-6 border-b border-white/5">
                <h2 className="text-[#FFB7C5] font-black text-2xl tracking-tighter uppercase">Qupit.</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {view === 'list' ? (
                    /* DASHBOARD NAVIGATION */
                    <nav className="space-y-2">
                        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] mb-4 ml-2">Terminal</p>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-4 bg-[#FFB7C5] text-[#14111E] rounded-2xl font-black mb-8 
                         hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#FFB7C5]/10"
                        >
                            + Initiate New Mission
                        </button>

                        <button
                            onClick={() => setCurrentTab('missions')}
                            className={`w-full text-left p-4 rounded-2xl transition-all ${currentTab === 'missions' ? 'bg-white/5 text-[#FFB7C5] font-bold' : 'text-white/40 hover:bg-white/5'}`}
                        >
                            📂 Active Missions
                        </button>

                        <button
                            onClick={() => setCurrentTab('explore')}
                            className={`w-full text-left p-4 rounded-2xl transition-all ${currentTab === 'explore' ? 'bg-white/5 text-[#FFB7C5] font-bold' : 'text-white/40 hover:bg-white/5'}`}
                        >
                            🌐 Explore Community
                        </button>

                        <button
                            onClick={() => setCurrentTab('people')}
                            className={`w-full text-left p-4 rounded-2xl transition-all ${currentTab === 'people' ? 'bg-white/5 text-[#FFB7C5] font-bold' : 'text-white/40 hover:bg-white/5'}`}
                        >
                            👥 Neural Network
                        </button>
                    </nav>
                ) : (
                    /* ARCHITECT TOOLS */
                    <div className="space-y-10 animate-in slide-in-from-left-4">
                        <button
                            onClick={() => setView('list')}
                            className="text-[10px] text-white/20 hover:text-white uppercase tracking-widest mb-10 block"
                        >
                            ← Back to Terminal
                        </button>

                        <BackgroundTool config={config} setConfig={setConfig} />
                        <CanvasObjectTool config={config} setConfig={setConfig} />
                        <TextTool config={config} setConfig={setConfig} />

                        {/* Cloud Push Logic */}
                        {config._isLocalDraft && (
                            <div className="p-6 mt-4 bg-[#FFB7C5]/5 border border-[#FFB7C5]/20 rounded-2xl">
                                <p className="text-[10px] text-[#FFB7C5] uppercase tracking-widest mb-2">Draft Status: Local</p>
                                <button
                                    onClick={handleFinalizeAndPush}
                                    className={`w-full py-3 rounded-xl font-bold transition-all`}
                                >
                                    Push to Cloud
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </aside>
    );
};
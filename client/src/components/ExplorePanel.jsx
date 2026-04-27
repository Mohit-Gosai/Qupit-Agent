import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ExplorePanel = () => {
    const [publicMissions, setPublicMissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExplore = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/letters/explore');
                const result = await response.json();
                if (result.success) setPublicMissions(result.data);
            } catch (err) {
                console.error("Failed to load community feed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchExplore();
    }, []);

    return (
        <div className="p-8 animate-in fade-in duration-500">
            <header className="mb-10">
                <h1 className="text-4xl font-black tracking-tighter text-white">Community Terminal</h1>
                <p className="text-white/40 mt-2">Explore public missions and design templates from other agents.</p>
            </header>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="h-64 bg-white/5 rounded-[2rem] animate-pulse" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publicMissions.map((mission) => (
                        <motion.div 
                            key={mission._id}
                            whileHover={{ y: -5 }}
                            className="bg-[#14111E] border border-white/5 rounded-[2rem] overflow-hidden flex flex-col group"
                        >
                            {/* Visual Preview Section */}
                            <div 
                                className="h-40 w-full relative flex items-center justify-center"
                                style={{ backgroundColor: mission.canvas.background }}
                            >
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
                                    {mission.canvas.objects} Pattern
                                </span>
                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#FFB7C5]">
                                    {mission.relation}
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-white group-hover:text-[#FFB7C5] transition-colors">
                                    {mission.title}
                                </h3>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-[10px] text-white/30 uppercase tracking-widest">
                                        Agent: {mission.authorId.slice(-6)}
                                    </div>
                                    <button className="px-4 py-2 bg-white/5 hover:bg-[#FFB7C5] hover:text-[#14111E] rounded-xl text-xs font-bold transition-all">
                                        Use Template
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
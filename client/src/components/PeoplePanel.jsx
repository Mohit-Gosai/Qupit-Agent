import React from 'react';
import { motion } from 'framer-motion';

const PeoplePanel = ({ letters }) => {
    // 1. Data Aggregation: Extracting unique recipients from the letter history
    const contacts = letters.reduce((acc, letter) => {
        const existing = acc.find(c => c.email === letter.recipient);
        if (existing) {
            existing.missionCount += 1;
            // Update last interaction if this letter is newer
            if (new Date(letter.createdAt) > new Date(existing.lastMission)) {
                existing.lastMission = letter.createdAt;
            }
        } else {
            acc.push({
                email: letter.recipient,
                name: letter.recipient.split('@')[0], // Fallback name from email
                relation: letter.relation,
                missionCount: 1,
                lastMission: letter.createdAt
            });
        }
        return acc;
    }, []);

    return (
        <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <header>
                <h1 className="text-4xl font-black tracking-tighter text-white">Neural Network</h1>
                <p className="text-white/40 mt-2">Managing {contacts.length} unique nodes across your mission clusters.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact, index) => (
                    <motion.div 
                        key={index}
                        whileHover={{ scale: 1.02, borderColor: 'rgba(255, 183, 197, 0.3)' }}
                        className="bg-[#14111E] border border-white/5 p-6 rounded-[2.5rem] flex flex-col group transition-all"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFB7C5]/10 flex items-center justify-center text-[#FFB7C5] font-black text-xl">
                                {contact.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-bold text-white group-hover:text-[#FFB7C5] transition-colors lowercase">
                                    @{contact.name}
                                </h3>
                                <p className="text-[10px] text-white/30 font-mono">{contact.email}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] uppercase tracking-widest text-white/20">Frequency</span>
                                <span className="text-xs font-bold text-white/70">{contact.missionCount} Missions</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] uppercase tracking-widest text-white/20">Last Sync</span>
                                <span className="text-xs text-white/40">
                                    {new Date(contact.lastMission).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                {contact.relation}
                            </span>
                            <button className="text-[10px] font-black text-[#FFB7C5] hover:underline uppercase tracking-tighter">
                                Initiate Mission →
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {contacts.length === 0 && (
                <div className="h-64 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[3rem] text-white/20">
                    <p className="uppercase tracking-[0.3em] text-xs">No Nodes Detected</p>
                </div>
            )}
        </div>
    );
};

export default PeoplePanel;
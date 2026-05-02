import React from 'react';
import { motion } from 'framer-motion';

export const LettersPanel = ({ letters, onEdit }) => {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header>
                <h2 className="text-3xl font-black text-white tracking-tighter">Mission Control</h2>
                <p className="text-white/40 text-sm">Select a deployment to modify its parameters.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {letters.map((letter) => (
                    <motion.div 
                        key={letter._id || letter.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-[#14111E] border border-white/5 rounded-[2.5rem] p-6 flex flex-col group cursor-pointer"
                        onClick={() => onEdit(letter)}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-[#FFB7C5]/10 flex items-center justify-center">
                                <span className="text-[#FFB7C5] text-xl">✉️</span>
                            </div>
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                                letter.isPrivate ? 'bg-white/5 text-white/40' : 'bg-green-500/10 text-green-400'
                            }`}>
                                {letter.isPrivate ? 'PRIVATE' : 'PUBLIC'}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-white group-hover:text-[#FFB7C5] transition-colors truncate">
                            {letter.title}
                        </h3>
                        
                        <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/20">
                                <span>Recipient</span>
                                <span className="text-white/60">{letter.recipient}</span>
                            </div>
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/20">
                                <span>Relation</span>
                                <span className="text-white/60">{letter.relation}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-[#FFB7C5] opacity-0 group-hover:opacity-100 transition-opacity">
                            OPEN ARCHITECT →
                        </div>
                    </motion.div>
                ))}
            </div>

            {letters.length === 0 && (
                <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-[3rem]">
                    <p className="text-white/20 uppercase tracking-[0.2em] text-xs">No Missions Deployed</p>
                </div>
            )}
        </div>
    );
};
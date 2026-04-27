import React from 'react';

export const MissionsTable = ({ letters, onEdit, onDelete }) => {
    return (
        <div className="p-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white">Active Missions</h2>
                    <p className="text-white/40 text-sm">Manage your deployed digital experiences.</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-full border border-green-500/20">
                        {letters.length} Cluster Active
                    </span>
                </div>
            </div>

            <div className="bg-[#14111E] border border-white/5 rounded-[2rem] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                        <tr>
                            <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-white/30">Mission Title</th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-white/30">Recipient</th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-white/30">Status</th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-white/30">Relation</th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-white/30 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {letters.map((letter) => (
                            <tr key={letter._id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="p-6 font-bold text-[#FFB7C5]">{letter.title}</td>
                                <td className="p-6 text-white/60 font-mono text-xs">{letter.recipient}</td>
                                <td className="p-6">
                                    <span className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs">Deployed</span>
                                    </span>
                                </td>
                                <td className="p-6 text-xs text-white/40">{letter.relation}</td>
                                <td className="p-6 text-right">
                                    <button 
                                        onClick={() => onEdit(letter)}
                                        className="p-2 hover:bg-[#FFB7C5] hover:text-black rounded-lg transition-all"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {letters.length === 0 && (
                    <div className="p-20 text-center text-white/20 uppercase tracking-widest text-xs">
                        No missions found in this cluster.
                    </div>
                )}
            </div>
        </div>
    );
};
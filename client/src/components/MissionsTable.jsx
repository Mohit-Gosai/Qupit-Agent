import React from 'react';
import { LettersPanel } from './LettersPanel';

export const MissionsTable = ({ letters, onEdit, onDelete }) => {
    // Calculate metrics
    // Inside MissionsTable.jsx[cite: 17]
// Inside MissionsTable.jsx[cite: 13]
// Inside MissionsTable.jsx
const stats = {
    total: letters.length,
    active: letters.filter(l => !l.isPrivate && !l._isLocalDraft).length,
    drafts: letters.filter(l => l._isLocalDraft === true).length, // Strict check[cite: 13]
    nodes: new Set(letters.map(l => l.recipient)).size
};
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
            {/* STATS ROW: The "Atlas" Cluster View */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Missions', val: stats.total, color: 'text-white' },
                    { label: 'Public Nodes', val: stats.active, color: 'text-[#FFB7C5]' },
                    { label: 'Local Drafts', val: stats.drafts, color: 'text-white/40' },
                    { label: 'Received', val: 0, color: 'text-blue-400' } // Placeholder for future feature
                ].map((stat, i) => (
                    <div key={i} className="bg-[#14111E] border border-white/5 p-6 rounded-2xl">
                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{stat.label}</p>
                        <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                    </div>
                ))}
            </div>

            {/* MISSION GRID */}
            <LettersPanel letters={letters} onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
};
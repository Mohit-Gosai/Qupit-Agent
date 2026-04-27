import React, { useState } from 'react';

export const NewLetterModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        recipient: '', // Now used for Email
        recipientName: '', // For a better UX in the email greeting
        relation: 'Friend',
        isPrivate: true
    });
    const [showPublicWarning, setShowPublicWarning] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!formData.isPrivate && !showPublicWarning) {
            setShowPublicWarning(true);
            return;
        }
        onCreate(formData);
        setShowPublicWarning(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#14111E] border border-white/10 p-8 rounded-[2rem] w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-bold mb-2 text-[#FFB7C5]">Initiate New Mission</h2>
                <p className="text-white/40 text-sm mb-6">Define the core parameters for your digital experience.</p>

                <div className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2">Mission Title</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#FFB7C5]/50 mt-1"
                            placeholder="e.g., Anniversary Surprise"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Recipient Name */}
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2">Recipient Name</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#FFB7C5]/50 mt-1"
                                placeholder="Their Name"
                                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                            />
                        </div>
                        {/* Recipient Email */}
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2">Recipient Email</label>
                            <input
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#FFB7C5]/50 mt-1"
                                placeholder="hello@example.com"
                                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Relation Select (Using all Schema Enums) */}
                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2">Your Relation</label>
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none mt-1 appearance-none"
                            value={formData.relation}
                            onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                        >
                            {["Friend", "Couple", "Parent-Children", "Neighbor", "Boss-Employee", "Colleague"].map(r => (
                                <option key={r} value={r} className="bg-[#14111E]">{r}</option>
                            ))}
                        </select>
                    </div>

                    {/* Privacy Toggle */}
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold">Private Mission</h3>
                                <p className="text-[10px] text-white/40">Visible only to the recipient</p>
                            </div>
                            <button 
                                onClick={() => {
                                    setFormData({ ...formData, isPrivate: !formData.isPrivate });
                                    if (formData.isPrivate) setShowPublicWarning(false);
                                }}
                                className={`w-12 h-6 rounded-full transition-all relative ${formData.isPrivate ? 'bg-[#FFB7C5]' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${formData.isPrivate ? 'right-1 bg-[#14111E]' : 'left-1 bg-white/40'}`} />
                            </button>
                        </div>

                        {showPublicWarning && !formData.isPrivate && (
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl animate-pulse">
                                <p className="text-[10px] text-red-400 leading-tight">
                                    ⚠️ Are you sure you want to make this letter Public? This allows us to feature it on our community page for others to see!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button onClick={onClose} className="flex-1 py-3 text-white/40 hover:text-white transition-colors">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-3 bg-[#FFB7C5] text-[#14111E] rounded-xl font-bold shadow-lg shadow-[#FFB7C5]/10 hover:scale-[1.02] transition-transform"
                    >
                        {showPublicWarning && !formData.isPrivate ? "Confirm & Create" : "Initiate Mission"}
                    </button>
                </div>
            </div>
        </div>
    );
};
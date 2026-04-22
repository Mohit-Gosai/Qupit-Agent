import React, {useState} from 'react'
// Create this in src/components/Modals/NewLetterModal.jsx


// Create this in src/components/Modals/NewLetterModal.jsx
export const NewLetterModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        recipient: '',
        relation: 'Friend',
        isPrivate: true
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#14111E] border border-white/10 p-8 rounded-[2rem] w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-[#FFB7C5]">Initiate New Mission</h2>

                <div className="space-y-4">
                    <input
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#FFB7C5]/50"
                        placeholder="Letter Title (e.g., Birthday Surprise)"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <input
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#FFB7C5]/50"
                        placeholder="Recipient Name"
                        onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                    />
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none"
                        onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    >
                        {["Friend", "Couple", "Parent-Children", "Neighbor", "Colleague"].map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-4 mt-8">
                    <button onClick={onClose} className="flex-1 py-3 text-white/40 hover:text-white">Cancel</button>
                    <button
                        onClick={() => onCreate(formData)}
                        className="flex-1 py-3 bg-[#FFB7C5] text-[#14111E] rounded-xl font-bold shadow-lg shadow-[#FFB7C5]/10"
                    >
                        Create Draft
                    </button>
                </div>
            </div>
        </div>
    );
};

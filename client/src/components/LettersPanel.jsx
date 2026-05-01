export const LettersPanel = ({ letters, onEdit }) => {
    // Calculate metrics
    const stats = {
        total: letters.length,
        active: letters.filter(l => !l.isPrivate).length,
        drafts: letters.filter(l => l._isLocalDraft).length
    };

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {letters.map((letter) => (
                    <div 
                        key={letter._id || letter.id} 
                        className="bg-[#14111E] border border-white/5 p-6 rounded-[2rem] hover:border-[#FFB7C5]/30 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-[#FFB7C5] transition-colors">{letter.title}</h3>
                                <p className="text-[10px] text-white/20 font-mono">ID: {letter._id || 'LOCAL-DRAFT'}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                                letter._isLocalDraft ? 'bg-white/5 text-white/40' : 'bg-green-500/10 text-green-400'
                            }`}>
                                {letter._isLocalDraft ? 'DRAFT' : 'DEPLOYED'}
                            </span>
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-xs">
                                <span className="text-white/30">Recipient:</span>
                                <span className="text-white/70">{letter.recipient}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-white/30">Sender:</span>
                                <span className="text-white/70">{letter.sender}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => onEdit(letter)}
                            className="w-full py-3 bg-white/5 hover:bg-[#FFB7C5] hover:text-[#14111E] rounded-xl text-xs font-bold transition-all uppercase tracking-widest"
                        >
                            Open Architect
                        </button>
                    </div>
                ))}
            </div>
            );
}
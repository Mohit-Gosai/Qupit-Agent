export const LetterCanvas = ({ config }) => {
  return (
    <div className={`w-full aspect-[4/5] rounded-3xl shadow-2xl p-8 transition-all duration-500 ${config.theme}`}>
      <div className="h-full border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
        <h2 className="text-2xl font-serif text-white/90">Dear {config.recipient || '...'}</h2>
        <p className="text-lg text-white/80 leading-relaxed italic">
          {config.message || "Your magic will appear here..."}
        </p>
        <div className="text-right text-sm text-white/40">
          — {config.sender}
        </div>
      </div>
    </div>
  );
};
export const TextTool = ({ config, setConfig }) => {
  const fonts = [
    { name: 'Serif', class: 'font-serif' },
    { name: 'Sans', class: 'font-sans' },
    { name: 'Mono', class: 'font-mono' }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Message</label>
        <textarea
          value={config.message}
          onChange={(e) => setConfig({ ...config, message: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#FFB7C5]/50 transition-colors"
          placeholder="Enter your secret message..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Typography</label>
        <div className="grid grid-cols-3 gap-2">
          {fonts.map((f) => (
            <button
              key={f.name}
              onClick={() => setConfig({ ...config, font: f.class })}
              className={`py-2 text-xs rounded-lg border transition-all ${config.font === f.class ? 'bg-white text-black border-white' : 'border-white/10 text-white/60 hover:border-white/30'}`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
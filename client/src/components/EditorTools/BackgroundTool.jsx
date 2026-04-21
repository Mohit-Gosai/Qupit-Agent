export const BackgroundTool = ({ config, setConfig }) => {
  const themes = [
    { name: 'Sunset', class: 'bg-gradient-to-br from-rose-400 to-orange-300' },
    { name: 'Midnight', class: 'bg-gradient-to-br from-slate-900 to-slate-700' },
    { name: 'Lavender', class: 'bg-gradient-to-br from-purple-400 to-indigo-300' }
  ];

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Theme</label>
      <div className="flex gap-3">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setConfig({ ...config, theme: t.class })}
            className={`w-10 h-10 rounded-full border-2 transition-all ${config.theme === t.class ? 'border-white scale-110' : 'border-transparent'} ${t.class}`}
          />
        ))}
      </div>
    </div>
  );
};
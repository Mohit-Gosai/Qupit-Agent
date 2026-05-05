export const TextTool = ({ section, onUpdate }) => {
  const fonts = [
    { name: 'Serif', class: 'font-serif' },
    { name: 'Sans', class: 'font-sans' },
    { name: 'Mono', class: 'font-mono' }
  ];

  return (
    <div className="space-y-4">
      <textarea
        value={section.content.message}
        onChange={(e) => onUpdate({ content: { ...section.content, message: e.target.value } })}
        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FFB7C5]/50"
        rows={3}
      />
      <div className="grid grid-cols-3 gap-2">
        {fonts.map((f) => (
          <button
            key={f.name}
            onClick={() => onUpdate({ content: { ...section.content, fontStyle: f.class } })}
            className={`py-2 text-[10px] rounded-lg border ${section.content.fontStyle === f.class ? 'bg-white text-black' : 'border-white/10 text-white/40'}`}
          >
            {f.name}
          </button>
        ))}
      </div>
    </div>
  );
};
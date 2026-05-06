export const TextTool = ({ section, onUpdate }) => {
  const handleModuleUpdate = (index, updates) => {
    const newModules = [...section.modules];
    newModules[index] = { ...newModules[index], ...updates };
    onUpdate({ modules: newModules });
  };

  const sizes = [
    { label: 'S', value: 'text-sm' },
    { label: 'M', value: 'text-xl' },
    { label: 'L', value: 'text-4xl' },
    { label: 'XL', value: 'text-6xl' }
  ];

  // Inside TextTool.jsx
  const colors = [
    { name: 'Pink', hex: '#FFB7C5' },
    { name: 'Cyan', hex: '#22D3EE' },
    { name: 'Amber', hex: '#FBBF24' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Muted', hex: '#6B7280' }
  ];


  return (
    <div className="space-y-8">
      {section.modules?.map((module, i) => (
        <div key={i} className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-[#FFB7C5] uppercase tracking-widest">
              Module {i + 1}
            </span>

            {/* Typography Controls */}

            {/* Place this inside your module mapping */}
            <div className="flex flex-wrap gap-2 pt-2">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => handleModuleUpdate(i, { color: c.hex })}
                  className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${module.color === c.hex ? 'border-white scale-110' : 'border-transparent'
                    }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
            <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
              {sizes.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleModuleUpdate(i, { size: s.value })}
                  className={`w-7 h-7 flex items-center justify-center rounded-md text-[10px] transition-all ${module.size === s.value ? 'bg-[#FFB7C5] text-black' : 'text-white/40 hover:text-white'
                    }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={module.text}
            onChange={(e) => handleModuleUpdate(i, { text: e.target.value })}
            className={`w-full bg-transparent border-none text-white focus:ring-0 resize-none p-0 ${module.font} ${module.size || 'text-xl'}`}
            placeholder="Enter content..."
            rows={3}
          />

          <div className="flex justify-between items-center pt-2 border-t border-white/5">
            {/* Font Picker */}
            <select
              value={module.font}
              onChange={(e) => handleModuleUpdate(i, { font: e.target.value })}
              className="bg-transparent text-[10px] text-white/60 border-none focus:ring-0 p-0 uppercase font-black"
            >
              <option value="font-sans">Sans Serif</option>
              <option value="font-serif">Classic Serif</option>
              <option value="font-mono">Tech Mono</option>
            </select>

            {/* Alignment Toggles */}
            <div className="flex gap-2">
              {['text-left', 'text-center', 'text-right'].map((align) => (
                <button
                  key={align}
                  onClick={() => handleModuleUpdate(i, { align })}
                  className={`text-[10px] ${module.align === align ? 'text-[#FFB7C5]' : 'text-white/20'}`}
                >
                  {align.split('-')[1].toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
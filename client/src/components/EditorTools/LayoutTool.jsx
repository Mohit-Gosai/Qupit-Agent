// src/components/EditorTools/LayoutTool.jsx
export const LayoutTool = ({ section, onUpdate }) => {
  const layouts = [
    { id: 'single-column', label: 'Single', icon: 'Square' },
    { id: 'two-column', label: 'Split', icon: 'Columns' },
    { id: 'custom-grid', label: 'Grid', icon: 'Grid' }
  ];

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Section Layout</label>
      <div className="grid grid-cols-3 gap-2">
        {layouts.map((l) => (
          <button
            key={l.id}
            onClick={() => onUpdate({ layout: l.id })}
            className={`py-3 rounded-lg border flex flex-col items-center gap-1 transition-all ${
              section.layout === l.id ? 'bg-white text-black border-white' : 'border-white/10 text-white/40'
            }`}
          >
            <span className="text-[10px] font-bold">{l.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
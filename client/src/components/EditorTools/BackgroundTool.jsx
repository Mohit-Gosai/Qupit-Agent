// src/components/EditorTools/BackgroundTool.jsx
export const BackgroundTool = ({ section, onUpdate }) => {
  const themes = [
    { name: 'Soft Pink', class: 'bg-pink-50', textColor: '#1a1a1a' },
    { name: 'Midnight', class: 'bg-slate-900', textColor: '#ffffff' },
    { name: 'Sunset', class: 'bg-gradient-to-br from-orange-400 to-rose-400', textColor: '#ffffff' },
    { name: 'Pure White', class: 'bg-white', textColor: '#000000' },
    { name: 'Matrix', class: 'bg-[#14111E]', textColor: '#FFB7C5' }
  ];

  const handleThemeChange = (theme) => {
    // We must spread the existing content so we don't lose the message
    onUpdate({ 
      background: theme.class,
      content: { 
        ...section.content, 
        textColor: theme.textColor 
      }
    });
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Section Theme</label>
      <div className="grid grid-cols-4 gap-2">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => handleThemeChange(t)}
            className={`w-full h-8 rounded-lg border-2 transition-all ${
              section.background === t.class 
                ? 'border-[#FFB7C5] scale-105 shadow-lg' 
                : 'border-transparent'
            } ${t.class}`}
          />
        ))}
      </div>
    </div>
  );
};
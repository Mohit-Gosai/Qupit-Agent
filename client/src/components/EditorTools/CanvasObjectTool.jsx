// src/components/EditorTools/CanvasObjectTool.jsx
export const CanvasObjectTool = ({ section, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* 1. Object Type Selection[cite: 5] */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Visual Shape</label>
        <div className="grid grid-cols-3 gap-2">
          {['None', 'Circle', 'Heart', 'Star', 'Blob'].map(obj => (
            <button
              key={obj}
              onClick={() => onUpdate({
                canvas: { ...section.canvas, objects: obj, hasObject: obj !== 'None' }
              })}
              className={`py-2 text-[10px] rounded-lg border transition-all ${section.canvas?.objects === obj ? 'bg-white text-black' : 'border-white/10 text-white/40'
                }`}
            >
              {obj}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Object Count Slider */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Density</label>
          <span className="text-[10px] text-[#FFB7C5]">{section.canvas?.objectCount || 30}</span>
        </div>
        {/* Density Slider */}
        <input
          type="range"
          min="5"
          max="150"
          value={section.canvas?.objectCount || 30}
          onChange={(e) => onUpdate({
            canvas: { ...section.canvas, objectCount: Number(e.target.value) }
          })}
          className="w-full accent-[#FFB7C5] "
        />


      </div>

      {/* 3. Motion Style */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Movement</label>
        <div className="flex gap-2">
          {/* Motion Buttons[cite: 5] */}
          {['Float', 'Wave', 'Drift'].map(m => (
            <button
              key={m}
              onClick={() => onUpdate({ canvas: { ...section.canvas, motion: m } })}
              className={`p-2 text-[10px] rounded-lg border transition-all ${section.canvas?.motion === m ? 'bg-white text-black' : ''}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export const CanvasObjectTool = ({ config, setConfig }) => {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Visual Objects</label>
      <div className="grid grid-cols-2 gap-2">
        {['None', 'Circle', 'Heart', 'Star', 'Blob'].map(obj => (
          <button 
            key={obj}
            onClick={() => setConfig({
              ...config, 
              canvas: { ...config.canvas, objects: obj, hasObject: obj !== 'None' }
            })}
            className={`py-2 text-[10px] rounded-lg border transition-all ${
              config.canvas.objects === obj ? 'bg-white text-black' : 'border-white/10 text-white/40'
            }`}
          >
            {obj}
          </button>
        ))}
      </div>
    </div>
  );
};
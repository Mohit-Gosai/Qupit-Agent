export const CanvasObjectTool = ({ config, setConfig }) => {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Visual Objects</label>
      <div className="grid grid-cols-2 gap-2">
        {['None', 'Circle', 'Heart', 'Star', 'Blob'].map(obj => (
          <button 
    key={obj}
    onClick={() => {
      const isNone = obj === 'None';
      onUpdate({
        canvas: { 
          ...section.canvas, 
          objects: obj, 
          hasObject: !isNone // Ensure this flips to TRUE[cite: 17]
        }
      });
    }}
    className={`...`}
  >
    {obj}
  </button>
        ))}
      </div>
    </div>
  );
};
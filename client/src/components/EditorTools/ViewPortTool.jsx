export const ViewportTool = ({ screenSize, setScreenSize }) => {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Viewport</label>
      <div className="flex bg-white/5 p-1 rounded-xl gap-1">
        <button 
          onClick={() => setScreenSize('mobile')}
          className={`flex-1 py-2 rounded-lg text-xs transition-all ${screenSize === 'mobile' ? 'bg-white text-black' : 'text-white/40'}`}
        >
          Mobile
        </button>
        <button 
          onClick={() => setScreenSize('desktop')}
          className={`flex-1 py-2 rounded-lg text-xs transition-all ${screenSize === 'desktop' ? 'bg-white text-black' : 'text-white/40'}`}
        >
          Desktop
        </button>
      </div>
    </div>
  );
};
export const RelationTool = ({ config, setConfig }) => {
  const relations = ["Friend", "Couple", "Parent-Children", "Colleague"];
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Target Relation</label>
      <div className="flex flex-wrap gap-2">
        {relations.map(r => (
          <button 
            key={r}
            onClick={() => setConfig({...config, relation: r})}
            className={`px-3 py-1 text-[10px] rounded-full border transition-all ${config.relation === r ? 'bg-[#FFB7C5] border-[#FFB7C5] text-[#14111E]' : 'border-white/10 text-white/40'}`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
};
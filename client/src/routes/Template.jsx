import React from 'react';

const Template = () => {
  const categories = ["Anniversary", "Neighborly", "Parental", "Friendship", "Just Because"];
  
  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-serif text-white">The Gallery</h2>
          <p className="text-white/40 mt-2 italic">Choose a canvas for your gratitude.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button key={cat} className="px-4 py-2 rounded-full border border-white/10 text-xs text-white/60 hover:border-[#FFB7C5] hover:text-[#FFB7C5] transition-all whitespace-nowrap">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="aspect-[4/5] rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-[#14111E] to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6">
              <p className="text-[#FFB7C5] text-[10px] uppercase tracking-widest mb-1">Twilight Theme</p>
              <h4 className="text-white font-serif text-lg italic">Template #{item}</h4>
            </div>
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-[#FFB7C5]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Template;
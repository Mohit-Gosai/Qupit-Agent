// src/components/common/RightSidebar.jsx
import React from 'react';

const RightSidebar = () => {
  return (
    <aside className="hidden md:block md:col-span-1">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 sticky top-24">
        <h3 className="text-xs uppercase font-black tracking-widest text-[#FFB7C5]">Suggested Creators</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-[#FFB7C5]">M</div>
              <div>
                <p className="font-bold text-white">matrix_dev</p>
                <p className="text-white/40 text-[10px]">Followed by 12 others</p>
              </div>
            </div>
            <button className="text-[#FFB7C5] font-bold hover:underline bg-transparent border-none cursor-pointer">Follow</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
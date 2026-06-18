import React from 'react';

export const Carousel = ({ items = [], style = {} }) => {
  const bgClass = style.background || 'bg-white';
  const textColor = style.textColor || '#000';

  return (
    <div className={`overflow-hidden rounded-lg p-4 ${bgClass}`}>
      <div className="flex gap-4">
        {items.map((it, idx) => (
          <div key={idx} className="min-w-[200px] flex-shrink-0">
            <img src={it.src} alt={it.alt || ''} className="w-full h-40 object-cover rounded-md" />
            <p style={{ color: textColor }} className="mt-2 text-sm">{it.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

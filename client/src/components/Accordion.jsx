import React from 'react';

export const Accordion = ({ items = [], style = {} }) => {
  const textColor = style.textColor || '#000';
  return (
    <div className="space-y-2">
      {items.map((it, idx) => (
        <details key={idx} className="rounded-lg bg-white/5 p-2">
          <summary style={{ color: textColor }} className="cursor-pointer font-semibold">{it.title}</summary>
          <div style={{ color: textColor }} className="mt-2 text-sm">{it.content}</div>
        </details>
      ))}
    </div>
  );
};

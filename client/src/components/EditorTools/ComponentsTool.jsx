import React from 'react';

export const ComponentsTool = ({ section, onUpdate }) => {
  const addComponent = (type) => {
    const newModule = {
      id: Date.now(),
      contentType: 'component',
      componentType: type,
      style: {
        background: section.background || 'bg-white',
        textColor: section.content?.textColor || '#000'
      },
      props: {}
    };

    const modules = [...(section.modules || []), newModule];
    onUpdate({ modules });
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Components</label>
      <div className="flex gap-2">
        <button onClick={() => addComponent('carousel')} className="p-2 rounded-lg bg-white/5 text-white/80">Carousel</button>
        <button onClick={() => addComponent('card')} className="p-2 rounded-lg bg-white/5 text-white/80">Card</button>
        <button onClick={() => addComponent('accordion')} className="p-2 rounded-lg bg-white/5 text-white/80">Accordion</button>
      </div>
    </div>
  );
};

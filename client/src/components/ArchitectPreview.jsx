// src/components/ArchitectPreview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { VisualCanvas } from './VisualCanvas';

export const ArchitectPreview = ({ config }) => {
  return (
    <div className="h-full overflow-y-auto scroll-smooth snap-y snap-mandatory">
      {config.sections?.map((section) => (

        <section className={`h-screen w-full relative overflow-hidden flex items-center justify-center ${section.background}`}>
          {section.canvas?.hasObject && <VisualCanvas section={section} />}


          <div className={`w-full h-full p-10 z-10 grid gap-6 ${section.modules?.length === 2 ? 'grid-cols-2' :
            section.modules?.length === 3 ? 'grid-cols-3' : 'grid-cols-1'
            }`}>
            {section.modules?.map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 }}
                className={`flex flex-col justify-center h-full p-6 ${module.align || 'text-center'}`}
              >
                <h1
                  className={`${module.font || 'font-sans'} ${module.size || 'text-xl'} leading-tight break-words overflow-hidden`}
                  style={{ color: module.color || '#FFFFFF' }}
                >
                  {module.text}
                </h1>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
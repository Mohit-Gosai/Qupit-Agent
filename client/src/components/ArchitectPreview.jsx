// src/components/ArchitectPreview.jsx
export const ArchitectPreview = ({ config }) => {
  return (
    <div className="h-full overflow-y-auto scroll-smooth snap-y snap-mandatory">
      {config.sections?.map((section) => (
        // Inside ArchitectPreview.jsx[cite: 10]
        // Inside ArchitectPreview.jsx[cite: 10]
        // Inside your ArchitectPreview map loop[cite: 10]
        // Inside ArchitectPreview.jsx
        <section
          className={`h-screen w-full flex items-center justify-center relative overflow-hidden ${section.background}`}
        >
          {/* Layer 1: The Visual Effects[cite: 16] */}
          {section.canvas?.hasObject && <VisualCanvas section={section} />}

          {/* Layer 2: The Typography[cite: 10] */}
          <motion.h1
            className={`${section.content.fontStyle} text-6xl font-black z-10 text-center px-10`}
            style={{ color: section.content.textColor }}
          >
            {section.content.message}
          </motion.h1>
        </section>
      ))}
    </div>
  );
};
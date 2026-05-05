// src/components/ArchitectPreview.jsx
export const ArchitectPreview = ({ config }) => {
  return (
    <div className="h-full overflow-y-auto scroll-smooth snap-y snap-mandatory">
      {config.sections?.map((section) => (
        <section 
          key={section.id} 
          className="h-screen w-full flex flex-col items-center justify-center snap-start relative p-10"
          style={{ background: section.background }}
        >
          {/* Hero Section Style */}
          {section.sectionType === 'hero-reveal' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-6xl font-black text-[#FFB7C5] mb-4">{section.content.message}</h1>
              <p className="text-white/40 uppercase tracking-widest text-xs">Scroll to Explore</p>
            </motion.div>
          )}

          {/* Shayari/Chat Style */}
          {section.sectionType === 'single-column' && (
            <div className="max-w-2xl w-full space-y-6">
              <div className="p-6 bg-white/5 border-l-4 border-[#FFB7C5] rounded-r-2xl">
                <p className="italic text-xl text-white/80 leading-relaxed">
                  "{section.content.message}"
                </p>
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};
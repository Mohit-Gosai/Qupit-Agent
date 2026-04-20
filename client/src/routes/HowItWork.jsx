import { motion } from 'framer-motion';

const Step = ({ number, title, desc }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center p-6"
  >
    <div className="w-12 h-12 rounded-full bg-[#3B2D6B] text-[#FFB7C5] flex items-center justify-center font-bold mb-4 border border-[#FFB7C5]/20">
      {number}
    </div>
    <h3 className="text-xl font-serif text-white mb-2">{title}</h3>
    <p className="text-gray-200 font-light text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const HowItWork = () => {
  return (
    <section className="py-24 bg-[#14111E] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-white mb-4">Three steps to a smile.</h2>
          <div className="w-20 h-1 bg-[#FFB7C5] mx-auto opacity-30"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <Step 
            number="1" 
            title="Choose a Vibe" 
            desc="Select from our calm, twilight-inspired templates or start with a blank canvas." 
          />
          <Step 
            number="2" 
            title="Write from the Heart" 
            desc="Add text, photos, and soft animations. Our GUI makes it feel like writing a physical letter." 
          />
          <Step 
            number="3" 
            title="Share the Magic" 
            desc="Generate a private URL and send it. Watch their reaction as they scroll through your gratitude." 
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWork
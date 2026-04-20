import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-[#fafafa] overflow-hidden pt-20">
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl opacity-60" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Side: Copy & CTA */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-red-500 uppercase bg-red-50 rounded-full">
            Introducing Qupit Agent
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
            Turn your appreciation into a <span className="text-red-500">Digital Keepsake.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Create beautiful, infinite-scroll appreciation letters for your loved ones. No code required. Just pure, heartfelt gratitude delivered via a magic link.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-red-500 text-white font-semibold rounded-xl shadow-lg shadow-red-200 hover:bg-red-600 transition-all hover:scale-105 active:scale-95">
              Create a Letter
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
              See Templates
            </button>
          </div>
          
          <p className="mt-6 text-sm text-slate-400">
            Join 1,200+ people sharing love this week.
          </p>
        </motion.div>

        {/* Right Side: Interactive "Letter Preview" */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group"
        >
          {/* Mockup of the Letter UI */}
          <div className="relative z-20 w-full max-w-[400px] mx-auto aspect-[9/16] bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-slate-900 overflow-hidden">
            <div className="absolute top-0 w-full h-6 bg-slate-900 flex justify-center items-end pb-1">
              <div className="w-16 h-1 bg-slate-800 rounded-full" />
            </div>
            
            {/* The "Infinite Scroll" Preview Content */}
            <div className="h-full overflow-y-auto p-8 pt-12 space-y-12 no-scrollbar">
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-red-400 font-bold mb-2">Our Anniversary</p>
                <h3 className="text-2xl font-serif italic text-slate-800">To my favorite human...</h3>
              </div>
              
              <div className="w-full h-48 bg-slate-100 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                   {/* Placeholder for actual image or motion art */}
                   [ Your Photo Here ]
                </div>
              </div>

              <p className="text-slate-600 font-light leading-loose">
                Every Sunday morning, when the sun hits the kitchen tiles, I think about how lucky I am...
              </p>

              <div className="flex justify-center py-4">
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="text-3xl"
                 >
                   ❤️
                 </motion.div>
              </div>
              
              <p className="text-slate-600 font-light leading-loose pb-20">
                You make the simplest days feel like a celebration. Thank you for being you.
              </p>
            </div>
          </div>

          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl z-30"
          >
            ✉️
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
            className="absolute -bottom-10 -left-10 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center text-3xl z-30"
          >
            ✨
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
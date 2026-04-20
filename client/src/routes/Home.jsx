import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#14111E] overflow-hidden pt-24 pb-12">
      
      {/* Dynamic Twilight Gradient Background Element */}
      <motion.div 
        animate={{
          background: [
            "radial-gradient(circle at 10% 10%, #FFB7C5 0%, rgba(20, 17, 30, 0) 60%)",
            "radial-gradient(circle at 90% 90%, #A78BFA 0%, rgba(20, 17, 30, 0) 60%)",
            "radial-gradient(circle at 10% 10%, #FFB7C5 0%, rgba(20, 17, 30, 0) 60%)"
          ],
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="absolute inset-0 opacity-10" 
      />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* Left Side: Calm Copy & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="lg:pr-10"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{delay: 0.5}}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-[#FFB7C5] uppercase bg-[#3B2D6B] rounded-full border border-[#FFB7C5]/30"
          >
            Introducing Qupit Agent
          </motion.span>

          <h1 className="text-5xl lg:text-7xl font-light text-white leading-[1.05] mb-8 font-serif">
            A quiet space to <br />
            <span className="text-[#A78BFA] italic">share your love.</span>
          </h1>

          <p className="text-xl text-gray-200 mb-12 max-w-xl leading-relaxed font-light">
            Craft beautiful, infinite-scroll appreciation letters. No code needed. Qupit Agent helps you express gratitude with a calm, digital touch, delivered via a private magic link.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="px-10 py-4.5 bg-[#FFB7C5] text-[#14111E] font-semibold rounded-xl shadow-lg hover:shadow-[#FFB7C5]/20 transition-all hover:-translate-y-1 hover:scale-105 active:scale-95 text-lg">
              Create Your Letter
            </button>
            <button className="px-10 py-4.5 bg-transparent text-[#FFB7C5] font-semibold rounded-xl border border-[#FFB7C5]/40 hover:bg-[#FFB7C5]/5 transition-all text-lg">
              Explore Templates
            </button>
          </div>
          
          <p className="mt-8 text-sm text-[#FFB7C5]/60 font-medium">
            Join thousands cultivating appreciation 💖
          </p>
        </motion.div>

        {/* Right Side: Interactive "Letter Preview" with Calm Palette */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "circOut" }}
          className="relative group justify-self-center lg:justify-self-end"
        >
          {/* Phone Mockup Frame (Sleeker Dark Matte Finish) */}
          <div className="relative z-20 w-full max-w-[420px] mx-auto aspect-[9/18.5] bg-[#1A1828] rounded-[2.8rem] shadow-3xl shadow-purple-900/50 border-[12px] border-[#0A0810] overflow-hidden">
            <div className="absolute top-0 w-full h-8 bg-[#0A0810] flex justify-center items-end pb-1.5">
              <div className="w-18 h-1 bg-[#1A1828] rounded-full" />
            </div>
            
            {/* The "Infinite Scroll" Preview Content (Calm Theme) */}
            <div className="h-full overflow-y-auto p-10 pt-16 space-y-16 no-scrollbar bg-[#FDF9F8] text-[#14111E]">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-bold mb-3">Sunday Morning Gratitude</p>
                <h3 className="text-3xl font-serif italic text-[#14111E]">To my Sunday Savior...</h3>
              </div>
              
              <div className="w-full h-56 bg-lavender-50 rounded-2xl overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-50 to-purple-50 opacity-60"></div>
                <div className="absolute flex items-center justify-center text-sm font-light text-slate-400 z-10 px-6 text-center">
                   {/* This placeholder uses text now to keep the code light */}
                   [ That photo of you helping me with the groceries ]
                </div>
              </div>

              <p className="text-slate-800 font-light leading-loose text-lg">
                I never told you properly, but that random Sunday you helped me carry my groceries—when my arm was in a sling—it made my entire week. 
              </p>

              <div className="flex justify-center py-6">
                 <motion.div 
                   animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
                   transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                   className="text-4xl"
                 >
                   💜
                 </motion.div>
              </div>
              
              <p className="text-slate-800 font-light leading-loose pb-28 text-lg">
                Your kindness was such a simple gesture, but it meant the world. Thank you for being such a wonderful neighbor.
              </p>
            </div>
          </div>

          {/* Floating Calming Icons (Mellow Colors) */}
          <motion.div 
            animate={{ y: [0, -25, 0], x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-20 h-20 bg-[#2D235C] rounded-2xl shadow-xl flex items-center justify-center text-3xl z-30 border border-[#A78BFA]/30"
          >
            ✉️
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 7, delay: 1, ease: "easeInOut" }}
            className="absolute -bottom-14 -left-14 w-24 h-24 bg-[#FFB7C5]/10 rounded-full shadow-2xl flex items-center justify-center text-4xl z-30 backdrop-blur-sm border border-[#FFB7C5]/30"
          >
            ✨
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
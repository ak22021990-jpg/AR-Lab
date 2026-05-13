import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, BookOpen, Search, FileBadge } from 'lucide-react';
import Mascot from './Mascot';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100
    }
  }
};

export default function Hero({ onStart }) {
  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4 py-16 overflow-hidden bg-bg-base"
    >
      {/* Background Decorative blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[25%] h-[25%] rounded-full bg-info/5 blur-[100px]"></div>
      </div>

      {/* Hero Illustration & Mascot Container */}
      <motion.div variants={itemVariants} className="relative w-full max-w-lg mb-8">
        <div className="relative z-10 p-4 bg-white rounded-[2.5rem] border-2 border-border shadow-xl">
          <img 
            src={`${import.meta.env.BASE_URL}assets/illustrations/hero.png`}
            alt="AMZ3 Training" 
            className="w-full h-auto rounded-3xl"
          />
        </div>
        
        {/* Mascot Overlaid */}
        <div className="absolute -bottom-8 -right-4 md:-right-8 z-20">
          <Mascot 
            state="happy" 
            message="Welcome to the Lab! Ready to learn?" 
            size="lg"
            position="top"
          />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div variants={itemVariants} className="mb-8">
        <p className="text-sm text-primary font-nunito font-black mb-4 tracking-[0.3em] uppercase">
          Your Training Starts Here
        </p>
        <h1 className="text-5xl md:text-7xl font-nunito font-black mb-6 leading-[1.1] tracking-tight text-text-primary">
          Education & <span className="text-primary">Eligibility</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed font-extrabold">
          Master the fundamentals of education screening with fun, interactive labs. 
          Learn to verify degrees and graduation dates like a pro!
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mb-12 px-4"
      >
        {[
          { ill: `${import.meta.env.BASE_URL}assets/illustrations/eligibility-basics.png`, label: 'Learn', desc: '5 Specialized Labs', color: 'text-primary', bg: 'bg-orange-50', Icon: BookOpen },
          { ill: `${import.meta.env.BASE_URL}assets/illustrations/degree-detective.png`, label: 'Verify', desc: 'Real-world Scenarios', color: 'text-info', bg: 'bg-blue-50', Icon: Search },
          { ill: `${import.meta.env.BASE_URL}assets/illustrations/university-validator.png`, label: 'Certify', desc: 'Final Audit Lab', color: 'text-success', bg: 'bg-green-50', Icon: FileBadge },
        ].map((item, i) => (
          <div key={i} className="card overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className={`h-40 w-full relative ${item.bg}`}>
              <img 
                src={item.ill} 
                className="w-full h-full object-cover opacity-100 group-hover:opacity-100 transition-opacity duration-500" 
                alt="" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
              
              {/* Floating Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white border-2 border-border shadow-sm flex items-center justify-center">
                <item.Icon className={`w-5 h-5 ${item.color}`} />
              </div>
            </div>
            <div className="p-6 text-left relative bg-white">
              <div className="font-nunito font-extrabold text-xl text-text-primary mb-1">{item.label}</div>
              <div className="text-xs text-text-muted font-extrabold tracking-widest uppercase">{item.desc}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Start Button */}
      <motion.button 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart} 
        className="btn-primary text-xl py-5 px-12 relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center gap-3">
          <Rocket className="w-6 h-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          Start Training Hub
        </span>
      </motion.button>
    </motion.section>
  );
}

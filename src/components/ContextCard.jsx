import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight, 
  Lightbulb, 
  Target, 
  ChevronRight,
  BookOpen,
  Info,
  Check,
  ListChecks,
  X,
  PlaySquare
} from 'lucide-react';
import Mascot from './Mascot';
import { getIcon } from '../utils/iconMap';
import DecisionFlow from './DecisionFlow';
import WalkthroughTour from './WalkthroughTour';

/**
 * ContextCard component displays a learning overlay before a mini-game starts.
 * It introduces the concept, objectives, and tips for the upcoming game.
 */
const ContextCard = ({ cardData, onStart }) => {
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onStart();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  if (!cardData) return null;

  const IconComponent = getIcon(cardData.icon);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-base/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="card-elevated max-w-2xl w-full flex flex-col relative overflow-hidden max-h-[90vh]"
      >
        {/* Close Button */}
        <button 
          onClick={onStart}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-text-muted hover:text-text-primary transition-all shadow-sm border border-border"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        {/* Illustration with Gradient Overlay */}
        {cardData.illustration && (
          <div className="relative w-full h-48 md:h-56 overflow-hidden shrink-0">
            <img 
              src={`${import.meta.env.BASE_URL}${cardData.illustration}`}
              alt={cardData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
            
            {/* Floating Icon Over Illustration */}
            <div className="absolute bottom-4 left-8 w-20 h-20 rounded-3xl bg-white shadow-xl border-4 border-primary/10 flex items-center justify-center text-primary">
              {IconComponent ? React.createElement(IconComponent, { size: 40, strokeWidth: 2.5 }) : <BookOpen size={40} />}
            </div>
          </div>
        )}

        <div className="p-8 md:p-10 pt-4 flex flex-col gap-6 overflow-y-auto no-scrollbar">
          {/* Header Section */}
          <div className="relative flex flex-col items-center md:items-start text-center md:text-left">
            {!cardData.illustration && (
              <div className="w-24 h-24 rounded-3xl bg-primary-light border-4 border-primary/10 flex items-center justify-center text-primary shadow-xl mb-6">
                {IconComponent ? React.createElement(IconComponent, { size: 48, strokeWidth: 2.5 }) : <BookOpen size={48} />}
              </div>
            )}
            
            <h2 className="text-4xl font-nunito font-black text-text-primary mb-2">
              {cardData.title}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                Mission: {cardData.title}
              </span>
              <span className="flex items-center gap-1.5 text-text-muted text-[10px] font-black uppercase tracking-widest">
                <Target size={12} /> Goal: Master the SOP
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 relative z-10 text-left">
            {/* Objective */}
            <div className="bg-info/10 rounded-3xl p-6 border-2 border-info/5 shadow-sm">
              <h3 className="text-info text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <Info size={14} /> MISSION OBJECTIVE
              </h3>
              <p className="text-lg font-nunito font-bold text-text-primary leading-relaxed">
                {cardData.objective}
              </p>
            </div>

            {/* SOP Rules Section - Added ListChecks pattern */}
            {cardData.sopRules && (
              <div className="grid gap-3">
                <h3 className="text-text-primary text-[10px] font-black uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                  <ListChecks size={14} className="text-success" /> REQUIRED SCREENING CRITERIA
                </h3>
                <div className="grid gap-2">
                  {cardData.sopRules.map((rule, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 items-center p-4 rounded-2xl bg-white border-2 border-border shadow-sm group hover:border-success/30 transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0 border-2 border-success/20">
                        <Check size={16} className="text-success" strokeWidth={3} />
                      </div>
                      <p className="text-sm text-text-secondary font-bold leading-tight">{rule}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Decision Tree / Flowchart - Recommendation #33 */}
            {cardData.decisionTree && (
              <DecisionFlow data={cardData.decisionTree} />
            )}

            {/* Tips Section - Framer Motion Stagger */}
            <div className="grid gap-3">
              <h3 className="text-text-primary text-[10px] font-black uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                <Lightbulb size={14} className="text-primary" /> EXPERT TIPS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cardData.tips.map((tip, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    className="flex gap-3 items-start p-4 rounded-2xl bg-bg-muted border-2 border-border border-l-4 border-l-primary/30 shadow-sm"
                  >
                    <ChevronRight size={16} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-xs text-text-secondary font-bold">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button - Duolingo Bounce (Delayed to avoid distraction) */}
          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => setShowWalkthrough(true)}
              className="w-full py-4 text-lg font-black flex items-center justify-center gap-3 group shadow-sm bg-bg-muted hover:bg-border text-text-secondary rounded-2xl border-2 border-transparent hover:border-border transition-all"
            >
              <PlaySquare size={20} className="text-primary" /> 
              View Interactive Walkthrough
            </button>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{ 
                y: [0, -4, 0],
              }}
              transition={{ 
                y: { 
                  repeat: Infinity, 
                  duration: 2, 
                  delay: 8, // Increased delay to give enough time to read rules
                  ease: "easeInOut" 
                }
              }}
              onClick={onStart}
              className="btn-primary w-full py-5 text-xl font-black flex items-center justify-center gap-4 group shadow-lg"
            >
              {cardData.buttonText || "LET'S GO!"}
              <ArrowRight size={24} className="transition-transform group-hover:translate-x-2" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Interactive Walkthrough Modal */}
      {showWalkthrough && (
        <WalkthroughTour onComplete={() => setShowWalkthrough(false)} />
      )}
    </div>
  );
};

export default ContextCard;

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Lock, 
  Trophy, 
  ChevronRight, 
  MapPin, 
  Award,
  Star,
  Info,
  RotateCcw
} from 'lucide-react';
import Mascot from './Mascot';

/**
 * GameHub - A Duolingo-style journey map (Train Track)
 * 
 * Features:
 * - Horizontal scrollable track with snap points
 * - Active station auto-centering
 * - Mascot character that follows the user's progress
 * - Expanding station info cards
 * - 3D-style station nodes with state-aware styling
 */
export default function GameHub({ games, completedGames, onSelectGame, onStartAudit, auditUnlocked, auditCompleted }) {
  const completedCount = Object.keys(completedGames).length;
  const isAllComplete = completedCount >= games.length;

  // Find the first incomplete game or default to the last station (Audit)
  const activeIndex = games.findIndex(g => !completedGames[g.id]);
  const effectiveActiveIndex = activeIndex === -1 ? games.length : activeIndex;
  
  const [selectedStation, setSelectedStation] = useState(effectiveActiveIndex);
  const trackRef = useRef(null);

  // Sync selected station with progress, but only if user hasn't manually clicked elsewhere recently
  useEffect(() => {
    setSelectedStation(effectiveActiveIndex);
  }, [effectiveActiveIndex]);

  // Center selected station on mobile/small screens
  useEffect(() => {
    if (trackRef.current) {
      const stations = trackRef.current.querySelectorAll('.station-node-container');
      const targetStation = stations[selectedStation];
      if (targetStation) {
        targetStation.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedStation]);

  const stations = [...games, {
    id: 'audit',
    title: 'Final Education Audit',
    description: 'The ultimate test. Investigate 5 complex profiles, reveal evidence, and earn your certification.',
    badge: 'Boss Stage',
    isAudit: true
  }];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-4 py-8 select-none"
    >
      {/* Progress Header Card */}
      <div className="card-elevated p-6 mb-16 max-w-2xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Award size={120} className="text-primary" />
        </div>
        
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center text-primary border-2 border-primary/20 shadow-inner">
            <MapPin size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-nunito font-black text-text-primary tracking-tight">Certification Journey</h2>
            <p className="text-sm text-text-secondary font-bold">Progress through the labs to unlock the Final Audit</p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="flex justify-between text-xs font-black uppercase tracking-widest text-text-muted">
            <span>Overall Completion</span>
            <span className={isAllComplete ? 'text-success' : 'text-primary'}>
              {Math.round(((completedCount + (auditCompleted ? 1 : 0)) / (games.length + 1)) * 100)}%
            </span>
          </div>
          <div className="risk-meter-track h-4 bg-bg-muted">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((completedCount + (auditCompleted ? 1 : 0)) / (games.length + 1)) * 100}%` }}
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                backgroundColor: isAllComplete && auditCompleted ? 'var(--color-success)' : 'var(--color-primary)',
                boxShadow: `0 0 12px ${isAllComplete && auditCompleted ? 'var(--color-success)' : 'var(--color-primary)'}40`
              }}
            />
          </div>
          
          <div className="flex justify-center gap-2.5 pt-2">
            {stations.map((s, i) => {
              const done = s.isAudit ? auditCompleted : !!completedGames[s.id];
              return (
                <div
                  key={s.id}
                  className={`w-3 h-3 rounded-full transition-all duration-500 border-2 ${
                    done 
                      ? 'bg-success border-success shadow-[0_0_10px_var(--color-success)] scale-110' 
                      : i === effectiveActiveIndex 
                        ? 'bg-primary border-primary animate-pulse' 
                        : 'bg-bg-muted border-border'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Train Track Journey Map */}
      <div className="relative mb-16 min-h-[300px]">
        {/* Track Line (Background) */}
        <div className="absolute top-12 left-0 right-0 h-3 bg-border rounded-full -z-10 mx-24 shadow-inner" />
        
        {/* Track Line (Progress) */}
        <div className="absolute top-12 left-0 right-0 h-3 -z-10 mx-24 pointer-events-none">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${(Math.max(0, effectiveActiveIndex) / (stations.length - 1)) * 100}%` }}
             className="h-full bg-success rounded-full shadow-[0_0_15px_rgba(88,204,2,0.4)]"
           />
        </div>
        
        {/* Horizontal Track Container */}
        <div 
          ref={trackRef}
          className="flex justify-between items-start gap-12 overflow-x-auto pb-16 pt-4 px-24 no-scrollbar snap-x scroll-smooth"
        >
          {stations.map((station, i) => {
            const isAudit = station.isAudit;
            const isCompleted = isAudit ? auditCompleted : !!completedGames[station.id];
            const isLocked = isAudit ? !auditUnlocked : (!isCompleted && i > effectiveActiveIndex);
            const isActive = i === selectedStation;
            const isMascotHere = i === effectiveActiveIndex;

            return (
              <div 
                key={station.id}
                className="station-node-container flex-shrink-0 w-32 flex flex-col items-center relative snap-center"
              >
                {/* Station Node (The 3D Circle) */}
                <motion.div
                  layout
                  whileHover={!isLocked ? { scale: 1.1 } : {}}
                  whileTap={!isLocked ? { scale: 0.95 } : {}}
                  onClick={() => !isLocked && setSelectedStation(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      !isLocked && setSelectedStation(i);
                    }
                  }}
                  tabIndex={isLocked ? -1 : 0}
                  role="button"
                  aria-label={station.title}
                  className={`
                    w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-10 relative outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4
                    ${isCompleted ? 'bg-success text-white' : 
                      isLocked ? 'bg-bg-muted text-text-muted' : 
                      'bg-white text-primary border-primary'}
                  `}
                  style={{
                    borderWidth: '4px',
                    borderStyle: 'solid',
                    borderColor: isCompleted ? '#46A302' : (isLocked ? 'var(--color-border)' : 'var(--color-primary)'),
                    boxShadow: isCompleted 
                      ? '0 6px 0 #46A302, 0 12px 24px rgba(88,204,2,0.2)' 
                      : (isLocked ? '0 4px 0 var(--color-border)' : '0 8px 0 var(--color-primary-hover), 0 15px 30px rgba(255,153,0,0.2)'),
                    transform: isActive ? 'translateY(-4px)' : 'none'
                  }}
                >
                  {isCompleted ? <Check size={40} strokeWidth={4} /> : 
                   isLocked ? <Lock size={28} /> : 
                   isAudit ? <Trophy size={40} strokeWidth={2.5} /> : 
                   <span className="text-3xl font-black">{i + 1}</span>}
                  
                  {/* Pulsing ring for active station */}
                  {i === effectiveActiveIndex && !isCompleted && !isLocked && (
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full border-4 border-primary"
                    />
                  )}
                </motion.div>

                {/* Mascot indicator (The slide-along character) */}
                <AnimatePresence>
                  {isMascotHere && (
                    <motion.div 
                      layoutId="hubMascot"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="absolute -top-16 z-20 pointer-events-none"
                    >
                      <div className="bg-white border-2 border-primary rounded-2xl p-1 shadow-xl overflow-hidden">
                        <Mascot 
                          state={isAllComplete && auditCompleted ? "excited" : "neutral"} 
                          size="xs"
                          hideSpeech={true}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Station Label (Small text below node) */}
                <div className={`mt-6 text-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                  <div className={`text-[11px] font-black uppercase tracking-[0.15em] mb-1 ${isLocked ? 'text-text-muted' : 'text-text-secondary'}`}>
                    {isAudit ? 'Final' : `Lab ${i + 1}`}
                  </div>
                  <div className="text-xs font-extrabold text-text-primary max-w-[140px] leading-tight">
                    {station.title}
                  </div>
                </div>

                {/* Pop-over Info Card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className={`
                        absolute top-36 w-72 card-elevated p-6 z-30 shadow-2xl bg-white border-2 border-border
                        ${i < 2 ? 'left-0' : (i > stations.length - 3 ? 'right-0' : 'left-1/2 -translate-x-1/2')}
                      `}
                    >
                      {/* Arrow pointer */}
                      <div className={`absolute -top-2 w-4 h-4 bg-white rotate-45 border-l-2 border-t-2 border-border ${
                        i < 2 ? 'left-12' : (i > stations.length - 3 ? 'right-12' : 'left-1/2 -translate-x-1/2')
                      }`} />
                      
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${
                          isCompleted ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                        }`}>
                          {station.badge}
                        </span>
                        {isCompleted && <div className="text-success flex items-center gap-1 text-[10px] font-black uppercase"><Check size={12}/> Completed</div>}
                      </div>

                      <h3 className="text-xl font-nunito font-black mb-3 text-text-primary leading-tight">
                        {station.title}
                      </h3>
                      
                      <p className="text-sm text-text-secondary font-bold leading-relaxed mb-6">
                        {station.description}
                      </p>
                      
                      {isCompleted ? (
                        <div className="flex flex-col gap-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              isAudit ? onStartAudit(true) : onSelectGame(station.id, true);
                            }}
                            className="w-full py-4 rounded-2xl font-nunito font-black text-base flex items-center justify-center gap-2 btn-primary shadow-md active:shadow-none active:translate-y-1"
                          >
                            Review Previous
                            <Info size={18} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              isAudit ? onStartAudit() : onSelectGame(station.id);
                            }}
                            className="w-full py-3 rounded-2xl font-nunito font-black text-sm flex items-center justify-center gap-2 btn-secondary text-text-secondary border-border hover:bg-bg-muted"
                          >
                            Retry Fresh
                            <RotateCcw size={16} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            isAudit ? onStartAudit() : onSelectGame(station.id);
                          }}
                          className={`w-full py-4 rounded-2xl font-nunito font-black text-base flex items-center justify-center gap-2 transition-all shadow-md active:shadow-none active:translate-y-1 ${
                            isLocked ? 'bg-bg-muted text-text-muted cursor-not-allowed opacity-50' : 'btn-primary'
                          }`}
                          disabled={isLocked}
                        >
                          {isAudit ? 'Launch Final Audit' : 'Start Screening'}
                          <ChevronRight size={20} />
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Toast (Only if everything is done) */}
      {isAllComplete && auditCompleted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto mt-12 p-6 bg-success/10 border-2 border-success border-dashed rounded-3xl flex items-center gap-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-success flex items-center justify-center text-white shadow-lg">
            <Trophy size={32} />
          </div>
          <div>
            <h4 className="text-lg font-black text-text-primary">Certification Earned!</h4>
            <p className="text-sm font-bold text-text-secondary">You've mastered the education screening process. Excellent work!</p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}

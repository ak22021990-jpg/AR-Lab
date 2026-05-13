import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Code, 
  Warehouse, 
  Zap, 
  Gauge, 
  Layers,
  Volume2,
  VolumeX
} from 'lucide-react';
import { getRiskLevel } from '../utils/scoring';
import { isSoundEnabled, setSoundEnabled } from '../utils/audio';

export default function Header({ score, riskMeter, currentScenario, totalScenarios, screen, activeRole, mascotState = 'neutral' }) {
  const risk = getRiskLevel(riskMeter);
  const [sound, setSound] = useState(() => isSoundEnabled());

  const toggleSound = () => {
    const newState = !sound;
    setSound(newState);
    setSoundEnabled(newState);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="sticky top-0 z-50 bg-bg-surface border-b border-border px-6 py-3"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand & Role Context */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <GraduationCap className="text-primary w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-nunito font-extrabold leading-none">
                AMZ<span className="text-primary">3</span> <span className="text-text-secondary font-extrabold">Lab</span>
              </h1>
              <p className="text-[10px] text-text-muted font-mono tracking-widest uppercase font-extrabold">Risk Intelligence</p>
            </div>
          </div>

          {activeRole && (
            <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-border">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-text-muted">Target:</div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border flex items-center gap-2 ${
                activeRole === 'sde' 
                  ? 'bg-info/10 text-info border-info/30' 
                  : 'bg-streak/10 text-streak border-streak/30'
              }`}>
                {activeRole === 'sde' ? <Code size={12} /> : <Warehouse size={12} />}
                {activeRole === 'sde' ? 'Software Development Engineer' : 'Warehouse Manager'}
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {screen !== 'hero' && (
          <div className="flex items-center gap-4">
            {/* Mascot Avatar */}
            <div className="w-10 h-10 rounded-full bg-bg-muted border-2 border-border overflow-hidden p-0.5 shadow-sm">
              <img 
                src={`/assets/mascot/${mascotState}.png`} 
                alt="Assistant" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <button onClick={toggleSound} className="w-10 h-10 rounded-full bg-bg-muted border-2 border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-all shadow-sm">
              {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="stat-badge">
                <Zap size={16} className="text-primary fill-primary" />
                <span className="text-text-primary">{score} <span className="text-[10px] text-text-muted">XP</span></span>
              </div>

              {currentScenario !== null && (
                <div className="stat-badge">
                  <Layers size={16} className="text-info" />
                  <span className="text-text-primary">{currentScenario + 1}/{totalScenarios}</span>
                </div>
              )}

              {/* Risk Meter Mini */}
              <div className="stat-badge min-w-[180px] py-1.5 px-4 shadow-sm">
                <Gauge size={16} style={{ color: risk.color === 'green' ? '#58CC02' : risk.color === 'yellow' ? '#FFC800' : '#FF4B4B' }} />
                <div className="flex-1 ml-2">
                  <div className="flex justify-between text-[9px] font-extrabold uppercase tracking-widest mb-1">
                    <span className="text-text-muted">Risk Exposure</span>
                    <span style={{ color: risk.color === 'green' ? '#58CC02' : risk.color === 'yellow' ? '#FFC800' : '#FF4B4B' }}>
                      {risk.level}
                    </span>
                  </div>
                  <div className="risk-meter-track h-2.5">
                    <div
                      className={`risk-meter-fill ${risk.color}`}
                      style={{ width: `${Math.min(riskMeter, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
}

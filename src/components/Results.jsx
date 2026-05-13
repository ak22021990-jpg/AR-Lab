import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  Target, 
  UserCheck, 
  Gauge, 
  Brain, 
  AlertTriangle, 
  TableProperties, 
  RotateCcw, 
  Flag,
  Award,
  PartyPopper,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';
import { getRiskBehavior, getWeakAreas, getRiskLevel } from '../utils/scoring';
import Mascot from './Mascot';
import { getIcon } from '../utils/iconMap';

function AnimatedScoreCounter({ value, color = 'var(--color-primary)' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    if (start === end) {
      setCount(end);
      return;
    }

    const duration = 1.5;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeOut * end);
      setCount(current);
      
      if (frame === totalFrames) clearInterval(timer);
    }, frameRate);

    return () => clearInterval(timer);
  }, [value]);

  return <span style={{ color }}>{count}</span>;
}

export default function Results({ miniGameResults, auditResults, auditScore, riskMeter, onRestart, onReview }) {
  const miniTotal = Object.values(miniGameResults).reduce((sum, r) => sum + r.score, 0);
  const totalScore = miniTotal + auditScore;
  const auditAccuracy = auditResults.filter(r => r.userDecision === r.correctDecision).length;
  const behavior = getRiskBehavior(auditResults);
  const weakAreas = getWeakAreas(auditResults);
  const risk = getRiskLevel(riskMeter);

  const roleConfusionCount = auditResults.filter(r => r.isRoleConfusion).length;
  const roleAccuracy = Math.round(((auditResults.length - roleConfusionCount) / auditResults.length) * 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 100 }
    }
  };

  const scorePercentage = Math.min((totalScore / 150) * 100, 100);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header / Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-12 relative pt-10">
          <div className="flex justify-center mb-10">
            <Mascot 
              state={behavior.type === 'Expert' ? 'excited' : (behavior.type === 'Over-Cautious' ? 'thinking' : 'concerned')} 
              message={behavior.type === 'Expert' ? "Incredible work! You're ready for the floor." : (behavior.type === 'Over-Cautious' ? "You're safe, but maybe a bit too slow." : "We need to be more careful about these risks.")}
              size="lg"
              position="top"
            />
          </div>

          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary-light border-4 border-primary/10 mb-6 shadow-xl relative">
            <Award className="text-primary w-12 h-12" strokeWidth={2.5} />
            <motion.div 
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1.2, 1]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-6 -right-6"
            >
              <PartyPopper className="text-streak w-10 h-10" />
            </motion.div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-nunito font-black text-text-primary mb-3">
            Performance Report
          </h2>
          <p className="text-text-secondary font-bold text-lg max-w-2xl mx-auto">
            Academic Risk Lab: Breach Prevention — Final Assessment
          </p>
        </motion.div>

        {/* Main Score Ring & Core Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mb-12">
          {/* Main Score Ring */}
          <div className="card-elevated p-8 flex flex-col items-center justify-center bg-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light rounded-full blur-3xl opacity-50"></div>
            <div className="relative w-48 h-48 mb-6">
              <svg 
                className="w-full h-full transform -rotate-90"
                role="img"
                aria-label={`Total score: ${totalScore} out of 150`}
              >
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-bg-muted"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={552.92}
                  initial={{ strokeDashoffset: 552.92 }}
                  animate={{ strokeDashoffset: 552.92 - (552.92 * scorePercentage) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-primary"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-nunito font-black text-text-primary">
                  <AnimatedScoreCounter value={totalScore} />
                </div>
                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">TOTAL XP</div>
              </div>
            </div>
            <div className="text-center">
              <span className="stat-badge bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-xs">
                LEVEL PROGRESS +{Math.round(scorePercentage)}%
              </span>
            </div>
          </div>

          {/* Core Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Audit Accuracy', value: `${auditAccuracy}/${auditResults.length}`, color: 'text-info', icon: Target, delay: 0.1 },
              { label: 'Role Accuracy', value: `${roleAccuracy}%`, color: 'text-streak', icon: UserCheck, delay: 0.2 },
              { label: 'Behavior', value: behavior.type, color: 'text-success', icon: getIcon(behavior.icon), delay: 0.3 },
              { label: 'Risk Exposure', value: `${riskMeter}%`, color: risk.color === 'green' ? 'text-success' : risk.color === 'yellow' ? 'text-primary' : 'text-error', icon: Gauge, delay: 0.4 },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + stat.delay }}
                className={`card-elevated p-6 flex flex-col items-center justify-center text-center bg-white hover:border-primary/20 transition-all group border-t-4 ${stat.color.replace('text-', 'border-')}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon size={20} className={stat.color} />
                </div>
                <div className={`text-2xl font-nunito font-black mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Deep Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Behavior Analysis */}
          <motion.div variants={itemVariants} className="card-elevated p-8 bg-white border-l-8" style={{ borderLeftColor: behavior.color }}>
            <h3 className="text-lg font-nunito font-black mb-6 flex items-center gap-3 text-text-primary uppercase tracking-widest text-left">
              <Brain className="text-primary" size={24} /> Behavior Profile
            </h3>
            <div className="flex items-start gap-6 p-6 rounded-3xl bg-bg-muted border-2 border-border shadow-inner">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: `${behavior.color}20`, border: `2px solid ${behavior.color}40` }}>
                {getIcon(behavior.icon) && React.createElement(getIcon(behavior.icon), { size: 32, style: { color: behavior.color } })}
              </div>
              <div className="text-left">
                <div className="font-nunito font-black text-xl mb-2" style={{ color: behavior.color }}>{behavior.type}</div>
                <p className="text-sm text-text-secondary font-bold leading-relaxed">{behavior.detail}</p>
              </div>
            </div>
            {/* Risk Meter Visual */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex justify-between items-center mb-3 text-[10px] font-black uppercase tracking-widest text-text-muted">
                <span>Lab Risk Profile</span>
                <span style={{ color: risk.color === 'green' ? '#58CC02' : risk.color === 'yellow' ? '#FFC800' : '#FF4B4B' }}>{riskMeter}% Exposure — {risk.level}</span>
              </div>
              <div className="h-3 w-full bg-bg-muted rounded-full overflow-hidden border border-border shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${riskMeter}%` }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: risk.color === 'green' ? '#58CC02' : risk.color === 'yellow' ? '#FFC800' : '#FF4B4B' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Improvement areas */}
          <motion.div variants={itemVariants} className="card-elevated p-8 bg-white">
            <h3 className="text-lg font-nunito font-black mb-6 flex items-center gap-3 text-text-primary uppercase tracking-widest">
              <TrendingUp className="text-primary" size={24} /> Growth Opportunities
            </h3>
            {weakAreas.length > 0 ? (
              <div className="space-y-3">
                {weakAreas.map(area => (
                  <div key={area.tag} className="flex items-center justify-between p-4 rounded-2xl bg-error/5 border-2 border-error/10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error">
                        <AlertTriangle size={18} />
                      </div>
                      <div className="text-left">
                        <div className="font-nunito font-black text-sm text-text-primary uppercase tracking-widest">{area.tag} Checks</div>
                        <div className="text-[10px] font-bold text-text-muted uppercase">Precision Opportunity</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-error/10 text-error text-[10px] font-black">
                      MISSED {area.count}X
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center h-full">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success mb-4">
                  <ShieldCheck size={32} />
                </div>
                <p className="text-text-secondary font-bold">No significant weak areas! You're following policy perfectly.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Audit Case Breakdown */}
        <motion.div variants={itemVariants} className="card-elevated p-8 bg-white mb-12">
          <h3 className="text-lg font-nunito font-black mb-8 flex items-center gap-3 text-text-primary uppercase tracking-widest">
            <TableProperties className="text-primary" size={24} /> Case Ledger
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="py-4 px-4 text-[10px] font-black text-text-muted uppercase tracking-widest">Case ID</th>
                  <th className="py-4 px-4 text-[10px] font-black text-text-muted uppercase tracking-widest">Target Role</th>
                  <th className="py-4 px-4 text-[10px] font-black text-text-muted uppercase tracking-widest text-center">Outcome</th>
                  <th className="py-4 px-4 text-[10px] font-black text-text-muted uppercase tracking-widest text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {auditResults.map((r, i) => (
                  <tr key={i} className="border-b border-border hover:bg-primary/5 transition-colors even:bg-bg-muted/50">
                    <td className="py-4 px-4 font-nunito font-black text-text-secondary">#AUD-00{i + 1}</td>
                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${r.targetRole === 'sde' ? 'bg-info/10 text-info border border-info/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                        {r.targetRole === 'sde' ? 'SDE' : 'Warehouse'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {r.userDecision === r.correctDecision ? (
                          <>
                            <CheckCircle size={16} className="text-success" />
                            <span className="text-sm font-black text-success uppercase tracking-widest">PASSED</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={16} className="text-error" />
                            <span className="text-sm font-black text-error uppercase tracking-widest">FAILED</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-black text-lg ${r.points >= 0 ? 'text-success' : 'text-error'}`}>
                        {r.points > 0 ? '+' : ''}{r.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center items-center gap-6">
          <button 
            onClick={onReview} 
            className="btn-secondary py-5 px-8 text-lg font-black flex items-center gap-4 shadow-xl hover:scale-105 active:scale-95 transition-transform"
          >
            <RotateCcw size={20} /> REVIEW CASES
          </button>

          <button 
            onClick={onRestart} 
            className="btn-primary py-5 px-16 text-xl font-black flex items-center gap-4 shadow-2xl hover:scale-105 active:scale-95 transition-transform"
          >
            CONTINUE TO HUB <ChevronRight size={24} />
          </button>

          <button 
            onClick={() => window.print()} 
            className="btn-secondary py-5 px-8 text-lg font-black flex items-center gap-4 shadow-xl hover:scale-105 active:scale-95 transition-transform"
          >
            <FileText size={20} /> PRINT RESULTS
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

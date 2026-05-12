import { useState, useEffect } from 'react';
import { getRiskBehavior, getWeakAreas, getRiskLevel } from '../utils/scoring';
import Mascot from './Mascot';

function AnimatedScoreCounter({ value, color = 'var(--color-amz-orange)' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let totalMiliseconds = 1500;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span style={{ color }}>{count}</span>;
}

export default function Results({ miniGameResults, auditResults, auditScore, riskMeter, onRestart }) {
  const miniTotal = Object.values(miniGameResults).reduce((sum, r) => sum + r.score, 0);
  const totalScore = miniTotal + auditScore;
  const auditAccuracy = auditResults.filter(r => r.userDecision === r.correctDecision).length;
  const behavior = getRiskBehavior(auditResults);
  const weakAreas = getWeakAreas(auditResults);
  const risk = getRiskLevel(riskMeter);

  const roleConfusionCount = auditResults.filter(r => r.isRoleConfusion).length;
  const roleAccuracy = Math.round(((auditResults.length - roleConfusionCount) / auditResults.length) * 100);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-10 relative">
        {/* Mascot Reaction */}
        <div className="absolute top-0 right-0 hidden lg:block">
          <Mascot 
            state={behavior.type === 'Expert' ? 'excited' : (behavior.type === 'Over-Cautious' ? 'thinking' : 'concerned')} 
            message={behavior.type === 'Expert' ? "Incredible work! You're ready for the floor." : (behavior.type === 'Over-Cautious' ? "You're safe, but maybe a bit too slow." : "We need to be more careful about these risks.")}
            size="lg"
            position="left"
          />
        </div>
        <div className="w-20 h-20 rounded-3xl bg-amz-orange/10 border border-amz-orange/30 flex items-center justify-center mx-auto mb-4 group hover:scale-110 transition-transform duration-500">
          <i className="fa-solid fa-file-shield text-amz-orange text-3xl shadow-glow-orange group-hover:animate-pulse"></i>
        </div>
        <h2 className="text-4xl font-outfit font-black mb-2">Performance Report</h2>
        <p className="text-gray-400 font-medium">Academic Risk Lab: Breach Prevention — Final Assessment</p>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {[
          { label: 'Total Score', value: totalScore, color: 'text-amz-orange', icon: 'fa-bolt', animated: true },
          { label: 'Audit Accuracy', value: `${auditAccuracy}/${auditResults.length}`, color: 'text-cyber-cyan', icon: 'fa-bullseye' },
          { label: 'Role Accuracy', value: `${roleAccuracy}%`, color: 'text-purple-400', icon: 'fa-user-check' },
          { label: 'Behavior', value: behavior.type, color: '', customColor: behavior.color, icon: behavior.icon },
          { label: 'Risk Level', value: `${riskMeter}%`, color: '', customColor: risk.color === 'green' ? '#22c55e' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444', icon: 'fa-gauge-high' },
        ].map((card, i) => (
          <div key={i} className="glass-card-elevated p-6 text-center animate-fade-in-up border-white/5 hover:border-white/10 transition-colors" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
            <div className="text-gray-500 mb-3">
               <i className={`fa-solid ${card.icon} text-sm opacity-50`}></i>
            </div>
            <div className={`text-3xl font-outfit font-black mb-1 ${card.color}`} style={card.customColor ? { color: card.customColor } : {}}>
              {card.animated ? <AnimatedScoreCounter value={card.value} /> : card.value}
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Behavior Analysis */}
      <div className="glass-card-elevated p-6 mb-6 animate-fade-in-up delay-200">
        <h3 className="text-lg font-outfit font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-brain text-amz-orange"></i> Behavior Analysis
        </h3>
        <div className="flex items-center gap-4 p-4 rounded-xl border" style={{ background: `${behavior.color}08`, borderColor: `${behavior.color}30` }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${behavior.color}15`, border: `1px solid ${behavior.color}30` }}>
            <i className={`fa-solid ${behavior.icon} text-2xl`} style={{ color: behavior.color }}></i>
          </div>
          <div>
            <div className="font-outfit font-bold text-lg" style={{ color: behavior.color }}>{behavior.type}</div>
            <p className="text-sm text-gray-400">{behavior.detail}</p>
          </div>
        </div>
      </div>

      {/* Weak Areas */}
      {weakAreas.length > 0 && (
        <div className="glass-card-elevated p-6 mb-6 animate-fade-in-up delay-300">
          <h3 className="text-lg font-outfit font-bold mb-4 flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation text-risk-yellow"></i> Areas to Improve
          </h3>
          <div className="flex flex-wrap gap-3">
            {weakAreas.map(area => (
              <div key={area.tag} className="px-4 py-3 rounded-xl bg-risk-yellow/5 border border-risk-yellow/20 flex items-center gap-3">
                <span className="text-risk-yellow font-outfit font-bold capitalize">{area.tag}</span>
                <span className="text-xs text-gray-500">Missed {area.count}x</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Case Breakdown */}
      <div className="glass-card-elevated p-6 mb-6 animate-fade-in-up delay-400">
        <h3 className="text-lg font-outfit font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-table-list text-amz-orange"></i> Case-by-Case Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-3 text-gray-500 font-semibold">Case</th>
                <th className="text-left py-3 px-3 text-gray-500 font-semibold">Role</th>
                <th className="text-left py-3 px-3 text-gray-500 font-semibold">Your Decision</th>
                <th className="text-left py-3 px-3 text-gray-500 font-semibold">Correct</th>
                <th className="text-right py-3 px-3 text-gray-500 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {auditResults.map((r, i) => (
                <tr key={i} className="border-b border-white/3 hover:bg-white/[0.02]">
                  <td className="py-3 px-3 font-mono text-gray-400">#{i + 1}</td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${r.targetRole === 'sde' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                      {r.targetRole === 'sde' ? 'SDE' : 'Warehouse'}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`capitalize font-semibold ${r.userDecision === r.correctDecision ? 'text-risk-green' : 'text-risk-red'}`}>
                      {r.userDecision}
                    </span>
                  </td>
                  <td className="py-3 px-3 capitalize text-gray-400">{r.correctDecision}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={r.points >= 0 ? 'text-risk-green font-bold' : 'text-risk-red font-bold'}>
                      {r.points > 0 ? '+' : ''}{r.points}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Meter Final */}
      <div className="glass-card-elevated p-6 mb-8 animate-fade-in-up delay-500">
        <h3 className="text-lg font-outfit font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-gauge-high" style={{ color: risk.color === 'green' ? '#22c55e' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444' }}></i>
          Final Risk Assessment
        </h3>
        <div className="risk-meter-track h-4 mb-3">
          <div className={`risk-meter-fill ${risk.color}`} style={{ width: `${Math.min(riskMeter, 100)}%` }}></div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4 text-xs">
            <span className="text-risk-green">■ Safe (0–25)</span>
            <span className="text-risk-yellow">■ Caution (26–60)</span>
            <span className="text-risk-red">■ Audit Risk (61+)</span>
          </div>
          <span className="font-bold" style={{ color: risk.color === 'green' ? '#22c55e' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444' }}>
            {riskMeter}%
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button onClick={onRestart} className="btn-primary text-lg py-4 px-10">
          <i className="fa-solid fa-rotate-right"></i> Play Again
        </button>
      </div>
    </div>
  );
}

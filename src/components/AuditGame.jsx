import { useState, useEffect } from 'react';
import { riskTags } from '../data/audit';
import { contextCards } from '../data/contextCards';
import { scoreAuditScenario, getRiskLevel } from '../utils/scoring';
import ContextCard from './ContextCard';
import ProgressiveTimer from './ProgressiveTimer';
import ComparisonPanel from './ComparisonPanel';
import RoleBadge from './RoleBadge';
import ResumeView from './ResumeView';
import Mascot from './Mascot';

export default function AuditGame({ scenarios, gameId, onComplete, onBack, onScenarioChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedEvidence, setRevealedEvidence] = useState([]);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [selectedRisks, setSelectedRisks] = useState([]);
  const [decision, setDecision] = useState(null);
  const [justification, setJustification] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [results, setResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [riskMeter, setRiskMeter] = useState(0);
  const [finished, setFinished] = useState(false);
  const [latestResult, setLatestResult] = useState(null);

  useEffect(() => {
    if (onScenarioChange) {
      onScenarioChange(currentIndex, scenarios[currentIndex]);
    }
  }, [currentIndex, onScenarioChange, scenarios]);
  
  // Phase 2: Context Card & Timer State
  const [showContext, setShowContext] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(null);

  const scenario = scenarios[currentIndex];
  const risk = getRiskLevel(riskMeter);
  const cardData = contextCards[gameId];

  // Progressive timer duration based on game plan (defaults to 60 if not specified)
  const getInitialDuration = () => {
    if (gameId === 'eligibility-basics') return 120;
    if (gameId === 'degree-detective') return 100;
    if (gameId === 'graduation-gate') return 90;
    if (gameId === 'university-validator') return 80;
    if (gameId === 'education-audit') return 60;
    return 60; // Main Game
  };

  const initialDuration = getInitialDuration();

  const handleStartGame = () => {
    setShowContext(false);
    setTimerActive(true);
    setGameStartTime(Date.now());
  };

  const handleTimeUp = () => {
    if (!showFeedback && !decision) {
      // Auto-submit with no decision if time runs out
      setDecision('timeout');
      handleSubmit('timeout');
    }
  };

  const revealEvidence = (evidenceId) => {
    if (revealedEvidence.includes(evidenceId)) return;
    if (tokensUsed >= scenario.evidenceTokens) return;
    setRevealedEvidence(prev => [...prev, evidenceId]);
    setTokensUsed(prev => prev + 1);
  };

  const toggleRisk = (tagId) => {
    setSelectedRisks(prev =>
      prev.includes(tagId) ? prev.filter(r => r !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = (forcedDecision) => {
    const finalDecision = forcedDecision || decision;
    if (!finalDecision && !showFeedback) return;

    setTimerActive(false);
    const durationUsed = (Date.now() - gameStartTime) / 1000;
    const remaining = Math.max(0, initialDuration - durationUsed);

    const result = scoreAuditScenario({
      userDecision: finalDecision,
      correctDecision: scenario.correctDecision,
      userRisks: selectedRisks,
      correctRisks: scenario.correctRisks,
      justification: gameId === 'audit-final' ? justification : '', // Only require justification for main game
      strongKeywords: scenario.strongJustificationKeywords,
      timeRemaining: remaining,
      totalTime: initialDuration,
      targetRole: scenario.targetRole
    });

    const newResult = {
      scenarioId: scenario.id,
      userDecision: finalDecision,
      correctDecision: scenario.correctDecision,
      userRisks: [...selectedRisks],
      correctRisks: scenario.correctRisks,
      ...result,
    };

    setFeedbackData({ ...result, scenario });
    setTotalScore(prev => prev + result.points);
    setRiskMeter(prev => prev + result.riskImpact);
    setResults(prev => [...prev, newResult]);
    setLatestResult(newResult);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex >= scenarios.length - 1) {
      const allResults = [...results];
      onComplete(allResults, totalScore, riskMeter);
      setFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setRevealedEvidence([]);
      setTokensUsed(0);
      setSelectedRisks([]);
      setDecision(null);
      setJustification('');
      setShowFeedback(false);
      setFeedbackData(null);
      setLatestResult(null);
      setTimerActive(true);
      setGameStartTime(Date.now());
    }
  };

  if (showContext && cardData) {
    return <ContextCard cardData={cardData} onStart={handleStartGame} />;
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto text-center animate-scale-in py-20">
        <div className="glass-card-elevated p-10">
          <div className="w-16 h-16 rounded-full bg-risk-green/10 border-2 border-risk-green flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-flag-checkered text-risk-green text-2xl"></i>
          </div>
          <h2 className="text-3xl font-outfit font-bold mb-2">Investigation Complete</h2>
          <p className="text-gray-400 mb-6">All cases have been reviewed. Returning to base...</p>
          <button onClick={onBack} className="btn-primary">
            <i className="fa-solid fa-arrow-left"></i> Return to Labs
          </button>
        </div>
      </div>
    );
  }

  // Determine if we should show comparison panel (specifically for graduation-gate)
  const isComparisonGame = gameId === 'graduation-gate';

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      {/* Feedback Modal */}
      {showFeedback && feedbackData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up">
          <div className="glass-card-elevated p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto relative">
            {/* Mascot Reaction */}
            <div className="absolute -top-16 -left-16 hidden md:block">
              <Mascot 
                state={decision === 'timeout' ? 'thinking' : (decision === scenario.correctDecision ? 'happy' : 'concerned')} 
                message={decision === 'timeout' ? "Time's up! We need to move faster next time." : (decision === scenario.correctDecision ? "Excellent screening! You followed the SOP perfectly." : "This one was tricky. Let's look at why.")}
                size="md"
                position="right"
              />
            </div>
            <h3 className="text-2xl font-outfit font-bold mb-6 text-center">
              <i className="fa-solid fa-file-shield text-amz-orange mr-2"></i>Case Debrief
            </h3>

            {/* Decision comparison */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`rounded-xl p-4 text-center border ${decision === scenario.correctDecision ? 'animate-celebration-burst' : 'animate-shake'}`} style={{
                background: decision === scenario.correctDecision ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                borderColor: decision === scenario.correctDecision ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)',
              }}>
                <div className="text-xs text-gray-500 mb-1">Your Decision</div>
                <div className="font-outfit font-bold capitalize">{decision === 'timeout' ? 'No Decision' : decision}</div>
              </div>
              <div className="rounded-xl p-4 text-center bg-risk-green/5 border border-risk-green/20">
                <div className="text-xs text-gray-500 mb-1">Correct</div>
                <div className="font-outfit font-bold capitalize text-risk-green">{scenario.correctDecision}</div>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="mb-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">Performance Analysis</div>
              <div className="flex flex-col gap-1">
                {feedbackData.breakdown.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.label}</span>
                    <span className={item.points >= 0 ? 'text-risk-green font-bold' : 'text-risk-red font-bold'}>
                      {item.points > 0 ? '+' : ''}{item.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rule - Key Teaching Moment */}
            <div className="mb-8 rounded-xl p-5 bg-cyber-cyan/5 border border-cyber-cyan/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <i className={`fa-solid ${scenario.targetRole === 'sde' ? 'fa-code' : 'fa-warehouse'} text-4xl`}></i>
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="text-xs text-cyber-cyan uppercase tracking-wider font-bold flex items-center gap-2">
                  <i className="fa-solid fa-graduation-cap"></i> The SOP Says:
                </div>
                <RoleBadge role={scenario.targetRole} />
              </div>
              
              <p className="text-sm text-gray-200 leading-relaxed mb-4 relative z-10">{scenario.ruleApplied}</p>
              
              {scenario.targetRole === 'warehouse-manager' && (
                <div className="text-[11px] text-purple-300/80 italic flex items-center gap-2 mt-2 bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 animate-pulse">
                  <i className="fa-solid fa-circle-info text-purple-400"></i>
                  <span><strong>Role Reminder:</strong> Warehouse roles accept <strong>ANY</strong> Bachelor's degree (B.A., B.Com, etc. are all valid).</span>
                </div>
              )}
              {scenario.targetRole === 'sde' && (
                <div className="text-[11px] text-blue-300/80 italic flex items-center gap-2 mt-2 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  <i className="fa-solid fa-circle-info text-blue-400"></i>
                  <span><strong>Role Reminder:</strong> SDE roles require CS, IT, or closely related engineering degrees.</span>
                </div>
              )}
            </div>

            <button onClick={handleNext} className="btn-primary w-full group relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <i className="fa-solid fa-forward-step"></i>
                {currentIndex >= scenarios.length - 1 ? 'Finish Investigation' : 'Next Case'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left: Candidate Data */}
        <div className="glass-card-elevated p-6 flex flex-col">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amz-orange/20 to-amz-orange/5 border border-amz-orange/20 flex items-center justify-center text-amz-orange text-2xl shadow-inner">
                <i className={`fa-solid ${cardData?.icon || 'fa-folder-open'}`}></i>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{scenario.title}</h2>
                  <RoleBadge role={scenario.targetRole} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono text-slate-400 border border-white/10 uppercase">
                    ID: {scenario.id}
                  </span>
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">
                    Case {currentIndex + 1} of {scenarios.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-64">
              <ProgressiveTimer 
                duration={initialDuration} 
                onTimeUp={handleTimeUp} 
                isActive={timerActive} 
                key={`${currentIndex}-${currentIndex}`} // Reset timer on next scenario
              />
            </div>
          </div>

          {/* Core Content: Resume View + Portal Panel */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 mb-8 flex-1">
            <div className="relative group/resume-container min-h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-2 px-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                  <i className="fa-solid fa-file-pdf text-risk-red"></i> Candidate Resume
                </span>
                <span className="text-[10px] font-bold text-slate-600 italic">
                  Template: {scenario.templateStyle}
                </span>
              </div>
              
              <div className="flex-1 overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
                <ResumeView 
                  resumeData={scenario.resume} 
                  templateStyle={scenario.templateStyle} 
                />
              </div>
              
              {/* Overlay Comparison Panel for graduation-gate */}
              {isComparisonGame && (
                <div className="absolute top-8 left-0 right-0 p-6 bg-amz-dark/90 backdrop-blur-xl border-y border-white/10 z-10 animate-fade-in-down shadow-2xl">
                  <ComparisonPanel 
                    leftData={{ label: "Resume Grad", value: scenario.resume.education?.[0]?.graduationYear }}
                    rightData={{ label: "Portal Grad", value: scenario.portal.graduationYear }}
                    title="Timeline Verification"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      Compare the graduation year on the document vs the portal entry
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2 px-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyber-cyan flex items-center gap-2">
                  <i className="fa-solid fa-server"></i> System Portal
                </span>
              </div>
              
              {/* Portal Panel */}
              <div className="rounded-2xl p-6 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 flex flex-col gap-4 h-full shadow-inner relative overflow-hidden group/portal">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover/portal:bg-cyber-cyan/10 transition-colors"></div>
                
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2 border-b border-white/5 pb-2">
                  <i className="fa-solid fa-database text-[10px]"></i> Application Record
                </h4>
                
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[550px] pr-2 custom-scrollbar relative z-10">
                  {scenario.portal && Object.entries(scenario.portal).map(([key, value], i) => (
                    <div key={i} className="flex flex-col gap-1.5 border-b border-white/5 pb-4 last:border-0 hover:bg-white/[0.01] transition-colors rounded-lg p-2 -mx-2">
                      <span className="text-[9px] font-black text-cyber-cyan/60 uppercase tracking-[0.15em]">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm text-gray-200 font-medium">
                        {value || <span className="opacity-30 italic text-xs">-- Not provided --</span>}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 px-3 py-2 bg-cyber-cyan/5 rounded-lg border border-cyber-cyan/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse"></div>
                    <span className="text-[9px] font-bold text-cyber-cyan/80 uppercase tracking-widest">Portal Sync Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Risk Tags */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <i className="fa-solid fa-tags text-amz-orange"></i> Identify Issues
            </h4>
            <div className="flex flex-wrap gap-2">
              {riskTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => !showFeedback && toggleRisk(tag.id)}
                  className={`risk-tag ${selectedRisks.includes(tag.id) ? 'selected' : ''}`}
                  disabled={showFeedback}
                >
                  <i className={`fa-solid ${tag.icon} mr-1`}></i> {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Simplified Binary Decisions */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <i className="fa-solid fa-gavel text-amz-orange"></i> Decision
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => !showFeedback && setDecision('proceed')} 
                className={`btn-proceed py-4 ${decision === 'proceed' ? 'active' : ''}`} 
                disabled={showFeedback}
              >
                <i className="fa-solid fa-circle-check text-xl"></i>
                <div className="text-left">
                  <div className="text-sm font-bold">Proceed</div>
                  <div className="text-[10px] opacity-60">Candidate is eligible</div>
                </div>
              </button>
              <button 
                onClick={() => !showFeedback && setDecision('reject')} 
                className={`btn-reject py-4 ${decision === 'reject' ? 'active' : ''}`} 
                disabled={showFeedback}
              >
                <i className="fa-solid fa-circle-xmark text-xl"></i>
                <div className="text-left">
                  <div className="text-sm font-bold">Reject</div>
                  <div className="text-[10px] opacity-60">Policy mismatch found</div>
                </div>
              </button>
            </div>
          </div>

          {/* Justification (Only for final audit) */}
          {gameId === 'audit-final' && (
            <div className="mb-8 animate-fade-in-up">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <i className="fa-solid fa-pen-to-square text-amz-orange"></i> Justification
              </h4>
              <textarea
                value={justification}
                onChange={e => setJustification(e.target.value)}
                placeholder="Explain your decision..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-amz-orange/50 resize-none h-24 transition-colors"
                disabled={showFeedback}
              />
            </div>
          )}

          {/* Submit */}
          <button
            onClick={() => handleSubmit()}
            disabled={!decision || showFeedback || (gameId === 'audit-final' && !justification.trim())}
            className="btn-primary w-full py-4 text-lg"
          >
            <i className="fa-solid fa-lock"></i> Lock Decision
          </button>
        </div>

        {/* Right: Evidence Panel */}
        <div className="flex flex-col gap-6">
          {/* Evidence Items */}
          <div className="glass-card-elevated p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-folder-open text-cyber-cyan"></i> Evidence
              </h4>
              <div className="flex gap-1.5">
                {Array.from({ length: scenario.evidenceTokens }).map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full border ${i < tokensUsed ? 'bg-cyber-cyan/20 border-cyber-cyan/40' : 'bg-white/10 border-white/20'}`}></div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {scenario.evidence.map(ev => {
                const isRevealed = revealedEvidence.includes(ev.id);
                return (
                  <div key={ev.id} className="rounded-xl border border-white/5 overflow-hidden">
                    {isRevealed ? (
                      <div className="p-4 bg-cyber-cyan/5 border-l-2 border-l-cyber-cyan animate-card-flip">
                        <div className="text-[10px] text-cyber-cyan font-bold uppercase mb-1">{ev.label}</div>
                        <p className="text-xs text-gray-300 leading-relaxed">{ev.content}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => revealEvidence(ev.id)}
                        disabled={tokensUsed >= scenario.evidenceTokens || showFeedback}
                        className="w-full p-4 bg-white/[0.02] text-left hover:bg-white/[0.04] transition-colors disabled:opacity-40 disabled:cursor-not-allowed group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-cyber-cyan group-hover:border-cyber-cyan/30 transition-colors">
                            <i className="fa-solid fa-lock"></i>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-400">{ev.label}</div>
                            <div className="text-[10px] text-gray-600">Spend 1 token</div>
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk Meter (Only for main game or if needed) */}
          <div className="glass-card-elevated p-6">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <i className="fa-solid fa-gauge-high" style={{ color: risk.color === 'green' ? '#22c55e' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444' }}></i>
              Lab Risk Profile
            </h4>
            <div className="risk-meter-track mb-3">
              <div className={`risk-meter-fill ${risk.color}`} style={{ width: `${Math.min(riskMeter, 100)}%` }}></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
              <span className="text-slate-500">{riskMeter}% Exposure</span>
              <span style={{ color: risk.color === 'green' ? '#22c55e' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444' }}>
                {risk.level}
              </span>
            </div>
          </div>

          {/* Back */}
          <button onClick={onBack} className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2 px-2">
            <i className="fa-solid fa-arrow-left-long"></i> Exit Training
          </button>
        </div>
      </div>
    </div>
  );
}

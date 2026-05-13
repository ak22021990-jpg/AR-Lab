import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flag, 
  ArrowLeft, 
  ShieldCheck, 
  ChevronRight, 
  GraduationCap, 
  Info, 
  Code, 
  Warehouse, 
  FolderOpen, 
  FileText, 
  Server, 
  Database, 
  Tags, 
  Gavel, 
  CheckCircle, 
  XCircle, 
  FileEdit, AlertCircle, 
  Lock, 
  Gauge,
  Check,
  X
} from 'lucide-react';
import { riskTags } from '../data/audit';
import { contextCards } from '../data/contextCards';
import { scoreAuditScenario, getRiskLevel } from '../utils/scoring';
import ContextCard from './ContextCard';
import ProgressiveTimer from './ProgressiveTimer';
import ComparisonPanel from './ComparisonPanel';
import RoleBadge from './RoleBadge';
import ResumeView from './ResumeView';
import Mascot from './Mascot';
import { getIcon } from '../utils/iconMap';
import { playSuccessChime, playErrorTone, playLevelComplete } from '../utils/audio';

export default function AuditGame({ scenarios, gameId, onComplete, onBack, onScenarioChange, reviewMode = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedEvidence, setRevealedEvidence] = useState([]);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [selectedRisks, setSelectedRisks] = useState([]);
  const [decision, setDecision] = useState(null);
  const [showComparison, setShowComparison] = useState(true);
  const [justification, setJustification] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [results, setResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [riskMeter, setRiskMeter] = useState(0);
  const [finished, setFinished] = useState(false);
  const [latestResult, setLatestResult] = useState(null);
  const [showDebriefExpansion, setShowDebriefExpansion] = useState(false);

  useEffect(() => {
    if (onScenarioChange) {
      onScenarioChange(currentIndex, scenarios[currentIndex]);
    }
  }, [currentIndex, onScenarioChange, scenarios]);
  
  const [showContext, setShowContext] = useState(true);
  const [timerActive, setTimerActive] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(null);

  const scenario = scenarios[currentIndex];
  const risk = getRiskLevel(riskMeter);
  const cardData = contextCards[gameId];

  const getInitialDuration = () => {
    if (gameId === 'eligibility-basics') return 60;
    if (gameId === 'degree-detective') return 80;
    if (gameId === 'graduation-gate') return 90;
    if (gameId === 'university-validator') return 100;
    if (gameId === 'education-audit') return 120;
    if (gameId === 'audit-final') return 150;
    return 60;
  };

  const initialDuration = getInitialDuration();

  const handleStartGame = () => {
    setShowContext(false);
    if (!reviewMode) {
      setTimerActive(true);
      setGameStartTime(Date.now());
    } else {
      // In review mode, reveal all evidence and submit correct answer immediately
      setRevealedEvidence(scenario.evidence.map(e => e.id));
      setTokensUsed(scenario.evidenceTokens);
      setSelectedRisks(scenario.correctRisks);
      setDecision(scenario.correctDecision);
      setTimeout(() => {
        handleSubmit(scenario.correctDecision);
      }, 500);
    }
  };

  const handleTimeUp = () => {
    if (!showFeedback && !decision && !reviewMode) {
      setDecision('timeout');
      handleSubmit('timeout');
    }
  };

  const revealEvidence = (evidenceId) => {
    if (reviewMode) return;
    if (revealedEvidence.includes(evidenceId)) return;
    if (tokensUsed >= scenario.evidenceTokens) return;
    setRevealedEvidence(prev => [...prev, evidenceId]);
    setTokensUsed(prev => prev + 1);
  };

  const toggleRisk = (tagId) => {
    if (reviewMode) return;
    setSelectedRisks(prev =>
      prev.includes(tagId) ? prev.filter(r => r !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = (forcedDecision) => {
    const finalDecision = forcedDecision || decision;
    if (!finalDecision && !showFeedback) return;

    setTimerActive(false);
    const durationUsed = reviewMode ? 0 : (Date.now() - gameStartTime) / 1000;
    const remaining = reviewMode ? initialDuration : Math.max(0, initialDuration - durationUsed);

    const result = scoreAuditScenario({
      userDecision: finalDecision,
      correctDecision: scenario.correctDecision,
      userRisks: reviewMode ? scenario.correctRisks : selectedRisks,
      correctRisks: scenario.correctRisks,
      justification: gameId === 'audit-final' ? (reviewMode ? 'Review Mode - Policy correctly applied.' : justification) : '',
      strongKeywords: scenario.strongJustificationKeywords,
      timeRemaining: remaining,
      totalTime: initialDuration,
      targetRole: scenario.targetRole
    });

    const newResult = {
      scenarioId: scenario.id,
      userDecision: finalDecision,
      correctDecision: scenario.correctDecision,
      userRisks: reviewMode ? [...scenario.correctRisks] : [...selectedRisks],
      correctRisks: scenario.correctRisks,
      ...result,
    };

    if (!reviewMode) {
      if (finalDecision === scenario.correctDecision) {
        playSuccessChime();
      } else {
        playErrorTone();
      }
    }

    setFeedbackData({ ...result, scenario });
    if (!reviewMode) {
      setTotalScore(prev => prev + result.points);
      setRiskMeter(prev => prev + result.riskImpact);
    }
    setResults(prev => [...prev, newResult]);
    setLatestResult(newResult);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex >= scenarios.length - 1) {
      const allResults = [...results];
      onComplete(allResults, totalScore, riskMeter);
      setFinished(true);
      playLevelComplete();
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      
      if (reviewMode) {
        const nextScenario = scenarios[nextIndex];
        setRevealedEvidence(nextScenario.evidence.map(e => e.id));
        setTokensUsed(nextScenario.evidenceTokens);
        setSelectedRisks(nextScenario.correctRisks);
        setDecision(nextScenario.correctDecision);
        setJustification('');
        setShowFeedback(false);
        setFeedbackData(null);
        setLatestResult(null);
        setShowDebriefExpansion(false);
        setTimerActive(false);
        setShowComparison(true);
        
        setTimeout(() => {
          handleSubmit(nextScenario.correctDecision);
        }, 500);
      } else {
        setRevealedEvidence([]);
        setTokensUsed(0);
        setSelectedRisks([]);
        setDecision(null);
        setJustification('');
        setShowFeedback(false);
        setFeedbackData(null);
        setLatestResult(null);
        setShowDebriefExpansion(false);
        setTimerActive(true);
        setGameStartTime(Date.now());
        setShowComparison(true);
      }
    }
  };

  if (showContext && cardData) {
    return <ContextCard cardData={cardData} onStart={handleStartGame} />;
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card-elevated p-10"
        >
          <div className="w-20 h-20 rounded-full bg-success/10 border-4 border-success flex items-center justify-center mx-auto mb-6">
            <Flag className="text-success w-10 h-10" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-nunito font-black mb-2 text-text-primary">
            {reviewMode ? 'Review Complete' : 'Investigation Complete'}
          </h2>
          <p className="text-text-secondary font-bold mb-8">
            {reviewMode ? 'You have finished reviewing all cases.' : 'All cases have been reviewed. Returning to base...'}
          </p>
          <button onClick={onBack} className="btn-primary w-full">
            <ArrowLeft size={18} className="mr-2" /> {reviewMode ? 'Exit Review' : 'Back to Hub'}
          </button>
        </motion.div>
      </div>
    );
  }

  const isComparisonGame = gameId === 'graduation-gate';

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedback && feedbackData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="card-elevated p-8 max-w-lg w-full relative bg-white shadow-2xl"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex justify-center mb-4"
              >
                <Mascot 
                  state={decision === 'timeout' ? 'thinking' : (decision === scenario.correctDecision ? 'happy' : 'concerned')} 
                  size="md"
                  hideSpeech={true}
                />
              </motion.div>

              <h3 className="text-2xl font-nunito font-black mb-8 text-center text-text-primary flex items-center justify-center gap-3">
                <ShieldCheck className="text-primary w-8 h-8" /> Case Debrief
              </h3>

              <div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {/* Decision comparison */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`rounded-2xl p-5 text-center border-2 transition-all ${decision === scenario.correctDecision ? 'bg-success/5 border-success/30' : 'bg-error/5 border-error/30'}`}>
                    <div className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Your Decision</div>
                    <div className={`font-nunito font-black text-lg ${decision === scenario.correctDecision ? 'text-success' : 'text-error'}`}>
                      {decision === 'timeout' ? 'No Decision' : decision}
                    </div>
                  </div>
                  <div className="rounded-2xl p-5 text-center bg-bg-muted border-2 border-border">
                    <div className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Policy Decision</div>
                    <div className="font-nunito font-black text-lg text-success capitalize">{scenario.correctDecision}</div>
                  </div>
                </div>

                {/* Score breakdown */}
                <div className="bg-bg-muted/50 rounded-2xl p-6 border-2 border-border">
                  <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">Performance Analysis</div>
                  <div className="space-y-2">
                    {feedbackData.breakdown.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-text-secondary font-bold">{item.label}</span>
                        <span className={`font-black ${item.points >= 0 ? 'text-success' : 'text-error'}`}>
                          {item.points > 0 ? '+' : ''}{item.points}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Teaching Point */}
                <div className="rounded-2xl p-6 bg-info/5 border-2 border-info/20 relative overflow-hidden group text-left">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    {scenario.targetRole === 'sde' ? <Code size={48} className="text-info" /> : <Warehouse size={48} className="text-info" />}
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[10px] text-info font-black uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap size={14} /> The SOP Says:
                    </div>
                    <RoleBadge role={scenario.targetRole} />
                  </div>
                  
                  <p className="text-sm text-text-primary font-bold leading-relaxed mb-4 relative z-10">{scenario.ruleApplied}</p>
                  
                  {scenario.sopReference && (
                    <div className="text-[10px] font-black text-info/60 uppercase tracking-widest mb-4">
                      Ref: {scenario.sopReference}
                    </div>
                  )}

                  <div className={`text-[11px] font-bold p-4 rounded-xl border flex items-center gap-3 ${
                    scenario.targetRole === 'warehouse-manager' 
                      ? 'bg-orange-50 text-primary border-primary/20' 
                      : 'bg-info/10 text-info border-info/20'
                  }`}>
                    <AlertCircle size={16} />
                    <span>
                      <strong>Role Reminder:</strong> {scenario.targetRole === 'warehouse-manager' 
                        ? "Warehouse roles accept ANY Bachelor's degree (B.A., B.Com, etc. are all valid)." 
                        : "SDE roles require CS, IT, or closely related engineering degrees."}
                    </span>
                  </div>
                </div>

                {/* Collapsible Expansion Section (Issue #18) */}
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setShowDebriefExpansion(!showDebriefExpansion)}
                    className="flex items-center justify-between w-full p-4 rounded-2xl bg-bg-muted hover:bg-border/30 transition-all border-2 border-border group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <FileEdit size={16} />
                      </div>
                      <span className="text-xs font-black text-text-primary uppercase tracking-widest">Detailed Learning Breakdown</span>
                    </div>
                    <ChevronRight 
                      size={18} 
                      className={`text-text-muted transition-transform duration-300 ${showDebriefExpansion ? 'rotate-90' : ''}`} 
                    />
                  </button>

                  <AnimatePresence>
                    {showDebriefExpansion && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-white border-2 border-border rounded-2xl flex flex-col gap-6 text-left shadow-inner">
                          {/* Reasoning Chain */}
                          {scenario.reasoningChain && (
                            <div>
                              <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                <CheckCircle size={14} /> Correct Reasoning Chain
                              </h5>
                              <div className="space-y-3">
                                {scenario.reasoningChain.map((step, i) => (
                                  <div key={i} className="flex gap-3 items-start">
                                    <div className="w-5 h-5 rounded-full bg-success/10 text-success text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                                      {i + 1}
                                    </div>
                                    <p className="text-xs text-text-secondary font-bold leading-relaxed">{step}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Common Mistakes */}
                          {scenario.commonMistakes && (
                            <div>
                              <h5 className="text-[10px] font-black text-error uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                <XCircle size={14} /> Common Mistakes
                              </h5>
                              <ul className="space-y-2 list-disc list-inside">
                                {scenario.commonMistakes.map((mistake, i) => (
                                  <li key={i} className="text-xs text-text-secondary font-bold leading-relaxed ml-2">{mistake}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Next Time Guidance */}
                          {scenario.nextTimeGuidance && (
                            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-xl">
                              <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Pro-Tip for Next Case</h5>
                              <p className="text-xs text-text-primary font-bold italic">"{scenario.nextTimeGuidance}"</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-8">
                <button 
                  onClick={handleNext} 
                  className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3"
                >
                  {currentIndex >= scenarios.length - 1 ? 'Finish Investigation' : 'Next Case'}
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 mb-24">
        {/* Left: Candidate Data */}
        <div className="flex flex-col gap-6">
          <div className="card-elevated p-6 flex flex-col bg-white">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-border pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-light border-2 border-primary/20 flex items-center justify-center text-primary shadow-sm">
                  {getIcon(cardData?.icon) ? React.createElement(getIcon(cardData?.icon), { size: 28 }) : <FolderOpen size={28} />}
                </div>
                <div className="text-left">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h2 className="text-2xl font-nunito font-black text-text-primary tracking-tight">{scenario.title}</h2>
                    <RoleBadge role={scenario.targetRole} />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-bg-muted text-[10px] font-black text-text-muted border border-border uppercase tracking-widest">
                      ID: {scenario.id}
                    </span>
                    <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em]">
                      Case {currentIndex + 1} of {scenarios.length}
                    </p>
                  </div>
                </div>
              </div>
              
              {!reviewMode && (
                <div className="w-full md:w-64">
                  <ProgressiveTimer 
                    duration={initialDuration} 
                    onTimeUp={handleTimeUp} 
                    isActive={timerActive} 
                    key={`${currentIndex}-${currentIndex}`}
                  />
                </div>
              )}
            </div>

            {/* Core Content: Resume View */}
            <div className="flex flex-col gap-4">
              {/* Collapsible Comparison Panel (Issue #4 fix) */}
              {isComparisonGame && (
                <div className="mb-4">
                  <AnimatePresence mode="wait">
                    {showComparison ? (
                      <motion.div 
                        key="comparison-open"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-info/5 border-2 border-info/20 rounded-3xl shadow-sm mb-2 relative group">
                          <button 
                            onClick={() => setShowComparison(false)}
                            className="absolute top-4 right-4 p-2 text-text-muted hover:text-info hover:bg-info/10 rounded-full transition-all z-10"
                            title="Collapse Comparison"
                          >
                            <ChevronRight className="rotate-90" size={18} />
                          </button>
                          <ComparisonPanel 
                            leftData={{ label: "Resume Grad", value: scenario.resume.education?.[0]?.graduationYear }}
                            rightData={{ label: "Portal Grad", value: scenario.portal.graduationYear }}
                            title="Timeline Verification"
                          />
                          <div className="mt-2 text-center">
                            <p className="text-[10px] text-text-muted uppercase tracking-widest font-black">
                              Compare graduation year on document vs portal entry
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="comparison-closed"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={() => setShowComparison(true)}
                        className="w-full py-3 px-6 bg-info/5 border-2 border-info/10 rounded-2xl flex items-center justify-between group hover:bg-info/10 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-info/10 text-info flex items-center justify-center">
                            <Info size={16} />
                          </div>
                          <span className="text-xs font-black text-info uppercase tracking-widest">Show Graduation Year Comparison</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black text-info/60 uppercase tracking-widest group-hover:opacity-100 opacity-0 transition-opacity">Expand Details</span>
                          <ChevronRight size={18} className="text-info group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className="relative group/resume-container min-h-[600px] flex flex-col">
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center gap-2">
                    <FileText size={14} className="text-error" /> Candidate Resume
                  </span>
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-widest bg-bg-muted px-2 py-0.5 rounded">
                    {scenario.templateStyle}
                  </span>
                </div>
                
                <div className="flex-1 overflow-hidden rounded-3xl border-2 border-border shadow-xl">
                  <ResumeView 
                    resumeData={scenario.resume} 
                    templateStyle={scenario.templateStyle} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sidebar (Portal + Evidence) */}
        <div className="flex flex-col gap-8">
          {/* Portal Panel (Moved from left col for Issue #3) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-info flex items-center gap-2">
                <Server size={14} /> System Portal
              </span>
            </div>
            
            <div className="rounded-3xl p-6 bg-info/5 border-2 border-info/10 flex flex-col gap-4 shadow-inner relative overflow-hidden group/portal">
              <div className="absolute top-0 right-0 w-32 h-32 bg-info/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <h4 className="text-[10px] font-black text-info uppercase tracking-[0.2em] mb-2 flex items-center gap-2 border-b-2 border-info/10 pb-3 text-left">
                <Database size={12} /> Application Record
              </h4>
              
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar relative z-10 text-left">
                {scenario.portal && Object.entries(scenario.portal).map(([key, value], i) => (
                  <div key={i} className="flex flex-col gap-1.5 border-b border-info/5 pb-4 last:border-0 hover:bg-info/5 transition-colors rounded-xl p-3 -mx-2">
                    <span className="text-[9px] font-black text-info/60 uppercase tracking-[0.15em]">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm text-text-primary font-bold">
                      {value || <span className="opacity-30 italic text-xs">-- Not provided --</span>}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t-2 border-info/10">
                <div className="flex items-center gap-2 px-3 py-2 bg-info/10 rounded-xl border border-info/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-info animate-pulse"></div>
                  <span className="text-[10px] font-black text-info uppercase tracking-widest">Portal Sync Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Items */}
          <div className="card-elevated p-6 bg-white text-left">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xs font-black text-text-primary flex items-center gap-2 uppercase tracking-[0.2em]">
                <FolderOpen size={16} className="text-info" /> Evidence
              </h4>
              <div className="flex gap-2">
                {Array.from({ length: scenario.evidenceTokens }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`evidence-token scale-50 -m-2 ${i < tokensUsed ? 'spent' : ''}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              {scenario.evidence.map(ev => {
                const isRevealed = revealedEvidence.includes(ev.id);
                return (
                  <div key={ev.id} className="rounded-2xl overflow-hidden transition-all duration-300">
                    {isRevealed ? (
                      <motion.div 
                        initial={{ rotateY: 90 }}
                        animate={{ rotateY: 0 }}
                        className="p-5 bg-info/5 border-2 border-info/20 border-l-8 border-l-info shadow-sm"
                      >
                        <div className="text-[10px] text-info font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Check size={12} strokeWidth={4} /> {ev.label}
                        </div>
                        <p className="text-xs text-text-primary font-bold leading-relaxed">{ev.content}</p>
                      </motion.div>
                    ) : (
                      <button
                        onClick={() => revealEvidence(ev.id)}
                        disabled={tokensUsed >= scenario.evidenceTokens || showFeedback}
                        className="w-full p-5 bg-bg-muted text-left hover:bg-bg-muted/80 border-2 border-border transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                      >
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-white border-2 border-border flex items-center justify-center text-text-muted group-hover:text-info group-hover:border-info/30 transition-all shadow-sm">
                            <Lock size={18} />
                          </div>
                          <div>
                            <div className="text-xs font-black text-text-primary uppercase tracking-widest mb-1">{ev.label}</div>
                            <div className="text-[10px] text-text-muted font-bold">Spend 1 Evidence Token</div>
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk Meter */}
          <div className="card-elevated p-6 bg-white text-left">
            <h4 className="text-xs font-black text-text-primary mb-6 flex items-center gap-2 uppercase tracking-[0.2em]">
              <Gauge size={16} className={risk.color === 'green' ? 'text-success' : risk.color === 'yellow' ? 'text-warning' : 'text-error'} />
              Lab Risk Profile
            </h4>
            <div className="risk-meter-track h-4 mb-4 bg-bg-muted border-2 border-border overflow-hidden rounded-full">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(riskMeter, 100)}%` }}
                className={`risk-meter-fill h-full rounded-full transition-all duration-1000`}
                style={{ 
                  backgroundColor: `var(--color-${risk.color === 'green' ? 'success' : risk.color === 'yellow' ? 'warning' : 'error'})` 
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
              <span className="text-text-muted">{riskMeter}% Exposure</span>
              <span style={{ color: risk.color === 'green' ? '#58CC02' : risk.color === 'yellow' ? '#FFC800' : '#FF4B4B' }}>
                {risk.level}
              </span>
            </div>
          </div>

          {/* Back */}
          <button onClick={onBack} className="text-text-muted hover:text-text-primary transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 py-4 bg-bg-muted rounded-2xl border-2 border-border">
            <ArrowLeft size={16} /> Back to Hub
          </button>
        </div>
      </div>

      {/* Sticky Bottom Decision Bar (Issue #3 fix: Always visible controls) */}
      <div className="sticky bottom-4 z-[40] w-full">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="card-elevated p-6 bg-white/95 backdrop-blur-md border-2 border-primary/20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
        >
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
              {/* Risk Tags */}
              <div className="text-left">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-black text-text-primary flex items-center gap-2 uppercase tracking-widest">
                    <Tags size={14} className="text-primary" /> Identify Issues
                  </h4>
                  <span className="text-[9px] text-text-muted font-bold uppercase tracking-widest">
                    Step 1: Select all applicable risk factors
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {riskTags.map(tag => {
                    const IconComponent = getIcon(tag.icon);
                    return (
                      <button
                        key={tag.id}
                        onClick={() => !showFeedback && toggleRisk(tag.id)}
                        className={`risk-tag text-[11px] py-1.5 px-3 ${selectedRisks.includes(tag.id) ? 'selected' : ''}`}
                        disabled={showFeedback || reviewMode}
                      >
                        {IconComponent && <IconComponent size={12} className="mr-1.5" />}
                        {tag.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Binary Decisions */}
              <div className="text-left flex flex-col gap-3">
                <h4 className="text-[10px] font-black text-text-primary flex items-center gap-2 uppercase tracking-widest">
                  <Gavel size={14} className="text-primary" /> Step 2: Policy Decision
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => !showFeedback && setDecision('proceed')} 
                    className={`btn-proceed py-3 px-4 ${decision === 'proceed' ? 'active' : 'opacity-60'} flex items-center gap-3 rounded-xl`} 
                    disabled={showFeedback || reviewMode}
                  >
                    <CheckCircle size={20} />
                    <div className="text-left">
                      <div className="text-sm font-black leading-none mb-0.5">Proceed</div>
                      <div className="text-[9px] font-bold opacity-70 uppercase tracking-widest">Eligible</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => !showFeedback && setDecision('reject')} 
                    className={`btn-reject py-3 px-4 ${decision === 'reject' ? 'active' : 'opacity-60'} flex items-center gap-3 rounded-xl`} 
                    disabled={showFeedback || reviewMode}
                  >
                    <XCircle size={20} />
                    <div className="text-left">
                      <div className="text-sm font-black leading-none mb-0.5">Reject</div>
                      <div className="text-[9px] font-bold opacity-70 uppercase tracking-widest">Policy Mismatch</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Justification (Only for final audit) */}
            {gameId === 'audit-final' && (
              <div className="text-left">
                <textarea
                  value={justification}
                  onChange={e => setJustification(e.target.value)}
                  placeholder={reviewMode ? "Review mode enabled." : "Briefly explain the policy application for this case..."}
                  className="w-full bg-bg-muted border-2 border-border rounded-xl p-3 text-xs text-text-primary font-bold placeholder:text-text-muted focus:outline-none focus:border-primary/50 resize-none h-16 transition-all"
                  disabled={showFeedback || reviewMode}
                />
              </div>
            )}

            {/* Submit */}
            <button
              onClick={() => handleSubmit()}
              disabled={!decision || showFeedback || (gameId === 'audit-final' && !justification.trim()) || reviewMode}
              className={`btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 shadow-lg ${reviewMode ? 'opacity-80' : ''}`}
            >
              {reviewMode ? <Check size={20} className="mr-2" /> : <Lock size={20} className="mr-2" />}
              {reviewMode ? 'Case Verified (Review Mode)' : 'Lock Decision & Verify Case'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

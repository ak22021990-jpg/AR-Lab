import { useState } from 'react';
import { riskTags } from '../data/audit';
import { scoreAuditScenario, getRiskLevel } from '../utils/scoring';

export default function AuditGame({ scenarios, onComplete, onBack }) {
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

  const scenario = scenarios[currentIndex];
  const risk = getRiskLevel(riskMeter);

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

  const handleSubmit = () => {
    if (!decision || !justification.trim()) return;

    const result = scoreAuditScenario({
      userDecision: decision,
      correctDecision: scenario.correctDecision,
      userRisks: selectedRisks,
      correctRisks: scenario.correctRisks,
      justification,
      strongKeywords: scenario.strongJustificationKeywords,
    });

    const newResult = {
      scenarioId: scenario.id,
      userDecision: decision,
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
      const allResults = [...results, latestResult];
      const finalScore = totalScore;
      const finalRisk = riskMeter;
      setFinished(true);
      onComplete(allResults, finalScore, finalRisk);
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
    }
  };

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

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      {/* Feedback Modal */}
      {showFeedback && feedbackData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up">
          <div className="glass-card-elevated p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-outfit font-bold mb-6 text-center">
              <i className="fa-solid fa-file-shield text-amz-orange mr-2"></i>Case Debrief
            </h3>

            {/* Decision comparison */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl p-4 text-center border" style={{
                background: decision === scenario.correctDecision ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                borderColor: decision === scenario.correctDecision ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)',
              }}>
                <div className="text-xs text-gray-500 mb-1">Your Decision</div>
                <div className="font-outfit font-bold capitalize">{decision}</div>
              </div>
              <div className="rounded-xl p-4 text-center bg-risk-green/5 border border-risk-green/20">
                <div className="text-xs text-gray-500 mb-1">Correct</div>
                <div className="font-outfit font-bold capitalize text-risk-green">{scenario.correctDecision}</div>
              </div>
            </div>

            {/* Risk tags comparison */}
            <div className="mb-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">Risk Tags</div>
              <div className="flex flex-wrap gap-2">
                {riskTags.map(tag => {
                  const isCorrect = scenario.correctRisks.includes(tag.id);
                  const isSelected = selectedRisks.includes(tag.id);
                  let style = 'bg-white/3 border-white/10 text-gray-500';
                  if (isCorrect && isSelected) style = 'bg-risk-green/10 border-risk-green/40 text-risk-green';
                  else if (isCorrect && !isSelected) style = 'bg-risk-red/10 border-risk-red/40 text-risk-red';
                  else if (!isCorrect && isSelected) style = 'bg-risk-yellow/10 border-risk-yellow/40 text-risk-yellow';

                  return (
                    <span key={tag.id} className={`px-3 py-1 rounded-lg text-xs font-semibold border ${style}`}>
                      {tag.label}
                      {isCorrect && isSelected && ' ✓'}
                      {isCorrect && !isSelected && ' (missed)'}
                      {!isCorrect && isSelected && ' (wrong)'}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Score breakdown */}
            <div className="mb-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">Score Breakdown</div>
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

            {/* Misleading clue */}
            <div className="mb-6 rounded-xl p-4 bg-amz-orange/5 border border-amz-orange/20">
              <div className="text-xs text-amz-orange uppercase tracking-wider mb-1 font-semibold">
                <i className="fa-solid fa-lightbulb mr-1"></i> Misleading Clue
              </div>
              <p className="text-sm text-gray-300">{scenario.misleadingClue}</p>
            </div>

            {/* Rule */}
            <div className="mb-8 rounded-xl p-4 bg-cyber-cyan/5 border border-cyber-cyan/20">
              <div className="text-xs text-cyber-cyan uppercase tracking-wider mb-1 font-semibold">
                <i className="fa-solid fa-scale-balanced mr-1"></i> Rule Applied
              </div>
              <p className="text-sm text-gray-300">{scenario.ruleApplied}</p>
            </div>

            <button onClick={handleNext} className="btn-primary w-full">
              <i className="fa-solid fa-forward-step"></i>
              {currentIndex >= scenarios.length - 1 ? 'View Final Report' : 'Next Case'}
            </button>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left: Candidate Data */}
        <div className="glass-card-elevated p-6">
          {/* Alert banner */}
          <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl bg-amz-orange/5 border border-amz-orange/20">
            <i className="fa-solid fa-bell text-amz-orange animate-pulse"></i>
            <div>
              <div className="text-xs text-amz-orange uppercase tracking-wider font-semibold">{scenario.alert}</div>
              <div className="font-outfit font-bold">{scenario.title}</div>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-lg text-xs font-bold uppercase ${
              scenario.difficulty === 'easy' ? 'bg-risk-green/10 text-risk-green border border-risk-green/30' :
              scenario.difficulty === 'medium' ? 'bg-risk-yellow/10 text-risk-yellow border border-risk-yellow/30' :
              'bg-risk-red/10 text-risk-red border border-risk-red/30'
            }`}>
              {scenario.difficulty}
            </span>
          </div>

          {/* Data panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl p-5 bg-white/[0.02] border border-white/5">
              <h4 className="text-sm font-outfit font-bold text-amz-orange mb-3 flex items-center gap-2">
                <i className="fa-solid fa-file-lines"></i> Resume Data
              </h4>
              <ul className="flex flex-col gap-2">
                {scenario.visibleData.resume.map((item, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <i className="fa-solid fa-chevron-right text-[8px] text-amz-orange/50 mt-1.5"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-5 bg-white/[0.02] border border-white/5">
              <h4 className="text-sm font-outfit font-bold text-cyber-cyan mb-3 flex items-center gap-2">
                <i className="fa-solid fa-desktop"></i> Portal Data
              </h4>
              <ul className="flex flex-col gap-2">
                {scenario.visibleData.portal.map((item, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <i className="fa-solid fa-chevron-right text-[8px] text-cyber-cyan/50 mt-1.5"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Risk Tags */}
          <div className="mb-6">
            <h4 className="text-sm font-outfit font-bold mb-3 flex items-center gap-2">
              <i className="fa-solid fa-tags text-amz-orange"></i> Tag Risks
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

          {/* Decision */}
          <div className="mb-6">
            <h4 className="text-sm font-outfit font-bold mb-3 flex items-center gap-2">
              <i className="fa-solid fa-gavel text-amz-orange"></i> Decision
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => !showFeedback && setDecision('proceed')} className={`btn-proceed ${decision === 'proceed' ? 'active' : ''}`} disabled={showFeedback}>
                <i className="fa-solid fa-circle-check"></i> Proceed
              </button>
              <button onClick={() => !showFeedback && setDecision('reject')} className={`btn-reject ${decision === 'reject' ? 'active' : ''}`} disabled={showFeedback}>
                <i className="fa-solid fa-circle-xmark"></i> Reject
              </button>
              <button onClick={() => !showFeedback && setDecision('escalate')} className={`btn-escalate ${decision === 'escalate' ? 'active' : ''}`} disabled={showFeedback}>
                <i className="fa-solid fa-arrow-up-right-from-square"></i> Escalate
              </button>
            </div>
          </div>

          {/* Justification */}
          <div className="mb-6">
            <h4 className="text-sm font-outfit font-bold mb-3 flex items-center gap-2">
              <i className="fa-solid fa-pen-to-square text-amz-orange"></i> Justification
            </h4>
            <textarea
              value={justification}
              onChange={e => setJustification(e.target.value)}
              placeholder="Explain your decision — reference specific data points and risks..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-amz-orange/50 resize-none h-24 transition-colors"
              disabled={showFeedback}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!decision || !justification.trim() || showFeedback}
            className="btn-primary w-full"
          >
            <i className="fa-solid fa-lock"></i> Lock Decision
          </button>
        </div>

        {/* Right: Evidence Panel */}
        <div className="flex flex-col gap-4">
          {/* Evidence Tokens */}
          <div className="glass-card-elevated p-5">
            <h4 className="text-sm font-outfit font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-key text-cyber-cyan"></i> Evidence Tokens
            </h4>
            <div className="flex gap-2 mb-4">
              {Array.from({ length: scenario.evidenceTokens }).map((_, i) => (
                <div key={i} className={`evidence-token ${i < tokensUsed ? 'spent' : ''}`}>
                  {i < tokensUsed ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-magnifying-glass"></i>}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              {scenario.evidenceTokens - tokensUsed} of {scenario.evidenceTokens} tokens remaining
            </p>
          </div>

          {/* Evidence Items */}
          <div className="glass-card-elevated p-5">
            <h4 className="text-sm font-outfit font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-folder-open text-cyber-cyan"></i> Evidence Files
            </h4>
            <div className="flex flex-col gap-3">
              {scenario.evidence.map(ev => {
                const isRevealed = revealedEvidence.includes(ev.id);
                return (
                  <div key={ev.id} className="rounded-xl border border-white/5 overflow-hidden">
                    {isRevealed ? (
                      <div className="p-4 bg-cyber-cyan/5 border-l-2 border-l-cyber-cyan animate-fade-in-up">
                        <div className="text-xs text-cyber-cyan font-semibold mb-1">{ev.label}</div>
                        <p className="text-sm text-gray-300">{ev.content}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => revealEvidence(ev.id)}
                        disabled={tokensUsed >= scenario.evidenceTokens || showFeedback}
                        className="w-full p-4 bg-white/[0.02] text-left hover:bg-white/[0.04] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center gap-3">
                          <i className="fa-solid fa-lock text-gray-600"></i>
                          <div>
                            <div className="text-sm font-semibold text-gray-400">{ev.label}</div>
                            <div className="text-xs text-gray-600">Click to reveal (costs 1 token)</div>
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
          <div className="glass-card-elevated p-5">
            <h4 className="text-sm font-outfit font-bold mb-3 flex items-center gap-2">
              <i className="fa-solid fa-gauge-high" style={{ color: risk.color === 'green' ? '#22c55e' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444' }}></i>
              Audit Risk Meter
            </h4>
            <div className="risk-meter-track mb-2">
              <div className={`risk-meter-fill ${risk.color}`} style={{ width: `${Math.min(riskMeter, 100)}%` }}></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">{riskMeter}%</span>
              <span style={{ color: risk.color === 'green' ? '#22c55e' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444' }}>
                {risk.emoji} {risk.level}
              </span>
            </div>
          </div>

          {/* Back */}
          <button onClick={onBack} className="text-gray-500 hover:text-gray-300 transition-colors text-sm flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Exit Audit
          </button>
        </div>
      </div>
    </div>
  );
}

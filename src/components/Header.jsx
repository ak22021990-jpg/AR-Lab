import { getRiskLevel } from '../utils/scoring';

export default function Header({ score, riskMeter, currentScenario, totalScenarios, screen }) {
  const risk = getRiskLevel(riskMeter);

  return (
    <header className="sticky top-0 z-50 glass-card-elevated px-6 py-4 mx-4 mt-4 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amz-orange/10 border border-amz-orange/30 flex items-center justify-center">
            <i className="fa-solid fa-shield-virus text-amz-orange text-lg"></i>
          </div>
          <div>
            <h1 className="text-lg font-outfit font-bold leading-tight">
              Academic Risk <span className="text-amz-orange">Lab</span>
            </h1>
            <p className="text-xs text-gray-500 font-mono">BREACH PREVENTION</p>
          </div>
        </div>

        {/* Stats */}
        {screen !== 'hero' && (
          <div className="flex flex-wrap justify-center gap-3">
            <div className="stat-badge">
              <i className="fa-solid fa-star text-amz-orange"></i>
              <span>{score} pts</span>
            </div>

            {screen === 'audit' && currentScenario !== null && (
              <div className="stat-badge">
                <i className="fa-solid fa-folder-open text-cyber-cyan"></i>
                <span>Case {currentScenario + 1}/{totalScenarios}</span>
              </div>
            )}

            {/* Risk Meter Mini */}
            <div className="stat-badge min-w-[160px]">
              <i className={`fa-solid fa-gauge-high`} style={{ color: risk.color === 'green' ? '#22c55e' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444' }}></i>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span>Risk</span>
                  <span style={{ color: risk.color === 'green' ? '#22c55e' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444' }}>
                    {risk.level}
                  </span>
                </div>
                <div className="risk-meter-track h-1.5">
                  <div
                    className={`risk-meter-fill ${risk.color}`}
                    style={{ width: `${Math.min(riskMeter, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

import { getRiskLevel } from '../utils/scoring';

export default function Header({ score, riskMeter, currentScenario, totalScenarios, screen, activeRole }) {
  const risk = getRiskLevel(riskMeter);

  return (
    <header className="sticky top-0 z-50 glass-card-elevated px-6 py-4 mx-4 mt-4 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand & Role Context */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amz-orange/20 to-amz-orange/5 border border-amz-orange/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <i className="fa-solid fa-graduation-cap text-amz-orange text-xl shadow-glow-orange"></i>
            </div>
            <div>
              <h1 className="text-xl font-outfit font-black leading-none mb-1">
                AMZ<span className="text-amz-orange">3</span> <span className="text-gray-300 font-medium">Lab</span>
              </h1>
              <p className="text-[9px] text-slate-500 font-mono tracking-widest uppercase font-bold">Academic Risk Intelligence</p>
            </div>
          </div>

          {activeRole && (
            <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-white/10 animate-fade-in-right">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Screening for:</div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                activeRole === 'sde' 
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' 
                  : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
              }`}>
                <i className={`fa-solid ${activeRole === 'sde' ? 'fa-code' : 'fa-warehouse'} mr-1.5`}></i>
                {activeRole === 'sde' ? 'Software Development Engineer' : 'Warehouse Manager'}
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {screen !== 'hero' && (
          <div className="flex flex-wrap justify-center gap-4">
            <div className="stat-badge bg-white/5 border-white/10 px-4 group hover:border-amz-orange/30 transition-colors">
              <i className="fa-solid fa-bolt text-amz-orange group-hover:animate-pulse"></i>
              <span className="font-mono text-white text-sm">{score} <span className="text-[10px] text-slate-500">XP</span></span>
            </div>

            {currentScenario !== null && (
              <div className="stat-badge bg-white/5 border-white/10 px-4">
                <i className="fa-solid fa-layer-group text-cyber-cyan"></i>
                <span className="font-mono text-white text-sm">Module {currentScenario + 1}/{totalScenarios}</span>
              </div>
            )}

            {/* Risk Meter Mini */}
            <div className="stat-badge min-w-[200px] bg-white/5 border-white/10 px-5 py-2">
              <i className={`fa-solid fa-gauge-high text-sm`} style={{ color: risk.color === 'green' ? '#22c55e' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444' }}></i>
              <div className="flex-1 ml-3">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-1.5">
                  <span className="text-slate-500">Risk Exposure</span>
                  <span style={{ color: risk.color === 'green' ? '#22c55e' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444' }}>
                    {risk.level}
                  </span>
                </div>
                <div className="risk-meter-track h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`risk-meter-fill h-full transition-all duration-1000 ${risk.color}`}
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

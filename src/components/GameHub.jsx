import Mascot from './Mascot';

export default function GameHub({ games, completedGames, onSelectGame, onStartAudit, auditUnlocked, auditCompleted }) {
  const completedCount = Object.keys(completedGames).length;
  const isAllComplete = completedCount >= games.length;

  return (
    <section className="max-w-5xl mx-auto animate-slide-up-bounce">
      {/* Mascot Celebration (only when all labs are done) */}
      {isAllComplete && !auditCompleted && (
        <div className="flex justify-center mb-8 animate-bounce-slow">
           <Mascot 
             state="excited" 
             message="Boom! All labs cleared. You're ready for the Final Audit Challenge!" 
             size="lg"
             position="top"
           />
        </div>
      )}

      {/* Section header */}
      <div className="text-center mb-12 relative">
        <h2 className="text-4xl font-outfit font-black mb-3">
          <i className="fa-solid fa-map-location-dot text-amz-orange mr-3"></i>
          Training Labs
        </h2>
        <p className="text-gray-400 font-medium max-w-lg mx-auto leading-relaxed">
          Complete all 5 specialized labs to earn your certification and unlock the 
          <span className="text-amz-orange font-bold ml-1">Education Audit Challenge</span>
        </p>
        
        {/* Progress Section */}
        <div className="max-w-md mx-auto mt-8 p-6 glass-card border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-amz-orange/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
            <span>Certification Path</span>
            <span className={isAllComplete ? 'text-risk-green' : 'text-amz-orange'}>
              {isAllComplete ? 'Labs Complete!' : `${Math.round((completedCount / games.length) * 100)}%`}
            </span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className={`h-full transition-all duration-1000 ease-out shadow-lg ${isAllComplete ? 'bg-risk-green shadow-risk-green/20' : 'bg-amz-orange shadow-amz-orange/20'}`}
              style={{ width: `${(completedCount / games.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-center gap-3 mt-5">
            {games.map((g) => (
              <div
                key={g.id}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  completedGames[g.id] 
                    ? 'bg-risk-green shadow-[0_0_10px_rgba(34,197,94,0.5)] scale-110' 
                    : 'bg-white/10 border border-white/5'
                }`}
                title={g.title}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {games.map((game, i) => {
          const isCompleted = !!completedGames[game.id];
          const result = completedGames[game.id];

          return (
            <div
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className={`game-card group ${isCompleted ? 'completed border-risk-green/20' : ''} animate-slide-up-bounce hover:scale-[1.02] transition-all duration-300`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Completion indicator */}
              {isCompleted && (
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-risk-green/10 border border-risk-green/30 flex items-center justify-center shadow-lg z-10 animate-scale-in">
                  <i className="fa-solid fa-check text-risk-green text-sm"></i>
                </div>
              )}

              {/* Illustration and Icon */}
              <div className="relative mb-6">
                <div 
                  className="w-full h-40 rounded-2xl bg-white/5 border border-white/10 mb-4 overflow-hidden relative shadow-inner"
                >
                  <img 
                    src={game.illustration} 
                    alt={game.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lab-base via-lab-base/40 to-transparent"></div>
                  
                  {/* Status Overlay */}
                  {!isCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-amz-orange/10 backdrop-blur-[2px]">
                       <div className="px-4 py-2 rounded-full bg-white text-amz-orange font-black text-[10px] uppercase tracking-widest shadow-2xl">
                          Launch Lab
                       </div>
                    </div>
                  )}
                </div>

                <div
                  className="absolute -bottom-2 left-6 w-14 h-14 rounded-2xl flex items-center justify-center border shadow-2xl transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500"
                  style={{
                    background: `${game.color}25`,
                    borderColor: `${game.color}50`,
                    backdropFilter: 'blur(8px)',
                    boxShadow: `0 10px 20px -5px ${game.color}30`
                  }}
                >
                  <i className={`fa-solid ${game.icon} text-2xl`} style={{ color: game.color }}></i>
                </div>
              </div>

              {/* Content */}
              <div className="px-2">
                <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mb-1.5 font-mono">
                  {game.badge}
                </div>
                <h3 className="text-2xl font-outfit font-black mb-2 group-hover:text-amz-orange transition-colors">{game.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4">{game.description}</p>

                {/* Score */}
                {isCompleted && result && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-risk-green shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                      <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Lab Score</span>
                    </div>
                    <span className="text-base font-outfit font-black text-risk-green">{result.score}<span className="text-[10px] text-gray-500 ml-1">/ {result.total * 10}</span></span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Challenge Card */}
      <div
        onClick={auditUnlocked ? onStartAudit : undefined}
        className={`game-card ${auditUnlocked ? '' : 'locked'} ${auditCompleted ? 'completed' : ''} p-8 text-center`}
      >
        {/* Illustration and Icon */}
        <div className="relative mb-8 group max-w-md mx-auto">
          <div className="w-full h-48 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative">
            <img 
              src="/assets/illustrations/education-audit.png"
              alt="Final Challenge"
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lab-base/90 to-transparent"></div>
          </div>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl bg-amz-orange/10 border border-amz-orange/30 flex items-center justify-center shadow-2xl backdrop-blur-md">
            <i className={`fa-solid ${auditUnlocked ? 'fa-shield-halved' : 'fa-lock'} text-4xl text-amz-orange`}></i>
          </div>
        </div>
        <div className="text-xs text-amz-orange uppercase tracking-widest font-semibold mb-1 font-mono">
          Final Challenge
        </div>
        <h3 className="text-2xl font-outfit font-bold mb-2">Education Audit Challenge</h3>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          {auditUnlocked
            ? '5 candidate profiles. Full investigation. Evidence tokens. Risk tagging. Justify every decision.'
            : `Complete all 5 training labs to unlock (${completedCount}/5)`}
        </p>
        {auditUnlocked && !auditCompleted && (
          <button className="btn-primary mt-6" onClick={(e) => { e.stopPropagation(); onStartAudit(); }}>
            <i className="fa-solid fa-play"></i> Launch Audit
          </button>
        )}
      </div>
    </section>
  );
}

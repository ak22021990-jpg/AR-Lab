export default function GameHub({ games, completedGames, onSelectGame, onStartAudit, auditUnlocked, auditCompleted }) {
  const completedCount = Object.keys(completedGames).length;

  return (
    <section className="max-w-5xl mx-auto animate-fade-in-up">
      {/* Section header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-outfit font-bold mb-2">
          <i className="fa-solid fa-map-location-dot text-amz-orange mr-2"></i>
          Training Labs
        </h2>
        <p className="text-gray-400">
          Complete all 5 labs to unlock the <span className="text-amz-orange font-semibold">Education Audit Challenge</span>
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {games.map((g) => (
            <div
              key={g.id}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                completedGames[g.id] ? 'bg-risk-green shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-white/10'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {games.map((game, i) => {
          const isCompleted = !!completedGames[game.id];
          const result = completedGames[game.id];

          return (
            <div
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className={`game-card ${isCompleted ? 'completed' : ''} animate-fade-in-up`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Completion indicator */}
              {isCompleted && (
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-risk-green/20 border border-risk-green flex items-center justify-center">
                  <i className="fa-solid fa-check text-risk-green text-sm"></i>
                </div>
              )}

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border"
                style={{
                  background: `${game.color}10`,
                  borderColor: `${game.color}30`,
                }}
              >
                <i className={`fa-solid ${game.icon} text-2xl`} style={{ color: game.color }}></i>
              </div>

              {/* Content */}
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1 font-mono">
                {game.badge}
              </div>
              <h3 className="text-xl font-outfit font-bold mb-2">{game.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{game.description}</p>

              {/* Score */}
              {isCompleted && result && (
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Score</span>
                  <span className="text-sm font-bold text-risk-green">{result.score}/{result.total * 10}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Challenge Card */}
      <div
        onClick={auditUnlocked ? onStartAudit : undefined}
        className={`game-card ${auditUnlocked ? '' : 'locked'} ${auditCompleted ? 'completed' : ''} p-8 text-center`}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-amz-orange/10 border border-amz-orange/30 flex items-center justify-center">
            <i className={`fa-solid ${auditUnlocked ? 'fa-shield-halved' : 'fa-lock'} text-3xl text-amz-orange`}></i>
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

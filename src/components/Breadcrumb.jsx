import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { miniGames } from '../data/games';

export default function Breadcrumb({ screen, activeGame, currentScenario, totalScenarios, onBackToHub }) {
  if (screen === 'hero' || screen === 'hub') return null;

  let labText = '';
  if (screen === 'game' && activeGame) {
    const labIndex = miniGames.findIndex(g => g.id === activeGame.id) + 1;
    labText = `Lab ${labIndex}: ${activeGame.title}`;
  } else if (screen === 'audit') {
    labText = 'Final Audit';
  } else if (screen === 'results') {
    labText = 'Results';
  }

  return (
    <div className="bg-bg-surface border-b border-border px-6 py-2 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-text-muted">
      <button 
        onClick={onBackToHub}
        className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
      >
        <Home size={14} />
        <span>Hub</span>
      </button>

      {labText && (
        <>
          <ChevronRight size={14} className="opacity-50" />
          <span className={screen === 'results' ? 'text-text-primary' : ''}>
            {labText}
          </span>
        </>
      )}

      {(screen === 'game' || screen === 'audit') && currentScenario !== null && (
        <>
          <ChevronRight size={14} className="opacity-50" />
          <span className="text-primary">
            Case {currentScenario + 1} of {totalScenarios}
          </span>
        </>
      )}
    </div>
  );
}

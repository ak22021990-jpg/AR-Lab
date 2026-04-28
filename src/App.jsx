import { useState } from 'react';
import confetti from 'canvas-confetti';
import 'animate.css';

import Header from './components/Header';
import Hero from './components/Hero';
import GameHub from './components/GameHub';
import AuditGame from './components/AuditGame';
import Results from './components/Results';

import { miniGames } from './data/games';
import { auditScenarios } from './data/audit';

export default function App() {
  const [screen, setScreen] = useState('hero');
  const [activeGameId, setActiveGameId] = useState(null);
  const [completedGames, setCompletedGames] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [riskMeter, setRiskMeter] = useState(0);
  const [auditResults, setAuditResults] = useState([]);
  const [auditScore, setAuditScore] = useState(0);
  const [auditCompleted, setAuditCompleted] = useState(false);

  const auditUnlocked = Object.keys(completedGames).length >= miniGames.length;
  const activeGame = miniGames.find(g => g.id === activeGameId);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FF9900', '#00d4ff', '#22c55e', '#FFFFFF'],
    });
  };

  const handleStart = () => setScreen('hub');

  const handleSelectGame = (id) => {
    setActiveGameId(id);
    setScreen('game');
  };

  const handleMiniGameComplete = (results, score, risk) => {
    if (activeGameId) {
      setCompletedGames(prev => ({
        ...prev,
        [activeGameId]: { score, total: results.length },
      }));
      setTotalScore(prev => prev + score);
      if (score > 0) triggerConfetti();
    }
  };

  const handleBackToHub = () => {
    setActiveGameId(null);
    setScreen('hub');
  };

  const handleStartAudit = () => {
    setScreen('audit');
  };

  const handleAuditComplete = (results, score, risk) => {
    setAuditResults(results);
    setAuditScore(score);
    setRiskMeter(risk);
    setAuditCompleted(true);
    setTotalScore(prev => prev + score);
    if (score > 0) triggerConfetti();
    setTimeout(() => setScreen('results'), 500);
  };

  const handleRestart = () => {
    setScreen('hero');
    setActiveGameId(null);
    setCompletedGames({});
    setTotalScore(0);
    setRiskMeter(0);
    setAuditResults([]);
    setAuditScore(0);
    setAuditCompleted(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        score={totalScore}
        riskMeter={riskMeter}
        currentScenario={null}
        totalScenarios={auditScenarios.length}
        screen={screen}
      />

      <main className="flex-1 p-4 md:p-8">
        {screen === 'hero' && <Hero onStart={handleStart} />}

        {screen === 'hub' && (
          <GameHub
            games={miniGames}
            completedGames={completedGames}
            onSelectGame={handleSelectGame}
            onStartAudit={handleStartAudit}
            auditUnlocked={auditUnlocked}
            auditCompleted={auditCompleted}
          />
        )}

        {screen === 'game' && activeGame && (
          <AuditGame
            key={activeGameId}
            scenarios={activeGame.scenarios}
            onComplete={handleMiniGameComplete}
            onBack={handleBackToHub}
          />
        )}

        {screen === 'audit' && (
          <AuditGame
            key="audit-final"
            scenarios={auditScenarios}
            onComplete={handleAuditComplete}
            onBack={handleBackToHub}
          />
        )}

        {screen === 'results' && (
          <Results
            miniGameResults={completedGames}
            auditResults={auditResults}
            auditScore={auditScore}
            riskMeter={riskMeter}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}

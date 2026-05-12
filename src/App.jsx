import { useState } from 'react';
import confetti from 'canvas-confetti';
import 'animate.css';

import Header from './components/Header';
import Hero from './components/Hero';
import GameHub from './components/GameHub';
import MiniGame from './components/MiniGame';
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

  const [activeRole, setActiveRole] = useState(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(null);

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

  const handleScenarioChange = (index, scenario) => {
    setCurrentScenarioIndex(index);
    if (scenario && scenario.targetRole) {
      setActiveRole(scenario.targetRole);
    }
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
    setActiveRole(null);
    setCurrentScenarioIndex(null);
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
    setActiveRole(null);
    setCurrentScenarioIndex(null);
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
    setActiveRole(null);
    setCurrentScenarioIndex(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        score={totalScore}
        riskMeter={riskMeter}
        currentScenario={currentScenarioIndex}
        totalScenarios={
          screen === 'audit' 
            ? auditScenarios.length 
            : (screen === 'game' && activeGame) 
              ? (activeGame.format === 'mcq' ? 5 : activeGame.scenarios.length)
              : 0
        }
        screen={screen}
        activeRole={activeRole}
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
          activeGame.format === 'mcq' ? (
            <MiniGame
              key={activeGameId}
              game={activeGame}
              onComplete={handleMiniGameComplete}
              onBack={handleBackToHub}
              onScenarioChange={handleScenarioChange}
            />
          ) : (
            <AuditGame
              key={activeGameId}
              gameId={activeGameId}
              scenarios={activeGame.scenarios}
              onComplete={handleMiniGameComplete}
              onBack={handleBackToHub}
              onScenarioChange={handleScenarioChange}
            />
          )
        )}

        {screen === 'audit' && (
          <AuditGame
            key="audit-final"
            gameId="audit-final"
            scenarios={auditScenarios}
            onComplete={handleAuditComplete}
            onBack={handleBackToHub}
            onScenarioChange={handleScenarioChange}
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

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Hero from './components/Hero';
import GameHub from './components/GameHub';
import MiniGame from './components/MiniGame';
import AuditGame from './components/AuditGame';
import Results from './components/Results';
import Breadcrumb from './components/Breadcrumb';
import MotionWrapper from './components/ui/MotionWrapper';

import { miniGames } from './data/games';
import { auditScenarios } from './data/audit';
import { triggerConfetti } from './utils/confetti';

export default function App() {
  const [screen, setScreen] = useState('hero');
  const [reviewMode, setReviewMode] = useState(false);
  const [completedGames, setCompletedGames] = useState({});
  const [activeGameId, setActiveGameId] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [riskMeter, setRiskMeter] = useState(0);
  const [activeRole, setActiveRole] = useState(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(null);
  const [auditResults, setAuditResults] = useState([]);
  const [auditScore, setAuditScore] = useState(0);
  const [auditCompleted, setAuditCompleted] = useState(false);

  const auditUnlocked = Object.keys(completedGames).length >= miniGames.length;
  const activeGame = miniGames.find(g => g.id === activeGameId);

  const getMascotState = () => {
    if (screen === 'results') return auditScore > 100 ? 'excited' : 'happy';
    if (screen === 'audit' || screen === 'game') {
      if (riskMeter > 70) return 'concerned';
      return 'thinking';
    }
    if (screen === 'hub') return 'happy';
    return 'neutral';
  };

  const handleStart = () => setScreen('hub');

  const handleSelectGame = (id, isReview = false) => {
    setActiveGameId(id);
    setReviewMode(isReview);
    setScreen('game');
  };

  const handleScenarioChange = (index, scenario) => {
    setCurrentScenarioIndex(index);
    if (scenario && scenario.targetRole) {
      setActiveRole(scenario.targetRole);
    }
  };

  const handleMiniGameComplete = (results, score, risk) => {
    if (activeGameId && !reviewMode) {
      setCompletedGames(prev => ({
        ...prev,
        [activeGameId]: { score, total: results.length },
      }));
      setTotalScore(prev => prev + score);
      if (score >= results.length * 10) {
        triggerConfetti('perfect');
      } else if (score > 0) {
        triggerConfetti('default');
      }
    }
  };

  const handleBackToHub = () => {
    setActiveGameId(null);
    setScreen('hub');
    setActiveRole(null);
    setCurrentScenarioIndex(null);
    setReviewMode(false);
  };

  const handleStartAudit = (isReview = false) => {
    setReviewMode(isReview);
    setScreen('audit');
  };

  const handleAuditComplete = (results, score, risk) => {
    if (!reviewMode) {
      setAuditResults(results);
      setAuditScore(score);
      setRiskMeter(risk);
      setAuditCompleted(true);
      setTotalScore(prev => prev + score);
      if (score >= 100) {
        triggerConfetti('perfect');
      } else if (score > 0) {
        triggerConfetti('default');
      }
    }
    setActiveRole(null);
    setCurrentScenarioIndex(null);
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
    setReviewMode(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
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
        mascotState={getMascotState()}
      />

      <Breadcrumb 
        screen={screen}
        activeGame={activeGame}
        currentScenario={currentScenarioIndex}
        totalScenarios={
          screen === 'audit' 
            ? auditScenarios.length 
            : (screen === 'game' && activeGame) 
              ? (activeGame.format === 'mcq' ? 5 : activeGame.scenarios.length)
              : 0
        }
        onBackToHub={handleBackToHub}
      />

      <main className="flex-1 p-4 md:p-8">
        <AnimatePresence mode="wait">
          {screen === 'hero' && (
            <MotionWrapper key="hero">
              <Hero onStart={handleStart} />
            </MotionWrapper>
          )}

          {screen === 'hub' && (
            <MotionWrapper key="hub">
              <GameHub
                games={miniGames}
                completedGames={completedGames}
                onSelectGame={handleSelectGame}
                onStartAudit={handleStartAudit}
                auditUnlocked={auditUnlocked}
                auditCompleted={auditCompleted}
              />
            </MotionWrapper>
          )}

          {screen === 'game' && activeGame && (
            <MotionWrapper key={activeGameId}>
              {activeGame.format === 'mcq' ? (
                <MiniGame
                  game={activeGame}
                  onComplete={handleMiniGameComplete}
                  onBack={handleBackToHub}
                  onScenarioChange={handleScenarioChange}
                  reviewMode={reviewMode}
                />
              ) : (
                <AuditGame
                  gameId={activeGameId}
                  scenarios={activeGame.scenarios}
                  onComplete={handleMiniGameComplete}
                  onBack={handleBackToHub}
                  onScenarioChange={handleScenarioChange}
                  reviewMode={reviewMode}
                />
              )}
            </MotionWrapper>
          )}

          {screen === 'audit' && (
            <MotionWrapper key="audit-final">
              <AuditGame
                gameId="audit-final"
                scenarios={auditScenarios}
                onComplete={handleAuditComplete}
                onBack={handleBackToHub}
                onScenarioChange={handleScenarioChange}
                reviewMode={reviewMode}
              />
            </MotionWrapper>
          )}

          {screen === 'results' && (
            <MotionWrapper key="results">
              <Results
                miniGameResults={completedGames}
                auditResults={auditResults}
                auditScore={auditScore}
                riskMeter={riskMeter}
                onRestart={handleRestart}
                onReview={() => handleStartAudit(true)}
              />
            </MotionWrapper>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

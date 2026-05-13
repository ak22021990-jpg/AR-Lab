import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  Flame, 
  ShieldCheck, 
  AlertCircle, 
  ChevronRight,
  Check,
  X,
  Lock
} from 'lucide-react';
import ContextCard from './ContextCard';
import ProgressiveTimer from './ProgressiveTimer';
import { contextCards } from '../data/contextCards';
import RoleBadge from './RoleBadge';
import { playSuccessChime, playErrorTone, playStreakSound, playLevelComplete } from '../utils/audio';

export default function MiniGame({ game, onComplete, onBack, onScenarioChange, reviewMode = false }) {
  const [items] = useState(() => {
    const shuffled = [...game.items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (onScenarioChange) {
      onScenarioChange(currentIndex, items[currentIndex]);
    }
  }, [currentIndex, onScenarioChange, items]);
  
  const [showContext, setShowContext] = useState(true);
  const [timerActive, setTimerActive] = useState(false);

  const current = items[currentIndex];
  const cardData = contextCards[game.id];

  const getInitialDuration = () => {
    if (game.id === 'eligibility-basics') return 60;
    if (game.id === 'degree-detective') return 80;
    if (game.id === 'graduation-gate') return 90;
    if (game.id === 'university-validator') return 100;
    if (game.id === 'education-audit') return 120;
    if (game.id === 'audit-final') return 150;
    return 60;
  };

  const initialDuration = getInitialDuration();

  const handleStartGame = () => {
    setShowContext(false);
    if (!reviewMode) {
      setTimerActive(true);
    } else {
      // In review mode, immediately show the first answer
      setTimeout(() => {
        handleAnswer(items[currentIndex].answer);
      }, 500);
    }
  };

  const handleTimeUp = () => {
    if (!answered && !reviewMode) {
      handleAnswer(null);
    }
  };

  const handleAnswer = (idx) => {
    if (answered) return;
    
    const finalIdx = idx === null ? -1 : idx;
    setSelectedOption(finalIdx);
    setAnswered(true);
    setTimerActive(false);
    
    const isCorrect = finalIdx === current.answer;

    if (isCorrect) {
      playSuccessChime();
      const newStreak = streak + 1;
      if (!reviewMode) {
        setStreak(newStreak);
        if (newStreak >= 2) {
          playStreakSound(newStreak);
          import('../utils/confetti').then(m => m.triggerConfetti('streak'));
        }
      }
      const pts = 10 + (newStreak >= 3 ? Math.min(newStreak, 5) : 0);
      if (!reviewMode) setScore(prev => prev + pts);
      setFeedback({
        type: 'success',
        message: current.explanation,
        points: reviewMode ? 'Review Mode' : `+${pts} XP`,
      });
    } else {
      playErrorTone();
      if (!reviewMode) setStreak(0);
      const correctTitle = current.options[current.answer].title;
      setFeedback({
        type: 'error',
        message: finalIdx === -1 
          ? `Time expired! ${current.explanation} Correct: ${correctTitle}`
          : `${current.explanation} Correct: ${correctTitle}`,
        points: '+0 XP',
      });
    }
  };

  const handleNext = () => {
    if (currentIndex >= items.length - 1) {
      setFinished(true);
      playLevelComplete();
      onComplete(items, score, 0);
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
      setAnswered(false);
      setFeedback(null);
      
      if (!reviewMode) {
        setTimerActive(true);
      } else {
        // In review mode, automatically show the next answer after a delay
        setTimeout(() => {
          handleAnswer(items[nextIndex].answer);
        }, 500);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 100 }
    }
  };

  if (showContext && cardData) {
    return <ContextCard cardData={cardData} onStart={handleStartGame} />;
  }

  if (finished) {
    const passed = score >= 30;
    return (
      <div className="max-w-xl mx-auto py-20 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card-elevated p-10 text-center"
        >
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center border-4 ${passed || reviewMode ? 'bg-success/10 border-success' : 'bg-error/10 border-error'}`}>
            {passed || reviewMode ? <Check className="text-success w-10 h-10" strokeWidth={3} /> : <X className="text-error w-10 h-10" strokeWidth={3} />}
          </div>
          <h2 className="text-3xl font-nunito font-black mb-2 text-text-primary">
            {reviewMode ? 'Review Complete' : (passed ? 'Lab Cleared!' : 'Lab Failed')}
          </h2>
          {!reviewMode && (
            <p className="text-text-secondary font-bold mb-8">
              Score: <span className="text-text-primary font-black">{score}</span> / {items.length * 10}
              {!passed && ' — Need at least 30 to pass.'}
            </p>
          )}
          {passed && !reviewMode && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-success font-bold mb-8 bg-success/5 p-4 rounded-xl border border-success/10"
            >
              {game.completionMessage}
            </motion.p>
          )}
          {reviewMode && (
            <p className="text-text-secondary font-bold mb-8">
              You have successfully reviewed all cases in this lab.
            </p>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={onBack} className="btn-secondary">
              <ArrowLeft size={18} /> {reviewMode ? 'Exit Review' : 'Back to Hub'}
            </button>
            {!passed && !reviewMode && (
              <button 
                onClick={() => { setCurrentIndex(0); setScore(0); setStreak(0); setFinished(false); setFeedback(null); setAnswered(false); setSelectedOption(null); setTimerActive(true); }} 
                className="btn-primary"
              >
                <RotateCcw size={18} /> Retry Lab
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="card-elevated p-8"
      >
        {/* Top bar */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex gap-2">
            <span className="stat-badge py-1 px-3" style={{ color: game.color, borderColor: `${game.color}30`, background: `${game.color}10` }}>
              {reviewMode ? 'Review Mode' : game.badge}
            </span>
            <span className="stat-badge py-1 px-3 bg-bg-muted">
              Case {currentIndex + 1}/{items.length}
            </span>
          </div>
          
          {!reviewMode && (
            <div className="w-full md:w-48">
              <ProgressiveTimer 
                duration={initialDuration} 
                onTimeUp={handleTimeUp} 
                isActive={timerActive} 
                key={currentIndex}
              />
            </div>
          )}
        </motion.div>

        {/* Streak */}
        <AnimatePresence>
          {streak >= 2 && (
            <motion.div 
              key={streak}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              className="mb-6 text-center"
            >
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange-50 border-2 border-primary text-primary text-sm font-black shadow-lg shadow-primary/10">
                <Flame size={18} className="fill-primary" /> {streak} Lab Streak!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question Area */}
        <motion.div variants={itemVariants} className="mb-8 text-left">
          {current.targetRole && (
            <div className="mb-4">
              <RoleBadge role={current.targetRole} />
            </div>
          )}
          <h3 className="text-2xl font-nunito font-black mb-3 leading-snug text-text-primary">
            {current.question}
          </h3>
          <p className="text-text-secondary font-bold leading-relaxed">{current.context}</p>
        </motion.div>

        {/* Options */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3 mb-8">
          {current.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectAnswer = current.answer === idx;

            let status = '';
            if (answered) {
              if (isCorrectAnswer) status = 'correct';
              else if (isSelected) status = 'wrong';
            }

            return (
              <motion.div
                key={idx}
                whileHover={!answered ? { scale: 1.01 } : {}}
                whileTap={!answered ? { scale: 0.99 } : {}}
                animate={
                  status === 'correct' ? { scale: [1, 1.05, 1], transition: { duration: 0.3 } } :
                  status === 'wrong' ? { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } } : {}
                }
                className={`
                  option-card relative overflow-hidden text-left border-l-4
                  ${isSelected && !answered ? 'selected border-l-primary' : 'border-l-transparent'}
                  ${status === 'correct' ? 'correct !border-l-success' : ''}
                  ${status === 'wrong' ? 'wrong !border-l-error' : ''}
                  ${answered ? 'cursor-default pointer-events-none locked' : ''}
                `}
                onClick={() => !answered && setSelectedOption(idx)}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  isSelected ? 'border-primary' : 'border-border'
                } ${status === 'correct' ? 'border-success bg-success' : ''} ${status === 'wrong' ? 'border-error bg-error' : ''}`}>
                  {isSelected && !answered && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  {status === 'correct' && <Check size={14} className="text-white" strokeWidth={4} />}
                  {status === 'wrong' && <X size={14} className="text-white" strokeWidth={4} />}
                </div>
                <div>
                  <strong className="font-nunito font-extrabold text-base block">{option.title}</strong>
                  <span className="text-sm text-text-secondary font-bold">{option.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Feedback Area */}
        <AnimatePresence>
          {feedback && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`overflow-hidden mb-8 text-left`}
            >
              <div className={`${feedback.type === 'success' ? 'feedback-success' : 'feedback-error'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${feedback.type === 'success' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                    {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  </div>
                  <div className="pt-1">
                    <div className="font-nunito font-black mb-1 flex items-center gap-2">
                      <span className={feedback.type === 'success' ? 'text-success' : 'text-error'}>
                        {feedback.points}
                      </span>
                      <span className="text-text-primary">
                        {feedback.type === 'success' ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    <p className="text-text-secondary font-bold text-sm leading-relaxed">
                      {feedback.message}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-4">
          {!answered ? (
            <button 
              onClick={() => handleAnswer(selectedOption)} 
              disabled={selectedOption === null} 
              className="btn-primary flex-1 py-4 text-lg"
            >
              <Lock size={20} className="mr-2" /> Lock Answer
            </button>
          ) : (
            <button 
              onClick={handleNext} 
              className="btn-proceed flex-1 py-4 text-lg"
            >
              {currentIndex >= items.length - 1 ? 'Finish Lab' : 'Next Case'} <ChevronRight size={20} className="ml-2" />
            </button>
          )}
        </motion.div>
      </motion.div>

      {/* Back button */}
      <motion.button 
        variants={itemVariants}
        onClick={onBack} 
        className="mt-8 text-text-muted hover:text-text-primary transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-2 mx-auto"
      >
        <ArrowLeft size={14} /> Back to Hub
      </motion.button>
    </div>
  );
}

import { useState } from 'react';

export default function MiniGame({ game, onComplete, onBack }) {
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

  const current = items[currentIndex];
  const progress = ((currentIndex + (answered ? 1 : 0)) / items.length) * 100;

  const handleSubmit = () => {
    if (selectedOption === null || answered) return;
    setAnswered(true);
    const isCorrect = selectedOption === current.answer;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const pts = 10 + (newStreak >= 3 ? Math.min(newStreak, 5) : 0);
      setScore(prev => prev + pts);
      setFeedback({
        type: 'success',
        message: current.explanation,
        points: `+${pts}`,
      });
    } else {
      setStreak(0);
      const correctTitle = current.options[current.answer].title;
      setFeedback({
        type: 'error',
        message: `${current.explanation} Correct: ${correctTitle}`,
        points: '+0',
      });
    }
  };

  const handleNext = () => {
    if (currentIndex >= items.length - 1) {
      setFinished(true);
      onComplete(game.id, { score, total: items.length });
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
      setFeedback(null);
    }
  };

  if (finished) {
    const passed = score >= 30;
    return (
      <div className="max-w-3xl mx-auto animate-scale-in">
        <div className="glass-card-elevated p-10 text-center">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center border-2 ${passed ? 'bg-risk-green/10 border-risk-green' : 'bg-risk-red/10 border-risk-red'}`}>
            <i className={`fa-solid ${passed ? 'fa-check' : 'fa-xmark'} text-3xl ${passed ? 'text-risk-green' : 'text-risk-red'}`}></i>
          </div>
          <h2 className="text-3xl font-outfit font-bold mb-2">
            {passed ? 'Lab Cleared!' : 'Lab Failed'}
          </h2>
          <p className="text-gray-400 mb-6">
            Score: <span className="text-white font-bold">{score}</span> / {items.length * 10}
            {!passed && ' — Need at least 30 to pass.'}
          </p>
          {passed && <p className="text-risk-green mb-6">{game.completionMessage}</p>}
          <div className="flex justify-center gap-4">
            <button onClick={onBack} className="btn-secondary">
              <i className="fa-solid fa-arrow-left"></i> Back to Labs
            </button>
            {!passed && (
              <button onClick={() => { setCurrentIndex(0); setScore(0); setStreak(0); setFinished(false); setFeedback(null); setAnswered(false); setSelectedOption(null); }} className="btn-primary">
                <i className="fa-solid fa-rotate-right"></i> Retry
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <div className="glass-card-elevated p-8">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider font-mono" style={{ background: `${game.color}15`, color: game.color, border: `1px solid ${game.color}30` }}>
              {game.badge}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-400 border border-white/10">
              Q{currentIndex + 1}/{items.length}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Score: <span className="text-white font-bold">{score}</span></div>
            <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-amz-orange rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Streak */}
        {streak >= 2 && (
          <div className="mb-4 text-center animate-scale-in">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amz-orange/10 border border-amz-orange/30 text-amz-orange text-sm font-bold">
              <i className="fa-solid fa-fire"></i> {streak} Streak!
            </span>
          </div>
        )}

        {/* Question */}
        <h3 className="text-2xl font-outfit font-bold mb-3 leading-snug">{current.question}</h3>
        <p className="text-gray-400 mb-8 leading-relaxed">{current.context}</p>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-8">
          {current.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectAnswer = current.answer === idx;

            let classes = 'option-card';
            if (answered) classes += ' locked';
            if (isSelected && !answered) classes += ' selected';
            if (answered && isCorrectAnswer) classes += ' correct';
            if (answered && isSelected && !isCorrectAnswer) classes += ' wrong';

            return (
              <div
                key={idx}
                className={`${classes} animate-fade-in-up`}
                style={{ animationDelay: `${idx * 80}ms` }}
                onClick={() => !answered && setSelectedOption(idx)}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  isSelected ? 'border-amz-orange' : 'border-white/20'
                } ${answered && isCorrectAnswer ? 'border-risk-green bg-risk-green/20' : ''} ${answered && isSelected && !isCorrectAnswer ? 'border-risk-red bg-risk-red/20' : ''}`}>
                  {isSelected && !answered && <div className="w-2.5 h-2.5 rounded-full bg-amz-orange"></div>}
                  {answered && isCorrectAnswer && <i className="fa-solid fa-check text-risk-green text-[10px]"></i>}
                  {answered && isSelected && !isCorrectAnswer && <i className="fa-solid fa-xmark text-risk-red text-[10px]"></i>}
                </div>
                <div>
                  <strong className="font-outfit text-base">{option.title}</strong>
                  <span className="text-sm text-gray-400 ml-2">{option.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`${feedback.type === 'success' ? 'feedback-success' : 'feedback-error'} rounded-xl p-5 mb-6 animate-fade-in-up`}>
            <div className="flex items-start gap-3">
              <i className={`fa-solid ${feedback.type === 'success' ? 'fa-circle-check text-risk-green' : 'fa-circle-exclamation text-risk-red'} text-lg mt-0.5`}></i>
              <div>
                <span className="font-bold mr-2" style={{ color: feedback.type === 'success' ? '#22c55e' : '#ef4444' }}>
                  {feedback.points}
                </span>
                <span className="text-gray-300">{feedback.message}</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button onClick={handleSubmit} disabled={selectedOption === null || answered} className="btn-primary flex-1">
            <i className="fa-solid fa-lock"></i> Lock Answer
          </button>
          <button onClick={handleNext} disabled={!answered} className="btn-secondary flex-1">
            <i className="fa-solid fa-forward-step"></i> {currentIndex >= items.length - 1 ? 'Finish Lab' : 'Next Case'}
          </button>
        </div>
      </div>

      {/* Back button */}
      <button onClick={onBack} className="mt-4 text-gray-500 hover:text-gray-300 transition-colors text-sm flex items-center gap-2 mx-auto">
        <i className="fa-solid fa-arrow-left"></i> Exit to Labs
      </button>
    </div>
  );
}

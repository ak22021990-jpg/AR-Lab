import React, { useState, useEffect, useRef } from 'react';

/**
 * ProgressiveTimer component displays a visual countdown timer.
 * It provides auditory (visual) cues as time runs low.
 * 
 * @param {Object} props
 * @param {number} props.duration - Initial time in seconds
 * @param {Function} props.onTimeUp - Callback when time reaches zero
 * @param {boolean} props.isActive - Whether the timer is currently running
 */
const ProgressiveTimer = ({ duration, onTimeUp, isActive = true }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);
  
  const percentage = (timeLeft / duration) * 100;
  
  // Determine color based on time left
  let timerColor = 'var(--color-risk-green)';
  if (percentage <= 25) {
    timerColor = 'var(--color-risk-red)';
  } else if (percentage <= 50) {
    timerColor = 'var(--color-risk-yellow)';
  }

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, onTimeUp]);

  // Reset timer if duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end mb-1">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <i className="fa-solid fa-clock"></i>
          Response Time
        </span>
        <span 
          className="text-2xl font-mono font-bold transition-colors duration-300"
          style={{ color: timerColor }}
        >
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </span>
      </div>
      
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${percentage <= 25 ? 'animate-pulse' : ''}`}
          style={{ 
            width: `${percentage}%`,
            backgroundColor: timerColor,
            boxShadow: `0 0 10px ${timerColor}40`
          }}
        />
      </div>
    </div>
  );
};

export default ProgressiveTimer;

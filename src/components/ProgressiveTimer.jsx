import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

/**
 * ProgressiveTimer component displays a visual countdown timer.
 * It provides auditory (visual) cues as time runs low.
 */
const ProgressiveTimer = ({ duration, onTimeUp, isActive = true }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);
  
  const percentage = (timeLeft / duration) * 100;
  
  // Determine color based on time left
  let timerColor = 'var(--color-success)';
  if (percentage <= 25) {
    timerColor = 'var(--color-error)';
  } else if (percentage <= 50) {
    timerColor = 'var(--color-primary)';
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
        <span className="text-[11px] font-black uppercase tracking-wider text-text-secondary flex items-center gap-2">
          <Clock size={16} strokeWidth={3} className="text-primary" />
          RESPONSE TIME
        </span>
        <span 
          className="text-2xl font-nunito font-black leading-none transition-colors duration-300"
          style={{ color: timerColor }}
        >
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </span>
      </div>
      
      <div className="h-4 w-full bg-border rounded-full overflow-hidden p-[3px] shadow-inner">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${percentage <= 25 ? 'animate-pulse' : ''}`}
          style={{ 
            width: `${percentage}%`,
            backgroundColor: timerColor,
            boxShadow: `0 2px 0 rgba(0,0,0,0.1) inset`
          }}
        />
      </div>
    </div>
  );
};

export default ProgressiveTimer;

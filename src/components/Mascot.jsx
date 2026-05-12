import React from 'react';

/**
 * Mascot Component
 * Handles the display of the training assistant character with a speech bubble.
 * 
 * @param {string} state - neutral, happy, thinking, concerned, excited
 * @param {string} message - Text to display in the speech bubble
 * @param {string} size - sm, md, lg
 * @param {string} position - Speech bubble position relative to mascot: 'top', 'bottom', 'left', 'right'
 * @param {string} className - Additional CSS classes
 */
const Mascot = ({ 
  state = 'neutral', 
  message, 
  size = 'md', 
  position = 'right',
  className = ''
}) => {
  const config = {
    neutral: { icon: 'fa-robot', emoji: '🤖', color: 'text-cyan-400', animation: 'animate-float' },
    happy: { icon: 'fa-smile-beam', emoji: '😊', color: 'text-green-400', animation: 'animate-bounce' },
    thinking: { icon: 'fa-brain', emoji: '🤔', color: 'text-purple-400', animation: 'animate-pulse-glow' },
    concerned: { icon: 'fa-exclamation-circle', emoji: '😟', color: 'text-orange-400', animation: 'animate-shake' },
    excited: { icon: 'fa-star', emoji: '🤩', color: 'text-yellow-400', animation: 'animate-glow-pulse' }
  };

  const current = config[state] || config.neutral;

  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-24 h-24 text-5xl',
    lg: 'w-40 h-40 text-7xl'
  };

  const bubblePositionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-4',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-4',
    left: 'right-full top-1/2 -translate-y-1/2 mr-4',
    right: 'left-full top-1/2 -translate-y-1/2 ml-4'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[#1a2236] border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[#1a2236] border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[#1a2236] border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[#1a2236] border-t-transparent border-b-transparent border-l-transparent'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Mascot Placeholder */}
      <div 
        className={`
          ${sizeClasses[size]} 
          ${current.animation}
          flex items-center justify-center rounded-full overflow-hidden
          transition-all duration-300 shadow-xl
        `}
        title={`Mascot State: ${state}`}
      >
        <img 
          src={`/assets/mascot/${state}.png`}
          alt={`Mascot ${state}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Speech Bubble */}
      {message && (
        <div className={`absolute z-10 ${bubblePositionClasses[position]} animate-fade-in-up`}>
          <div className="relative glass-card-elevated px-4 py-3 min-w-[150px] max-w-[250px] text-sm text-white shadow-2xl">
            {message}
            {/* Arrow */}
            <div className={`absolute w-0 h-0 border-[8px] ${arrowClasses[position]}`}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mascot;

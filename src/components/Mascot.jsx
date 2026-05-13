import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Mascot Component
 * Handles the display of the training assistant character with a speech bubble.
 */
const Mascot = ({ 
  state = 'neutral', 
  message, 
  size = 'md', 
  position = 'right',
  className = ''
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const [hasError, setHasError] = React.useState(false);

  const fallbackIcons = {
    happy: '😊',
    thinking: '🤔',
    concerned: '😟',
    excited: '🤩',
    neutral: '🤖'
  };

  const bubblePositionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-6',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-6',
    left: 'right-full top-1/2 -translate-y-1/2 mr-6',
    right: 'left-full top-1/2 -translate-y-1/2 ml-6'
  };

  // Border colors for speech bubble based on mascot state
  const stateColors = {
    neutral: 'border-primary',
    happy: 'border-success',
    thinking: 'border-info',
    concerned: 'border-primary',
    excited: 'border-streak'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-white border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-white border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-white border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-white border-t-transparent border-b-transparent border-l-transparent'
  };

  const arrowBorderClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-inherit border-l-transparent border-r-transparent border-b-transparent mt-[4px]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-inherit border-l-transparent border-r-transparent border-t-transparent mb-[4px]',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-inherit border-t-transparent border-b-transparent border-r-transparent ml-[4px]',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-inherit border-t-transparent border-b-transparent border-l-transparent mr-[4px]'
  };

  const getAnimationProps = (currentState) => {
    switch (currentState) {
      case 'happy':
        return {
          animate: { y: [0, -12, 0] },
          transition: { repeat: Infinity, duration: 1, ease: "easeInOut" }
        };
      case 'excited':
        return {
          animate: { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] },
          transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
        };
      case 'concerned':
        return {
          animate: { x: [0, -4, 4, -4, 4, 0] },
          transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        };
      case 'thinking':
        return {
          animate: { y: [0, -5, 0], rotate: [0, 5, 0] },
          transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        };
      case 'neutral':
      default:
        return {
          animate: { y: [0, -6, 0] },
          transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
        };
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Mascot Image */}
      <motion.div 
        key={state}
        initial={{ scale: 0.8, y: 10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className={`
          ${sizeClasses[size]} 
          flex items-center justify-center rounded-3xl overflow-hidden
          transition-all duration-300 shadow-xl bg-white border-2 border-border
        `}
      >
        {hasError ? (
          <motion.span 
            className={`${size === 'xs' ? 'text-xl' : 'text-4xl'}`}
            animate={getAnimationProps(state).animate}
            transition={getAnimationProps(state).transition}
          >
            {fallbackIcons[state] || fallbackIcons.neutral}
          </motion.span>
        ) : (
          <motion.img 
            src={`/assets/mascot/${state}.png`}
            alt={`Mascot ${state}`}
            className="w-full h-full object-cover"
            onError={() => setHasError(true)}
            animate={getAnimationProps(state).animate}
            transition={getAnimationProps(state).transition}
          />
        )}
      </motion.div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10, [position === 'left' ? 'x' : position === 'right' ? 'x' : 'y']: position === 'left' ? 20 : position === 'right' ? -20 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className={`absolute z-20 ${bubblePositionClasses[position]}`}
          >
            <div className={`
              relative bg-white border-2 border-border
              rounded-2xl px-5 py-3 min-w-[160px] max-w-[280px] 
              shadow-xl text-sm font-nunito font-bold text-text-primary text-center
            `}>
              {/* State Accent Top Border */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${stateColors[state]?.replace('border-', 'bg-') || 'bg-primary'}`}></div>
              
              <div className="pt-1">{message}</div>
              
              {/* Arrow Fill */}
              <div className={`absolute w-0 h-0 border-[10px] ${arrowClasses[position]} z-10`}></div>
              {/* Arrow Border */}
              <div className={`absolute w-0 h-0 border-[12px] ${arrowBorderClasses[position]} -z-10 opacity-20`}></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mascot;

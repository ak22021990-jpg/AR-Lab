import confetti from 'canvas-confetti';

export const triggerConfetti = (type = 'default') => {
  const defaults = {
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#FF9900', '#58CC02', '#1CB0F6', '#CE82FF', '#FFC800'],
  };

  try {
    if (type === 'perfect') {
      const star = confetti.shapeFromPath({ path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' });
      confetti({
        ...defaults,
        particleCount: 200,
        shapes: [star, 'circle', 'square'],
        colors: ['#FFD700', '#FFA500', '#FF8C00', '#FFFFFF'],
        scalar: 1.2
      });
    } else if (type === 'streak') {
      const fire = confetti.shapeFromText({ text: '🔥', scalar: 2 });
      const star = confetti.shapeFromText({ text: '⭐', scalar: 2 });
      confetti({
        ...defaults,
        particleCount: 50,
        spread: 120,
        shapes: [fire, star],
        scalar: 1.5,
        origin: { y: 0.8 } // A bit lower for streaks
      });
    } else {
      confetti({
        ...defaults,
        particleCount: 150,
      });
    }
  } catch (err) {
    // Fallback if shape functions are not supported by the version
    confetti({
      ...defaults,
      particleCount: type === 'perfect' ? 200 : (type === 'streak' ? 50 : 150),
    });
  }
};

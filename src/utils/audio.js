// A zero-dependency Web Audio API sound synthesizer
let audioCtx = null;
let soundEnabled = true;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const setSoundEnabled = (enabled) => {
  soundEnabled = enabled;
};

export const isSoundEnabled = () => soundEnabled;

const playTone = (frequency, type, duration, vol = 0.1) => {
  if (!soundEnabled) return;
  initAudio();
  
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  
  gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
};

export const playSuccessChime = () => {
  if (!soundEnabled) return;
  initAudio();
  // Short ascending chime
  playTone(600, 'sine', 0.1);
  setTimeout(() => playTone(800, 'sine', 0.2), 100);
};

export const playErrorTone = () => {
  if (!soundEnabled) return;
  initAudio();
  // Low buzz
  playTone(150, 'sawtooth', 0.3, 0.05);
};

export const playStreakSound = (streakCount) => {
  if (!soundEnabled) return;
  initAudio();
  // Ascending tones based on streak
  const baseFreq = 400;
  const multiplier = Math.min(streakCount, 5); // Cap pitch
  playTone(baseFreq + (multiplier * 100), 'sine', 0.1);
  setTimeout(() => playTone(baseFreq + (multiplier * 100) + 100, 'sine', 0.2), 100);
};

export const playLevelComplete = () => {
  if (!soundEnabled) return;
  initAudio();
  // Simple fanfare
  playTone(400, 'sine', 0.15);
  setTimeout(() => playTone(500, 'sine', 0.15), 150);
  setTimeout(() => playTone(600, 'sine', 0.15), 300);
  setTimeout(() => playTone(800, 'sine', 0.4), 450);
};

const notes = {
  find: [
    [659.25, 0, .19, .065],
    [987.77, .085, .32, .045],
  ],
  miss: [[155.56, 0, .13, .034]],
  hint: [
    [523.25, 0, .15, .036],
    [783.99, .075, .22, .035],
  ],
  win: [
    [523.25, 0, .22, .062],
    [659.25, .1, .22, .062],
    [783.99, .2, .29, .06],
    [1046.5, .31, .56, .047],
  ],
};

let context;

export function playSound(name) {
  if (!globalThis.AudioContext) return;

  context ??= new AudioContext();
  if (context.state === 'suspended') context.resume().catch(() => {});

  const start = context.currentTime;
  for (const [frequency, delay, duration, volume] of notes[name]) {
    const tone = context.createOscillator();
    const gain = context.createGain();
    const onset = start + delay;
    tone.type = name === 'miss' ? 'triangle' : 'sine';
    tone.frequency.value = frequency;
    gain.gain.setValueAtTime(.0001, onset);
    gain.gain.exponentialRampToValueAtTime(volume, onset + .022);
    gain.gain.exponentialRampToValueAtTime(.0001, onset + duration);
    tone.connect(gain).connect(context.destination);
    tone.start(onset);
    tone.stop(onset + duration);
  }
}

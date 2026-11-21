export function createSound() {
  let audio;

  function unlock() {
    if (typeof AudioContext === 'undefined') return;
    audio ??= new AudioContext();
    if (audio.state === 'suspended') audio.resume().catch(() => {});
  }

  function chime(won) {
    if (!audio || audio.state === 'closed') return;
    const notes = won ? [523.25, 659.25, 783.99, 1046.5] : [659.25, 880];
    const now = audio.currentTime;
    notes.forEach((frequency, index) => {
      const start = now + index * .083;
      const tone = audio.createOscillator();
      const envelope = audio.createGain();
      tone.type = 'sine';
      tone.frequency.value = frequency;
      envelope.gain.setValueAtTime(.0001, start);
      envelope.gain.exponentialRampToValueAtTime(.075, start + .017);
      envelope.gain.exponentialRampToValueAtTime(.0001, start + .28);
      tone.connect(envelope).connect(audio.destination);
      tone.start(start);
      tone.stop(start + .29);
    });
  }

  return { unlock, chime };
}

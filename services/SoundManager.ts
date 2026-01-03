
class SoundManager {
  private audioContext: AudioContext | null = null;

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private async playFrequency(freq: number, type: OscillatorType = 'sine', duration: number = 0.1) {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
    
    gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start();
    osc.stop(this.audioContext.currentTime + duration);
  }

  play(sound: 'click' | 'whoosh' | 'ping' | 'buzz' | 'tada') {
    this.init();
    switch (sound) {
      case 'click':
        this.playFrequency(800, 'sine', 0.05);
        break;
      case 'ping':
        this.playFrequency(1200, 'triangle', 0.1);
        break;
      case 'buzz':
        this.playFrequency(100, 'sawtooth', 0.2);
        break;
      case 'whoosh':
        this.playFrequency(400, 'sine', 0.3);
        break;
      case 'tada':
        this.playFrequency(500, 'sine', 0.1);
        setTimeout(() => this.playFrequency(800, 'sine', 0.2), 100);
        break;
    }
  }
}

export const soundManager = new SoundManager();

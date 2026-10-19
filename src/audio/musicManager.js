// Satu pemutar global untuk seluruh undangan.
const TRACKS = [
  "homecoming.mp3",
  "companions.mp3",
  "experienced-many-battles.mp3",
  "gentle-hands.mp3",
  "nindo.mp3",
  "samidare.mp3",
];

const MAX_SECONDS = 30;
const FADE_MS = 800;
const EVENT_INDEX = 3;
const GENTLE_INDEX = TRACKS.indexOf("gentle-hands.mp3");

class MusicManager {
  constructor() {
    this.audio = null;
    this.trackIndex = 0;
    this.playing = false;
    this.generation = 0;
    this.fadeTimer = null;
    this.listeners = new Set();
    this.lastSlide = 0;
  }

  ensureAudio() {
    if (this.audio) return this.audio;
    const audio = new Audio(`/music/${TRACKS[this.trackIndex]}`);
    audio.preload = "auto";
    audio.loop = false;
    audio.volume = 1;
    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime >= MAX_SECONDS) this.nextTrack();
    });
    audio.addEventListener("ended", () => this.nextTrack());
    this.audio = audio;
    return audio;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.playing);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) listener(this.playing);
  }

  clearFade() {
    if (this.fadeTimer !== null) clearInterval(this.fadeTimer);
    this.fadeTimer = null;
  }

  async play() {
    const audio = this.ensureAudio();
    this.generation++;
    this.clearFade();
    audio.volume = 1;
    try {
      await audio.play();
      this.playing = true;
      this.notify();
      return true;
    } catch {
      this.playing = false;
      this.notify();
      return false;
    }
  }

  stop() {
    this.generation++;
    this.clearFade();
    if (this.audio) {
      this.audio.pause();
      this.audio.volume = 1;
    }
    this.playing = false;
    this.notify();
  }

  async switchTrack(nextIndex, fade = true) {
    const audio = this.ensureAudio();
    const generation = ++this.generation;
    this.clearFade();
    const wasPlaying = this.playing;

    if (fade && wasPlaying && !audio.paused) {
      const startVolume = audio.volume;
      const started = performance.now();
      await new Promise((resolve) => {
        this.fadeTimer = setInterval(() => {
          if (generation !== this.generation) {
            this.clearFade();
            resolve();
            return;
          }
          const progress = Math.min((performance.now() - started) / FADE_MS, 1);
          audio.volume = startVolume * (1 - progress);
          if (progress >= 1) {
            this.clearFade();
            resolve();
          }
        }, 40);
      });
    }
    if (generation !== this.generation) return;

    audio.pause();
    this.trackIndex = nextIndex;
    audio.src = `/music/${TRACKS[nextIndex]}`;
    audio.load();
    audio.volume = fade && wasPlaying ? 0 : 1;
    if (!wasPlaying) return;

    try {
      await audio.play();
    } catch {
      if (generation === this.generation) {
        this.playing = false;
        this.notify();
      }
      return;
    }
    if (generation !== this.generation) return;

    if (fade) {
      const started = performance.now();
      this.fadeTimer = setInterval(() => {
        if (generation !== this.generation) {
          this.clearFade();
          return;
        }
        const progress = Math.min((performance.now() - started) / FADE_MS, 1);
        audio.volume = progress;
        if (progress >= 1) this.clearFade();
      }, 40);
    }
  }

  nextTrack() {
    // Mencegah pemanggilan ganda dari timeupdate dan ended.
    if (this.switchingNext) return;
    this.switchingNext = true;
    const next = (this.trackIndex + 1) % TRACKS.length;
    this.switchTrack(next, true).finally(() => {
      this.switchingNext = false;
    });
  }

  onSlideChange(nextSlideIndex) {
    const previous = this.lastSlide;
    this.lastSlide = nextSlideIndex;
    if (nextSlideIndex === EVENT_INDEX && previous < EVENT_INDEX) {
      // Dari slide sebelum Event: mulai Gentle Hands dari awal.
      this.switchTrack(GENTLE_INDEX, true);
    }
    // Dari Gallery atau slide sesudahnya: biarkan lagu dan waktu berjalan.
  }
}

export const musicManager = new MusicManager();

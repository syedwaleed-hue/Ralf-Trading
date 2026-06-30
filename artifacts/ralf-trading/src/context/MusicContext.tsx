import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (v: number) => void;
  enterSite: () => void;
  hasEntered: boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Trim: play from 5s → 45s on loop
const LOOP_START = 5;
const LOOP_END = 45;

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(() => {
    // Default to true (autoplay); but honour a previously saved pause
    const saved = localStorage.getItem('ralf_music_playing');
    return saved === null ? true : saved === 'true';
  });
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('ralf_music_volume');
    return saved ? parseFloat(saved) : 0.5;
  });
  const [hasEntered, setHasEntered] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const gestureAttached = useRef(false);

  // Loop handler: jump back to LOOP_START when hitting LOOP_END
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.currentTime >= LOOP_END) {
      audio.currentTime = LOOP_START;
      audio.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const audio = new Audio('/music/soundtrack.mp3');
    audio.loop = false;          // manual loop for the trim
    audio.volume = volume;
    audioRef.current = audio;

    // Seek to LOOP_START once metadata is ready
    const onLoaded = () => { audio.currentTime = LOOP_START; };
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    // Attempt immediate autoplay
    const tryPlay = () => {
      audio.play().catch(() => {
        // Blocked by browser — play on first user interaction
        if (!gestureAttached.current) {
          gestureAttached.current = true;
          const onGesture = () => {
            audio.play().catch(() => {});
            document.removeEventListener('click', onGesture);
            document.removeEventListener('touchstart', onGesture);
            document.removeEventListener('keydown', onGesture);
          };
          document.addEventListener('click', onGesture, { once: true });
          document.addEventListener('touchstart', onGesture, { once: true });
          document.addEventListener('keydown', onGesture, { once: true });
        }
      });
    };

    // Slight delay lets the browser settle before the autoplay attempt
    const timer = setTimeout(tryPlay, 200);

    return () => {
      clearTimeout(timer);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Volume changes
  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
    localStorage.setItem('ralf_music_volume', v.toString());
  }, []);

  // Play/pause toggle
  const togglePlay = useCallback(() => {
    setIsPlaying(prev => {
      const next = !prev;
      if (audioRef.current) {
        if (next) audioRef.current.play().catch(() => {});
        else audioRef.current.pause();
      }
      localStorage.setItem('ralf_music_playing', next.toString());
      return next;
    });
  }, []);

  // Called when user clicks "Enter RALF Trading"
  const enterSite = useCallback(() => {
    setHasEntered(true);
    // Guarantee audio is running after the user gesture
    if (audioRef.current && audioRef.current.paused && isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [isPlaying]);

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, volume, setVolume, enterSite, hasEntered }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within MusicProvider');
  return context;
};

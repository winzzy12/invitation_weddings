'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  volume: number;
  toggleMusic: () => void;
  setVolume: (v: number) => void;
  playMusic: () => void;
  pauseMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);

  const toggleMusic = useCallback(() => setIsPlaying(p => !p), []);
  const playMusic = useCallback(() => setIsPlaying(true), []);
  const pauseMusic = useCallback(() => setIsPlaying(false), []);
  const setVolume = useCallback((v: number) => setVolumeState(v), []);

  return (
    <MusicContext.Provider value={{ isPlaying, volume, toggleMusic, setVolume, playMusic, pauseMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}

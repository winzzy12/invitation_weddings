'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import { useMusic } from '@/components/layout/MusicProvider';

export default function MusicPlayer() {
  const { isPlaying, volume, toggleMusic, setVolume, playMusic } = useMusic();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
      </audio>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <div className="glass-dark rounded-2xl p-4 flex items-center gap-4 shadow-xl">
          <button
            onClick={toggleMusic}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-gold-500/30 transition"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <div className="flex items-center gap-2">
            <FaVolumeUp className="text-gold-400 text-sm" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 bg-gray-600 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-400"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

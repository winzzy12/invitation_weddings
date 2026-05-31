'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useMusic } from '@/components/layout/MusicProvider';

interface CoverProps {
  guestName: string;
  router: ReturnType<typeof useRouter>;
}

export default function Cover({ guestName, router }: CoverProps) {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { playMusic } = useMusic();

  const handleOpen = () => {
    setOpened(true);
    playMusic();
    // Confetti burst
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => router.push('/#hero'), 1200);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Floating flowers */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-70"
          initial={{ y: -20, x: Math.random() * 100 }}
          animate={{
            y: ['0%', '100vh'],
            x: [0, Math.random() * 200 - 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear',
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: '-50px',
          }}
        >
          🌸
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4 text-gold-300">
            The Wedding Of
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-2">
            Sarah & James
          </h1>
          <p className="font-display text-2xl md:text-3xl text-gold-200 mb-8 italic">
            12 Desember 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <p className="font-body text-lg md:text-xl">
            Kepada Yth. <span className="font-semibold text-gold-300">{guestName}</span>
          </p>
        </motion.div>

        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-body font-semibold rounded-full shadow-lg hover:shadow-gold-500/30 transition-all duration-300 text-lg"
        >
          💌 Buka Undangan
        </motion.button>

        {opened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/80 z-20"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">💐</div>
              <p className="text-gold-300 font-display text-2xl">Terima kasih telah membuka undangan kami</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

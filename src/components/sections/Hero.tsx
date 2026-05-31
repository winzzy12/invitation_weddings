'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date('2026-12-12T09:00:00');

    const tick = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Floating petals */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-60"
          animate={{
            y: ['0%', '110vh'],
            x: [0, Math.random() * 300 - 150],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 8,
            repeat: Infinity,
            delay: i * 2,
            ease: 'linear',
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: '-50px',
          }}
        >
          {['🌸', '🌺', '💐', '🌷'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4 text-gold-300"
        >
          We&apos;re Getting Married
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
        >
          Sarah &amp; James
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-display text-2xl md:text-3xl text-gold-200 mb-12 italic"
        >
          12 Desember 2026
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
              className="glass rounded-2xl p-4 md:p-6"
            >
              <div className="text-3xl md:text-5xl font-bold text-gold-400 font-display">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm text-gray-300 mt-2 uppercase tracking-wider">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-12 animate-bounce"
        >
          <p className="font-body text-sm text-gold-200">Scroll untuk melihat undangan ↓</p>
        </motion.div>
      </div>
    </section>
  );
}

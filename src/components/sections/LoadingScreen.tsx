'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'ready' | 'done'>('loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setPhase('ready');
          setTimeout(() => {
            setPhase('done');
            setTimeout(onComplete, 800);
          }, 1200);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-cream via-white to-gold-50 dark:from-dark dark:via-gray-900 dark:to-gray-800"
        >
          {/* Elegant ring logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="relative mb-8"
          >
            <div className="w-24 h-24 rounded-full border-4 border-gold-400 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-2 border-gold-300 border-dashed"
              />
              <span className="absolute text-4xl">💍</span>
            </div>
          </motion.div>

          {/* Couple names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h1 className="font-display text-3xl md:text-4xl text-gray-800 dark:text-white mb-2">
              Sarah & James
            </h1>
            <p className="font-body text-sm text-gold-600 dark:text-gold-400 tracking-widest uppercase">
              The Wedding
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {phase === 'ready' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-gold-600 dark:text-gold-400 font-body text-sm"
            >
              Tap to open invitation
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

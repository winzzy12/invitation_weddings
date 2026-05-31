'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-gradient-to-b from-gray-900 to-dark border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            Sarah &amp; James
          </div>
          <p className="text-gold-400 font-body mb-4">12 Desember 2026</p>
          <p className="text-gray-500 font-body text-sm mb-6">
            Terima kasih atas doa dan kehadiran Anda
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />
          <p className="text-gray-600 text-xs">
            © 2026 Sarah & James. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  const message = encodeURIComponent(
    'Halo! Saya ingin konfirmasi kehadiran di pernikahan Sarah & James.'
  );
  const waLink = `https://wa.me/628123456789?text=${message}`;

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-green-500/40 transition-all duration-300"
    >
      <FaWhatsapp className="text-2xl" />
    </motion.a>
  );
}

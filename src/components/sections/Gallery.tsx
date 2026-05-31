'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const galleryImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=80',
  'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80',
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const open = (idx: number) => setSelected(idx);
  const close = () => setSelected(null);
  const prev = () => setSelected(prev => (prev! - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setSelected(prev => (prev! + 1) % galleryImages.length);

  return (
    <section id="gallery" className="py-24 px-4 bg-gradient-to-b from-dark via-gray-900 to-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-400 mb-2">
            Galeri
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Momen Berharga Kami
          </h2>
        </motion.div>

        {/* Masonry-ish grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
              onClick={() => open(i)}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover aspect-square hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gold-400 transition"
            >
              <FiX />
            </button>
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white text-3xl hover:text-gold-400 transition"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white text-3xl hover:text-gold-400 transition"
            >
              <FiChevronRight />
            </button>
            <motion.img
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={galleryImages[selected]}
              alt="Selected"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

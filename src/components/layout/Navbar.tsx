'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

const sections = [
  { id: 'hero', label: 'Beranda' },
  { id: 'mempelai', label: 'Mempelai' },
  { id: 'cerita', label: 'Cerita' },
  { id: 'acara', label: 'Acara' },
  { id: 'gallery', label: 'Galeri' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'ucapan', label: 'Ucapan' },
  { id: 'amplop', label: 'Hadiah' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-dark shadow-lg py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-display text-xl font-bold text-white">
          S&amp;J
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-gray-300 hover:text-gold-400 font-body text-sm transition"
            >
              {s.label}
            </a>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold-500 transition"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-white text-2xl"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-dark mx-4 mt-2 rounded-2xl p-4"
        >
          {sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="block py-3 text-gray-300 hover:text-gold-400 font-body transition"
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
// force rebuild

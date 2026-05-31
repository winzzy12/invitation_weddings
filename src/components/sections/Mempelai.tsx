'use client';

import { motion } from 'framer-motion';

interface MempelaiProps {
  photo: string;
  name: string;
  bio: string;
  parents: string;
  social?: { ig?: string; wa?: string };
  delay?: number;
}

function MempelaiCard({ photo, name, bio, parents, social, delay = 0 }: MempelaiProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className="glass-dark rounded-3xl p-6 md:p-8 max-w-sm mx-auto text-center"
    >
      <div className="relative w-40 h-40 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 animate-pulse" />
        <img
          src={photo}
          alt={name}
          className="relative w-36 h-36 rounded-full object-cover mx-auto mt-2 border-4 border-white/20"
        />
      </div>
      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">{name}</h3>
      <p className="text-gold-300 font-body text-sm mb-3">{bio}</p>
      <p className="text-gray-400 font-body text-xs">{parents}</p>
      {social && (
        <div className="mt-4 flex justify-center gap-4">
          {social.ig && (
            <a
              href={`https://instagram.com/${social.ig}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 transition"
            >
              📸
            </a>
          )}
          {social.wa && (
            <a
              href={`https://wa.me/${social.wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition"
            >
              💬
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function Mempelai() {
  return (
    <section id="mempelai" className="py-24 px-4 bg-gradient-to-b from-dark via-gray-900 to-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-400 mb-2">
            Mempelai
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            kedua Mempelai
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <MempelaiCard
            photo="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
            name="James Alexander"
            bio="Putra dari Bpk. Robert & Ibu Mary. Seorang software engineer yang passionate tentang teknologi dan musik."
            parents="Putra dari Bpk. Robert & Ibu Mary"
            social={{ ig: 'james_alex', wa: '628123456789' }}
            delay={0.2}
          />

          <div className="text-center text-4xl font-display text-gold-500 hidden md:block">
            &amp;
          </div>

          <MempelaiCard
            photo="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
            name="Sarah Elizabeth"
            bio="Putri dari Bpk. Michael & Ibu Elizabeth. Seorang desainer yang mencintai seni, alam, dan makanan enak."
            parents="Putri dari Bpk. Michael & Ibu Elizabeth"
            social={{ ig: 'sarah.elizabeth', wa: '628987654321' }}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

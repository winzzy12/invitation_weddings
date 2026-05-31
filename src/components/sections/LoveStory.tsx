'use client';

import { motion } from 'framer-motion';

const timeline = [
  {
    title: 'Pertemuan Pertama',
    date: 'Januari 2023',
    description: 'Kami bertemu pertama kali di sebuah coffee shop kecil di Jakarta. Senyum pertamanya membuat hari ku terasa brighter.',
    icon: '☕',
  },
  {
    title: 'Awal Hubungan',
    date: 'Maret 2023',
    description: 'Setelah bertemu berkali-kali, kami memutuskan untukOfficial. Hari itu kami mulai menulis cerita cinta kita bersama.',
    icon: '💕',
  },
  {
    title: 'Lamaran',
    date: 'Agustus 2025',
    description: 'James melamar Sarah di atas kapal pesiar saat matahari terbenam. Kata-kata manisnya membuat Sarah menangis bahagia.',
    icon: '💍',
  },
  {
    title: 'Hari Pernikahan',
    date: '12 Desember 2026',
    description: 'Hari yang kami tunggu-tunggu akhirnya tiba. Mari bersama-sama merayakan cinta kita di hadapan Tuhan dan keluarga.',
    icon: '💐',
  },
];

export default function LoveStory() {
  return (
    <section id="cerita" className="py-24 px-4 bg-gradient-to-b from-dark via-gray-900 to-dark">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-400 mb-2">
            Cerita Cinta
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Perjalanan Kita
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gold-500/0 via-gold-500/50 to-gold-500/0" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`relative flex items-center mb-16 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Card */}
              <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="glass-dark rounded-2xl p-6 md:p-8 inline-block">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gold-400 font-body text-sm mb-3">{item.date}</p>
                  <p className="text-gray-300 font-body text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Center dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-2xl shadow-lg shadow-gold-500/30">
                  {item.icon}
                </div>
              </div>

              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDirections } from 'react-icons/fa';

interface EventCardProps {
  title: string;
  time: string;
  location: string;
  mapsUrl: string;
  index: number;
}

function EventCard({ title, time, location, mapsUrl, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="glass-dark rounded-3xl p-8 max-w-lg mx-auto"
    >
      <div className="text-center mb-6">
        <div className="text-5xl mb-4">{index === 0 ? '🕌' : '🎉'}</div>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gold-400 font-body">{time}</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-3 text-gray-300">
          <FaMapMarkerAlt className="text-gold-500 mt-1 flex-shrink-0" />
          <p className="font-body text-sm">{location}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-body font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 flex items-center gap-2"
          >
            <FaMapMarkerAlt /> Lihat Maps
          </a>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gold-500 text-gold-400 font-body font-semibold rounded-full hover:bg-gold-500/10 transition-all duration-300 flex items-center gap-2"
          >
            <FaDirections /> Navigasi
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventDetails() {
  return (
    <section id="acara" className="py-24 px-4 bg-gradient-to-b from-dark via-gray-900 to-dark">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-400 mb-2">
            Detail Acara
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Save The Date
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <EventCard
            title="Akad Nikah"
            time="09:00 - 11:00 WIB"
            location="Masjid Agung Al-Azhar, Jakarta Selatan"
            mapsUrl="https://maps.google.com/?q=Masjid+Agung+Al-Azhar+Jakarta"
            index={0}
          />
          <EventCard
            title="Resepsi"
            time="12:00 - 15:00 WIB"
            location="Grand Ballroom Hotel Mulia, Senayan"
            mapsUrl="https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta"
            index={1}
          />
        </div>
      </div>
    </section>
  );
}

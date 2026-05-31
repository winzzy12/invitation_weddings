'use client';

import { motion } from 'framer-motion';
import { FaShareAlt, FaCopy, FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function ShareButtons() {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = 'Kami mengundangmu ke pernikahan Sarah & James! 💍';

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    alert('Link berhasil disalin!');
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-bold text-white mb-6">Bagikan Undangan</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={shareToWhatsApp}
              className="px-6 py-3 bg-green-500 text-white rounded-full font-body font-semibold hover:bg-green-600 transition flex items-center gap-2"
            >
              <FaWhatsapp /> WhatsApp
            </button>
            <button
              onClick={copyLink}
              className="px-6 py-3 bg-gold-500 text-white rounded-full font-body font-semibold hover:bg-gold-600 transition flex items-center gap-2"
            >
              <FaCopy /> Salin Link
            </button>
            {typeof window !== 'undefined' && window.navigator.share && (
              <button
                onClick={() => window.navigator.share({ title: 'Undangan Pernikahan', text, url })}
                className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-full font-body font-semibold hover:bg-white/20 transition flex items-center gap-2"
              >
                <FaShareAlt /> Share
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck, FiQr } from 'react-icons/fi';

const accounts = [
  { bank: 'BCA', number: '1234567890', name: 'SARAH ELIZABETH', color: '#0066CC' },
  { bank: 'Mandiri', number: '9876543210', name: 'JAMES ALEXANDER', color: '#005BAC' },
  { bank: 'BNI', number: '1122334455', name: 'SARAH & JAMES', color: '#F47920' },
];

export default function Amplop() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="amplop" className="py-24 px-4 bg-gradient-to-b from-dark via-gray-900 to-dark">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-400 mb-2">
            Amplop Digital
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Kirim Hadiah
          </h2>
          <p className="text-gray-400 font-body mt-4 max-w-lg mx-auto">
            Doa restu Anda merupakan karunia yang tak ternilai bagi kami. Bagi yang ingin memberikan hadiah, dapat melalui:
          </p>
        </motion.div>

        {/* Bank Accounts */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {accounts.map((acc, i) => (
            <motion.div
              key={acc.bank}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-dark rounded-2xl p-6 text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: acc.color }}
              >
                {acc.bank}
              </div>
              <p className="text-white font-body font-semibold mb-1">{acc.bank}</p>
              <p className="text-gold-400 font-mono text-lg mb-1">{acc.number}</p>
              <p className="text-gray-400 text-xs mb-4">{acc.name}</p>
              <button
                onClick={() => copy(acc.number, acc.bank)}
                className="flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-full border border-gold-500 text-gold-400 hover:bg-gold-500/10 transition text-sm font-body"
              >
                {copied === acc.bank ? (
                  <><FiCheck /> Disalin!</>
                ) : (
                  <><FiCopy /> Salin No. Rekening</>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* QRIS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-dark rounded-3xl p-8 max-w-md mx-auto text-center"
        >
          <div className="text-4xl mb-4">📱</div>
          <h3 className="font-display text-2xl font-bold text-white mb-2">QRIS</h3>
          <p className="text-gray-400 font-body text-sm mb-6">
            Scan QRIS untuk mengirimkan hadiah secara instan
          </p>
          <div className="bg-white p-4 rounded-2xl inline-block mb-4">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/qris"
              alt="QRIS"
              className="w-48 h-48"
            />
          </div>
          <button
            onClick={() => copy('https://example.com/qris', 'qris')}
            className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-body font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all"
          >
            {copied === 'qris' ? '✅ Link Disalin!' : 'Salin Link QRIS'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

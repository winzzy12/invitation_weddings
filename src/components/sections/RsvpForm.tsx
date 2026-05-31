'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { Rsvp } from '@/types';

export default function RsvpForm() {
  const [form, setForm] = useState<Rsvp>({
    name: '',
    attendance: 'belum_konfirmasi',
    guest_count: 1,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.from('rsvp').insert([form]);
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Gagal mengirim RSVP');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="max-w-lg mx-auto text-center glass-dark rounded-3xl p-12"
        >
          <div className="text-6xl mb-4">✅</div>
          <h3 className="font-display text-3xl font-bold text-white mb-2">Terima Kasih!</h3>
          <p className="text-gray-300 font-body">
            Kehadiranmu sudah tercatat. Kami tunggu di hari bahagia kami!
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 px-4 bg-gradient-to-b from-dark via-gray-900 to-dark">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-400 mb-2">
            Konfirmasi
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            RSVP Kehadiran
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass-dark rounded-3xl p-8 space-y-6"
        >
          <div>
            <label className="block text-gold-300 font-body text-sm mb-2">Nama Lengkap</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition"
              placeholder="Masukkan nama lengkap"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gold-300 font-body text-sm mb-2">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'hadir', label: 'Hadir', emoji: '✅' },
                { value: 'tidak_hadir', label: 'Tidak Hadir', emoji: '❌' },
                { value: 'belum_konfirmasi', label: 'Belum Tahu', emoji: '🤔' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, attendance: opt.value as any })}
                  className={`py-3 rounded-xl font-body text-sm transition-all ${
                    form.attendance === opt.value
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-white/5 text-gray-300 border border-white/10 hover:border-gold-500'
                  }`}
                >
                  <span className="mr-1">{opt.emoji}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gold-300 font-body text-sm mb-2">
              Jumlah Tamu (termasuk diri sendiri)
            </label>
            <input
              type="number"
              min={1}
              max={10}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition"
              value={form.guest_count}
              onChange={e => setForm({ ...form, guest_count: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-gold-300 font-body text-sm mb-2">
              Ucapan &amp; Doa (opsional)
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition resize-none"
              placeholder="Tulis ucapan dan doa untuk mempelai..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-body font-semibold rounded-full shadow-lg hover:shadow-gold-500/30 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Mengirim...' : 'Kirim Konfirmasi'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

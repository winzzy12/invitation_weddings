'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { Wish } from '@/types';

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishes();
    const channel = supabase
      .channel('wishes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        payload => {
          setWishes(prev => [payload.new as Wish, ...prev]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchWishes() {
    const { data } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    if (data) setWishes(data);
    setLoading(false);
  }

  return (
    <section id="ucapan" className="py-24 px-4 bg-gradient-to-b from-dark via-gray-900 to-dark">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-400 mb-2">
            Ucapan &amp; Doa
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Dari Tamu Undangan
          </h2>
        </motion.div>

        {loading ? (
          <div className="text-center text-gold-400">Memuat ucapan...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {wishes.map((wish, i) => (
              <motion.div
                key={wish.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold">
                    {wish.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-body font-semibold text-sm">{wish.name}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(wish.created_at || '').toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 font-body text-sm leading-relaxed italic">
                  &ldquo;{wish.message}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

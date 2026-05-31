'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RsvpStats {
  hadir: number;
  tidak_hadir: number;
  belum_konfirmasi: number;
}

export default function AdminDashboard() {
  const [rsvpData, setRsvpData] = useState<any[]>([]);
  const [wishesData, setWishesData] = useState<any[]>([]);
  const [stats, setStats] = useState<RsvpStats>({ hadir: 0, tidak_hadir: 0, belum_konfirmasi: 0 });
  const [totalGuests, setTotalGuests] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: rsvp } = await supabase.from('rsvp').select('*').order('created_at', { ascending: false });
    const { data: wishes } = await supabase.from('wishes').select('*').order('created_at', { ascending: false });

    if (rsvp) {
      setRsvpData(rsvp);
      const s: RsvpStats = { hadir: 0, tidak_hadir: 0, belum_konfirmasi: 0 };
      let guests = 0;
      rsvp.forEach(r => {
        if (r.attendance === 'hadir') { s.hadir++; guests += r.guest_count || 0; }
        else if (r.attendance === 'tidak_hadir') s.tidak_hadir++;
        else s.belum_konfirmasi++;
      });
      setStats(s);
      setTotalGuests(guests);
    }

    if (wishes) setWishesData(wishes);
  }

  const pieData = [
    { name: 'Hadir', value: stats.hadir, color: '#10B981' },
    { name: 'Tidak Hadir', value: stats.tidak_hadir, color: '#EF4444' },
    { name: 'Belum Konfirmasi', value: stats.belum_konfirmasi, color: '#6B7280' },
  ];

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-white mb-8">Dashboard Admin</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total RSVP', value: rsvpData.length },
            { label: 'Hadir', value: stats.hadir },
            { label: 'Tidak Hadir', value: stats.tidak_hadir },
            { label: 'Total Tamu', value: totalGuests },
          ].map((s, i) => (
            <div key={i} className="glass-dark rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-gold-400 font-display">{s.value}</p>
              <p className="text-gray-400 text-sm mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="text-white font-display text-xl mb-4">Distribusi Kehadiran</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="text-white font-display text-xl mb-4">RSVP per Hari</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[]}>
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Bar dataKey="count" fill="#D4A853" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RSVP Table */}
        <div className="glass-dark rounded-2xl overflow-hidden mb-12">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-white font-display text-xl">Daftar RSVP</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gold-400 text-left text-sm border-b border-white/10">
                  <th className="px-6 py-4">Nama</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Jumlah Tamu</th>
                  <th className="px-6 py-4">Ucapan</th>
                  <th className="px-6 py-4">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {rsvpData.map((r, i) => (
                  <tr key={i} className="text-gray-300 text-sm border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4">{r.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        r.attendance === 'hadir' ? 'bg-green-500/20 text-green-400' :
                        r.attendance === 'tidak_hadir' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {r.attendance.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">{r.guest_count}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{r.message || '-'}</td>
                    <td className="px-6 py-4 text-xs">
                      {new Date(r.created_at).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wishes Table */}
        <div className="glass-dark rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-white font-display text-xl">Ucapan Tamu</h3>
          </div>
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {wishesData.map((w, i) => (
              <div key={i} className="border-b border-white/5 pb-4 last:border-0">
                <div className="flex justify-between mb-2">
                  <span className="text-white font-semibold text-sm">{w.name}</span>
                  <span className="text-gray-500 text-xs">
                    {new Date(w.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="text-gray-300 text-sm italic">&ldquo;{w.message}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

# 💍 Wedding Invitation — Sarah & James

Undangan pernikahan online premium dengan desain modern, elegan, dan interaktif.

## ✨ Fitur

- ✅ Cover dengan efek confetti & bunga jatuh
- ✅ Hero section dengan countdown interaktif
- ✅ Profil mempelai dengan animasi
- ✅ Timeline cerita cinta
- ✅ Detail acara (Akad + Resepsi) + Maps
- ✅ Galeri foto masonry + lightbox
- ✅ Form RSVP dengan Supabase
- ✅ Ucapan tamu realtime
- ✅ Amplop digital (rekening + QRIS)
- ✅ Musik latar dengan kontrol volume
- ✅ Share undangan
- ✅ Admin dashboard (RSVP stats + wishes)
- ✅ PWA + SEO + Dark/Light mode
- ✅ Fully responsive

## 🚀 Setup

### 1. Clone & Install

```bash
npm install
```

### 2. Environment Variables

Buat file `.env.local` di root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Setup

Jalankan SQL berikut di Supabase SQL Editor:

```sql
-- RSVP table
create table rsvp (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  attendance text not null check (attendance in ('hadir','tidak_hadir','belum_konfirmasi')),
  guest_count integer default 1,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Wishes table
create table wishes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Realtime
alter publication supabase_realtime add table rsvp;
alter publication supabase_realtime add table wishes;
```

Set RLS policies sesuai kebutuhan.

### 4. Customize Content

Edit konfigurasi di komponen-komponen:
- `src/components/sections/Cover.tsx` — nama & tanggal
- `src/components/sections/Mempelai.tsx` — foto & bio mempelai
- `src/components/sections/EventDetails.tsx` — lokasi & waktu acara
- `src/components/sections/Amplop.tsx` — nomor rekening
- `src/app/layout.tsx` — metadata SEO

### 5. Run Dev

```bash
npm run dev
```

### 6. Deploy ke Vercel

```bash
vercel
```

## 📁 Struktur

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main invitation page
│   ├── admin/page.tsx      # Admin dashboard
│   └── api/
│       ├── rsvp/route.ts   # RSVP API
│       └── wishes/route.ts # Wishes API
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── MusicProvider.tsx
│   └── sections/
│       ├── Cover.tsx
│       ├── Hero.tsx
│       ├── Mempelai.tsx
│       ├── LoveStory.tsx
│       ├── EventDetails.tsx
│       ├── Gallery.tsx
│       ├── RsvpForm.tsx
│       ├── Wishes.tsx
│       ├── Amplop.tsx
│       ├── MusicPlayer.tsx
│       ├── ShareButtons.tsx
│       ├── Footer.tsx
│       └── FloatingWhatsApp.tsx
├── lib/
│   └── supabase.ts         # Supabase client
├── types/
│   └── index.ts            # TypeScript types
└── app/
    └── globals.css         # Tailwind + custom styles
```

## 🎨 Customization

- Warna utama: Gold (`#D4A853`)
- Font: Playfair Display (display) + Poppins (body)
- Dark mode: aktif secara default

## 📝 License

MIT

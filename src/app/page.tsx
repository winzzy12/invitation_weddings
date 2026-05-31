'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingScreen from '@/components/sections/LoadingScreen';
import Cover from '@/components/sections/Cover';
import Hero from '@/components/sections/Hero';
import Mempelai from '@/components/sections/Mempelai';
import LoveStory from '@/components/sections/LoveStory';
import EventDetails from '@/components/sections/EventDetails';
import Gallery from '@/components/sections/Gallery';
import RsvpForm from '@/components/sections/RsvpForm';
import Wishes from '@/components/sections/Wishes';
import Amplop from '@/components/sections/Amplop';
import ShareButtons from '@/components/sections/ShareButtons';
import MusicPlayer from '@/components/sections/MusicPlayer';

function CoverWithSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  return <Cover guestName={guestName} router={router} />;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-dark" />;
  }

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <main>
      <Suspense fallback={<div className="min-h-screen bg-dark" />}>
        <CoverWithSearch />
      </Suspense>
      <Hero />
      <Mempelai />
      <LoveStory />
      <EventDetails />
      <Gallery />
      <RsvpForm />
      <Wishes />
      <Amplop />
      <ShareButtons />
      <MusicPlayer />
    </main>
  );
}

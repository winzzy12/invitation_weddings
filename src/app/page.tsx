import { Suspense } from 'react';
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

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <main>
        <Cover />
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
      <LoadingScreen onComplete={() => {}} />
    </Suspense>
  );
}

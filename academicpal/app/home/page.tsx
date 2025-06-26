import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import KeyFeatures from '@/components/KeyFeatures';

import Footer from '@/components/Footerhome';
import About from '@/components/About';
import Workit from '@/components/Workit';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Help from '@/components/Support';
import Contact2 from '@/components/Contact2';
import BottomNav from "@/components/BottomNav";//GlowingEffect
import { Glow } from '@/components/Glow';//GoogleGeminiEffectDemo
import { GoogleGeminiEffectDemo } from '@/components/GoogleGeminiEffectDemo';//TimelineDemo
import { TimelineDemo } from '@/components/TimelineDemo';//MarqueeDemo
import { MarqueeDemo  } from '@/components/MarqueeDemo';

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden"> 
      <NavBar />
      <main className="pt-20 "> 
        <HeroSection />
        <KeyFeatures />
        <About />
        <Glow />
        <GoogleGeminiEffectDemo />
        <TimelineDemo />
       <Workit />
       <MarqueeDemo />
        <Faq />
        <Contact />
        <BottomNav />
        <Help />
        <Contact2 />
      </main>
      <Footer />
    </div>
  );
}

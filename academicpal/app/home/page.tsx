import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import KeyFeatures from '@/components/KeyFeatures';
import Testimonials from '@/components/Testimonal';
import Footer from '@/components/Footerhome';
import About from '@/components/About';
import Workit from '@/components/Workit';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Help from '@/components/Support';
import Contact2 from '@/components/Contact2';
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden"> 
      <NavBar />
      <main className="pt-20 "> 
        <HeroSection />
        <KeyFeatures />
        <About />
        <Workit />
        <Testimonials />
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

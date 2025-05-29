import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import KeyFeatures from '@/components/KeyFeatures';
import PopularResources from '@/components/PopularResources';
import HowItWorks from '@/components/HowItWorks';
import ChatbotDemo from '@/components/ChatbotDemo';
import Testimonials from '@/components/Testimonal';
import LatestBlog from '@/components/LatestBlog';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footerhome';
import About from '@/components/About';
import Workit from '@/components/Workit';
import Faq from '@/components/Faq';


export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <NavBar />
      <main className="pt-20">
        <HeroSection />
        <KeyFeatures />
         <About />
          <Workit />
           <Testimonials />
           <Faq />
        <PopularResources />
        <HowItWorks />
       
        <ChatbotDemo />
       
        <LatestBlog />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
}

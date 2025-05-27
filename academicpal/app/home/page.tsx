import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import KeyFeatures from '@/components/KeyFeatures';
import PopularResources from '@/components/PopularResources';
import HowItWorks from '@/components/HowItWorks';
import ChatbotDemo from '@/components/ChatbotDemo';
import Testimonials from '@/components/Testimonials';
import LatestBlog from '@/components/LatestBlog';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footerhome';


export default function Home() {
  return (
    <>
      <NavBar />
      <main className="pt-20">
        <HeroSection />
      <KeyFeatures />
      <PopularResources />
      <HowItWorks />
      <ChatbotDemo />
      <Testimonials />
      <LatestBlog />
      <NewsletterSignup />
      <Footer />
      </main>
      
    </>
  );
}

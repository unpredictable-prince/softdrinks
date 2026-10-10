import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FlavourShowcase from '@/components/FlavourShowcase';
import BrandStory from '@/components/BrandStory';
import RetailerPartnership from '@/components/RetailerPartnership';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Fizzora | Premium Carbonated Soft Drinks of Gujarat',
  description: 'Authentic Gujarati carbonated beverages. Handcrafted Jeera Masala Fizz, Kachi Keri Raw Mango Spark, Sparkling Lemon Lime, and Spiced Heritage Cola. Wholesale supply for retail shops and distributors.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FlavourShowcase />
        <BrandStory />
        <RetailerPartnership />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

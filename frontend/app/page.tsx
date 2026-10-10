import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FlavourShowcase from '@/components/FlavourShowcase';
import FlavourQuiz from '@/components/FlavourQuiz';
import FoodPairings from '@/components/FoodPairings';
import StockistFinder from '@/components/StockistFinder';
import BrandStory from '@/components/BrandStory';
import RetailerPartnership from '@/components/RetailerPartnership';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Fizzora | Premium Carbonated Soft Drinks & Dairy of Gujarat',
  description: 'Authentic Gujarati beverages: Handcrafted Jeera Masala Fizz, Kachi Keri Raw Mango Spark, Sparkling Lemon Lime, Spiced Heritage Cola, Desi Masala Chaas, and Rajwadi Sweet Lassi. Wholesale crate supply across Ahmedabad, Surat, Vadodara, and Rajkot.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FlavourShowcase />
        <FlavourQuiz />
        <FoodPairings />
        <StockistFinder />
        <BrandStory />
        <RetailerPartnership />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

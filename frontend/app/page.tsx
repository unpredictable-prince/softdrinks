import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FlavourShowcase from '@/components/FlavourShowcase';
import BrandStory from '@/components/BrandStory';
import FoodPairings from '@/components/FoodPairings';
import FlavourQuiz from '@/components/FlavourQuiz';
import StockistFinder from '@/components/StockistFinder';
import RetailerPartnership from '@/components/RetailerPartnership';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'FIZZORA | World-Class Craft Soft Drinks & Cultured Dairy of Gujarat',
  description: 'Art-directed craft carbonated sodas and slow-churned Kathiyawadi dairy refreshers. Calibrated to 4.2 Vol CO₂ to slice through 45°C Gujarat heatwaves. Wholesale crate supply across Ahmedabad, Surat, Vadodara, and Rajkot.',
  keywords: [
    'Fizzora',
    'Jeera Masala Fizz',
    'Kachi Keri Spark',
    'Masala Chaas',
    'Rajwadi Lassi',
    'Gujarat soft drinks',
    'Ahmedabad cold drinks',
    'Naroda GIDC beverage bottling',
  ],
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#06070a] text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FlavourShowcase />
        <BrandStory />
        <FoodPairings />
        <FlavourQuiz />
        <StockistFinder />
        <RetailerPartnership />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Flame,
  Droplets,
  Thermometer,
  Shield,
  Layers,
  ArrowRight,
  Info,
  X,
  Zap,
  Milk,
  CheckCircle2,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/types';

interface FlavourItem {
  id: number;
  index: string;
  name: string;
  slug: string;
  category: 'CARBONATED' | 'DAIRY';
  tagline: string;
  flavour: string;
  description: string;
  image_url: string;
  accentColor: string;
  accentGlow: string;
  carbonationVol?: string;
  servingTemp: string;
  shelfLife: string;
  provenance: string;
  sensoryScores: {
    fizz: number;
    sweetness: number;
    spice: number;
    tang: number;
  };
  ingredients: string[];
  notes: string[];
  variants: {
    bottle_size: string;
    mrp: string;
    wholesale?: string;
  }[];
}

const defaultFlavours: FlavourItem[] = [
  {
    id: 1,
    index: '01',
    name: 'Jeera Masala Fizz',
    slug: 'jeera-masala-fizz',
    category: 'CARBONATED',
    tagline: 'The Unrivaled Gujarat Digestive King',
    flavour: 'Roasted Jeera & Kutch Black Salt',
    description:
      'The crown jewel of Gujarat street culture. Calibrated to an explosive 4.2 Vol CO₂ effervescence, balanced with slow-roasted cumin from Unjha and mineral-rich volcanic rock salt. Engineered to slice through heavy farsan and spicy Kathiyawadi gravies.',
    image_url: '/images/drinks/jeera-masala-photo.jpg',
    accentColor: '#E5A93C',
    accentGlow: 'rgba(229, 169, 60, 0.28)',
    carbonationVol: '4.2 Vol',
    servingTemp: '3°C - 5°C (Chilled)',
    shelfLife: '180 Days',
    provenance: 'Unjha Cumin Mandi & Kutch Salt Beds',
    sensoryScores: { fizz: 95, sweetness: 40, spice: 90, tang: 80 },
    ingredients: [
      'Carbonated Treated Demineralized Water',
      'Hand-Roasted Cumin (Jeera) Oleoresin',
      'Volcanic Kala Namak (Black Salt)',
      'Rock Salt (Sendha Namak)',
      'Cold-Pressed Limbu Essential Oil',
      'Citric Acid',
    ],
    notes: ['4.2 Vol Explosive Fizz', 'Digestive Rock Salt', 'Hand-Roasted Cumin Aroma', 'Post-Meal Palate Reset'],
    variants: [
      { bottle_size: '200ml Glass Returnable / PET', mrp: '₹12', wholesale: '₹9.50' },
      { bottle_size: '500ml Chilled PET', mrp: '₹25', wholesale: '₹19.50' },
      { bottle_size: '1.25L Family Party Pack', mrp: '₹50', wholesale: '₹39.00' },
    ],
  },
  {
    id: 2,
    index: '02',
    name: 'Kachi Keri Spark',
    slug: 'kachi-keri-spark',
    category: 'CARBONATED',
    tagline: 'Raw Green Mango Electric Shock',
    flavour: 'Tart Green Mango & Garden Mint',
    description:
      'The ultimate antidote to blistering 45°C afternoons. Cold-extracted tart green mango pulp combined with freshly bruised mint and a jolt of sharp carbonation. Electric sour-sweet complexity reminiscent of Saurashtra street cart sodas.',
    image_url: '/images/drinks/kachi-keri-photo.jpg',
    accentColor: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.28)',
    carbonationVol: '4.0 Vol',
    servingTemp: '4°C (Iced Chilled)',
    shelfLife: '180 Days',
    provenance: 'Gir Talala Raw Mango Orchards & Anand Mint',
    sensoryScores: { fizz: 88, sweetness: 50, spice: 60, tang: 95 },
    ingredients: [
      'Triple-Filtered Carbonated Water',
      'Raw Green Mango (Kachi Keri) Extract',
      'Garden Mint Essential Oil',
      'Sendha Namak',
      'Cane Sugar',
      'Natural Fruit Acidifiers',
    ],
    notes: ['Sour Green Mango Zing', 'Cooling Garden Mint', 'Crisp Tangy Snap', 'Electrifying Summer Refresher'],
    variants: [
      { bottle_size: '200ml Glass Returnable / PET', mrp: '₹12', wholesale: '₹9.50' },
      { bottle_size: '500ml Chilled PET', mrp: '₹25', wholesale: '₹19.50' },
    ],
  },
  {
    id: 3,
    index: '03',
    name: 'Lemon Lime Burst',
    slug: 'lemon-lime-burst',
    category: 'CARBONATED',
    tagline: 'Crystalline High-Fizz Citrus Clarity',
    flavour: 'Cold-Pressed Lime & Pure Effervescence',
    description:
      'Purity and razor-sharp clarity. Zero caffeine, zero heavy syrups. Built around sparkling demineralized water and cold-pressed oil of Bhavnagar Kagzi limes. It delivers a hyper-clean, palate-cleansing snap that rejuvenates instantly.',
    image_url: '/images/drinks/lemon-lime-photo.jpg',
    accentColor: '#FACC15',
    accentGlow: 'rgba(250, 204, 21, 0.28)',
    carbonationVol: '4.3 Vol',
    servingTemp: '2°C - 4°C (Sub-Zero Feel)',
    shelfLife: '180 Days',
    provenance: 'Bhavnagar Kagzi Lime Orchards',
    sensoryScores: { fizz: 98, sweetness: 45, spice: 10, tang: 90 },
    ingredients: [
      'Pure Carbonated Spring-Grade Water',
      'Cold-Pressed Lime Peel Emulsion',
      'Refined Cane Sugar',
      'Citric Acid',
      'Natural Mineral Salts',
    ],
    notes: ['Ultra-Crisp Clear Soda', 'Pure Cold-Pressed Lime Oil', 'Zero Caffeine', 'Instant Street Refresher'],
    variants: [
      { bottle_size: '200ml Glass / PET', mrp: '₹12', wholesale: '₹9.50' },
      { bottle_size: '500ml Chilled PET', mrp: '₹25', wholesale: '₹19.50' },
      { bottle_size: '1.25L Party Pack', mrp: '₹50', wholesale: '₹39.00' },
    ],
  },
  {
    id: 4,
    index: '04',
    name: 'Heritage Cola Classic',
    slug: 'heritage-cola-classic',
    category: 'CARBONATED',
    tagline: 'Spiced Botanical Caramel Effervescence',
    flavour: 'Cinnamon, Clove & Spiced Kola Nut',
    description:
      'A deep homage to vintage Indian soda fountains. Micro-brewed with crushed cinnamon quills, clove pods, star anise, and toasted caramel, married with dense effervescence. A warm, botanical complexity that leaves multinational colas behind.',
    image_url: '/images/drinks/heritage-cola-photo.jpg',
    accentColor: '#E11D48',
    accentGlow: 'rgba(225, 29, 72, 0.28)',
    carbonationVol: '4.2 Vol',
    servingTemp: '3°C - 5°C',
    shelfLife: '180 Days',
    provenance: 'Malabar Spices & Roasted Cane Caramel',
    sensoryScores: { fizz: 90, sweetness: 65, spice: 75, tang: 40 },
    ingredients: [
      'Carbonated Water',
      'Toasted Caramel (INS 150d)',
      'Natural Kola Nut Extract',
      'Cinnamon & Clove Infusion',
      'Star Anise Essence',
      'Phosphoric Acid',
    ],
    notes: ['Warm Cinnamon Undertones', 'Toasted Caramel Velvet', 'Bold Indian Spice Profile', 'Dense Fizzy Head'],
    variants: [
      { bottle_size: '200ml Glass / PET', mrp: '₹12', wholesale: '₹9.50' },
      { bottle_size: '500ml Chilled PET', mrp: '₹25', wholesale: '₹19.50' },
      { bottle_size: '1.25L Party Pack', mrp: '₹50', wholesale: '₹39.00' },
    ],
  },
  {
    id: 5,
    index: '05',
    name: 'Royal Orange Punch',
    slug: 'royal-orange-punch',
    category: 'CARBONATED',
    tagline: 'Sun-Drenched Nagpur Citrus Thrill',
    flavour: 'Nagpur Mandarin & Candied Citrus Peel',
    description:
      'Lush, sun-kissed citrus bursting with vivid effervescence. Bottled with sweet Nagpur orange juice solids and aromatic citrus peel oils for a nostalgic soda-shop punch that crackles across the tongue.',
    image_url: '/images/drinks/orange-punch-photo.jpg',
    accentColor: '#F97316',
    accentGlow: 'rgba(249, 115, 22, 0.28)',
    carbonationVol: '3.9 Vol',
    servingTemp: '4°C Chilled',
    shelfLife: '180 Days',
    provenance: 'Nagpur Sun-Ripened Mandarin Groves',
    sensoryScores: { fizz: 82, sweetness: 70, spice: 15, tang: 75 },
    ingredients: [
      'Carbonated Water',
      'Nagpur Orange Juice Solids',
      'Natural Orange Essential Oils',
      'Cane Sugar',
      'Citric Acid',
      'Beta-Carotene',
    ],
    notes: ['Sunburst Mandarin Aroma', 'Velvety Citrus Body', 'Vibrant Effervescence', 'Childhood Soda Nostalgia'],
    variants: [
      { bottle_size: '200ml Glass / PET', mrp: '₹12', wholesale: '₹9.50' },
      { bottle_size: '500ml Chilled PET', mrp: '₹25', wholesale: '₹19.50' },
    ],
  },
  {
    id: 6,
    index: '06',
    name: 'Desi Masala Chaas',
    slug: 'desi-masala-chaas',
    category: 'DAIRY',
    tagline: 'Slow-Churned Kathiyawadi Buttermilk',
    flavour: 'Cultured Dahi, Hing & Roasted Jeera',
    description:
      'The sacred foundation of the Gujarati meal. Churned traditionally from whole-milk curd, infused with crushed roasted cumin, digestive asafoetida (hing), spicy green chillies, and rock salt. Probiotic, cooling, and completely gut-restorative.',
    image_url: '/images/drinks/masala-chaas-photo.jpg',
    accentColor: '#34D399',
    accentGlow: 'rgba(52, 211, 153, 0.28)',
    carbonationVol: 'Still (Probiotic Churned)',
    servingTemp: '3°C - 5°C (Strict Cold Chain)',
    shelfLife: '14 Days',
    provenance: 'Saurashtra Dairy Cooperatives',
    sensoryScores: { fizz: 0, sweetness: 10, spice: 75, tang: 85 },
    ingredients: [
      'Pasteurized Whole Milk Cultured Dahi',
      'Treated Water',
      'Hand-Roasted Cumin',
      'Pure Hing (Compounded Asafoetida)',
      'Green Chilli Puree',
      'Fresh Mint & Coriander Essence',
      'Kala Namak',
    ],
    notes: ['Slow-Churned Dahi Base', 'Digestive Hing & Cumin', '100% Probiotic Cultures', 'Kathiyawadi Thali Staple'],
    variants: [
      { bottle_size: '200ml Spout Pouch', mrp: '₹15', wholesale: '₹12.00' },
      { bottle_size: '500ml Chilled Bottle', mrp: '₹30', wholesale: '₹24.00' },
    ],
  },
  {
    id: 7,
    index: '07',
    name: 'Rajwadi Sweet Lassi',
    slug: 'rajwadi-sweet-lassi',
    category: 'DAIRY',
    tagline: 'Spoon-Thick Saurashtra Velvet',
    flavour: 'Dense Malai Curd & Green Cardamom',
    description:
      'Ultra-dense, velvety lassi crafted from thick whole-milk dahi topped with luscious malai curd, seasoned with freshly cracked green cardamom seeds and pure cane sweetness. Royal indulgence from the heritage royal dhabas of Saurashtra.',
    image_url: '/images/drinks/rajwadi-lassi-photo.jpg',
    accentColor: '#F59E0B',
    accentGlow: 'rgba(245, 158, 11, 0.28)',
    carbonationVol: 'Dense Velvet Texture',
    servingTemp: '4°C (Thick & Chilled)',
    shelfLife: '10 Days',
    provenance: 'Gir Cow Milk Cooperatives',
    sensoryScores: { fizz: 0, sweetness: 85, spice: 30, tang: 35 },
    ingredients: [
      'Whole Milk Cultured Dahi with Natural Malai Layer',
      'Sulphur-Free Cane Sugar',
      'Green Cardamom (Elaichi) Extract',
      'Distilled Rose Petal Essence',
    ],
    notes: ['Dense Malai Texture', 'Aromatic Elaichi Seeds', 'Pure Whole Milk Curd', 'Royal Dessert Comfort'],
    variants: [
      { bottle_size: '200ml Clay-Cup Matka Pack', mrp: '₹25', wholesale: '₹20.00' },
      { bottle_size: '500ml Chilled Bottle', mrp: '₹55', wholesale: '₹44.00' },
    ],
  },
  {
    id: 8,
    index: '08',
    name: 'Kesar Pista Flavoured Milk',
    slug: 'kesar-pista-milk',
    category: 'DAIRY',
    tagline: 'Kashmiri Saffron & Crunchy Pistachio Slivers',
    flavour: 'Real Saffron Strands & Roasted Pista',
    description:
      'Sterilized double-toned milk infused with genuine crimson Kashmiri saffron threads, crunchy roasted pistachio slivers, and fragrant green cardamom. A regal celebratory pour that balances richness with delicate spice.',
    image_url: '/images/drinks/kesar-pista-photo.jpg',
    accentColor: '#CA8A04',
    accentGlow: 'rgba(202, 138, 4, 0.28)',
    carbonationVol: 'Silky Sterilized Milk',
    servingTemp: '4°C - 7°C',
    shelfLife: '120 Days (Sterilized)',
    provenance: 'Pampore Saffron & Gujarat Dairy Sterilization',
    sensoryScores: { fizz: 0, sweetness: 80, spice: 40, tang: 10 },
    ingredients: [
      'Double Toned Milk (min. 1.5% fat, 9.0% SNF)',
      'Natural Kashmiri Saffron (Kesar) Strands',
      'Crushed Roasted Pistachio (Pista) Pieces',
      'Cane Sugar',
      'Cardamom Essence',
    ],
    notes: ['Genuine Kashmiri Kesar', 'Crunchy Pista Slivers', 'Sterilized Shelf-Stable', 'Celebratory Royal Sip'],
    variants: [
      { bottle_size: '200ml Crown Cap Glass Bottle', mrp: '₹35', wholesale: '₹28.00' },
    ],
  },
];

export default function FlavourShowcase() {
  const [flavours, setFlavours] = useState<FlavourItem[]>(defaultFlavours);
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'CARBONATED' | 'DAIRY'>('ALL');
  const [selectedSlug, setSelectedSlug] = useState<string>('jeera-masala-fizz');
  const [modalItem, setModalItem] = useState<FlavourItem | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await api.getPublicProducts();
        if (data && data.length > 0) {
          const mapped: FlavourItem[] = data.map((item) => {
            const fallback = defaultFlavours.find((d) => d.slug === item.slug) || defaultFlavours[0];
            return {
              ...fallback,
              id: item.id,
              name: item.name,
              slug: item.slug,
              category: (item.category === 'DAIRY' ? 'DAIRY' : 'CARBONATED') as 'CARBONATED' | 'DAIRY',
              flavour: item.flavour,
              description: item.description || fallback.description,
              variants:
                item.variants && item.variants.length > 0
                  ? item.variants.map((v) => ({
                      bottle_size: v.bottle_size,
                      mrp: `₹${v.mrp}`,
                      wholesale: `₹${v.selling_price || (Number(v.mrp) * 0.8).toFixed(2)}`,
                    }))
                  : fallback.variants,
            };
          });
          setFlavours(mapped);
        }
      } catch {
        // Retain defaultFlavours when backend is unavailable
      }
    }
    loadProducts();
  }, []);

  const visibleFlavours = flavours.filter((f) => {
    if (filterCategory === 'ALL') return true;
    return f.category === filterCategory;
  });

  const active = flavours.find((f) => f.slug === selectedSlug) || visibleFlavours[0] || defaultFlavours[0];

  return (
    <section id="flavours" className="relative py-24 sm:py-32 bg-[#06070a] overflow-hidden border-b border-white/[0.08]">
      {/* Dynamic Ambient Fluid Glow */}
      <div
        style={{ backgroundColor: active.accentGlow }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full blur-[160px] pointer-events-none transition-colors duration-700 opacity-40"
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Curated Editorial Exhibition Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>THE TASTING VAULT</span>
              <span className="text-zinc-600">/</span>
              <span>8 SIGNATURE FORMULATIONS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              ARCHIVE OF <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-emerald-400 bg-clip-text text-transparent">
                REGIONAL FLAVORS.
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setFilterCategory('ALL')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                filterCategory === 'ALL'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All 8 Pours
            </button>
            <button
              onClick={() => setFilterCategory('CARBONATED')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                filterCategory === 'CARBONATED'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="h-3 w-3" />
              <span>Carbonated (5)</span>
            </button>
            <button
              onClick={() => setFilterCategory('DAIRY')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                filterCategory === 'DAIRY'
                  ? 'bg-emerald-400 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Milk className="h-3 w-3" />
              <span>Dairy (3)</span>
            </button>
          </div>
        </div>

        {/* Horizontal Exhibition Index Ribbon */}
        <div className="py-6 overflow-x-auto no-scrollbar flex items-center gap-3 border-b border-white/[0.08]">
          {visibleFlavours.map((item) => {
            const isSelected = item.slug === active.slug;
            return (
              <button
                key={item.slug}
                onClick={() => setSelectedSlug(item.slug)}
                className={`flex-shrink-0 flex items-center gap-3.5 px-4 py-3 rounded-xl border transition-all duration-300 text-left ${
                  isSelected
                    ? 'bg-white/[0.08] border-white/30 shadow-xl scale-[1.02]'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15 opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  style={{
                    backgroundColor: isSelected ? item.accentColor : 'rgba(255,255,255,0.1)',
                    color: isSelected ? '#000000' : '#ffffff',
                  }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors"
                >
                  {item.index}
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-display font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {item.flavour.split('&')[0].trim()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Exhibition Stage: Asymmetrical Gallery View */}
        <div className="pt-10 sm:pt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left: Hyper-Realistic Bottle Artwork Stage */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/[0.05] to-black/90 shadow-2xl p-6 group">
              {/* Pedestal Ambient Spotlight */}
              <div
                style={{ backgroundColor: active.accentGlow }}
                className="absolute inset-0 blur-3xl opacity-40 transition-colors duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />

              {/* Dynamic Bottle Photo with smooth keyframe switch */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex items-center justify-center z-10"
                >
                  <Image
                    src={active.image_url}
                    alt={active.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    priority
                    className="object-cover rounded-2xl filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                  />

                  {/* Overlaid Botanical Pedigree Node */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active.accentColor }} />
                      <span className="text-zinc-300 uppercase">{active.provenance}</span>
                    </div>
                    <span className="text-zinc-400">{active.servingTemp}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Curated Beverage Dossier */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Header Telemetry */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                style={{
                  borderColor: `${active.accentColor}55`,
                  backgroundColor: `${active.accentColor}18`,
                  color: active.accentColor,
                }}
                className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border"
              >
                No. {active.index} • {active.category === 'DAIRY' ? 'Kathiyawadi Dairy' : 'Carbonated Soda'}
              </span>
              {active.carbonationVol && (
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 bg-white/[0.04] px-3 py-1 rounded-md border border-white/[0.08]">
                  {active.carbonationVol}
                </span>
              )}
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                Shelf: {active.shelfLife}
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1">
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {active.name}
              </h3>
              <p className="text-sm sm:text-base font-mono text-amber-400 font-semibold">
                {active.tagline}
              </p>
            </div>

            {/* Narrative description */}
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
              {active.description}
            </p>

            {/* Sensoric Balance Profile Meters */}
            <div className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  Sensory Balance Calibration
                </span>
                <span className="text-zinc-500">LAB INDEX</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Meter 1: Fizz */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                    <span>Fizz Pressure</span>
                    <span className="text-white font-bold">{active.sensoryScores.fizz}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${active.sensoryScores.fizz}%`, backgroundColor: active.accentColor }}
                      className="h-full rounded-full transition-all duration-700"
                    />
                  </div>
                </div>

                {/* Meter 2: Tang */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                    <span>Acidity / Tang</span>
                    <span className="text-white font-bold">{active.sensoryScores.tang}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${active.sensoryScores.tang}%`, backgroundColor: active.accentColor }}
                      className="h-full rounded-full transition-all duration-700"
                    />
                  </div>
                </div>

                {/* Meter 3: Spice */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                    <span>Spice Pungency</span>
                    <span className="text-white font-bold">{active.sensoryScores.spice}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${active.sensoryScores.spice}%`, backgroundColor: active.accentColor }}
                      className="h-full rounded-full transition-all duration-700"
                    />
                  </div>
                </div>

                {/* Meter 4: Sweetness */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                    <span>Sweetness</span>
                    <span className="text-white font-bold">{active.sensoryScores.sweetness}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${active.sensoryScores.sweetness}%`, backgroundColor: active.accentColor }}
                      className="h-full rounded-full transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Commercial Packaging Formats & Crate Economics */}
            <div className="w-full space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-400">
                <span>Standard Packaging Formats</span>
                <span className="text-amber-400 font-semibold">Wholesale Dealer Rate</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {active.variants?.map((v, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-col justify-between"
                  >
                    <span className="text-xs font-mono text-zinc-400">{v.bottle_size}</span>
                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-base font-display font-extrabold text-white">{v.mrp}</span>
                      {v.wholesale && (
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          Deal: {v.wholesale}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3.5 w-full">
              <button
                onClick={() => setModalItem(active)}
                className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-white/[0.09] hover:border-white/30 transition-all"
              >
                <Info className="h-4 w-4 text-amber-400" />
                <span>Ingredients & Lab Dossier</span>
              </button>

              <a
                href="#retailers"
                style={{ backgroundColor: active.accentColor }}
                className="flex items-center gap-2 rounded-lg px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-black shadow-xl hover:opacity-90 transition-all"
              >
                <span>Book Crates for {active.name}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Laboratory Quality & Ingredient Specification Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0c0e14] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setModalItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3">
                <span
                  style={{ backgroundColor: modalItem.accentColor }}
                  className="w-2.5 h-2.5 rounded-full"
                />
                <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">
                  Batch Technical Dossier
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {modalItem.name}
              </h3>
              <p className="text-xs font-mono text-zinc-400">{modalItem.tagline}</p>
            </div>

            <div className="space-y-5">
              {/* Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400">Serving Protocol</span>
                  <p className="text-sm font-display font-bold text-white mt-1">{modalItem.servingTemp}</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400">Shelf Stability</span>
                  <p className="text-sm font-display font-bold text-white mt-1">{modalItem.shelfLife}</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400">Sourcing Terroir</span>
                  <p className="text-sm font-display font-bold text-amber-400 mt-1">{modalItem.provenance}</p>
                </div>
              </div>

              {/* Full Ingredients List */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                  Verified Formulation Ingredients
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                  {modalItem.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cold Chain Protocol Notice */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <strong className="text-amber-300 font-semibold">Strict Temperature Compliance:</strong>
                  <p className="text-zinc-300 mt-0.5">
                    Every batch dispatched from our Naroda Central Bottling Plant is sealed at 3°C - 5°C with insulated crate liners. Returnable glass bottles require a ₹50 refundable crate security deposit for verified stockists.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalItem(null)}
                className="px-6 py-2.5 rounded-lg bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

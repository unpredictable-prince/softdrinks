'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, Check, ChevronRight, Zap, Milk, Info, X, ShieldAlert, Thermometer, Layers } from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/types';

interface FlavourItem {
  id: number;
  name: string;
  slug: string;
  category: 'CARBONATED' | 'DAIRY';
  flavour: string;
  description: string;
  image_url: string;
  accentColor: string;
  badge: string;
  servingTemp: string;
  shelfLife: string;
  ingredients: string[];
  notes: string[];
  variants: {
    bottle_size: string;
    mrp: string;
  }[];
}

const defaultFlavours: FlavourItem[] = [
  {
    id: 1,
    name: 'Jeera Masala Fizz',
    slug: 'jeera-masala-fizz',
    category: 'CARBONATED',
    flavour: 'Roasted Jeera & Rock Salt',
    description: 'A signature Gujarat digestive cooler infused with roasted cumin, kala namak, crisp lemon notes, and high carbonation.',
    image_url: '/images/drinks/jeera-masala.svg',
    accentColor: '#f59e0b',
    badge: 'State Bestseller',
    servingTemp: '3°C - 5°C (Chilled)',
    shelfLife: '6 Months',
    ingredients: ['Carbonated Treated Water', 'Roasted Cumin Extract', 'Black Salt (Kala Namak)', 'Citric Acid', 'Permitted Condiments'],
    notes: ['Digestive Rock Salt', 'Hand-roasted Cumin', '4.2 Vol Carbonation'],
    variants: [
      { bottle_size: '200ml Glass/PET', mrp: '₹12' },
      { bottle_size: '500ml PET', mrp: '₹25' },
      { bottle_size: '1.25L Party Pack', mrp: '₹50' },
    ],
  },
  {
    id: 2,
    name: 'Kachi Keri Spark',
    slug: 'kachi-keri-spark',
    category: 'CARBONATED',
    flavour: 'Raw Mango & Mint',
    description: 'Zesty raw green mango with a hint of fresh garden mint, crafted to beat the scorching Gujarat heat with electrifying punch.',
    image_url: '/images/drinks/kachi-keri.svg',
    accentColor: '#22c55e',
    badge: 'Summer Special',
    servingTemp: '4°C (Chilled)',
    shelfLife: '6 Months',
    ingredients: ['Carbonated Water', 'Raw Green Mango Pulp Concentrate', 'Mint Extract', 'Rock Salt', 'Natural Flavorings'],
    notes: ['Sour Green Mango', 'Garden Mint Zing', 'Crisp Tanginess'],
    variants: [
      { bottle_size: '200ml Glass/PET', mrp: '₹12' },
      { bottle_size: '500ml PET', mrp: '₹25' },
    ],
  },
  {
    id: 3,
    name: 'Lemon Lime Burst',
    slug: 'lemon-lime-burst',
    category: 'CARBONATED',
    flavour: 'Sparkling Citrus Lemon',
    description: 'Ultra-crisp clear carbonated lemon-lime with electrifying fizz and pure mineral refreshment.',
    image_url: '/images/drinks/lemon-lime.svg',
    accentColor: '#eab308',
    badge: 'Zero Caffeine',
    servingTemp: '2°C - 4°C',
    shelfLife: '6 Months',
    ingredients: ['Sparkling Demineralized Water', 'Natural Lemon-Lime Emulsion', 'Sugar', 'Citric Acid'],
    notes: ['Clear Sparkling Soda', 'Natural Lime Oil', 'Clean Refreshment'],
    variants: [
      { bottle_size: '200ml Glass/PET', mrp: '₹12' },
      { bottle_size: '500ml PET', mrp: '₹25' },
      { bottle_size: '1.25L Party Pack', mrp: '₹50' },
    ],
  },
  {
    id: 4,
    name: 'Heritage Cola Classic',
    slug: 'heritage-cola-classic',
    category: 'CARBONATED',
    flavour: 'Spiced Caramel Cola',
    description: 'Deep effervescent spiced caramel cola with cinnamon and clove undertones for an authentic Indian punch.',
    image_url: '/images/drinks/heritage-cola.svg',
    accentColor: '#ef4444',
    badge: 'Vintage Recipe',
    servingTemp: '3°C - 5°C',
    shelfLife: '6 Months',
    ingredients: ['Carbonated Water', 'Caramel Color (INS 150d)', 'Spiced Kola Nut Extract', 'Cinnamon & Clove Essence'],
    notes: ['Spiced Caramel', 'Cinnamon Undertones', 'High Carbonation'],
    variants: [
      { bottle_size: '200ml Glass/PET', mrp: '₹12' },
      { bottle_size: '500ml PET', mrp: '₹25' },
      { bottle_size: '1.25L Party Pack', mrp: '₹50' },
    ],
  },
  {
    id: 5,
    name: 'Royal Orange Punch',
    slug: 'royal-orange-punch',
    category: 'CARBONATED',
    flavour: 'Tangy Nagpur Orange',
    description: 'Sun-drenched citrus sweetness bursting with vivid effervescence and nostalgic soda fountain thrill.',
    image_url: '/images/drinks/orange-punch.svg',
    accentColor: '#f97316',
    badge: 'Fountain Classic',
    servingTemp: '4°C',
    shelfLife: '6 Months',
    ingredients: ['Carbonated Water', 'Orange Juice Solids', 'Citric Acid', 'Natural Essential Orange Oils'],
    notes: ['Nagpur Orange Notes', 'Sunburst Citrus', 'Rich Fizzy Head'],
    variants: [
      { bottle_size: '200ml Glass/PET', mrp: '₹12' },
      { bottle_size: '500ml PET', mrp: '₹25' },
    ],
  },
  {
    id: 6,
    name: 'Desi Masala Chaas',
    slug: 'desi-masala-chaas',
    category: 'DAIRY',
    flavour: 'Slow-Churned Hing & Roasted Jeera',
    description: 'Traditional Gujarat spiced buttermilk churned from fresh curd, blended with roasted cumin, green chillies, rock salt, and fresh coriander.',
    image_url: '/images/drinks/masala-chaas.svg',
    accentColor: '#10b981',
    badge: 'Kathiyawadi Pride',
    servingTemp: '4°C - 6°C (Refrigerated)',
    shelfLife: '14 Days (Cold Chain)',
    ingredients: ['Cultured Pasteurized Milk (Dahi)', 'Filtered Water', 'Roasted Cumin', 'Hing (Asafoetida)', 'Green Chilli & Mint Paste', 'Rock Salt'],
    notes: ['Slow Churned Dahi', 'Digestive Hing & Jeera', '100% Probiotic Natural'],
    variants: [
      { bottle_size: '200ml Spout Pouch', mrp: '₹15' },
      { bottle_size: '500ml Chilled Bottle', mrp: '₹30' },
    ],
  },
  {
    id: 7,
    name: 'Rajwadi Sweet Lassi',
    slug: 'rajwadi-sweet-lassi',
    category: 'DAIRY',
    flavour: 'Thick Malai & Cardamom',
    description: 'Ultra-thick velvety Gujarati lassi made from whole milk dahi, delicately spiced with cardamom seeds and pure cane sweetness.',
    image_url: '/images/drinks/rajwadi-lassi.svg',
    accentColor: '#d97706',
    badge: 'Royal Indulgence',
    servingTemp: '4°C (Thick & Chilled)',
    shelfLife: '10 Days (Cold Chain)',
    ingredients: ['Whole Milk Dahi with Natural Malai', 'Sulphur-free Cane Sugar', 'Green Cardamom (Elaichi) Extract', 'Rose Water Essence'],
    notes: ['Dense Malai Curd', 'Green Cardamom Aroma', 'Rich Velvet Texture'],
    variants: [
      { bottle_size: '200ml Clay-Cup Pack', mrp: '₹25' },
      { bottle_size: '500ml Bottle', mrp: '₹55' },
    ],
  },
  {
    id: 8,
    name: 'Kesar Pista Flavoured Milk',
    slug: 'kesar-pista-milk',
    category: 'DAIRY',
    flavour: 'Kashmiri Kesar & Crunchy Pista',
    description: 'Creamy sterilized milk infused with genuine Kashmiri saffron strands, crunchy roasted pistachio slivers, and mild sweetness.',
    image_url: '/images/drinks/kesar-pista-milk.svg',
    accentColor: '#ca8a04',
    badge: 'Celebration Sip',
    servingTemp: '4°C - 7°C',
    shelfLife: '120 Days (Sterilized)',
    ingredients: ['Double Toned Milk', 'Natural Saffron (Kesar) Strands', 'Crushed Pistachio Pieces', 'Cane Sugar', 'Almond Flavor Notes'],
    notes: ['Real Kashmiri Kesar', 'Crunchy Pistachio Slivers', 'Sterilized Shelf Stable'],
    variants: [
      { bottle_size: '200ml Glass Bottle', mrp: '₹35' },
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
              id: item.id,
              name: item.name,
              slug: item.slug,
              category: (item.category === 'DAIRY' ? 'DAIRY' : 'CARBONATED') as 'CARBONATED' | 'DAIRY',
              flavour: item.flavour,
              description: item.description || fallback.description,
              image_url: fallback.image_url,
              accentColor: fallback.accentColor,
              badge: fallback.badge,
              servingTemp: fallback.servingTemp,
              shelfLife: fallback.shelfLife,
              ingredients: fallback.ingredients,
              notes: fallback.notes,
              variants: item.variants && item.variants.length > 0
                ? item.variants.map((v) => ({
                    bottle_size: v.bottle_size,
                    mrp: `₹${v.mrp}`,
                  }))
                : fallback.variants,
            };
          });
          setFlavours(mapped);
        }
      } catch (err) {
        console.log('Using fallback flavours while backend syncs');
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
    <section id="flavours" className="py-20 lg:py-28 bg-[#0c0e14] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Bottled to Perfection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Explore The <span className="gradient-text">Complete Beverage Catalog</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-base sm:text-lg">
            High-carbonation soft drinks and authentic slow-churned Gujarat dairy refreshers, crafted for restaurants, kirana stores, and street food stalls.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filterCategory === 'ALL'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            All Products ({flavours.length})
          </button>
          <button
            onClick={() => setFilterCategory('CARBONATED')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filterCategory === 'CARBONATED'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>Carbonated Sodas (5)</span>
          </button>
          <button
            onClick={() => setFilterCategory('DAIRY')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filterCategory === 'DAIRY'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            <Milk className="h-4 w-4" />
            <span>Gujarat Dairy Coolers (3)</span>
          </button>
        </div>

        {/* Flavour Horizontal Scroll Selector */}
        <div className="flex overflow-x-auto pb-4 gap-2.5 sm:justify-center no-scrollbar mb-10">
          {visibleFlavours.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedSlug(f.slug)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedSlug === f.slug
                  ? f.category === 'DAIRY'
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        {/* Active Product Detailed Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          {/* Subtle category badge watermark */}
          <div className="absolute top-4 right-6 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
            {active.category === 'DAIRY' ? 'Gujarat Dairy Refresher' : 'Carbonated Beverage'}
          </div>

          {/* Bottle Visual Column */}
          <div className="lg:col-span-5 flex justify-center items-center py-6">
            <div className="relative w-64 h-[440px] transition-transform duration-500 hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]">
              <Image
                key={active.slug}
                src={active.image_url}
                alt={active.name}
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Details & Specs Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold border ${
                  active.category === 'DAIRY'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}
              >
                {active.badge}
              </span>
              <span className="text-sm font-semibold text-zinc-400">
                {active.flavour}
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              {active.name}
            </h3>

            <p className="text-zinc-300 text-base leading-relaxed">
              {active.description}
            </p>

            {/* Tasting Notes */}
            <div className="space-y-2 w-full">
              <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                Tasting & Formulation Highlights
              </p>
              <div className="flex flex-wrap gap-2">
                {active.notes?.map((n: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-zinc-200"
                  >
                    <Check className={`h-3.5 w-3.5 ${active.category === 'DAIRY' ? 'text-emerald-400' : 'text-amber-400'}`} />
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Pack Size Variants Available */}
            <div className="space-y-2 w-full pt-1">
              <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                Available Bottling Formats & Standard MRP
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                {active.variants?.map((v: any, vi: number) => (
                  <div key={vi} className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col">
                    <span className="text-xs text-zinc-400 font-medium">{v.bottle_size}</span>
                    <span className="text-lg font-bold text-white mt-1">{v.mrp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap gap-3 w-full">
              <button
                onClick={() => setModalItem(active)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                <Info className="h-4 w-4 text-amber-400" />
                View Ingredients & Quality Specs
              </button>

              <a
                href="#retailers"
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-black transition-all ${
                  active.category === 'DAIRY'
                    ? 'bg-emerald-500 hover:bg-emerald-400'
                    : 'bg-amber-500 hover:bg-amber-400'
                }`}
              >
                Inquire Wholesale Crates for {active.name}
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specification Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#11131c] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setModalItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold border ${
                  modalItem.category === 'DAIRY'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}
              >
                {modalItem.category === 'DAIRY' ? 'Dairy Cooler' : 'Carbonated Beverage'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{modalItem.name}</h3>
            </div>

            <p className="text-sm text-zinc-300 mb-6">{modalItem.description}</p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 flex items-center gap-3">
                  <Thermometer className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="text-[11px] text-zinc-400 uppercase font-semibold">Serving Temperature</p>
                    <p className="text-sm font-bold text-white">{modalItem.servingTemp}</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 flex items-center gap-3">
                  <Layers className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-[11px] text-zinc-400 uppercase font-semibold">Shelf Life</p>
                    <p className="text-sm font-bold text-white">{modalItem.shelfLife}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Ingredients & Formulation</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {modalItem.ingredients.map((ing, idx) => (
                    <li key={idx} className="text-xs text-zinc-300 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-300">Commercial Cold Chain & Logistics</p>
                  <p className="text-xs text-zinc-300 mt-1">
                    Delivered in temperature-monitored distribution crates. Standard crate configuration: 24 units per crate (200ml) or 12 units (500ml). Returnable crate deposit terms available for verified retail stockists.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalItem(null)}
                className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all"
              >
                Close Specifications
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, Check, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/types';

// Fallback catalog in case backend is loading
const defaultFlavours = [
  {
    id: 1,
    name: 'Jeera Masala Fizz',
    slug: 'jeera-masala-fizz',
    flavour: 'Roasted Jeera & Rock Salt',
    description: 'A signature Gujarat digestive cooler infused with roasted cumin, rock salt (kala namak), crisp lemon notes, and high carbonation.',
    image_url: '/images/drinks/jeera-masala.svg',
    accentColor: '#f59e0b',
    badge: 'State Bestseller',
    notes: ['Digestive Rock Salt', 'Hand-roasted Cumin', 'Ultra Sparkle'],
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
    flavour: 'Raw Mango & Mint',
    description: 'Zesty raw green mango with a hint of fresh garden mint, crafted to beat the scorching Gujarat heat with electrifying punch.',
    image_url: '/images/drinks/kachi-keri.svg',
    accentColor: '#22c55e',
    badge: 'Seasonal Craving',
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
    flavour: 'Sparkling Citrus Lemon',
    description: 'Ultra-crisp clear carbonated lemon-lime with electrifying fizz and pure mineral refreshment.',
    image_url: '/images/drinks/lemon-lime.svg',
    accentColor: '#eab308',
    badge: 'Zero Caffeine',
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
    flavour: 'Spiced Caramel Cola',
    description: 'Deep effervescent spiced caramel cola with cinnamon and clove undertones for an authentic Indian punch.',
    image_url: '/images/drinks/heritage-cola.svg',
    accentColor: '#ef4444',
    badge: 'Vintage Recipe',
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
    flavour: 'Tangy Nagpur Orange',
    description: 'Sun-drenched citrus sweetness bursting with vivid effervescence and nostalgic soda fountain thrill.',
    image_url: '/images/drinks/orange-punch.svg',
    accentColor: '#f97316',
    badge: 'Fountain Classic',
    notes: ['Nagpur Orange Notes', 'Sunburst Citrus', 'Rich Fizzy Head'],
    variants: [
      { bottle_size: '200ml Glass/PET', mrp: '₹12' },
      { bottle_size: '500ml PET', mrp: '₹25' },
    ],
  },
];

export default function FlavourShowcase() {
  const [flavours, setFlavours] = useState<any[]>(defaultFlavours);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await api.getPublicProducts();
        if (data && data.length > 0) {
          // Map backend products to showcase items
          const mapped = data.map((item, idx) => {
            const defaultItem = defaultFlavours.find((d) => d.slug === item.slug) || defaultFlavours[idx % defaultFlavours.length];
            return {
              id: item.id,
              name: item.name,
              slug: item.slug,
              flavour: item.flavour,
              description: item.description || defaultItem.description,
              image_url: defaultItem.image_url,
              accentColor: defaultItem.accentColor,
              badge: defaultItem.badge,
              notes: defaultItem.notes,
              variants: item.variants.map((v) => ({
                bottle_size: v.bottle_size,
                mrp: `₹${v.mrp}`,
              })),
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

  const active = flavours[selectedIndex] || defaultFlavours[0];

  return (
    <section id="flavours" className="py-20 lg:py-28 bg-[#0c0e14] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Bottled to Perfection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Explore The <span className="gradient-text">Fizz Spectrum</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-base sm:text-lg">
            Every bottle is calibrated for maximum effervescence and tailored to local regional palates across Gujarat.
          </p>
        </div>

        {/* Flavour Navigation Tabs */}
        <div className="flex overflow-x-auto pb-4 gap-2.5 sm:justify-center no-scrollbar mb-12">
          {flavours.map((f, idx) => (
            <button
              key={f.id}
              onClick={() => setSelectedIndex(idx)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedIndex === idx
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        {/* Active Product Detailed Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Bottle Visual Column */}
          <div className="lg:col-span-5 flex justify-center items-center py-6">
            <div className="relative w-56 sm:w-64 h-[420px] transition-transform duration-500 hover:scale-105 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
              <Image
                src={active.image_url}
                alt={active.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Details & Specs Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
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
                Tasting & Formulation Notes
              </p>
              <div className="flex flex-wrap gap-2">
                {active.notes?.map((n: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-zinc-200"
                  >
                    <Check className="h-3.5 w-3.5 text-amber-400" />
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Pack Size Variants Available */}
            <div className="space-y-2 w-full pt-2">
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

            {/* Enquiry trigger */}
            <div className="pt-4 w-full sm:w-auto">
              <a
                href="#retailers"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-black hover:bg-amber-400 transition-all w-full sm:w-auto"
              >
                Inquire Wholesale Crates for {active.name}
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

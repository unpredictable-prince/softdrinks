'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Utensils, Sparkles, ChevronRight, Check, HeartHandshake } from 'lucide-react';

interface FoodPairing {
  id: string;
  foodName: string;
  regionalOrigin: string;
  description: string;
  pairedDrinkName: string;
  pairedDrinkSlug: string;
  pairedDrinkCategory: 'CARBONATED' | 'DAIRY';
  image_url: string;
  synergyRationale: string;
  keyNotes: string[];
}

const PAIRINGS: FoodPairing[] = [
  {
    id: 'thali',
    foodName: 'Kathiyawadi Thali & Bajra Rotlo',
    regionalOrigin: 'Saurashtra & Rajkot Region',
    description: 'Hearty meal featuring Sev Tameta Shaak, Ringna No Olo, fiery Garlic Chutney, and hot Bajra Rotlo with white butter.',
    pairedDrinkName: 'Desi Masala Chaas & Jeera Masala Fizz',
    pairedDrinkSlug: 'desi-masala-chaas',
    pairedDrinkCategory: 'DAIRY',
    image_url: '/images/drinks/masala-chaas.svg',
    synergyRationale: 'The rustic red-chilli and garlic warmth demands slow-churned dahi laced with hing and roasted cumin to soothe the stomach lining and aid heavy grain digestion.',
    keyNotes: ['Probiotic Gut Cooling', 'Digestive Hing-Jeera Punch', 'Authentic Village Pairing'],
  },
  {
    id: 'locho',
    foodName: 'Surati Locho & Nylon Khaman',
    regionalOrigin: 'Surat Street Banquets',
    description: 'Steamed yellow gram-flour delicacy served warm with spicy green coriander chutney, sev, and seasoned butter oil.',
    pairedDrinkName: 'Lemon Lime Burst',
    pairedDrinkSlug: 'lemon-lime-burst',
    pairedDrinkCategory: 'CARBONATED',
    image_url: '/images/drinks/lemon-lime.svg',
    synergyRationale: 'Clear, high-effervescence carbonation and natural lime oil slice cleanly through the richness of steamed besan and butter, keeping every bite light and fresh.',
    keyNotes: ['Zero Caffeine Sparkle', 'Cuts Through Savory Besan', 'Palate Cleansing Fizz'],
  },
  {
    id: 'dabeli',
    foodName: 'Kutchi Dabeli & Sev Usal',
    regionalOrigin: 'Kutch & Vadodara Food Lanes',
    description: 'Spiced potato mash stuffed in pav with sweet tamarind dates, spicy garlic paste, roasted peanuts, and spicy dried peas gravy.',
    pairedDrinkName: 'Kachi Keri Spark',
    pairedDrinkSlug: 'kachi-keri-spark',
    pairedDrinkCategory: 'CARBONATED',
    image_url: '/images/drinks/kachi-keri.svg',
    synergyRationale: 'Raw green mango tang combined with garden mint provides an electric counterpoint to the sweet tamarind chutney and fiery red chilli oil.',
    keyNotes: ['Sour Green Mango Zing', 'Cooling Garden Mint', 'Electrifying Street Food Buzz'],
  },
  {
    id: 'fafda',
    foodName: 'Sunday Jalebi-Fafda & Sambharo',
    regionalOrigin: 'Ahmedabad Sunday Ritual',
    description: 'Crunchy gram-flour fafda with papaya-sambharo, fried green chillies, and piping hot golden saffron-syrup jalebis.',
    pairedDrinkName: 'Rajwadi Sweet Lassi & Kesar Milk',
    pairedDrinkSlug: 'rajwadi-sweet-lassi',
    pairedDrinkCategory: 'DAIRY',
    image_url: '/images/drinks/rajwadi-lassi.svg',
    synergyRationale: 'The royal Gujarati Sunday breakfast tradition. Dense cardamom-perfumed curd and malai balance the ajwain salinity of fafda and the sweetness of jalebi.',
    keyNotes: ['Dense Malai Curd', 'Green Cardamom Fragrance', 'Royal Heritage Comfort'],
  },
  {
    id: 'pavbhaji',
    foodName: 'Midnight Pav Bhaji & Masala Pulao',
    regionalOrigin: 'Manek Chowk Night Market',
    description: 'Rich tomato, capsicum, and potato mash cooked with generous dollops of butter on giant cast-iron tawas.',
    pairedDrinkName: 'Heritage Cola Classic',
    pairedDrinkSlug: 'heritage-cola-classic',
    pairedDrinkCategory: 'CARBONATED',
    image_url: '/images/drinks/heritage-cola.svg',
    synergyRationale: 'Deep spiced cola infused with cinnamon and clove nuances cuts through the rich butter film and fuels the vibrant midnight energy of Ahmedabad street corners.',
    keyNotes: ['Warm Cinnamon & Clove', 'High 4.2 Vol Carbonation', 'Midnight Street Staple'],
  },
];

export default function FoodPairings() {
  const [activeId, setActiveId] = useState<string>('thali');

  const activePairing = PAIRINGS.find((p) => p.id === activeId) || PAIRINGS[0];

  return (
    <section id="pairings" className="py-20 lg:py-28 bg-[#0c0e14] relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 mb-3">
            <Utensils className="h-3.5 w-3.5" />
            <span>Culinary Harmony</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Authentic Gujarat <span className="gradient-text">Food & Beverage Pairings</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-base sm:text-lg">
            Beverages engineered to complement the distinct savory, sweet, and spicy regional dishes of Gujarat.
          </p>
        </div>

        {/* Pairing Tabs */}
        <div className="flex overflow-x-auto pb-4 gap-3 sm:justify-center no-scrollbar mb-10">
          {PAIRINGS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeId === p.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-102'
                  : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{p.foodName.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Pairing Detailed Showcase */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Drink Column */}
          <div className="lg:col-span-5 flex justify-center items-center py-4">
            <div className="relative w-56 sm:w-64 h-[420px] transition-transform duration-500 hover:scale-105 filter drop-shadow-[0_18px_32px_rgba(0,0,0,0.85)]">
              <Image
                key={activePairing.id}
                src={activePairing.image_url}
                alt={activePairing.pairedDrinkName}
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Pairing Explanations */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                {activePairing.regionalOrigin}
              </span>
              <span className="text-xs text-zinc-400 font-semibold">
                Perfect Beverage Companion
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activePairing.foodName}
              </h3>
              <p className="text-sm text-zinc-400 mt-1">
                {activePairing.description}
              </p>
            </div>

            {/* Drink Recommendation Callout */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-2">
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Recommended Pairing
                </span>
              </div>
              <p className="text-lg font-bold text-white">
                {activePairing.pairedDrinkName}
              </p>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                {activePairing.synergyRationale}
              </p>
            </div>

            {/* Synergy Checklist */}
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                Flavor Balance Science
              </p>
              <div className="flex flex-wrap gap-2">
                {activePairing.keyNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-zinc-200"
                  >
                    <Check className="h-3.5 w-3.5 text-amber-400" />
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Jump CTA */}
            <div className="pt-2">
              <a
                href="#stockists"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs sm:text-sm font-bold text-black hover:bg-amber-400 transition-all"
              >
                Find Stockists Serving This Pairing
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

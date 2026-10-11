'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Sparkles, Check, ArrowRight, HeartHandshake, MapPin } from 'lucide-react';

interface FoodPairing {
  id: string;
  index: string;
  foodName: string;
  regionalOrigin: string;
  description: string;
  pairedDrinkName: string;
  pairedDrinkSlug: string;
  pairedDrinkCategory: 'CARBONATED' | 'DAIRY';
  image_url: string;
  synergyRationale: string;
  scienceMechanism: string;
  keyNotes: string[];
}

const PAIRINGS: FoodPairing[] = [
  {
    id: 'thali',
    index: '01',
    foodName: 'Kathiyawadi Thali & Bajra Rotlo',
    regionalOrigin: 'Saurashtra & Rajkot Region',
    description:
      'Hearty rustic feast featuring Sev Tameta Shaak, Ringna No Olo, fiery Garlic Chutney, and hot Bajra Rotlo slathered in fresh white butter.',
    pairedDrinkName: 'Desi Masala Chaas',
    pairedDrinkSlug: 'desi-masala-chaas',
    pairedDrinkCategory: 'DAIRY',
    image_url: '/images/drinks/masala-chaas-photo.jpg',
    synergyRationale:
      'The rustic red-chilli and raw garlic warmth requires slow-churned cultured dahi laced with hing and roasted cumin to soothe the stomach lining and aid heavy coarse-grain digestion.',
    scienceMechanism: 'Casein protein binds to capsaicin receptors; roasted cumin stimulates gastric bile.',
    keyNotes: ['Probiotic Gut Cooling', 'Digestive Hing-Jeera Punch', 'Authentic Saurashtra Pairing'],
  },
  {
    id: 'locho',
    index: '02',
    foodName: 'Surati Locho & Nylon Khaman',
    regionalOrigin: 'Surat Street Food Banquets',
    description:
      'Steamed spiced gram-flour delicacy served warm with spicy green coriander chutney, fine nylon sev, and seasoned butter oil.',
    pairedDrinkName: 'Lemon Lime Burst',
    pairedDrinkSlug: 'lemon-lime-burst',
    pairedDrinkCategory: 'CARBONATED',
    image_url: '/images/drinks/lemon-lime-photo.jpg',
    synergyRationale:
      'Clear, high-effervescence 4.3 Vol carbonation and natural cold-pressed lime oils slice cleanly through the rich savory besan and butter, resetting the palate for every bite.',
    scienceMechanism: 'Citric acidity cleaves dense lipid films; micro-bubbles refresh tactile tongue papillae.',
    keyNotes: ['Zero Caffeine Sparkle', 'Cuts Through Savory Besan', 'Palate Cleansing Fizz'],
  },
  {
    id: 'dabeli',
    index: '03',
    foodName: 'Kutchi Dabeli & Sev Usal',
    regionalOrigin: 'Kutch & Vadodara Food Lanes',
    description:
      'Spiced potato mash stuffed in pav with sweet tamarind dates, spicy garlic paste, roasted peanuts, and fiery dried-peas usal gravy.',
    pairedDrinkName: 'Kachi Keri Spark',
    pairedDrinkSlug: 'kachi-keri-spark',
    pairedDrinkCategory: 'CARBONATED',
    image_url: '/images/drinks/kachi-keri-photo.jpg',
    synergyRationale:
      'Raw green mango malic acid combined with bruised garden mint provides an electric, sour-sweet counterpoint to deep tamarind sugar and fiery red chilli oil.',
    scienceMechanism: 'Malic acid amplifies tartness against sweet chutney, while carbonation cools chilli warmth.',
    keyNotes: ['Sour Green Mango Zing', 'Cooling Garden Mint', 'Electrifying Street Food Buzz'],
  },
  {
    id: 'fafda',
    index: '04',
    foodName: 'Sunday Jalebi-Fafda & Sambharo',
    regionalOrigin: 'Ahmedabad Sunday Morning Ritual',
    description:
      'Crisp ajwain-scented gram-flour fafda with warm raw papaya sambharo, fried green chillies, and piping hot golden saffron-syrup jalebis.',
    pairedDrinkName: 'Jeera Masala Fizz',
    pairedDrinkSlug: 'jeera-masala-fizz',
    pairedDrinkCategory: 'CARBONATED',
    image_url: '/images/drinks/jeera-masala-photo.jpg',
    synergyRationale:
      'The quintessential post-farsan antidote. High carbonation with black rock salt and roasted cumin breaks down heavy ajwain-oil fats and cuts through the intense sweetness of golden jalebi.',
    scienceMechanism: 'Alkaline mineral rock salt balances high sugar syrup; cumin accelerates salivary amylase.',
    keyNotes: ['Digestive Rock Salt', 'Cuts Morning Oil Richness', 'Sacred Ahmedabad Weekend Sip'],
  },
  {
    id: 'pavbhaji',
    index: '05',
    foodName: 'Midnight Pav Bhaji & Masala Pulao',
    regionalOrigin: 'Manek Chowk Night Market',
    description:
      'Rich tomato, capsicum, and potato mash cooked with generous slabs of melting butter on giant midnight cast-iron street tawas.',
    pairedDrinkName: 'Heritage Cola Classic',
    pairedDrinkSlug: 'heritage-cola-classic',
    pairedDrinkCategory: 'CARBONATED',
    image_url: '/images/drinks/heritage-cola-photo.jpg',
    synergyRationale:
      'Deep spiced cola infused with cinnamon quills, clove essence, and toasted caramel cuts through butter saturation and fuels the nocturnal energy of Ahmedabad historic streets.',
    scienceMechanism: 'Warm botanical polyphenols pair harmoniously with roasted street spices and melted butter.',
    keyNotes: ['Warm Cinnamon & Clove', 'High 4.2 Vol Effervescence', 'Midnight Street Companion'],
  },
];

export default function FoodPairings() {
  const [activeId, setActiveId] = useState<string>('thali');

  const activePairing = PAIRINGS.find((p) => p.id === activeId) || PAIRINGS[0];

  return (
    <section id="pairings" className="relative py-24 sm:py-32 bg-[#06070a] border-b border-white/[0.08] overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>THE SOMMELIER RADAR</span>
              <span className="text-zinc-600">/</span>
              <span>CULINARY SYNERGY</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              KATHIYAWADI THALI <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
                FLAVOR HARMONY.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-zinc-400 text-sm sm:text-base leading-relaxed">
            In Gujarat, drinks are formulated with intentional biochemistry—calibrated to balance rich groundnut oil, coarse millet grains, and fiery garlic masalas.
          </p>
        </div>

        {/* Interactive Food Menu Ribbon */}
        <div className="overflow-x-auto no-scrollbar flex items-center gap-3 pb-2 border-b border-white/[0.06]">
          {PAIRINGS.map((p) => {
            const isSelected = activeId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 text-left ${
                  isSelected
                    ? 'bg-white/[0.08] border-white/30 text-white shadow-lg scale-[1.02]'
                    : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className="font-mono text-xs font-bold text-amber-400">
                  {p.index}
                </span>
                <span className="text-xs font-display font-bold">
                  {p.foodName.split('&')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pairing Showcase Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left: Product Artwork Bottle Display */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/[0.05] to-black/90 shadow-2xl p-6 group">
              <div className="absolute inset-0 bg-radial-[circle_at_top,_rgba(229,169,60,0.15),_transparent_70%] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePairing.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                  className="relative w-full h-full flex items-center justify-center z-10"
                >
                  <Image
                    src={activePairing.image_url}
                    alt={activePairing.pairedDrinkName}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    priority
                    className="object-cover rounded-2xl filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
                  />

                  <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-amber-400 font-bold uppercase">{activePairing.pairedDrinkName}</span>
                    <span className="text-zinc-400">{activePairing.regionalOrigin}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Sommelier Chemistry & Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-300">
                {activePairing.regionalOrigin}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                Pairing Code No. {activePairing.index}
              </span>
            </div>

            {/* Dish Heading & Description */}
            <div className="space-y-1.5">
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {activePairing.foodName}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                {activePairing.description}
              </p>
            </div>

            {/* Synergy Callout Card */}
            <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="h-4 w-4" />
                <span>Culinary Synergy Rationale</span>
              </div>
              <p className="text-white text-base font-semibold leading-relaxed">
                {activePairing.synergyRationale}
              </p>
              <div className="pt-2 border-t border-white/[0.06] text-xs font-mono text-zinc-400 flex items-start gap-2">
                <span className="text-amber-400 font-bold uppercase">Biochemical Action:</span>
                <span>{activePairing.scienceMechanism}</span>
              </div>
            </div>

            {/* Key Flavor Notes Checklist */}
            <div className="space-y-2 w-full">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold">
                Sommelier Diagnostic Check
              </span>
              <div className="flex flex-wrap gap-2.5">
                {activePairing.keyNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] px-3.5 py-2 text-xs font-mono text-zinc-200"
                  >
                    <Check className="h-3.5 w-3.5 text-amber-400" />
                    <span>{note}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Link to stockists */}
            <div className="pt-2">
              <a
                href="#stockists"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-black shadow-lg hover:bg-amber-300 transition-all"
              >
                <span>Find Stockists Serving This Pairing</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw, MapPin, Store, CheckCircle2, Compass } from 'lucide-react';

interface QuizResult {
  title: string;
  matchName: string;
  slug: string;
  category: string;
  image_url: string;
  affinityScore: string;
  reason: string;
  flavorNote: string;
  idealFormat: string;
  accentColor: string;
}

const RESULTS: Record<string, QuizResult> = {
  JEERA: {
    title: 'Your Ultimate Sommelier Match',
    matchName: 'Jeera Masala Fizz',
    slug: 'jeera-masala-fizz',
    category: 'Carbonated Digestive Elixir',
    image_url: '/images/drinks/jeera-masala-photo.jpg',
    affinityScore: '98% Palate Affinity',
    reason:
      'Calibrated to 4.2 Vol CO₂ with hand-roasted Unjha cumin and volcanic Kutch black salt. Designed specifically to break down heavy farsan fats and provide an instant digestive palate reset.',
    flavorNote: 'Roasted Cumin, Mineral Kala Namak & Lime Zing',
    idealFormat: '200ml Returnable Glass Bottle (Chilled at 3°C)',
    accentColor: '#E5A93C',
  },
  CHAAS: {
    title: 'Your Ultimate Sommelier Match',
    matchName: 'Desi Masala Chaas',
    slug: 'desi-masala-chaas',
    category: 'Kathiyawadi Slow-Churned Dairy',
    image_url: '/images/drinks/masala-chaas-photo.jpg',
    affinityScore: '96% Palate Affinity',
    reason:
      'Traditional cultured whole-milk dahi churned cold with digestive hing, green chillies, and roasted cumin. Pure gut comfort that calms the thermal fire of spicy Kathiyawadi cuisine.',
    flavorNote: 'Cultured Dahi, Compounded Hing & Fresh Mint',
    idealFormat: '200ml Spout Pouch / 500ml Chilled Bottle',
    accentColor: '#34D399',
  },
  KERI: {
    title: 'Your Ultimate Sommelier Match',
    matchName: 'Kachi Keri Spark',
    slug: 'kachi-keri-spark',
    category: 'Seasonal Carbonated Raw Mango',
    image_url: '/images/drinks/kachi-keri-photo.jpg',
    affinityScore: '95% Palate Affinity',
    reason:
      'Cold-extracted green mango pulp and fresh bruised garden mint deliver an electric sour-sweet shock that instantly revives the senses under 45°C summer skies.',
    flavorNote: 'Tart Green Mango & Bruised Garden Mint',
    idealFormat: '200ml Chilled Glass Bottle',
    accentColor: '#10B981',
  },
  LEMON: {
    title: 'Your Ultimate Sommelier Match',
    matchName: 'Lemon Lime Burst',
    slug: 'lemon-lime-burst',
    category: 'Sparkling Citrus Demineralized Soda',
    image_url: '/images/drinks/lemon-lime-photo.jpg',
    affinityScore: '99% Palate Affinity',
    reason:
      'Pure demineralized sparkling water with cold-pressed Bhavnagar Kagzi lime oils. High 4.3 Vol carbonation with zero caffeine provides crystalline hydration that resets the palate.',
    flavorNote: 'Cold-Pressed Lime Peel & Crystalline Sparkle',
    idealFormat: '500ml Sub-Zero Chilled PET',
    accentColor: '#FACC15',
  },
  LASSI: {
    title: 'Your Ultimate Sommelier Match',
    matchName: 'Rajwadi Sweet Lassi',
    slug: 'rajwadi-sweet-lassi',
    category: 'Royal Saurashtra Sweet Dairy',
    image_url: '/images/drinks/rajwadi-lassi-photo.jpg',
    affinityScore: '97% Palate Affinity',
    reason:
      'Dense spoon-thick whole milk curd topped with luscious natural malai, cracked green cardamom seeds, and cane sweetness for pure royal comfort.',
    flavorNote: 'Dense Malai Curd & Crushed Elaichi Seeds',
    idealFormat: '200ml Clay-Cup Matka Pack',
    accentColor: '#F59E0B',
  },
  KESAR: {
    title: 'Your Ultimate Sommelier Match',
    matchName: 'Kesar Pista Flavoured Milk',
    slug: 'kesar-pista-milk',
    category: 'Regal Saffron & Pistachio Infusion',
    image_url: '/images/drinks/kesar-pista-photo.jpg',
    affinityScore: '94% Palate Affinity',
    reason:
      'Crimson Kashmiri saffron threads with crunchy roasted pistachio slivers steeped in double-toned sterilized milk for celebratory gatherings.',
    flavorNote: 'Kashmiri Saffron Strands & Roasted Pistachio',
    idealFormat: '200ml Crown Cap Glass Bottle',
    accentColor: '#CA8A04',
  },
};

export default function FlavourQuiz() {
  const [step, setStep] = useState<number>(1);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [sensation, setSensation] = useState<string | null>(null);

  const calculateResult = (): QuizResult => {
    if (occasion === 'THALI') {
      if (sensation === 'FIZZ') return RESULTS.JEERA;
      return RESULTS.CHAAS;
    }
    if (occasion === 'SUMMER') {
      if (sensation === 'TANG') return RESULTS.KERI;
      if (sensation === 'CREAMY') return RESULTS.CHAAS;
      return RESULTS.LEMON;
    }
    if (occasion === 'STREET') {
      if (sensation === 'TANG') return RESULTS.KERI;
      if (sensation === 'FIZZ') return RESULTS.JEERA;
      return RESULTS.LEMON;
    }
    if (sensation === 'CREAMY') return RESULTS.LASSI;
    return RESULTS.KESAR;
  };

  const resetQuiz = () => {
    setStep(1);
    setOccasion(null);
    setSensation(null);
  };

  const result = step === 3 ? calculateResult() : null;

  return (
    <section id="quiz" className="relative py-24 sm:py-32 bg-[#06070a] border-b border-white/[0.08] overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-amber-300">
            <Compass className="h-3.5 w-3.5" />
            <span>Interactive Palate Sommelier</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            DISCOVER YOUR <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
              SIGNATURE POUR.
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Answer 2 diagnostic questions to calculate your biochemically ideal Gujarat beverage for this exact moment.
          </p>
        </div>

        {/* Step Container Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative">
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              {step < 3 ? `Diagnostic Step 0${step} of 02` : 'Affinity Match Calculated'}
            </span>
            <div className="flex gap-2">
              <span className={`h-1.5 w-8 rounded-full transition-all ${step >= 1 ? 'bg-amber-400' : 'bg-white/10'}`} />
              <span className={`h-1.5 w-8 rounded-full transition-all ${step >= 2 ? 'bg-amber-400' : 'bg-white/10'}`} />
              <span className={`h-1.5 w-8 rounded-full transition-all ${step === 3 ? 'bg-emerald-400' : 'bg-white/10'}`} />
            </div>
          </div>

          {/* Step 1: Occasion */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                01. What is your current appetite or dining situation?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'THALI',
                    index: 'A',
                    title: 'Heavy Kathiyawadi Thali Feast',
                    desc: 'Sev Tameta, Bajra Rotlo, Garlic Chutney—heavy meal needing rapid digestion.',
                  },
                  {
                    id: 'SUMMER',
                    index: 'B',
                    title: 'Scorching Gujarat Heatwave (42°C+)',
                    desc: 'Dry throat and blistering afternoon sun needing ultra-cold crisp hydration.',
                  },
                  {
                    id: 'STREET',
                    index: 'C',
                    title: 'Evening Gujarat Street Snacks',
                    desc: 'Dabeli, Surati Locho, Sev Usal, or Vadapav requiring sharp palate cut.',
                  },
                  {
                    id: 'CELEBRATION',
                    index: 'D',
                    title: 'Sweet Comfort or Sunday Gathering',
                    desc: 'Sunday morning fafda-jalebi ritual, family banquet, or rich dessert craving.',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setOccasion(item.id);
                      setStep(2);
                    }}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/50 hover:bg-white/[0.06] transition-all text-left flex items-start gap-4 group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-mono text-xs font-bold text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                      {item.index}
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-white group-hover:text-amber-400 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Sensation */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                02. What texture and effervescence do you desire on your tongue?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'FIZZ',
                    index: 'A',
                    title: 'High-Pressure 4.2 Vol CO₂ Crackle',
                    desc: 'Sharp effervescent burst with roasted spices that shocks the senses.',
                  },
                  {
                    id: 'TANG',
                    index: 'B',
                    title: 'Sour Green Mango & Garden Mint Zing',
                    desc: 'Zesty mouth-watering tartness with crisp effervescent snap.',
                  },
                  {
                    id: 'CREAMY',
                    index: 'C',
                    title: 'Slow-Churned Cultured Dahi & Hing',
                    desc: 'Cooling, silky buttermilk that coats the throat and calms heat.',
                  },
                  {
                    id: 'SWEET',
                    index: 'D',
                    title: 'Velvety Malai or Saffron Pistachio Nectar',
                    desc: 'Royal whole-milk creaminess infused with cardamom and Kashmiri saffron.',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSensation(item.id);
                      setStep(3);
                    }}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-400/50 hover:bg-white/[0.06] transition-all text-left flex items-start gap-4 group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-mono text-xs font-bold text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-colors">
                      {item.index}
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-white group-hover:text-emerald-400 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="font-mono text-xs text-zinc-400 hover:text-white underline underline-offset-4"
                >
                  ← Revise Previous Selection
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Match Result */}
          {step === 3 && result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Bottle Photo Artwork */}
              <div className="lg:col-span-5 flex justify-center py-2">
                <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl p-4">
                  <Image
                    src={result.image_url}
                    alt={result.matchName}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                    className="object-cover rounded-xl filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
                  />
                </div>
              </div>

              {/* Match Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{result.affinityScore}</span>
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                    {result.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                    {result.matchName}
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed pt-1">
                    {result.reason}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Tasting Notes</span>
                    <p className="text-xs font-display font-bold text-white mt-1">{result.flavorNote}</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Format & Temp</span>
                    <p className="text-xs font-display font-bold text-amber-400 mt-1">{result.idealFormat}</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-3">
                  <a
                    href="#stockists"
                    className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all shadow-lg"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Locate Gujarat Stockist</span>
                  </a>
                  <a
                    href="#retailers"
                    className="flex items-center gap-2 px-5 py-3.5 rounded-lg border border-white/15 bg-white/[0.04] text-white font-mono font-semibold text-xs uppercase tracking-wider hover:bg-white/[0.08] transition-all"
                  >
                    <Store className="h-3.5 w-3.5" />
                    <span>Book Crates</span>
                  </a>
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-1.5 px-4 py-3.5 rounded-lg text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Retake</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

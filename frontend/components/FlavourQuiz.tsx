'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, RotateCcw, MapPin, Store, CheckCircle2 } from 'lucide-react';

interface QuizResult {
  title: string;
  matchName: string;
  slug: string;
  category: string;
  image_url: string;
  reason: string;
  flavorNote: string;
  idealFormat: string;
}

const RESULTS: Record<string, QuizResult> = {
  JEERA: {
    title: 'Your Ultimate Match',
    matchName: 'Jeera Masala Fizz',
    slug: 'jeera-masala-fizz',
    category: 'Carbonated Digestive Soda',
    image_url: '/images/drinks/jeera-masala.svg',
    reason: 'The crisp 4.2 vol carbonation and roasted cumin kala-namak blend is Gujarat’s indisputable digestive king after heavy meals.',
    flavorNote: 'Roasted Cumin, Rock Salt & Citrus Sparkle',
    idealFormat: '200ml Chilled Bottle',
  },
  CHAAS: {
    title: 'Your Ultimate Match',
    matchName: 'Desi Masala Chaas',
    slug: 'desi-masala-chaas',
    category: 'Slow-Churned Dairy Refresher',
    image_url: '/images/drinks/masala-chaas.svg',
    reason: 'Nothing beats slow-churned Kathiyawadi buttermilk laced with hing, green chillies, and roasted jeera for pure gut comfort and soothing cooling.',
    flavorNote: 'Fresh Dahi, Asafoetida, Rock Salt & Mint',
    idealFormat: '200ml Spout Pouch / 500ml Bottle',
  },
  KERI: {
    title: 'Your Ultimate Match',
    matchName: 'Kachi Keri Spark',
    slug: 'kachi-keri-spark',
    category: 'Seasonal Carbonated Cooler',
    image_url: '/images/drinks/kachi-keri.svg',
    reason: 'Raw green mango pulp and fresh mint provide an electrifying sour-sweet shock that instantly revives you on blisteringly hot Gujarat days.',
    flavorNote: 'Zesty Raw Mango & Garden Mint Zing',
    idealFormat: '200ml Glass/PET',
  },
  LEMON: {
    title: 'Your Ultimate Match',
    matchName: 'Lemon Lime Burst',
    slug: 'lemon-lime-burst',
    category: 'Sparkling Citrus Soda',
    image_url: '/images/drinks/lemon-lime.svg',
    reason: 'Zero caffeine, crystalline sparkling water, and cold-pressed lime oils deliver pure sharp hydration that resets your palate.',
    flavorNote: 'Natural Cold-pressed Lime Oils & High Fizz',
    idealFormat: '500ml Chilled PET',
  },
  LASSI: {
    title: 'Your Ultimate Match',
    matchName: 'Rajwadi Sweet Lassi',
    slug: 'rajwadi-sweet-lassi',
    category: 'Royal Dairy Indulgence',
    image_url: '/images/drinks/rajwadi-lassi.svg',
    reason: 'Dense, spoon-thick curd layered with cardamom sweetness and rich malai gives you royal comfort reminiscent of heritage Saurashtra dhabas.',
    flavorNote: 'Whole Milk Dahi, Green Cardamom & Malai',
    idealFormat: '200ml Clay-Cup Pack',
  },
  KESAR: {
    title: 'Your Ultimate Match',
    matchName: 'Kesar Pista Flavoured Milk',
    slug: 'kesar-pista-milk',
    category: 'Regal Saffron Dairy',
    image_url: '/images/drinks/kesar-pista-milk.svg',
    reason: 'Fragrant Kashmiri saffron strands and crunchy roasted pistachio slivers provide a rich, soothing nectar worthy of celebratory gatherings.',
    flavorNote: 'Kashmiri Saffron, Roasted Pistachio Slivers',
    idealFormat: '200ml Glass Bottle',
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
    // CELEBRATION
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
    <section id="quiz" className="py-20 lg:py-28 bg-[#090a0f] relative overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Personalized Flavour Match</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Find Your <span className="gradient-text">Gujarat Sip</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            Answer 2 quick questions to discover your tailored drink match for any meal or mood.
          </p>
        </div>

        {/* Step Container */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl relative">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {step < 3 ? `Step ${step} of 2` : 'Your Perfect Match Found'}
            </span>
            <div className="flex gap-2">
              <span className={`h-2 w-8 rounded-full ${step >= 1 ? 'bg-amber-400' : 'bg-white/10'}`} />
              <span className={`h-2 w-8 rounded-full ${step >= 2 ? 'bg-amber-400' : 'bg-white/10'}`} />
              <span className={`h-2 w-8 rounded-full ${step === 3 ? 'bg-emerald-400' : 'bg-white/10'}`} />
            </div>
          </div>

          {/* Step 1: Occasion */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
                What is your dining occasion or craving right now?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'THALI',
                    title: 'Heavy Kathiyawadi Thali or Feast',
                    desc: 'Sev Tameta, Bajra Rotlo, Khichdi, or spicy banquet needing digestion support.',
                    icon: '🍛',
                  },
                  {
                    id: 'SUMMER',
                    title: 'Scorching Gujarat Heat (40°C+)',
                    desc: 'Dry throat, blazing afternoon sun, needing crisp chilled hydration.',
                    icon: '☀️',
                  },
                  {
                    id: 'STREET',
                    title: 'Evening Gujarat Street Food',
                    desc: 'Dabeli, Surati Locho, Sev Usal, or Vadapav with friends.',
                    icon: '🍢',
                  },
                  {
                    id: 'CELEBRATION',
                    title: 'Royal Celebration or Sweet Craving',
                    desc: 'Festive family get-together, Sunday morning jalebi breakfast, or dessert comfort.',
                    icon: '👑',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setOccasion(item.id);
                      setStep(2);
                    }}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 transition-all text-left flex items-start gap-4 group hover:scale-[1.01]"
                  >
                    <span className="text-3xl p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-amber-400 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Sensation */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
                What texture and sensation do you crave on your tongue?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'FIZZ',
                    title: 'Electrifying High Fizz & Bubbles',
                    desc: 'Intense 4.2 vol carbonation sparkle that rushes through your palate.',
                    icon: '⚡',
                  },
                  {
                    id: 'TANG',
                    title: 'Zesty Tang & Spiced Sour Zing',
                    desc: 'Raw mango sharpness or roasted cumin with rock salt bite.',
                    icon: '🍋',
                  },
                  {
                    id: 'CREAMY',
                    title: 'Silky, Velvety & Soothing Cold Curd',
                    desc: 'Dense slow-churned dahi or thick malai texture that coats the throat.',
                    icon: '🥛',
                  },
                  {
                    id: 'SWEET',
                    title: 'Rich Saffron & Nutty Sweetness',
                    desc: 'Fragrant Kashmiri kesar strands, crunchy pistachio, and celebratory comfort.',
                    icon: '✨',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSensation(item.id);
                      setStep(3);
                    }}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all text-left flex items-start gap-4 group hover:scale-[1.01]"
                  >
                    <span className="text-3xl p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-emerald-400 text-sm sm:text-base">
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
                  className="text-xs text-zinc-400 hover:text-white underline underline-offset-4"
                >
                  ← Back to Previous Question
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Match Result */}
          {step === 3 && result && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Bottle Visual */}
              <div className="lg:col-span-5 flex justify-center py-4">
                <div className="relative w-56 h-[380px] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]">
                  <Image
                    src={result.image_url}
                    alt={result.matchName}
                    fill
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Match Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>100% Flavor Affinity Match</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white">
                  {result.matchName}
                </h3>

                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {result.category}
                </p>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {result.reason}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <p className="text-[11px] text-zinc-400 uppercase font-semibold">Tasting Profile</p>
                    <p className="text-xs font-bold text-white mt-1">{result.flavorNote}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <p className="text-[11px] text-zinc-400 uppercase font-semibold">Recommended Format</p>
                    <p className="text-xs font-bold text-white mt-1">{result.idealFormat}</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-3">
                  <a
                    href="#stockists"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-black font-bold text-xs sm:text-sm hover:bg-amber-400 transition-all"
                  >
                    <MapPin className="h-4 w-4" />
                    Locate Stockist in Gujarat
                  </a>
                  <a
                    href="#retailers"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-xs sm:text-sm hover:bg-white/10 transition-all"
                  >
                    <Store className="h-4 w-4" />
                    Inquire Crates
                  </a>
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-zinc-400 hover:text-white transition-all text-xs"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Retake Quiz
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

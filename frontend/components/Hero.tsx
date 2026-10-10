'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, Store, ShieldCheck, Flame, Droplets, MapPin, Milk, Zap } from 'lucide-react';

export default function Hero() {
  const [activeCategory, setActiveCategory] = useState<'CARBONATED' | 'DAIRY'>('CARBONATED');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-28 bg-[#090a0f]">
      {/* Dynamic Ambient Glow Behind Showcase */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] rounded-full blur-[120px] pointer-events-none transition-all duration-700 ${
          activeCategory === 'CARBONATED' ? 'bg-amber-500/15' : 'bg-emerald-500/15'
        }`}
      />
      <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Condensation & Chilled Droplets Overlay Simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Category Pill Switcher in Hero Top */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            <button
              onClick={() => setActiveCategory('CARBONATED')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === 'CARBONATED'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/25 scale-102'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>Carbonated Sodas (5)</span>
            </button>
            <button
              onClick={() => setActiveCategory('DAIRY')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === 'DAIRY'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-black shadow-lg shadow-emerald-500/25 scale-102'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Milk className="h-4 w-4" />
              <span>Gujarat Dairy Coolers (3)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Crafted in Gujarat</span>
              <span className="h-1 w-1 rounded-full bg-amber-400" />
              <span>Sodas & Slow-Churned Dairy</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Electrifying Fizz.{' '}
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent">
                Authentic Gujarati Soul.
              </span>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
              {activeCategory === 'CARBONATED' ? (
                <>
                  Born for scorching summer afternoons and hearty Kathiyawadi street banquets. Experience high-carbonation{' '}
                  <strong className="text-amber-400 font-semibold">Roasted Jeera Masala</strong>, crisp{' '}
                  <strong className="text-emerald-400 font-semibold">Kachi Keri Raw Mango</strong>, vibrant Lemon Lime, and spiced heritage colas bottled for pure punch.
                </>
              ) : (
                <>
                  Rooted in village tradition. Indulge in authentic slow-churned{' '}
                  <strong className="text-emerald-400 font-semibold">Desi Masala Chaas</strong> with hing-jeera, velvety thick{' '}
                  <strong className="text-amber-400 font-semibold">Rajwadi Malai Lassi</strong>, and royal saffron-infused{' '}
                  <strong className="text-yellow-300 font-semibold">Kesar Pista Milk</strong>.
                </>
              )}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#flavours"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-black shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-[1.02]"
              >
                Explore All 8 Beverages
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#stockists"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 hover:border-amber-400/40 transition-all"
              >
                <MapPin className="h-4 w-4 text-amber-400" />
                Find Gujarat Stockists
              </a>
              <a
                href="#retailers"
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3.5 text-sm font-semibold text-amber-300 hover:bg-amber-500/20 transition-all"
              >
                <Store className="h-4 w-4" />
                Wholesale Dealership
              </a>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 w-full">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">4.2 Vol</span>
                <span className="text-xs text-zinc-400">Carbonation Level</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-amber-400">100% Pure</span>
                <span className="text-xs text-zinc-400">Whole Milk & Veg</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-emerald-400">4 Cities</span>
                <span className="text-xs text-zinc-400">Ahmedabad to Rajkot</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-80 h-[480px] flex items-center justify-center p-4 group">
              {/* Bottle SVG with category transition */}
              <div className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:scale-105">
                {activeCategory === 'CARBONATED' ? (
                  <Image
                    key="hero-jeera"
                    src="/images/drinks/jeera-masala.svg"
                    alt="Fizzora Jeera Masala Fizz"
                    width={330}
                    height={560}
                    className="object-contain"
                    priority
                    unoptimized
                  />
                ) : (
                  <Image
                    key="hero-chaas"
                    src="/images/drinks/masala-chaas.svg"
                    alt="Fizzora Desi Masala Chaas"
                    width={330}
                    height={560}
                    className="object-contain"
                    priority
                    unoptimized
                  />
                )}
              </div>

              {/* Floating badges on hero bottle */}
              {activeCategory === 'CARBONATED' ? (
                <>
                  <div className="absolute -left-4 top-1/4 rounded-2xl glass-panel p-3.5 shadow-xl border border-amber-500/25 backdrop-blur-md hidden sm:flex items-center gap-3 animate-pulse">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                      <Flame className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Roasted Cumin</p>
                      <p className="text-[10px] text-zinc-400">Digestive Kala Namak</p>
                    </div>
                  </div>

                  <div className="absolute -right-4 bottom-1/4 rounded-2xl glass-panel p-3.5 shadow-xl border border-emerald-500/25 backdrop-blur-md hidden sm:flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Droplets className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Crisp Chilled</p>
                      <p className="text-[10px] text-zinc-400">Ultra Effervescent</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute -left-4 top-1/4 rounded-2xl glass-panel p-3.5 shadow-xl border border-emerald-500/25 backdrop-blur-md hidden sm:flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Milk className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Slow Churned</p>
                      <p className="text-[10px] text-zinc-400">Desi Dahi Base</p>
                    </div>
                  </div>

                  <div className="absolute -right-4 bottom-1/4 rounded-2xl glass-panel p-3.5 shadow-xl border border-amber-500/25 backdrop-blur-md hidden sm:flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Fresh Daily Cold-Chain</p>
                      <p className="text-[10px] text-zinc-400">Zero Artificial Preservatives</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, MapPin, Store, Droplets, Flame, Shield, Milk, Zap, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [activeCategory, setActiveCategory] = useState<'CARBONATED' | 'DAIRY'>('CARBONATED');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#06070a] text-zinc-100 border-b border-white/[0.08] select-none"
    >
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid and radial grain */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-radial-[circle_at_top,_transparent_30%,_#06070a_90%]" />

        {/* Ambient atmospheric aura shifts based on category */}
        <motion.div
          animate={{
            x: mousePos.x * 40,
            y: mousePos.y * 40,
            backgroundColor: activeCategory === 'CARBONATED' ? 'rgba(229, 169, 60, 0.14)' : 'rgba(16, 185, 129, 0.14)',
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 80 }}
          className="absolute top-1/4 right-1/4 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none"
        />

        <motion.div
          animate={{
            x: -mousePos.x * 30,
            y: -mousePos.y * 30,
            backgroundColor: activeCategory === 'CARBONATED' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(52, 211, 153, 0.08)',
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 60 }}
          className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
        />
      </div>

      {/* Top Editorial Metadata Banner */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06] text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold">EDITION 01</span>
            <span className="text-zinc-600">/</span>
            <span>HIGH-PRESSURE BOTTLING</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline text-zinc-400">45°C SUMMER SPECIFICATION</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              NARODA CENTRAL REPOSITORY
            </span>
          </div>
        </div>
      </div>

      {/* Main Hero Viewport Composition */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Monumental Editorial Typography & Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 lg:pr-6">
            
            {/* Category Switcher Pill */}
            <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl">
              <button
                onClick={() => setActiveCategory('CARBONATED')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === 'CARBONATED'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                <span>01. Carbonated Sodas (5)</span>
              </button>
              <button
                onClick={() => setActiveCategory('DAIRY')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === 'DAIRY'
                    ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Milk className="h-3.5 w-3.5" />
                <span>02. Kathiyawadi Dairy (3)</span>
              </button>
            </div>

            {/* Monumental Headline */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase">
                <Sparkles className="h-3 w-3" />
                <span>Radical Gujarat Effervescence</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
                LIQUID VOLTAGE.{' '}
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-300 bg-clip-text text-transparent">
                  BORN IN THE 45°C HEAT.
                </span>
              </h1>
            </div>

            {/* Editorial Narrative */}
            <AnimatePresence mode="wait">
              {activeCategory === 'CARBONATED' ? (
                <motion.p
                  key="carbonated-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-xl text-base sm:text-lg text-zinc-300 font-normal leading-relaxed"
                >
                  Calibrated to an uncompromising <strong className="text-white font-semibold">4.2 Vol CO₂</strong> to pierce through the fierce afternoon sun. Infused with hand-roasted cumin from Unjha, volcanic black rock salt from Kutch, and cold-pressed citrus oil. High carbonation engineered for Kathiyawadi dhabas and street feasts.
                </motion.p>
              ) : (
                <motion.p
                  key="dairy-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-xl text-base sm:text-lg text-zinc-300 font-normal leading-relaxed"
                >
                  Rooted in Saurashtra pastoral tradition. Churned from whole-milk cultured dahi with aromatic hing, crushed roasted jeera, and rock salt. Zero reconstituted powders. Kept at unbroken <strong className="text-white font-semibold">3°C cold-chain</strong> from pasteurization to first sip.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Primary Action Array */}
            <div className="flex flex-wrap gap-3.5 pt-2 w-full sm:w-auto">
              <a
                href="#flavours"
                className="flex items-center justify-center gap-2.5 rounded-lg bg-amber-400 px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-black shadow-xl shadow-amber-400/20 hover:bg-amber-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Experience The 8 Pours</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#stockists"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-4 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-200 hover:bg-white/[0.08] hover:border-amber-400/40 transition-all"
              >
                <MapPin className="h-4 w-4 text-amber-400" />
                <span>Locate Gujarat Stockist</span>
              </a>
              <a
                href="#retailers"
                className="flex items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-xs font-mono font-semibold uppercase tracking-wider text-amber-300 hover:bg-amber-500/20 transition-all"
              >
                <Store className="h-4 w-4" />
                <span>Wholesale Crates</span>
              </a>
            </div>

            {/* Scientific Telemetry Ribbon */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6 w-full max-w-lg">
              <div className="flex flex-col space-y-1">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-white">4.2 Vol</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Carbonation Pressure</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400">3°C - 5°C</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Cold Chain Target</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Regional Spices</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Cinematic Product Artwork */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/80 shadow-2xl p-6 group">
              
              {/* Chilled Glass Vignette & Depth Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/20 to-emerald-500/20 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />

              {/* Dynamic Bottle Presentation */}
              <AnimatePresence mode="wait">
                {activeCategory === 'CARBONATED' ? (
                  <motion.div
                    key="bottle-jeera"
                    initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: 'blur(0px)',
                      rotate: mousePos.x * 6,
                      y: mousePos.y * 12,
                    }}
                    exit={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                    transition={{ type: 'spring', damping: 20, stiffness: 90 }}
                    className="relative w-full h-full flex items-center justify-center z-10"
                  >
                    <Image
                      src="/images/drinks/jeera-masala-photo.jpg"
                      alt="Fizzora Jeera Masala Fizz Master Bottle"
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      priority
                      className="object-cover rounded-2xl filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                    />

                    {/* Sensoric Floating Badges */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-4 left-4 z-20 rounded-xl bg-black/80 backdrop-blur-md border border-amber-400/40 p-3 shadow-2xl hidden sm:flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-amber-400/20 text-amber-400">
                        <Flame className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">Roasted Cumin</p>
                        <p className="text-[10px] font-mono text-zinc-400">Unjha Gujarat Terroir</p>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute bottom-6 right-4 z-20 rounded-xl bg-black/80 backdrop-blur-md border border-emerald-400/40 p-3 shadow-2xl hidden sm:flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-emerald-400/20 text-emerald-400">
                        <Droplets className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">Kala Namak Fizz</p>
                        <p className="text-[10px] font-mono text-zinc-400">4.2 Vol Effervescence</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="bottle-chaas"
                    initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: 'blur(0px)',
                      rotate: mousePos.x * 6,
                      y: mousePos.y * 12,
                    }}
                    exit={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                    transition={{ type: 'spring', damping: 20, stiffness: 90 }}
                    className="relative w-full h-full flex items-center justify-center z-10"
                  >
                    <Image
                      src="/images/drinks/masala-chaas-photo.jpg"
                      alt="Fizzora Desi Masala Chaas Master Bottle"
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      priority
                      className="object-cover rounded-2xl filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                    />

                    {/* Sensoric Floating Badges */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-4 left-4 z-20 rounded-xl bg-black/80 backdrop-blur-md border border-emerald-400/40 p-3 shadow-2xl hidden sm:flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-emerald-400/20 text-emerald-400">
                        <Milk className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">Slow-Churned Dahi</p>
                        <p className="text-[10px] font-mono text-zinc-400">Kathiyawadi Recipe</p>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute bottom-6 right-4 z-20 rounded-xl bg-black/80 backdrop-blur-md border border-amber-400/40 p-3 shadow-2xl hidden sm:flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-amber-400/20 text-amber-400">
                        <Shield className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">Digestive Hing</p>
                        <p className="text-[10px] font-mono text-zinc-400">Zero Milk Powders</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Watermark overlay */}
              <div className="absolute bottom-3 left-4 z-20">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                  PHOTOGRAPHED IN HIGH RES • GENUINE BOTTLING SPEC
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Dispatch Ribbon & Scroll Cue */}
      <div className="relative z-10 w-full border-t border-white/[0.08] bg-[#030406]/90 py-3.5 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="text-zinc-500 uppercase tracking-widest text-[10px]">Active Hubs:</span>
            <span className="text-zinc-300 font-semibold">Ahmedabad Central</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300 font-semibold">Surat Ring Road</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300 font-semibold">Vadodara Sayajigunj</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300 font-semibold">Rajkot Aji GIDC</span>
          </div>
          
          <a
            href="#flavours"
            className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Explore The 8 Pours</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}

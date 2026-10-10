'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Store, ShieldCheck, Flame } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-radial from-amber-950/20 via-[#0c0e14] to-[#090a0f]">
      {/* Decorative radial lighting behind bottle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Pure Sparkle of Gujarat</span>
              <span className="h-1 w-1 rounded-full bg-amber-400" />
              <span>Crisp Carbonated Sodas</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Electrifying Fizz. <br />
              <span className="gradient-text">Authentic Gujarati Soul.</span>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
              Crafted for scorching summers and hearty street banquets. From signature roasted{' '}
              <strong className="text-amber-400 font-semibold">Jeera Masala</strong> and tangy{' '}
              <strong className="text-emerald-400 font-semibold">Kachi Keri</strong> to chilled lemon bursts and spiced heritage colas, we supply high-carbonation soft drinks to shops across Gujarat.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#retailers"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-black shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-[1.02]"
              >
                <Store className="h-4 w-4" />
                Become a Retail Partner
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#flavours"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 hover:border-amber-400/40 transition-all"
              >
                Explore All 5 Flavours
              </a>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 w-full">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">4.2 Vol</span>
                <span className="text-xs text-zinc-400">Crisp Carbonation</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-amber-400">100%</span>
                <span className="text-xs text-zinc-400">Vegetarian Formulation</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-emerald-400">200ml - 1.25L</span>
                <span className="text-xs text-zinc-400">Available Pack Sizes</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-72 sm:w-80 h-[460px] flex items-center justify-center p-4 group">
              {/* Bottle SVG */}
              <div className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_20px_40px_rgba(245,158,11,0.35)] transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/drinks/jeera-masala.svg"
                  alt="Fizzora Jeera Masala Fizz Bottle"
                  width={340}
                  height={580}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Floating feature pills */}
              <div className="absolute -left-4 top-1/4 rounded-xl glass-panel p-3 shadow-xl border border-amber-500/20 backdrop-blur-md hidden sm:flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <Flame className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Roasted Cumin</p>
                  <p className="text-[10px] text-zinc-400">Digestive Kala Namak</p>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 rounded-xl glass-panel p-3 shadow-xl border border-emerald-500/20 backdrop-blur-md hidden sm:flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Glass & PET</p>
                  <p className="text-[10px] text-zinc-400">High-speed Bottling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

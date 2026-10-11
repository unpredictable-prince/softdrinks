'use client';

import Image from 'next/image';
import { Sparkles, Zap, Milk, Shield, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function BrandStory() {
  const chapters = [
    {
      num: '01',
      title: 'The 4.2 Vol CO₂ Calibration',
      subtitle: 'Why Standard Sodas Go Flat In Gujarat',
      desc: 'Most mass-market commercial soft drinks are bottled at 3.0 to 3.2 volumes of carbonation. Under the scorching 45°C Gujarat summer, that fizz dissipates within seconds of opening. We calibrate our bottling line to 4.2 Vol CO₂—delivering an explosive, throat-cutting crackle that stays razor-sharp down to the final drop.',
      tag: 'PRESSURE DYNAMICS',
    },
    {
      num: '02',
      title: 'The Kathiyawadi Spice Terroir',
      subtitle: 'Unjha Cumin, Kutch Salt & Compound Hing',
      desc: 'Our spice ratios are not artificial laboratory flavoring powders. We procure whole cumin directly from the agricultural mandis of Unjha, roast it slowly in copper kettles, and mill it with volcanic black salt and pure hing. It is designed specifically to digest heavy gram-flour street farsan.',
      tag: 'REGIONAL PROVENANCE',
    },
    {
      num: '03',
      title: 'Whole Milk Cultured Dahi',
      subtitle: 'Zero Reconstituted Powders',
      desc: 'Our Desi Masala Chaas and Rajwadi Lassi are crafted from live cultured whole curd. We do not use skimmed milk powders, artificial thickeners, or chemical emulsifiers. Slow-churned fresh every dawn, rich in natural probiotics, and kept under an unbroken 3°C cold chain.',
      tag: 'PASTORAL PURITY',
    },
    {
      num: '04',
      title: 'The 4-City Cold Artery',
      subtitle: 'From Naroda GIDC to Highway Dhabas',
      desc: 'Temperature fluctuations destroy delicate dairy and spice notes. Our fleet of insulated refrigerated trucks connects our central bottling plant in Ahmedabad directly to distributors and cold corners across Surat, Vadodara, and Rajkot within 8 hours of bottling.',
      tag: 'COLD-CHAIN ARTERY',
    },
  ];

  return (
    <section id="heritage" className="relative py-24 sm:py-32 bg-[#050608] border-b border-white/[0.08] overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section Header: Bold Editorial Manifest */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-12 border-b border-white/[0.08]">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>THE BRAND MANIFESTO</span>
              <span className="text-zinc-600">/</span>
              <span>ORIGINS & BOTTLING DOCTRINE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              THE 45°C CRUCIBLE. <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
                ENGINEERED WHERE OTHERS SURRENDER.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            In Gujarat, a cold drink is not a casual accessory—it is an essential post-meal digestive ritual, a companion on scorching summer streets, and the soul of community gathering.
          </div>
        </div>

        {/* Feature Split: Cinematic Photography + Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left: Atmospheric Photography Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/images/hero/hero-soda-cinematic.jpg"
                alt="Fizzora Cinematic Soda Bottling Presentation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono">
                <p className="text-amber-400 font-bold uppercase tracking-wider">
                  BOTTLING RECORD #GZ-AHM-04
                </p>
                <p className="text-zinc-300 mt-1">
                  High-effervescence carbonation married with whole roasted cumin and volcanic salt brine.
                </p>
              </div>
            </div>
          </div>

          {/* Right: The Two Traditions Unified */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              TWO CHERISHED TRADITIONS • ONE MASTER BOTTLER
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              The Fierce Carbonation of the Street. The Soothing Calm of Village Dahi.
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              Gujarat drinks split between two extremes: the electrifying sting of corner-soda shops that shock the senses after spicy street snacks, and the creamy, cooling sanctuary of Kathiyawadi buttermilk that calms the furnace within.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Fizzora united these two worlds under one state-of-the-art bottling facility in Naroda GIDC. Every crate that departs our loading docks carries calibrated carbonation, unadulterated spice extracts, and rigorous laboratory standards.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                  <Zap className="h-4 w-4" />
                  <span>Carbonated Line</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1.5">
                  Jeera Masala, Kachi Keri, Lemon Lime, Heritage Cola, Orange Punch.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                  <Milk className="h-4 w-4" />
                  <span>Dairy Line</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1.5">
                  Desi Masala Chaas, Rajwadi Sweet Lassi, Saffron Kesar Pista Milk.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Asymmetrical Editorial Chapters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-4">
          {chapters.map((ch, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-4xl sm:text-5xl font-black text-white/20 group-hover:text-amber-400/30 transition-colors">
                  {ch.num}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                  {ch.tag}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {ch.title}
                </h4>
                <p className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                  {ch.subtitle}
                </p>
                <p className="text-zinc-300 text-sm leading-relaxed pt-1">
                  {ch.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Standardized Bottling Specification</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

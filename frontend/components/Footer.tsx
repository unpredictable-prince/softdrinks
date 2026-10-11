'use client';

import Link from 'next/link';
import { Sparkles, ShieldAlert, ArrowUp, Snowflake, Award } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#040507] pt-20 pb-12 text-zinc-400 text-xs relative overflow-hidden font-body">
      {/* Subtle radial glow in background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[20rem] bg-amber-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Top Tier: Manifesto & Core Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Brand Manifesto (md: 4 cols) */}
          <div className="md:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-400 text-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-2xl font-display font-black tracking-wider text-white">
                FIZZ<span className="text-amber-400">ORA</span>
              </span>
            </Link>

            <p className="text-zinc-400 leading-relaxed max-w-sm text-sm">
              Art-directed craft carbonated sodas and slow-churned Kathiyawadi dairy refreshers. Calibrated to 4.2 Vol CO₂ to slice through 45°C Gujarat heatwaves with roasted jeera, volcanic black salt, and cultured Saurashtra whole dahi.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-zinc-300">
                <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
                <span>3°C Cold-Chain Verified</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-zinc-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Gujarat Terroir</span>
              </div>
            </div>
          </div>

          {/* Column 1: The 8 Formulations (md: 3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              The 8 Formulations
            </div>
            <ul className="space-y-2 text-zinc-400 font-body text-sm">
              <li>
                <a href="#flavours" className="hover:text-amber-300 transition-colors flex items-center justify-between group">
                  <span>Jeera Masala Fizz</span>
                  <span className="font-mono text-[10px] text-zinc-600 group-hover:text-amber-400">01</span>
                </a>
              </li>
              <li>
                <a href="#flavours" className="hover:text-amber-300 transition-colors flex items-center justify-between group">
                  <span>Kachi Keri Spark</span>
                  <span className="font-mono text-[10px] text-zinc-600 group-hover:text-amber-400">02</span>
                </a>
              </li>
              <li>
                <a href="#flavours" className="hover:text-amber-300 transition-colors flex items-center justify-between group">
                  <span>Lemon Lime Burst</span>
                  <span className="font-mono text-[10px] text-zinc-600 group-hover:text-amber-400">03</span>
                </a>
              </li>
              <li>
                <a href="#flavours" className="hover:text-amber-300 transition-colors flex items-center justify-between group">
                  <span>Heritage Spiced Cola</span>
                  <span className="font-mono text-[10px] text-zinc-600 group-hover:text-amber-400">04</span>
                </a>
              </li>
              <li>
                <a href="#flavours" className="hover:text-amber-300 transition-colors flex items-center justify-between group">
                  <span>Royal Orange Punch</span>
                  <span className="font-mono text-[10px] text-zinc-600 group-hover:text-amber-400">05</span>
                </a>
              </li>
              <li>
                <a href="#flavours" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                  <span>Desi Masala Chaas</span>
                  <span className="font-mono text-[10px] text-zinc-600 group-hover:text-emerald-400">06</span>
                </a>
              </li>
              <li>
                <a href="#flavours" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                  <span>Rajwadi Sweet Lassi</span>
                  <span className="font-mono text-[10px] text-zinc-600 group-hover:text-emerald-400">07</span>
                </a>
              </li>
              <li>
                <a href="#flavours" className="hover:text-amber-300 transition-colors flex items-center justify-between group">
                  <span>Royal Kesar Pista Milk</span>
                  <span className="font-mono text-[10px] text-zinc-600 group-hover:text-amber-400">08</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Sommelier & Brand Experience (md: 2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 font-bold">
              Explorations
            </div>
            <ul className="space-y-2 text-zinc-400 font-body text-sm">
              <li><a href="#quiz" className="hover:text-amber-300 transition-colors">Diagnostic Quiz</a></li>
              <li><a href="#pairings" className="hover:text-amber-300 transition-colors">Sommelier Radar</a></li>
              <li><a href="#stockists" className="hover:text-amber-300 transition-colors">Cold Supply Hubs</a></li>
              <li><a href="#story" className="hover:text-amber-300 transition-colors">The 45°C Crucible</a></li>
              <li><a href="#contact" className="hover:text-amber-300 transition-colors">Naroda GIDC Depot</a></li>
            </ul>
          </div>

          {/* Column 3: Commercial & ERP Core (md: 3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Commercial Operations
            </div>
            <ul className="space-y-2 text-zinc-400 font-body text-sm">
              <li>
                <a href="#retailers" className="hover:text-amber-300 transition-colors">
                  B2B Crate Allocation Desk
                </a>
              </li>
              <li>
                <a href="#retailers" className="hover:text-amber-300 transition-colors">
                  Visi-Cooler Deployment
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-amber-200 hover:bg-amber-500/20 font-mono text-xs transition-colors font-bold mt-1"
                >
                  <span>Admin ERP Management</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">Gujarat Cold Grid</div>
              <div className="flex flex-wrap gap-1.5">
                {['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'].map((city) => (
                  <span key={city} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[10px] font-mono text-zinc-400">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Tier: Huge Art-Directed Editorial Typography */}
        <div className="pt-8 pb-4 border-t border-b border-white/10 select-none overflow-hidden relative">
          <div className="flex items-baseline justify-between">
            <span className="text-6xl sm:text-8xl lg:text-[11rem] font-display font-black tracking-tighter text-white/[0.06] leading-none block">
              FIZZORA
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-amber-500/40 text-zinc-300 hover:text-white transition-all text-xs font-mono group"
              aria-label="Scroll back to top"
            >
              <span>RETURN TO APEX</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-amber-400" />
            </button>
          </div>
        </div>

        {/* Compliance / Lab Fixture Ledger */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5 flex items-start gap-4 text-zinc-500 backdrop-blur-sm">
          <ShieldAlert className="h-5 w-5 shrink-0 text-amber-500/80 mt-0.5" />
          <div className="space-y-1 text-xs leading-relaxed font-body">
            <div className="text-zinc-300 font-mono text-[11px] font-bold uppercase tracking-wider">
              Industrial Development Ledger &amp; Regulatory Context
            </div>
            <p>
              &ldquo;FIZZORA&rdquo; is a flagship digital brand and software architecture benchmark designed for regional beverage bottling operations in Western India. Product formulations, CO₂ saturation logs, dealer margins (26%), and stockist allocations operate on real database tables backed by FastAPI and PostgreSQL. Official FSSAI registration numbers, batch barcodes, and certified commercial packaging seal standards will be attached alongside the commercial production roll-out.
            </p>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Engineering Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-xs font-mono pt-2">
          <p>&copy; 2026 Fizzora Craft Beverages &amp; Dairy Co. Gujarat, India.</p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400/80">● 4.2 VOL CO₂ LAB VERIFIED</span>
            <span className="text-zinc-600">|</span>
            <span>NEXT.JS &amp; FASTAPI CORE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

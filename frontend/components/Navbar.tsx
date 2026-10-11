'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Editorial Telemetry Ticker */}
      <div className="w-full bg-[#030406] border-b border-white/[0.06] text-[11px] font-mono tracking-wider text-zinc-400 py-1.5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300 font-semibold uppercase tracking-widest text-[10px]">
              Active Cold-Chain: 3°C - 5°C
            </span>
            <span className="hidden md:inline text-zinc-600">/</span>
            <span className="hidden md:inline text-zinc-400">
              Calibrated Effervescence: 4.2 Vol CO₂
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-400">
            <span className="hidden sm:inline">Naroda GIDC Bottling Depot</span>
            <span className="text-amber-400 font-bold">Ahmedabad • Surat • Vadodara • Rajkot</span>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#06070a]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
            : 'bg-[#06070a]/60 backdrop-blur-md border-b border-white/[0.06] py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Monogram & Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-black font-display font-extrabold text-base tracking-tighter shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              FZ
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-extrabold tracking-wider text-white">
                FIZZ<span className="text-amber-400">ORA</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-zinc-400 -mt-0.5">
                Gujarat Artisanal Bottlers
              </span>
            </div>
          </Link>

          {/* Desktop Curated Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="#flavours"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors"
            >
              The 8 Pours
            </Link>
            <Link
              href="#heritage"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors"
            >
              The Crucible
            </Link>
            <Link
              href="#quiz"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors"
            >
              Taste Sommelier
            </Link>
            <Link
              href="#pairings"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors"
            >
              Thali Harmony
            </Link>
            <Link
              href="#stockists"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors"
            >
              Cold Network
            </Link>
            <Link
              href="#retailers"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors"
            >
              Wholesale Crates
            </Link>
          </nav>

          {/* Action Hub */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919876543210?text=Hello%20Fizzora,%20I%20am%20interested%20in%20soft%20drink%20and%20dairy%20distribution%20in%20Gujarat."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/15 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin ERP</span>
              <ArrowUpRight className="h-3 w-3 opacity-60" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-white/10 bg-[#090b10] px-6 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/5">
              <Link
                href="#flavours"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-amber-400 py-1.5"
              >
                The 8 Pours
              </Link>
              <Link
                href="#heritage"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-amber-400 py-1.5"
              >
                The Crucible
              </Link>
              <Link
                href="#quiz"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-amber-400 py-1.5"
              >
                Taste Sommelier
              </Link>
              <Link
                href="#pairings"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-amber-400 py-1.5"
              >
                Thali Harmony
              </Link>
              <Link
                href="#stockists"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-amber-400 py-1.5"
              >
                Cold Network
              </Link>
              <Link
                href="#retailers"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-amber-400 py-1.5"
              >
                Wholesale Crates
              </Link>
            </div>
            <div className="flex flex-col gap-2.5 pt-2">
              <a
                href="https://wa.me/919876543210?text=Hello%20Fizzora,%20I%20am%20interested%20in%20soft%20drink%20and%20dairy%20distribution%20in%20Gujarat."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 py-3 text-xs font-semibold text-emerald-400 border border-emerald-500/25"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Direct Desk
              </a>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-xs font-bold text-black"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin ERP Management Portal
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

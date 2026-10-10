'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090a0f]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-emerald-400 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-wider text-white">
              FIZZ<span className="text-amber-400">ORA</span>
            </span>
            <span className="text-[9.5px] font-semibold tracking-widest text-zinc-400 uppercase">
              Gujarat Sodas & Dairy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="#flavours" className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">
            Our Beverages
          </Link>
          <Link href="#quiz" className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">
            Taste Quiz
          </Link>
          <Link href="#pairings" className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">
            Thali Pairings
          </Link>
          <Link href="#stockists" className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">
            Find Stockists
          </Link>
          <Link href="#retailers" className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">
            Wholesale Crate Supply
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/919876543210?text=Hello%20Fizzora,%20I%20am%20interested%20in%20soft%20drink%20and%20dairy%20distribution%20in%20Gujarat."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black shadow-md shadow-amber-500/20 hover:bg-amber-400 transition-all"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin ERP
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-white/5"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#0c0e14] px-4 pt-2 pb-6 space-y-3">
          <Link
            href="#flavours"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-200 py-1"
          >
            Our Beverages (8)
          </Link>
          <Link
            href="#quiz"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-200 py-1"
          >
            Find Your Sip Quiz
          </Link>
          <Link
            href="#pairings"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-200 py-1"
          >
            Gujarat Thali Pairings
          </Link>
          <Link
            href="#stockists"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-200 py-1"
          >
            Retail Stockists Locator
          </Link>
          <Link
            href="#retailers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-200 py-1"
          >
            Retailer & Dealership Form
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://wa.me/919876543210?text=Hello%20Fizzora,%20I%20am%20interested%20in%20soft%20drink%20and%20dairy%20distribution%20in%20Gujarat."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 py-2.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Direct
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-black"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin ERP Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

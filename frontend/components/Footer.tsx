'use client';

import Link from 'next/link';
import { Sparkles, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07080b] py-14 text-zinc-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-emerald-400 text-black">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">
                FIZZ<span className="text-amber-400">ORA</span>
              </span>
            </Link>
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              Premium carbonated soft drinks and authentic slow-churned Gujarat dairy refreshers. Bottled with regional spice precision and distributed across Ahmedabad, Surat, Vadodara, and Rajkot.
            </p>
          </div>

          {/* Beverages */}
          <div className="md:col-span-3 space-y-2">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Beverage Range</p>
            <ul className="space-y-1.5">
              <li><a href="#flavours" className="hover:text-amber-400 transition-colors">Jeera Masala Fizz</a></li>
              <li><a href="#flavours" className="hover:text-amber-400 transition-colors">Kachi Keri Spark</a></li>
              <li><a href="#flavours" className="hover:text-amber-400 transition-colors">Lemon Lime Burst</a></li>
              <li><a href="#flavours" className="hover:text-emerald-400 transition-colors">Desi Masala Chaas</a></li>
              <li><a href="#flavours" className="hover:text-emerald-400 transition-colors">Rajwadi Sweet Lassi</a></li>
              <li><a href="#flavours" className="hover:text-amber-400 transition-colors">Kesar Pista Milk</a></li>
            </ul>
          </div>

          {/* Interactive Guides */}
          <div className="md:col-span-2 space-y-2">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Customer Guides</p>
            <ul className="space-y-1.5">
              <li><a href="#quiz" className="hover:text-amber-400 transition-colors">Taste Match Quiz</a></li>
              <li><a href="#pairings" className="hover:text-amber-400 transition-colors">Thali Food Pairings</a></li>
              <li><a href="#stockists" className="hover:text-amber-400 transition-colors">Store Locator</a></li>
              <li><a href="#story" className="hover:text-amber-400 transition-colors">Our Gujarat Roots</a></li>
            </ul>
          </div>

          {/* Internal Business */}
          <div className="md:col-span-3 space-y-2">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Retailer Hub & Administration</p>
            <ul className="space-y-1.5">
              <li><a href="#retailers" className="hover:text-amber-400 transition-colors">B2B Dealership & Crates</a></li>
              <li><Link href="/admin" className="hover:text-amber-400 text-amber-400 font-semibold transition-colors">Admin Business Management Hub &rarr;</Link></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Gujarat Central Depot & Warehouse</a></li>
            </ul>
          </div>
        </div>

        {/* Development & Compliance Disclaimer */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 flex items-start gap-3 text-zinc-500">
          <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500/70 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Development Notice:</strong> &ldquo;Fizzora&rdquo; is a configurable placeholder brand identity used during software development and is not represented as an active registered trademark. All displayed beverage formulations, nutritional estimates, sample distributor ledgers, and transactions represent development fixtures. Official FSSAI licensing and commercial packaging graphics will be attached upon commercial bottling launch.
          </p>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <p>&copy; 2026 Fizzora Soft Drinks & Dairy (Gujarat). All rights reserved.</p>
          <p>Built with Next.js & FastAPI Enterprise Relational Core.</p>
        </div>
      </div>
    </footer>
  );
}

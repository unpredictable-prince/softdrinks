'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Store, Search, ShieldCheck, CheckCircle2, MessageCircle, ArrowUpRight } from 'lucide-react';
import { api } from '@/lib/api';
import { Stockist } from '@/types';

const defaultStockists: Stockist[] = [
  {
    id: 1,
    business_name: 'Patel Provision & Cold Corner',
    contact_name: 'Bhavin Patel',
    phone: '9898012345',
    address: 'Shop 4, Sardar Complex, C.G. Road',
    city: 'Ahmedabad',
    state: 'Gujarat',
  },
  {
    id: 2,
    business_name: 'Shreeji Beverage Agency',
    contact_name: 'Jignesh Shah',
    phone: '9825098765',
    address: 'G-12, APMC Market, Maninagar',
    city: 'Ahmedabad',
    state: 'Gujarat',
  },
  {
    id: 3,
    business_name: 'Karnavati Cold Drinks & Snacks',
    contact_name: 'Jayeshbhai Soni',
    phone: '9879011223',
    address: 'Opp. Law Garden Night Market, Ellisbridge',
    city: 'Ahmedabad',
    state: 'Gujarat',
  },
  {
    id: 4,
    business_name: 'Tapi Refreshment & Dairy Hub',
    contact_name: 'Chetanbhai Desai',
    phone: '9824155667',
    address: 'Shop 18, Ghod Dod Road, Near Joggers Park',
    city: 'Surat',
    state: 'Gujarat',
  },
  {
    id: 5,
    business_name: 'Dumas Road Corner Store',
    contact_name: 'Nilesh Parekh',
    phone: '9898233445',
    address: 'Shop 7, Royal Arcade, Piplod',
    city: 'Surat',
    state: 'Gujarat',
  },
  {
    id: 6,
    business_name: 'Sayajigunj Daily Needs & Soda Point',
    contact_name: 'Hasmukh Prajapati',
    phone: '9879033881',
    address: 'Station Road, Near Dairy Den Circle, Sayajigunj',
    city: 'Vadodara',
    state: 'Gujarat',
  },
  {
    id: 7,
    business_name: 'Alkapuri Beverage Traders',
    contact_name: 'Devang Trivedi',
    phone: '9825477889',
    address: 'Plot 9, Race Course Circle, Alkapuri',
    city: 'Vadodara',
    state: 'Gujarat',
  },
  {
    id: 8,
    business_name: 'Saurashtra Kirana & Dairy Junction',
    contact_name: 'Mansukhbhai Patel',
    phone: '9824088990',
    address: 'Dhebar Road, Near Trikon Baug',
    city: 'Rajkot',
    state: 'Gujarat',
  },
  {
    id: 9,
    business_name: 'Gondal Road Cold Drink House',
    contact_name: 'Pravinbhai Jadeja',
    phone: '9898744551',
    address: 'Opp. Swaminarayan Temple, Gondal Road',
    city: 'Rajkot',
    state: 'Gujarat',
  },
];

const CITIES = ['All Gujarat', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'];

export default function StockistFinder() {
  const [selectedCity, setSelectedCity] = useState<string>('All Gujarat');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stockists, setStockists] = useState<Stockist[]>(defaultStockists);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadStockists() {
      setIsLoading(true);
      try {
        const cityParam = selectedCity === 'All Gujarat' ? undefined : selectedCity;
        const data = await api.getPublicStockists(cityParam);
        if (data && data.length > 0) {
          setStockists(data);
        } else {
          if (cityParam) {
            setStockists(defaultStockists.filter((s) => s.city.toLowerCase() === cityParam.toLowerCase()));
          } else {
            setStockists(defaultStockists);
          }
        }
      } catch {
        if (selectedCity !== 'All Gujarat') {
          setStockists(defaultStockists.filter((s) => s.city.toLowerCase() === selectedCity.toLowerCase()));
        } else {
          setStockists(defaultStockists);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadStockists();
  }, [selectedCity]);

  const filtered = stockists.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (s.business_name && s.business_name.toLowerCase().includes(q)) ||
      s.contact_name.toLowerCase().includes(q) ||
      (s.address && s.address.toLowerCase().includes(q)) ||
      s.city.toLowerCase().includes(q)
    );
  });

  return (
    <section id="stockists" className="relative py-24 sm:py-32 bg-[#050608] border-b border-white/[0.08] overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>COLD CHAIN REPOSITORIES</span>
              <span className="text-zinc-600">/</span>
              <span>VERIFIED RETAIL STOCKISTS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              GUJARAT COLD <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-emerald-400 bg-clip-text text-transparent">
                SUPPLY NETWORK.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-zinc-400 text-sm sm:text-base leading-relaxed">
            Locate authorized regional provision stores, highway dhabas, and cold drink centres stocked with fresh daily batches chilled at 3°C - 5°C.
          </p>
        </div>

        {/* Filter Controls Ribbon */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md">
          {/* City Selector */}
          <div className="flex overflow-x-auto w-full md:w-auto gap-2 no-scrollbar">
            {CITIES.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCity === c
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by neighborhood, street, or store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Stockist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((stockist) => (
            <div
              key={stockist.id}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-amber-400 font-bold">
                    {stockist.city}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>3°C Visi-Cooler</span>
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {stockist.business_name || stockist.contact_name}
                </h3>

                <p className="text-xs font-mono text-zinc-400">
                  Manager: <span className="text-zinc-200">{stockist.contact_name}</span>
                </p>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {stockist.address || `${stockist.city}, Gujarat`}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Authorized Cold Depot & Glass Return Point</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <a
                  href={`tel:${stockist.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono font-bold text-white transition-all"
                >
                  <Phone className="h-3.5 w-3.5 text-amber-400" />
                  <span>Call {stockist.phone}</span>
                </a>

                <a
                  href={`https://wa.me/91${stockist.phone}?text=Hello%20${encodeURIComponent(stockist.contact_name)},%20I%20found%20you%20on%20Fizzora%20and%20would%20like%20to%20check%20chilled%20crate%20stock.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-all"
                  title="WhatsApp Store Direct"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-14 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
            <Store className="h-8 w-8 text-zinc-500 mx-auto" />
            <h4 className="font-display text-base font-bold text-white">No stockists matched your search</h4>
            <p className="text-xs font-mono text-zinc-400 max-w-sm mx-auto">
              Please select &lsquo;All Gujarat&rsquo; or another city tab above to browse authorized outlets.
            </p>
          </div>
        )}

        {/* Retailer Partnership Callout */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-white/[0.02] to-emerald-500/10 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Are You a Gujarat Provision Store or Dhaba Owner?</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Install a Fizzora Cold Dispenser in Your Store
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm max-w-xl">
              Qualify for zero-deposit branded visi-coolers, 26% retailer profit margins, and guaranteed morning delivery across Ahmedabad, Surat, Vadodara, and Rajkot.
            </p>
          </div>

          <a
            href="#retailers"
            className="flex-shrink-0 px-6 py-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            Apply for Dealership & Crates
          </a>
        </div>

      </div>
    </section>
  );
}

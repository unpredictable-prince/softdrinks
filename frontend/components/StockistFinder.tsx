'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Store, Search, ExternalLink, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
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
          // Filter default stockists locally
          if (cityParam) {
            setStockists(defaultStockists.filter((s) => s.city.toLowerCase() === cityParam.toLowerCase()));
          } else {
            setStockists(defaultStockists);
          }
        }
      } catch (err) {
        // Fallback filter locally
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
    <section id="stockists" className="py-20 lg:py-28 bg-[#090a0f] relative overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span>Retail Availability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Find A <span className="gradient-text">Gujarat Stockist Near You</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-base sm:text-lg">
            Pick up chilled bottles of Jeera Masala Fizz, Kachi Keri, Desi Masala Chaas, or Rajwadi Lassi at verified provision shops and cold corners.
          </p>
        </div>

        {/* Filter Bar: City Tabs & Live Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* City Selector Pills */}
          <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 no-scrollbar">
            {CITIES.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCity === c
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25 scale-102'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search area, shop or street..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Stockist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((stockist) => (
            <div
              key={stockist.id}
              className="rounded-2xl glass-panel p-6 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between group hover:shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Store className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    {stockist.city}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {stockist.business_name || stockist.contact_name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Contact: <span className="text-zinc-300 font-medium">{stockist.contact_name}</span>
                </p>

                <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                  {stockist.address || `${stockist.city}, Gujarat`}
                </p>

                <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Cold Storage & Daily Stock</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <a
                  href={`tel:${stockist.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all"
                >
                  <Phone className="h-3.5 w-3.5 text-amber-400" />
                  <span>Call {stockist.phone}</span>
                </a>

                <a
                  href={`https://wa.me/91${stockist.phone}?text=Hello%20${encodeURIComponent(stockist.contact_name)},%20I%20found%20you%20on%20Fizzora.in%20and%20would%20like%20to%20know%20if%20you%20have%20chilled%20bottles%20in%20stock.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-all"
                  title="WhatsApp Store"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 rounded-3xl bg-white/5 border border-white/10">
            <Store className="h-10 w-10 text-zinc-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white">No retail stockists matched your search</h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Try searching for a different area or select another Gujarat city from the filter tabs above.
            </p>
          </div>
        )}

        {/* Retailer Partnership Callout Banner */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-amber-500/15 border border-amber-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Are You a Gujarat Store Owner?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Stock Fizzora In Your Shop Or Cold Corner
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
              Receive company visi-coolers, zero-spill crates, verified margin discounts, and same-day delivery across Ahmedabad, Surat, Vadodara, and Rajkot.
            </p>
          </div>

          <a
            href="#retailers"
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-lg shadow-amber-500/25 transition-all"
          >
            Apply for Retail Dealership
          </a>
        </div>
      </div>
    </section>
  );
}

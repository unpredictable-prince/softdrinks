'use client';

import { Phone, Mail, MessageCircle, MapPin, Clock, ArrowUpRight, Radio, Truck, ShieldCheck, Warehouse } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactSection() {
  const phone = process.env.NEXT_PUBLIC_PHONE || '+91 98765 43210';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '+919876543210';
  const email = process.env.NEXT_PUBLIC_EMAIL || 'contact@fizzora.in';
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM || 'https://instagram.com/fizzora_drinks';

  return (
    <section id="contact" className="py-28 lg:py-36 bg-[#06070a] relative border-t border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-[11px] font-mono tracking-widest uppercase mb-4">
              <Radio className="w-3 h-3 animate-pulse text-amber-400" />
              <span>Gujarat Regional Despatch & Operations</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase">
              Central Depot <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-emerald-400">&amp; Hotline</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-body text-sm sm:text-base max-w-md leading-relaxed">
            Direct priority switchboards for commercial crate allocation, distributor onboarding, chilled banquet delivery, and corporate gifting across Gujarat.
          </p>
        </div>

        {/* Main Grid: Depot Telemetry Left + 4 Action Conduits Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Terminal & Facility Dossier (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/60 p-8 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-all duration-700" />
            
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <Warehouse className="w-5 h-5 text-amber-400" />
                  <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">Hub Station 01</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase tracking-wider font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Depot Active
                </span>
              </div>

              {/* Physical Facility Details */}
              <div className="space-y-5">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Bottling &amp; Cold Storage Compound</div>
                  <h3 className="text-xl font-display font-black text-white">Naroda GIDC Industrial Estate</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-body">
                    Plot 42, Phase II, GIDC Naroda, Ahmedabad, Gujarat — 382330
                  </p>
                  <p className="font-mono text-[11px] text-amber-400/80 mt-1">
                    Geo: 23.0784° N, 72.6713° E • Elevation: 53m AMSL
                  </p>
                </div>

                {/* Logistics Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-2 text-zinc-400 mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-mono text-[10px] uppercase tracking-wider">Fleet Despatch</span>
                    </div>
                    <div className="font-display font-bold text-white text-sm">08:00 — 19:30</div>
                    <div className="text-[10px] text-zinc-500 font-body">Mon to Sat (Daily Cycle)</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-2 text-zinc-400 mb-1">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-mono text-[10px] uppercase tracking-wider">Loading Docks</span>
                    </div>
                    <div className="font-display font-bold text-white text-sm">4 Bays Active</div>
                    <div className="text-[10px] text-zinc-500 font-body">Pre-chilled 3°C Cargo</div>
                  </div>
                </div>

                {/* Assurance seal */}
                <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-300 font-body leading-relaxed">
                    <strong className="text-amber-300">Direct Factory Access:</strong> Registered regional distributors may inspect batch testing certificates and CO₂ isobaric logs on appointment.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Coordinates & QR Notice */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>EST. 2026 GUJARAT</span>
              <span className="text-zinc-400">STATUS: REFRIGERATED</span>
            </div>
          </div>

          {/* Right Column: 4 Direct Digital Channels (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Priority WhatsApp Desk */}
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Fizzora%20Depot,%20I%20am%20inquiring%20about%20direct%20crate%20allocation%20and%20regional%20distribution%20in%20Gujarat.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-zinc-950/60 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-950/10 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Instant
                  </span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Fastest Channel</div>
                <h4 className="text-lg font-display font-black text-white group-hover:text-emerald-300 transition-colors">
                  WhatsApp Priority Desk
                </h4>
                <p className="text-xs text-zinc-400 font-body mt-2 leading-relaxed">
                  Direct line for real-time crate quotes, urgent pallet dispatches, and dealership queries.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Start Direct Chat</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            {/* 2. Direct Voice Switchboard */}
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="p-6 rounded-3xl bg-zinc-950/60 border border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-950/10 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    Voice Line
                  </span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Headquarters Switchboard</div>
                <h4 className="text-lg font-display font-black text-white group-hover:text-amber-300 transition-colors">
                  {phone}
                </h4>
                <p className="text-xs text-zinc-400 font-body mt-2 leading-relaxed">
                  Speak directly with the Gujarat logistics manager for route schedules and fleet bookings.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Call Switchboard</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            {/* 3. Corporate & Accounts Email Desk */}
            <a
              href={`mailto:${email}`}
              className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-200 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                    Official Desk
                  </span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Formal Correspondence</div>
                <h4 className="text-lg font-display font-black text-white group-hover:text-amber-300 transition-colors truncate">
                  {email}
                </h4>
                <p className="text-xs text-zinc-400 font-body mt-2 leading-relaxed">
                  Institutional procurement, corporate banquet contracts, retail compliance, and GST invoices.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono font-bold text-zinc-300 group-hover:translate-x-1 transition-transform">
                <span>Send Formal Request</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            {/* 4. Instagram & Brand Cultural Room */}
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-zinc-950/60 border border-pink-500/20 hover:border-pink-500/50 hover:bg-pink-950/10 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-full">
                    Social Gallery
                  </span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Visual Chronicle</div>
                <h4 className="text-lg font-display font-black text-white group-hover:text-pink-300 transition-colors">
                  @fizzora_drinks
                </h4>
                <p className="text-xs text-zinc-400 font-body mt-2 leading-relaxed">
                  Summer drops, cold-brew photography, Gujarati festival specials, and behind-the-bottling footage.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono font-bold text-pink-400 group-hover:translate-x-1 transition-transform">
                <span>View Instagram Feed</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}

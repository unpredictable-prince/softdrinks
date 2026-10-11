'use client';

import { useState } from 'react';
import { Store, Send, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck, Truck, Percent, Zap } from 'lucide-react';
import { api } from '@/lib/api';

const gujaratCities = [
  'Ahmedabad',
  'Surat',
  'Vadodara',
  'Rajkot',
  'Bhavnagar',
  'Jamnagar',
  'Gandhinagar',
  'Junagadh',
  'Anand',
  'Navsari',
  'Morbi',
  'Nadiad',
  'Surendranagar',
  'Bharuch',
  'Mehsana',
  'Bhuj',
  'Porbandar',
  'Other Gujarat City',
];

export default function RetailerPartnership() {
  const [formData, setFormData] = useState({
    contact_name: '',
    business_name: '',
    phone: '',
    email: '',
    city: 'Ahmedabad',
    enquiry_type: 'RETAILER',
    estimated_demand: '20-50 crates/week',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.contact_name.trim() || !formData.phone.trim()) {
        throw new Error('Please enter your contact name and mobile number');
      }

      await api.submitPublicEnquiry({
        contact_name: formData.contact_name,
        business_name: formData.business_name || undefined,
        phone: formData.phone,
        email: formData.email || undefined,
        city: formData.city,
        enquiry_type: formData.enquiry_type,
        estimated_demand: formData.estimated_demand,
        message: formData.message,
      });

      setSuccess(true);
      setFormData({
        contact_name: '',
        business_name: '',
        phone: '',
        email: '',
        city: 'Ahmedabad',
        enquiry_type: 'RETAILER',
        estimated_demand: '20-50 crates/week',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry. Please verify details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="retailers" className="relative py-24 sm:py-32 bg-[#06070a] border-b border-white/[0.08] overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>B2B COMMERCIAL OPERATIONS</span>
              <span className="text-zinc-600">/</span>
              <span>WHOLESALE ALLOCATION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              CRATE ALLOCATION & <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-emerald-400 bg-clip-text text-transparent">
                DEALERSHIP TERMS.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-zinc-400 text-sm sm:text-base leading-relaxed">
            Direct bottling-to-shelf supply agreements for regional provision shops, highway restaurants, and beverage stockists across all Gujarat districts.
          </p>
        </div>

        {/* Commercial Operations Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Commercial Economics & Dealership Structure */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                COMMERCIAL ECONOMICS BREAKDOWN
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Engineered for High Retail Turnover & Predictable Margins.
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We believe regional beverage retailers deserve transparency. Our direct-from-depot distribution removes broker layers, maximizing your per-crate profit.
              </p>
            </div>

            {/* Economics Highlight Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Percent className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-white">
                    26% Guaranteed Trade Margin
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Standard 200ml glass bottle: ₹9.50 wholesale price vs ₹12.00 consumer MRP. Keep ₹2.50 clear profit per bottle sold.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-white">
                    Doorstep Morning Logistics
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Weekly scheduled route trucks across Ahmedabad, Surat, Vadodara, and Rajkot. Empty glass crate retrieval handled on spot.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-white">
                    Branded Visi-Cooler Allocation
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Stores stocking 50+ crates/week receive company-installed glass visi-coolers calibrated to the 3°C cold-chain standard.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Helpline Callout */}
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>B2B Commercial Desk (IST 09:00 - 20:00):</span>
              <a href="tel:+919876543210" className="text-amber-400 font-bold hover:underline">
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Right Column: Commercial Allocation Terminal Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative">
              <div className="space-y-1.5 mb-8">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest">
                  <Store className="h-3.5 w-3.5" />
                  <span>Trade Registration Form</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  Request Crate Allocation
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Our regional route officer will contact your mobile within 24 hours with wholesale price lists and sample crates.
                </p>
              </div>

              {success ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-4">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
                  <h4 className="font-display text-xl font-bold text-white">
                    Allocation Request Logged
                  </h4>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you for your commercial partnership inquiry. Our regional route coordinator for your city will call you with dispatch terms and sample bottles.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-2 px-6 py-2.5 rounded-lg bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-emerald-300 transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 flex items-center gap-2.5 text-xs font-mono text-red-300">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Patel"
                        value={formData.contact_name}
                        onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                        Business / Store Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sardar Cold Corner & Provision"
                        value={formData.business_name}
                        onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                        Mobile Phone (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98250 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="business@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                        Gujarat City *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#0c0e14] px-3.5 py-3 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
                      >
                        {gujaratCities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                        Business Entity
                      </label>
                      <select
                        value={formData.enquiry_type}
                        onChange={(e) => setFormData({ ...formData, enquiry_type: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#0c0e14] px-3.5 py-3 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="RETAILER">Provision Shop / Kirana</option>
                        <option value="DISTRIBUTOR">Regional Distributor</option>
                        <option value="BULK_EVENT">Caterer / Highway Dhaba</option>
                        <option value="OTHER">Other Commercial Entity</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                        Initial Weekly Volume
                      </label>
                      <select
                        value={formData.estimated_demand}
                        onChange={(e) => setFormData({ ...formData, estimated_demand: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#0c0e14] px-3.5 py-3 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="10-20 crates/week">10-20 crates / wk</option>
                        <option value="20-50 crates/week">20-50 crates / wk</option>
                        <option value="50-100 crates/week">50-100 crates / wk (Visi-Cooler)</option>
                        <option value="100+ crates/week">100+ crates (Distributor)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                      Specific Flavors or Requirements
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Looking for 30 crates of Jeera Masala Fizz and Desi Masala Chaas for summer season."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 py-4 text-xs font-mono font-bold uppercase tracking-wider text-black shadow-xl transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Logging Allocation Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Wholesale Allocation Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

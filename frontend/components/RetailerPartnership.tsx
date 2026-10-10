'use client';

import { useState } from 'react';
import { Store, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
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
    <section id="retailers" className="py-20 lg:py-28 bg-[#0c0e14] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Partnership Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
              <Store className="h-3.5 w-3.5" />
              <span>B2B Retail & Wholesale</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Stock Fizzora in Your Shop. <br />
              <span className="gradient-citrus">Grow High-Margin Sales.</span>
            </h2>

            <p className="text-zinc-300 text-base leading-relaxed">
              We partner directly with provision stores, paan corners, roadside snack joints, caterers, and regional beverage distributors across all 33 districts of Gujarat.
            </p>

            <ul className="space-y-3.5 text-sm text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="rounded-full bg-emerald-500/20 p-1 text-emerald-400">✓</span>
                <span><strong>High Distributor & Retailer Margins:</strong> Competitive trade discount structures on 200ml and 500ml bottles.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="rounded-full bg-emerald-500/20 p-1 text-emerald-400">✓</span>
                <span><strong>Doorstep Crate Deliveries:</strong> Weekly vehicle replenishment and empty bottle management.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="rounded-full bg-emerald-500/20 p-1 text-emerald-400">✓</span>
                <span><strong>Promotional Banners & Standees:</strong> Point-of-sale branding boards provided to authorized retailers.</span>
              </li>
            </ul>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl relative">
              <h3 className="text-2xl font-bold text-white mb-1">
                Retailer & Distributor Enquiry
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Fill the details below. Our Gujarat regional distribution officer will get in touch within 24 hours.
              </p>

              {success ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-3">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Enquiry Received Successfully!</h4>
                  <p className="text-sm text-zinc-300">
                    Thank you for your interest in partnering with Fizzora. A dedicated sales manager will call your mobile number with crate price lists and sample deliveries.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-3 rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-black hover:bg-emerald-400"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 flex items-center gap-2.5 text-xs text-red-300">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Your Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Patel"
                        value={formData.contact_name}
                        onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Shop or Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sardar Cold Corner"
                        value={formData.business_name}
                        onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Mobile Phone (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98250 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@business.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Gujarat City / Area *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        {gujaratCities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Business Type
                      </label>
                      <select
                        value={formData.enquiry_type}
                        onChange={(e) => setFormData({ ...formData, enquiry_type: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="RETAILER">Retail Shop / Kirana</option>
                        <option value="DISTRIBUTOR">Regional Distributor</option>
                        <option value="BULK_EVENT">Caterer / Event Hall</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Estimated Demand
                      </label>
                      <select
                        value={formData.estimated_demand}
                        onChange={(e) => setFormData({ ...formData, estimated_demand: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="10-20 crates/week">10-20 crates/wk</option>
                        <option value="20-50 crates/week">20-50 crates/wk</option>
                        <option value="50-100 crates/week">50-100 crates/wk</option>
                        <option value="100+ crates/week">100+ crates (Distributor)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Notes or Preferred Flavours
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Interested in starting with 30 crates of Jeera Masala and Lemon Lime for summer season."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving Enquiry...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Retailer Partnership Request
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

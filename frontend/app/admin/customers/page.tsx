'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Building2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Customer } from '@/types';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    customer_type: 'RETAILER',
    business_name: '',
    contact_name: '',
    phone: '',
    email: '',
    gstin: '',
    address: '',
    city: 'Ahmedabad',
    state: 'Gujarat',
    notes: '',
  });

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await api.getCustomers({
        type: typeFilter || undefined,
        search: searchTerm || undefined,
      });
      setCustomers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [typeFilter, searchTerm]);

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact_name || !formData.phone) {
      setError('Contact person and phone number are required');
      return;
    }
    setActionLoading(true);
    setError(null);

    try {
      await api.createCustomer(formData);
      setModalOpen(false);
      setFormData({
        customer_type: 'RETAILER',
        business_name: '',
        contact_name: '',
        phone: '',
        email: '',
        gstin: '',
        address: '',
        city: 'Ahmedabad',
        state: 'Gujarat',
        notes: '',
      });
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Failed to create customer');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Retailers & Distributors Directory
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage authorized shopkeepers, cold drink parlours, and regional stockists across Gujarat.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black shadow-md shadow-amber-500/20 hover:bg-amber-400 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Retailer / Customer
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name, shop, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full sm:w-auto rounded-xl border border-white/10 bg-[#161a23] px-3.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
        >
          <option value="">All Customer Types</option>
          <option value="RETAILER">Retail Shops / Kirana</option>
          <option value="DISTRIBUTOR">Regional Distributors</option>
          <option value="DIRECT_CONSUMER">Direct Wholesale / Caterer</option>
        </select>
      </div>

      {/* Customers Cards / Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-zinc-500">
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-amber-400 mb-2" />
            Loading customer records...
          </div>
        ) : customers.length === 0 ? (
          <div className="col-span-full py-12 text-center text-zinc-500 rounded-2xl glass-panel border border-white/10">
            No customer profiles found. Add new retailers or convert qualified enquiries.
          </div>
        ) : (
          customers.map((c) => (
            <div key={c.id} className="rounded-2xl glass-panel p-5 border border-white/10 flex flex-col justify-between space-y-4 hover:border-amber-500/20 transition-all">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
                    {c.customer_type}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">ID #{c.id}</span>
                </div>

                <h3 className="text-base font-bold text-white mt-2">
                  {c.business_name || c.contact_name}
                </h3>
                <p className="text-xs text-zinc-400">{c.contact_name}</p>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-300 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Phone className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <a href={`tel:${c.phone}`} className="hover:text-white font-mono">{c.phone}</a>
                </div>

                {c.email && (
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Mail className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{c.email}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{c.city}, {c.state}</span>
                </div>

                {c.gstin && (
                  <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
                    <Building2 className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    <span>GST: {c.gstin}</span>
                  </div>
                )}
              </div>

              {c.notes && (
                <div className="rounded-lg bg-white/[0.03] p-2 text-[11px] text-zinc-400 italic">
                  &ldquo;{c.notes}&rdquo;
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* CREATE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Add Retailer / Stockist</h2>
            <p className="text-xs text-zinc-400 mb-6">Enter new retailer details into the regional directory.</p>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 flex items-center gap-2 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Customer Type *</label>
                  <select
                    value={formData.customer_type}
                    onChange={(e) => setFormData({ ...formData, customer_type: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="RETAILER">Retail Shop / Kirana</option>
                    <option value="DISTRIBUTOR">Regional Distributor</option>
                    <option value="DIRECT_CONSUMER">Direct Wholesale / Banquet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Shop / Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sardar Cold Corner"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98250 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">GSTIN (Optional)</label>
                  <input
                    type="text"
                    placeholder="24AAAAA0000A1Z5"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmedabad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Address / Landmark</label>
                  <input
                    type="text"
                    placeholder="e.g. Shop 4, C.G. Road"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Notes</label>
                <input
                  type="text"
                  placeholder="e.g. High demand for Jeera Masala 200ml glass"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : 'Save Retailer Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

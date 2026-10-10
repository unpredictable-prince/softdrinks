'use client';

import { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  UserCheck,
  Building,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Enquiry } from '@/types';

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Conversion / Edit Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [newStatus, setNewStatus] = useState('CONTACTED');
  const [notes, setNotes] = useState('');

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await api.getEnquiries(statusFilter || undefined);
      setEnquiries(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setActionLoading(true);
    setError(null);
    try {
      await api.updateEnquiryStatus(selectedEnquiry.id, {
        status: newStatus,
        notes: notes || undefined,
      });
      setSelectedEnquiry(null);
      setNotes('');
      await loadEnquiries();
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConvert = async (enquiry: Enquiry) => {
    if (!confirm(`Convert "${enquiry.contact_name}" into an official Retailer Customer in the directory?`)) return;
    setActionLoading(true);
    try {
      await api.convertEnquiry(enquiry.id, {
        customer_type: enquiry.enquiry_type || 'RETAILER',
      });
      alert(`Successfully converted ${enquiry.contact_name} into a Customer record!`);
      await loadEnquiries();
    } catch (err: any) {
      alert(err.message || 'Failed to convert enquiry to customer');
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
            Leads & B2B Enquiries Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Review inbound website queries, record follow-ups, and convert qualified shop owners into customers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#161a23] px-3.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
          >
            <option value="">All Lead Stages</option>
            <option value="NEW">NEW (Awaiting review)</option>
            <option value="CONTACTED">CONTACTED (Phone call made)</option>
            <option value="QUALIFIED">QUALIFIED (Demand verified)</option>
            <option value="CONVERTED">CONVERTED (Active customer)</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 flex items-center gap-2.5 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Leads List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-zinc-500">
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-amber-400 mb-2" />
            Loading lead pipeline...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="col-span-full py-12 text-center text-zinc-500 rounded-2xl glass-panel border border-white/10">
            No inquiries found matching this stage.
          </div>
        ) : (
          enquiries.map((enq) => (
            <div
              key={enq.id}
              className="rounded-2xl glass-panel p-5 border border-white/10 flex flex-col justify-between space-y-4 hover:border-amber-500/20 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      enq.status === 'NEW'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                        : enq.status === 'QUALIFIED'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : enq.status === 'CONVERTED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/30'
                    }`}
                  >
                    {enq.status}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Received {new Date(enq.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mt-2">
                  {enq.business_name || enq.contact_name}
                </h3>
                <p className="text-xs text-zinc-400">{enq.contact_name} &bull; Type: {enq.enquiry_type}</p>
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5 text-xs text-zinc-300 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Phone className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <a href={`tel:${enq.phone}`} className="hover:text-white font-mono">{enq.phone}</a>
                </div>

                {enq.email && (
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Mail className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span>{enq.email}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{enq.city}</span>
                </div>

                {enq.estimated_demand && (
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-[11px]">
                    <span>Demand: {enq.estimated_demand}</span>
                  </div>
                )}
              </div>

              {enq.message && (
                <div className="rounded-xl bg-white/[0.03] p-3 text-xs text-zinc-300 whitespace-pre-line border border-white/5">
                  {enq.message}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/5">
                <button
                  onClick={() => {
                    setSelectedEnquiry(enq);
                    setNewStatus(enq.status);
                  }}
                  className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10"
                >
                  Update Stage & Notes
                </button>

                {enq.status !== 'CONVERTED' ? (
                  <button
                    disabled={actionLoading}
                    onClick={() => handleConvert(enq)}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black hover:bg-emerald-400 transition-all"
                  >
                    <UserCheck className="h-3.5 w-3.5" />
                    Convert to Customer
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Customer Created
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* UPDATE STATUS MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Update Lead Status</h2>
            <p className="text-xs text-zinc-400 mb-6">
              Track communication with {selectedEnquiry.contact_name} ({selectedEnquiry.phone}).
            </p>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Lead Stage *</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED (Spoke on phone)</option>
                  <option value="QUALIFIED">QUALIFIED (Ready for pricing / sample visit)</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="CLOSED">CLOSED (Not interested)</option>
                  <option value="SPAM">SPAM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Follow-up Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Called owner. Requested 10 crates of Jeera Masala and 5 crates of Kachi Keri as trial next Tuesday."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : 'Save Lead Notes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

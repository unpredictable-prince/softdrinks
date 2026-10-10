'use client';

import { useState, useEffect } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Receipt,
  FileCheck,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Payment, Sale } from '@/types';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'UPI' | 'BANK_TRANSFER' | 'CHEQUE'>('UPI');
  const [amount, setAmount] = useState<number | ''>('');
  const [transactionRef, setTransactionRef] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedSaleId, setSelectedSaleId] = useState<number | ''>('');
  const [allocatedAmount, setAllocatedAmount] = useState<number | ''>('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [payData, salesData] = await Promise.all([
        api.getPayments(),
        api.getSales(),
      ]);
      setPayments(payData);
      setSales(salesData);
      // Pick first sale with positive balance
      const dueSale = salesData.find((s) => Number(s.outstanding_balance) > 0);
      if (dueSale) {
        setSelectedSaleId(dueSale.id);
        setAllocatedAmount(Number(dueSale.outstanding_balance));
        setAmount(Number(dueSale.outstanding_balance));
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaleSelect = (saleId: number) => {
    setSelectedSaleId(saleId);
    const sale = sales.find((s) => s.id === saleId);
    if (sale) {
      const due = Number(sale.outstanding_balance);
      setAllocatedAmount(due);
      setAmount(due);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setError('Please specify a positive payment amount');
      return;
    }
    setActionLoading(true);
    setError(null);

    try {
      const allocations = selectedSaleId && allocatedAmount && Number(allocatedAmount) > 0
        ? [{ sale_id: Number(selectedSaleId), allocated_amount: Number(allocatedAmount) }]
        : undefined;

      await api.recordPayment({
        payment_method: paymentMethod,
        amount: Number(amount),
        transaction_reference: transactionRef || undefined,
        notes: notes || undefined,
        allocations,
      });

      setModalOpen(false);
      setTransactionRef('');
      setNotes('');
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to record payment');
    } finally {
      setActionLoading(false);
    }
  };

  const handleVerify = async (paymentId: number) => {
    setActionLoading(true);
    try {
      await api.verifyPayment(paymentId, 'VERIFIED');
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to verify payment');
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
            Payments & Collections
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manual cash entries, UPI UTR verification, and multi-sale allocations without over-crediting.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black shadow-md shadow-amber-500/20 hover:bg-amber-400 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Record Payment Receipt
        </button>
      </div>

      {/* Payments Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Payment Ref #</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Method</th>
                <th className="py-3 px-4 font-semibold">UTR / Transaction Ref</th>
                <th className="py-3 px-4 font-semibold text-right">Amount (₹)</th>
                <th className="py-3 px-4 font-semibold">Allocated Invoices</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-zinc-500">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-amber-400 mb-2" />
                    Loading payment records...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-zinc-500">
                    No payment records entered yet. Record receipts to reconcile outstanding balances.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{p.payment_reference}</td>
                    <td className="py-3.5 px-4 text-zinc-400">{p.payment_date}</td>
                    <td className="py-3.5 px-4">
                      <span className="rounded-md bg-white/5 px-2 py-0.5 font-semibold text-zinc-300">
                        {p.payment_method}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px]">
                      {p.transaction_reference || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                      ₹{Number(p.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4">
                      {p.allocations && p.allocations.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {p.allocations.map((a, i) => (
                            <span
                              key={i}
                              className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-300 font-mono"
                            >
                              Sale #{a.sale_id}: ₹{Number(a.allocated_amount).toFixed(2)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-zinc-500 italic text-[11px]">Unallocated credit</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          p.status === 'VERIFIED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {p.status !== 'VERIFIED' && (
                        <button
                          disabled={actionLoading}
                          onClick={() => handleVerify(p.id)}
                          className="rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 text-[11px] font-semibold hover:bg-emerald-500/30"
                        >
                          Verify Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECORD PAYMENT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Record Payment Receipt</h2>
            <p className="text-xs text-zinc-400 mb-6">
              Record collected money and allocate it directly against outstanding sales invoices.
            </p>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 flex items-center gap-2 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Payment Method *</label>
                  <select
                    value={paymentMethod}
                    onChange={(e: any) => setPaymentMethod(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="CASH">Cash in Hand</option>
                    <option value="BANK_TRANSFER">Bank Transfer (NEFT/RTGS)</option>
                    <option value="CHEQUE">Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 500.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Transaction Reference (UPI UTR / Cheque #)
                </label>
                <input
                  type="text"
                  placeholder="e.g. UPI329847192849"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Allocate To Sale Invoice */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Allocate to Sale Invoice (Optional)
                </span>
                <div>
                  <label className="block text-[10px] text-zinc-400 mb-1">Invoice with Due Balance</label>
                  <select
                    value={selectedSaleId}
                    onChange={(e) => handleSaleSelect(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3 py-2 text-xs text-white"
                  >
                    <option value="">Do not allocate (General Account Credit)</option>
                    {sales
                      .filter((s) => s.status !== 'CANCELLED')
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.sale_number} — {s.customer_business || s.customer_name} (Due: ₹{Number(s.outstanding_balance).toFixed(2)})
                        </option>
                      ))}
                  </select>
                </div>

                {selectedSaleId && (
                  <div>
                    <label className="block text-[10px] text-zinc-400 mb-1">Allocated Portion (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={allocatedAmount}
                      onChange={(e) => setAllocatedAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Received via sales executive Bhavin"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
                  {actionLoading ? 'Recording...' : 'Record Payment Receipt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

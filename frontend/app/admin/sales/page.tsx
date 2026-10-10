'use client';

import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  FileText,
  Trash2,
  AlertCircle,
  Loader2,
  Download,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Sale, Customer, Product } from '@/types';

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New Sale Form State
  const [customerId, setCustomerId] = useState<number | ''>('');
  const [sourceChannel, setSourceChannel] = useState('FIELD_VISIT');
  const [saleStatus, setSaleStatus] = useState('DRAFT');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<
    { product_variant_id: number; quantity: number; unit_price: number; discount_amount: number; tax_amount: number }[]
  >([{ product_variant_id: 0, quantity: 10, unit_price: 9.5, discount_amount: 0, tax_amount: 0 }]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [salesData, custData, prodData] = await Promise.all([
        api.getSales(statusFilter || undefined),
        api.getCustomers(),
        api.getAdminProducts(),
      ]);
      setSales(salesData);
      setCustomers(custData);
      setProducts(prodData);
      if (custData.length > 0 && customerId === '') {
        setCustomerId(custData[0].id);
      }
      if (prodData.length > 0 && items[0].product_variant_id === 0) {
        const firstVar = prodData[0].variants[0];
        if (firstVar) {
          setItems([{
            product_variant_id: firstVar.id,
            quantity: 10,
            unit_price: Number(firstVar.selling_price),
            discount_amount: 0,
            tax_amount: 0,
          }]);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load sales register');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const handleAddItem = () => {
    const firstVar = products[0]?.variants[0];
    setItems([
      ...items,
      {
        product_variant_id: firstVar ? firstVar.id : 0,
        quantity: 10,
        unit_price: firstVar ? Number(firstVar.selling_price) : 9.5,
        discount_amount: 0,
        tax_amount: 0,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleVariantChange = (index: number, variantId: number) => {
    let foundPrice = 9.5;
    products.forEach((p) => {
      p.variants.forEach((v) => {
        if (v.id === variantId) {
          foundPrice = Number(v.selling_price);
        }
      });
    });
    const updated = [...items];
    updated[index].product_variant_id = variantId;
    updated[index].unit_price = foundPrice;
    setItems(updated);
  };

  const handleCreateSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) {
      setError('Please select a customer/retailer');
      return;
    }
    setActionLoading(true);
    setError(null);
    try {
      await api.createSale({
        customer_id: Number(customerId),
        source_channel: sourceChannel,
        status: saleStatus,
        notes,
        items,
      });
      setCreateModalOpen(false);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to create sale invoice');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmSale = async (saleId: number) => {
    if (!confirm('Confirm this sale? This will deduct the required variant stock from the warehouse.')) return;
    setActionLoading(true);
    try {
      await api.confirmSale(saleId);
      if (selectedSale) {
        const updated = await api.getSaleDetail(saleId);
        setSelectedSale(updated);
      }
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to confirm sale');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelSale = async (saleId: number) => {
    if (!confirm('Cancel this sale? Any previously deducted warehouse stock will be safely reversed.')) return;
    setActionLoading(true);
    try {
      await api.cancelSale(saleId);
      if (selectedSale) {
        const updated = await api.getSaleDetail(saleId);
        setSelectedSale(updated);
      }
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to cancel sale');
    } finally {
      setActionLoading(false);
    }
  };

  const openSaleDetail = async (sale: Sale) => {
    try {
      const fullDetail = await api.getSaleDetail(sale.id);
      setSelectedSale(fullDetail);
    } catch {
      setSelectedSale(sale);
    }
  };

  // Filtered sales
  const filteredSales = sales.filter((s) => {
    const searchMatch =
      s.sale_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.customer_name && s.customer_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.customer_business && s.customer_business.toLowerCase().includes(searchTerm.toLowerCase()));
    return searchMatch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Sales Invoices & Register
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track B2B wholesale orders, automated stock deductions, and computed outstanding balances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={api.getSalesCsvUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/10"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </a>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black shadow-md shadow-amber-500/20 hover:bg-amber-400"
          >
            <Plus className="h-4 w-4" />
            Create Sale Invoice
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search invoice # or shop name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-zinc-500 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#161a23] px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">DRAFT (No stock deducted)</option>
            <option value="CONFIRMED">CONFIRMED (Stock deducted)</option>
            <option value="FULFILLED">FULFILLED</option>
            <option value="CANCELLED">CANCELLED (Stock reversed)</option>
          </select>
        </div>
      </div>

      {/* Sales Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Invoice #</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Customer / Shop</th>
                <th className="py-3 px-4 font-semibold">Channel</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Total (₹)</th>
                <th className="py-3 px-4 font-semibold text-right">Paid (₹)</th>
                <th className="py-3 px-4 font-semibold text-right">Balance (₹)</th>
                <th className="py-3 px-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-zinc-500">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-amber-400 mb-2" />
                    Loading invoices...
                  </td>
                </tr>
              ) : filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-zinc-500">
                    No sales invoices found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredSales.map((s) => (
                  <tr key={s.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{s.sale_number}</td>
                    <td className="py-3.5 px-4 text-zinc-400">{s.sale_date}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{s.customer_business || s.customer_name}</div>
                      <div className="text-[10px] text-zinc-400">{s.customer_name}</div>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 text-[11px] font-medium">{s.source_channel}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          s.status === 'CONFIRMED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : s.status === 'DRAFT'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : s.status === 'FULFILLED'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : 'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                      ₹{Number(s.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-400">
                      ₹{Number(s.total_paid || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-400">
                      ₹{Number(s.outstanding_balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => openSaleDetail(s)}
                        className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 hover:text-white hover:bg-white/10"
                      >
                        View & Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE SALE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Create New Sale Invoice</h2>
            <p className="text-xs text-zinc-400 mb-6">Select retailer, add variant crates, and configure status.</p>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 flex items-center gap-2 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCreateSale} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Select Customer / Shop *</label>
                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.business_name || c.contact_name} ({c.city} - {c.phone})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Sales Channel</label>
                  <select
                    value={sourceChannel}
                    onChange={(e) => setSourceChannel(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="FIELD_VISIT">Field Visit</option>
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="WEBSITE_ENQUIRY">Website Enquiry</option>
                    <option value="PHONE">Phone Order</option>
                    <option value="DIRECT">Direct Pickup</option>
                  </select>
                </div>
              </div>

              {/* Items Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Line Items</span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="flex items-center gap-1 text-xs text-amber-400 font-bold hover:underline"
                  >
                    + Add Beverage Variant
                  </button>
                </div>

                {items.map((it, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-3 grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-5">
                      <label className="block text-[10px] text-zinc-400 mb-1">Product Variant</label>
                      <select
                        value={it.product_variant_id}
                        onChange={(e) => handleVariantChange(idx, Number(e.target.value))}
                        className="w-full rounded-lg border border-white/10 bg-[#161a23] p-1.5 text-xs text-white"
                      >
                        {products.map((p) =>
                          p.variants.map((v) => (
                            <option key={v.id} value={v.id}>
                              {p.name} - {v.bottle_size} ({v.sku})
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[10px] text-zinc-400 mb-1">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = [...items];
                          updated[idx].quantity = val;
                          setItems(updated);
                        }}
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[10px] text-zinc-400 mb-1">Rate (₹)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={it.unit_price}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = [...items];
                          updated[idx].unit_price = val;
                          setItems(updated);
                        }}
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="col-span-2 text-right">
                      <label className="block text-[10px] text-zinc-400 mb-1">Total</label>
                      <div className="text-xs font-bold text-amber-400 py-1.5 font-mono">
                        ₹{(it.quantity * it.unit_price).toFixed(2)}
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-center pb-1">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Initial Status</label>
                  <select
                    value={saleStatus}
                    onChange={(e) => setSaleStatus(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="DRAFT">DRAFT (Creates order without stock deduction)</option>
                    <option value="CONFIRMED">CONFIRMED (Atomically deducts warehouse stock)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Notes / Terms</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 crates returnable glass deposit"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all disabled:opacity-50"
                >
                  {actionLoading ? 'Creating Sale...' : 'Save & Issue Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SALE DETAIL MODAL */}
      {selectedSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-black text-white font-mono">{selectedSale.sale_number}</h2>
                <p className="text-xs text-zinc-400">
                  {selectedSale.customer_business || selectedSale.customer_name} &bull; Date: {selectedSale.sale_date}
                </p>
              </div>
              <button
                onClick={() => setSelectedSale(null)}
                className="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-white/5"
              >
                ✕
              </button>
            </div>

            {/* Balances Card */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl bg-white/5 p-4 border border-white/5 text-center">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">Total Invoice</span>
                <p className="text-base font-bold text-white font-mono mt-0.5">
                  ₹{Number(selectedSale.total_amount).toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-semibold">Payments Received</span>
                <p className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  ₹{Number(selectedSale.total_paid || 0).toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-amber-400 uppercase font-semibold">Outstanding Due</span>
                <p className="text-base font-bold text-amber-400 font-mono mt-0.5">
                  ₹{Number(selectedSale.outstanding_balance || 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Line items snapshot */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Line Items (Snapshots)</span>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-zinc-400">
                    <tr>
                      <th className="p-2.5">Beverage & Bottle</th>
                      <th className="p-2.5 text-right">Qty</th>
                      <th className="p-2.5 text-right">Rate</th>
                      <th className="p-2.5 text-right">Line Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {selectedSale.items?.map((it, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-medium text-white">
                          {it.product_name_snapshot} ({it.variant_snapshot})
                        </td>
                        <td className="p-2.5 text-right font-mono text-zinc-300">{it.quantity}</td>
                        <td className="p-2.5 text-right font-mono text-zinc-300">₹{Number(it.unit_price).toFixed(2)}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-amber-400">
                          ₹{Number(it.line_total).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Allocations */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Allocated Payment Receipts</span>
              {selectedSale.allocations && selectedSale.allocations.length > 0 ? (
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 text-zinc-400">
                      <tr>
                        <th className="p-2.5">Payment Ref</th>
                        <th className="p-2.5">Method</th>
                        <th className="p-2.5 text-right">Amount Allocated</th>
                        <th className="p-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {selectedSale.allocations.map((a, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 font-mono text-white">{a.payment_reference}</td>
                          <td className="p-2.5 text-zinc-300">{a.payment_method}</td>
                          <td className="p-2.5 text-right font-mono font-bold text-emerald-400">
                            ₹{Number(a.allocated_amount).toFixed(2)}
                          </td>
                          <td className="p-2.5 text-center">
                            <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px]">
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center text-xs text-zinc-500">
                  No payment allocations linked yet. Record payments in the Payments section.
                </div>
              )}
            </div>

            {/* Actions for Status Lifecycle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="text-xs text-zinc-400">
                Status: <strong className="text-white">{selectedSale.status}</strong>
              </div>

              <div className="flex items-center gap-2">
                {selectedSale.status === 'DRAFT' && (
                  <button
                    disabled={actionLoading}
                    onClick={() => handleConfirmSale(selectedSale.id)}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400 transition-all"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Confirm & Deduct Stock
                  </button>
                )}

                {selectedSale.status !== 'CANCELLED' && (
                  <button
                    disabled={actionLoading}
                    onClick={() => handleCancelSale(selectedSale.id)}
                    className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <XCircle className="h-4 w-4" />
                    Cancel Sale (Reverse Stock)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import {
  Boxes,
  Plus,
  AlertTriangle,
  History,
  Download,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { api } from '@/lib/api';
import { InventoryBalance, InventoryMovement, Product } from '@/types';

export default function InventoryPage() {
  const [balances, setBalances] = useState<InventoryBalance[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [activeTab, setActiveTab] = useState<'BALANCES' | 'MOVEMENTS'>('BALANCES');

  // Adjust Modal
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Adjust Form
  const [selectedVariantId, setSelectedVariantId] = useState<number | ''>('');
  const [locationId, setLocationId] = useState<number | ''>('');
  const [quantityDelta, setQuantityDelta] = useState<number | ''>(50);
  const [movementType, setMovementType] = useState('RECEIPT');
  const [reason, setReason] = useState('Factory fresh bottling batch receipt');

  const loadData = async () => {
    setLoading(true);
    try {
      const [balData, movData, prodData, locData] = await Promise.all([
        api.getInventoryBalances(lowStockOnly),
        api.getInventoryMovements(),
        api.getAdminProducts(),
        api.getInventoryLocations(),
      ]);
      setBalances(balData);
      setMovements(movData);
      setProducts(prodData);
      setLocations(locData);
      if (locData.length > 0 && locationId === '') {
        setLocationId(locData[0].id);
      }
      if (prodData.length > 0 && prodData[0].variants.length > 0 && selectedVariantId === '') {
        setSelectedVariantId(prodData[0].variants[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load inventory data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [lowStockOnly]);

  const handleAdjustStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVariantId || !locationId || quantityDelta === '' || !reason.trim()) {
      setError('Please provide variant, warehouse, delta, and a mandatory business reason');
      return;
    }
    setActionLoading(true);
    setError(null);

    try {
      await api.adjustInventory({
        location_id: Number(locationId),
        product_variant_id: Number(selectedVariantId),
        quantity_delta: Number(quantityDelta),
        movement_type: movementType,
        reason: reason.trim(),
      });
      setAdjustModalOpen(false);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to adjust inventory');
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
            Inventory & Warehouse Hub
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time warehouse counts, low-stock threshold monitoring, and transactional audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={api.getInventoryCsvUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/10"
          >
            <Download className="h-3.5 w-3.5" />
            Inventory CSV
          </a>
          <button
            onClick={() => setAdjustModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black shadow-md shadow-amber-500/20 hover:bg-amber-400"
          >
            <Plus className="h-4 w-4" />
            Adjust / Receive Stock
          </button>
        </div>
      </div>

      {/* Tabs & Low-stock toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center rounded-xl bg-white/5 p-1 border border-white/10">
          <button
            onClick={() => setActiveTab('BALANCES')}
            className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'BALANCES' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Current Stock Balances
          </button>
          <button
            onClick={() => setActiveTab('MOVEMENTS')}
            className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'MOVEMENTS' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Movement Audit Logs ({movements.length})
          </button>
        </div>

        {activeTab === 'BALANCES' && (
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-300">
            <input
              type="checkbox"
              checked={lowStockOnly}
              onChange={(e) => setLowStockOnly(e.target.checked)}
              className="rounded accent-amber-500 h-4 w-4"
            />
            <span className="flex items-center gap-1.5 text-amber-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              Show Low-Stock Alerts Only
            </span>
          </label>
        )}
      </div>

      {/* MAIN VIEW: BALANCES */}
      {activeTab === 'BALANCES' && (
        <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Warehouse</th>
                  <th className="py-3 px-4 font-semibold">Beverage Product</th>
                  <th className="py-3 px-4 font-semibold">Bottle Size</th>
                  <th className="py-3 px-4 font-semibold">SKU</th>
                  <th className="py-3 px-4 font-semibold text-right">Available Stock</th>
                  <th className="py-3 px-4 font-semibold text-right">Reorder Threshold</th>
                  <th className="py-3 px-4 font-semibold text-center">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Last Movement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-zinc-500">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-amber-400 mb-2" />
                      Loading inventory balances...
                    </td>
                  </tr>
                ) : balances.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-zinc-500">
                      No inventory balances found.
                    </td>
                  </tr>
                ) : (
                  balances.map((b) => (
                    <tr key={b.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">{b.location_name}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{b.product_name}</td>
                      <td className="py-3.5 px-4 text-zinc-300">{b.bottle_size}</td>
                      <td className="py-3.5 px-4 font-mono text-zinc-400 text-[11px]">{b.sku}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-base text-white">
                        {b.quantity_on_hand.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-zinc-400">
                        {b.reorder_threshold}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {b.is_low_stock ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-0.5 text-[10px] font-bold">
                            <AlertTriangle className="h-3 w-3" />
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold">
                            <CheckCircle2 className="h-3 w-3" />
                            Adequate
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right text-zinc-400 text-[11px]">
                        {new Date(b.updated_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECONDARY VIEW: MOVEMENTS AUDIT TRAIL */}
      {activeTab === 'MOVEMENTS' && (
        <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Date & Time</th>
                  <th className="py-3 px-4 font-semibold">Type</th>
                  <th className="py-3 px-4 font-semibold">Warehouse</th>
                  <th className="py-3 px-4 font-semibold">Beverage SKU</th>
                  <th className="py-3 px-4 font-semibold text-right">Delta Qty</th>
                  <th className="py-3 px-4 font-semibold">Reason / Audit Trail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {movements.map((m) => (
                  <tr key={m.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 text-zinc-400">
                      {new Date(m.created_at).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          m.movement_type === 'RECEIPT'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : m.movement_type === 'SALE_DEDUCTION'
                            ? 'bg-blue-500/10 text-blue-400'
                            : m.movement_type === 'SALE_REVERSAL'
                            ? 'bg-purple-500/10 text-purple-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {m.movement_type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300">{m.location_name}</td>
                    <td className="py-3.5 px-4 font-semibold text-white font-mono">{m.sku}</td>
                    <td
                      className={`py-3.5 px-4 text-right font-mono font-bold ${
                        m.quantity_delta > 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {m.quantity_delta > 0 ? `+${m.quantity_delta}` : m.quantity_delta}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300 max-w-sm truncate">{m.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADJUST INVENTORY MODAL */}
      {adjustModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Adjust Warehouse Stock</h2>
            <p className="text-xs text-zinc-400 mb-6">
              Record production bottling receipts, physical audit count corrections, or damaged bottle losses.
            </p>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 flex items-center gap-2 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleAdjustStock} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Warehouse Location *</label>
                <select
                  value={locationId}
                  onChange={(e) => setLocationId(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Product Variant *</label>
                <select
                  value={selectedVariantId}
                  onChange={(e) => setSelectedVariantId(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  {products.map((p) =>
                    p.variants.map((v) => (
                      <option key={v.id} value={v.id}>
                        {p.name} — {v.bottle_size} ({v.sku})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Adjustment Type *</label>
                  <select
                    value={movementType}
                    onChange={(e) => setMovementType(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#161a23] px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="RECEIPT">RECEIPT (+ New Production)</option>
                    <option value="ADJUSTMENT">ADJUSTMENT (+/- Count)</option>
                    <option value="DAMAGE">DAMAGE (- Broken/Leaking)</option>
                    <option value="EXPIRY">EXPIRY (- Expired batch)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Quantity Delta *</label>
                  <input
                    type="number"
                    required
                    placeholder="+50 or -10"
                    value={quantityDelta}
                    onChange={(e) => setQuantityDelta(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Mandatory Business Reason *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Received batch #GZ2026-04 from Naroda line"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setAdjustModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all disabled:opacity-50"
                >
                  {actionLoading ? 'Updating Stock...' : 'Save Stock Adjustment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import {
  Wine,
  Plus,
  Edit2,
  DollarSign,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/types';

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New Product Modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [prodName, setProdName] = useState('');
  const [prodSlug, setProdSlug] = useState('');
  const [prodFlavour, setProdFlavour] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodFeatured, setProdFeatured] = useState(true);

  // Add Variant Modal
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [bottleSize, setBottleSize] = useState('200ml Glass/PET');
  const [sku, setSku] = useState('');
  const [mrp, setMrp] = useState('12.00');
  const [sellingPrice, setSellingPrice] = useState('9.50');
  const [costPrice, setCostPrice] = useState('6.20');
  const [reorderThreshold, setReorderThreshold] = useState('100');

  const [actionLoading, setActionLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setError(null);
    try {
      await api.createProduct({
        name: prodName,
        slug: prodSlug.toLowerCase().replace(/\s+/g, '-'),
        flavour: prodFlavour,
        description: prodDesc,
        is_featured: prodFeatured,
        status: 'PUBLISHED',
      });
      setProductModalOpen(false);
      setProdName('');
      setProdSlug('');
      setProdFlavour('');
      setProdDesc('');
      await loadProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) return;
    setActionLoading(true);
    setError(null);
    try {
      await api.addVariant(selectedProductId, {
        bottle_size: bottleSize,
        sku: sku.toUpperCase().trim(),
        mrp: Number(mrp),
        selling_price: Number(sellingPrice),
        cost_price: Number(costPrice),
        reorder_threshold: Number(reorderThreshold),
        is_active: true,
      });
      setVariantModalOpen(false);
      setSku('');
      await loadProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to add variant');
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
            Beverage Catalog & Bottle Variants
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Configure flavors, bottle capacities, trade margins, and warehouse reorder thresholds.
          </p>
        </div>

        <button
          onClick={() => setProductModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black shadow-md shadow-amber-500/20 hover:bg-amber-400 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Beverage Product
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 flex items-center gap-2.5 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Products List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-zinc-500">
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-amber-400 mb-2" />
            Loading catalog...
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 rounded-2xl glass-panel border border-white/10">
            No beverage products configured yet.
          </div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                      {p.flavour}
                    </span>
                    <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 max-w-2xl">{p.description}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedProductId(p.id);
                    setSku(`FIZZ-${p.name.substring(0, 3).toUpperCase()}-200`);
                    setVariantModalOpen(true);
                  }}
                  className="rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 self-start sm:self-auto shrink-0"
                >
                  + Add Pack / Size Variant
                </button>
              </div>

              {/* Variants Table */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/5 text-zinc-400 bg-white/[0.02]">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">Bottle Format</th>
                      <th className="py-2.5 px-3 font-semibold">SKU Code</th>
                      <th className="py-2.5 px-3 font-semibold text-right">MRP (₹)</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Wholesale Selling (₹)</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Unit Cost (₹)</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Gross Margin</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Reorder Threshold</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {p.variants.map((v) => {
                      const sell = Number(v.selling_price);
                      const cost = Number(v.cost_price || 0);
                      const marginPct = sell > 0 ? (((sell - cost) / sell) * 100).toFixed(1) : '0';
                      return (
                        <tr key={v.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-2.5 px-3 font-bold text-white">{v.bottle_size}</td>
                          <td className="py-2.5 px-3 font-mono text-zinc-400">{v.sku}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-white">₹{Number(v.mrp).toFixed(2)}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400">
                            ₹{sell.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-zinc-400">₹{cost.toFixed(2)}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-semibold">
                            {marginPct}%
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-zinc-300">
                            {v.reorder_threshold || 50} units
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE PRODUCT MODAL */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Add Beverage Product</h2>
            <p className="text-xs text-zinc-400 mb-6">Create a new core carbonated soft drink variety.</p>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masala Soda Supreme"
                  value={prodName}
                  onChange={(e) => {
                    setProdName(e.target.value);
                    if (!prodSlug) setProdSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    placeholder="masala-soda-supreme"
                    value={prodSlug}
                    onChange={(e) => setProdSlug(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Flavour Profile *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Spiced Black Salt"
                    value={prodFlavour}
                    onChange={(e) => setProdFlavour(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Description of the beverage taste and carbonation characteristics..."
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : 'Create Beverage'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD VARIANT MODAL */}
      {variantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Add Bottle / Size Variant</h2>
            <p className="text-xs text-zinc-400 mb-6">Specify bottle capacity, wholesale rate, and SKU.</p>

            <form onSubmit={handleAddVariant} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Bottle Size / Format *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 200ml Glass/PET or 1.25L Family Pack"
                  value={bottleSize}
                  onChange={(e) => setBottleSize(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">SKU Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FIZZ-MSS-200"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-zinc-300 mb-1">MRP (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-zinc-300 mb-1">Selling Rate (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-zinc-300 mb-1">Cost Price (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Reorder Alert Threshold</label>
                <input
                  type="number"
                  value={reorderThreshold}
                  onChange={(e) => setReorderThreshold(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setVariantModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : 'Add Variant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

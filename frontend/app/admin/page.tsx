'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  AlertTriangle,
  Boxes,
  Users,
  Download,
  Flame,
  CheckCircle,
  RefreshCw,
  ArrowUpRight,
} from 'lucide-react';
import { api } from '@/lib/api';
import { DashboardMetrics } from '@/types';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getDashboardMetrics();
      setMetrics(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch executive business metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-amber-400">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
          <span className="text-sm font-medium text-zinc-300">Computing Real-time Financials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Executive Business Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time sales, collections, warehouse stock, and retailer pipeline across Gujarat.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchMetrics}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/10"
            title="Refresh Real-Time Metrics"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
          <a
            href={api.getSalesCsvUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/10"
          >
            <Download className="h-3.5 w-3.5" />
            Sales CSV
          </a>
          <a
            href={api.getInventoryCsvUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/10"
          >
            <Download className="h-3.5 w-3.5" />
            Inventory CSV
          </a>
          <Link
            href="/admin/sales"
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black shadow-md shadow-amber-500/10 hover:bg-amber-400"
          >
            + New Sale
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Sales */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Gross Sales</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">₹{Number(metrics?.gross_sales || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="text-[11px] text-zinc-400 mt-1">
              Discounts: ₹{Number(metrics?.discounts_given || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Payments Received (Collections) */}
        <div className="rounded-2xl glass-panel p-5 border border-emerald-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Cash / UPI Received</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-emerald-400">₹{Number(metrics?.payments_received || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="text-[11px] text-zinc-400 mt-1">Verified In-Bank / Cash</div>
          </div>
        </div>

        {/* Outstanding Receivables */}
        <div className="rounded-2xl glass-panel p-5 border border-amber-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Outstanding Balances</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-amber-400">₹{Number(metrics?.outstanding_balances || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="text-[11px] text-zinc-400 mt-1">Pending Retailer Credit</div>
          </div>
        </div>

        {/* Estimated Gross Margin */}
        <div className="rounded-2xl glass-panel p-5 border border-purple-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">Est. Gross Profit</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-300">
              <Flame className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-purple-300">₹{Number(metrics?.estimated_gross_profit || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="text-[11px] text-zinc-400 mt-1">Units Sold: {metrics?.total_units_sold} bottles</div>
          </div>
        </div>
      </div>

      {/* Secondary Operational Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Low Stock Warning */}
        <Link
          href="/admin/inventory"
          className={`rounded-2xl glass-panel p-5 border transition-all flex items-center justify-between ${
            (metrics?.low_stock_items_count || 0) > 0
              ? 'border-red-500/30 hover:border-red-500/50 bg-red-950/10'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${(metrics?.low_stock_items_count || 0) > 0 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
              <Boxes className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{metrics?.low_stock_items_count} Variants Low Stock</p>
              <p className="text-xs text-zinc-400">Below warehouse reorder threshold</p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-zinc-500" />
        </Link>

        {/* Open B2B Enquiries */}
        <Link
          href="/admin/enquiries"
          className="rounded-2xl glass-panel p-5 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{metrics?.open_enquiries_count} Active Enquiries</p>
              <p className="text-xs text-zinc-400">Pending retailer follow-ups</p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-zinc-500" />
        </Link>

        {/* Conversion Rate */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{metrics?.conversion_rate_percentage}% Lead Conversion</p>
              <p className="text-xs text-zinc-400">{metrics?.converted_enquiries_count} converted to customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Flavour Performance & Channel Split Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Flavour Leaderboard */}
        <div className="lg:col-span-7 rounded-2xl glass-panel p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Top Flavour Performance</h3>
            <span className="text-xs text-zinc-400 font-medium">By Units Sold</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider">
                  <th className="py-2.5 font-semibold">Flavour</th>
                  <th className="py-2.5 font-semibold text-right">Units Sold</th>
                  <th className="py-2.5 font-semibold text-right">Gross Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {metrics?.top_flavours && metrics.top_flavours.length > 0 ? (
                  metrics.top_flavours.map((f, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 font-semibold text-white">{f.flavour}</td>
                      <td className="py-3 text-right font-mono text-zinc-300">{f.units_sold}</td>
                      <td className="py-3 text-right font-mono font-bold text-amber-400">
                        ₹{Number(f.gross_revenue).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-zinc-500">
                      No sales records recorded yet. Create confirmed sales to populate analytics.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Channel Breakdown */}
        <div className="lg:col-span-5 rounded-2xl glass-panel p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Sales Channel Mix</h3>
            <span className="text-xs text-zinc-400 font-medium">Orders</span>
          </div>

          <div className="space-y-3">
            {metrics?.sales_by_channel && metrics.sales_by_channel.length > 0 ? (
              metrics.sales_by_channel.map((ch, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-white/5 p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{ch.channel}</p>
                    <p className="text-[11px] text-zinc-400">{ch.order_count} confirmed orders</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-amber-400 font-mono">
                      ₹{Number(ch.total_sales).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-xs text-zinc-500">
                Channel breakdown will appear after first sale confirmation.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

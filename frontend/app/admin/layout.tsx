'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  Boxes,
  Users,
  MessageSquare,
  Wine,
  LogOut,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { api } from '@/lib/api';
import { User } from '@/types';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const user = await api.getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    api.logout();
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090a0f] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
          <span className="text-sm font-medium text-zinc-300">Authenticating Business Session...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Sales & Invoices', href: '/admin/sales', icon: ShoppingCart },
    { name: 'Payments & Collections', href: '/admin/payments', icon: CreditCard },
    { name: 'Inventory & Stock', href: '/admin/inventory', icon: Boxes },
    { name: 'Retailers & Customers', href: '/admin/customers', icon: Users },
    { name: 'Leads & Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Products & Variants', href: '/admin/products', icon: Wine },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 border-r border-white/10 bg-[#0c0e14] flex flex-col justify-between">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-black">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white tracking-wide">
                  FIZZ<span className="text-amber-400">ORA</span>
                </span>
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">ERP Management</span>
              </div>
            </Link>
          </div>

          {/* Nav links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="h-3 w-3" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & actions */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="rounded-xl bg-white/5 p-3 flex items-center gap-3 border border-white/5">
            <div className="h-8 w-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
              {currentUser?.name.charAt(0) || 'U'}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-white truncate">{currentUser?.name}</span>
              <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                {currentUser?.role}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="h-3 w-3" />
              Public Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-[11px] font-semibold text-red-400 hover:text-red-300"
            >
              <LogOut className="h-3 w-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Viewport */}
      <main className="flex-1 overflow-y-auto min-h-screen p-4 sm:p-6 lg:p-8 bg-[#090a0f]">
        {children}
      </main>
    </div>
  );
}

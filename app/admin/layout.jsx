'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ChefHat, 
  UtensilsCrossed, 
  Users, 
  ExternalLink, 
  Clock, 
  Flame, 
  ArrowUpRight, 
  Menu, 
  X,
  Bell,
  RefreshCw
} from 'lucide-react';
import { StoreProvider, useStore } from '../../src/context/StoreContext';

const NAV_ITEMS = [
  { label: 'Analytics & Sales', href: '/admin', icon: LayoutDashboard },
  { label: 'Live Kitchen Orders', href: '/admin/orders', icon: ChefHat, badgeKey: 'activeOrders' },
  { label: 'Menu & Inventory', href: '/admin/inventory', icon: UtensilsCrossed },
  { label: 'Customer CRM', href: '/admin/customers', icon: Users },
];

function AdminLayoutInner({ children }) {
  const pathname = usePathname();
  const { orders } = useStore();
  const [currentTime, setCurrentTime] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeOrdersCount = orders.filter((o) => o.status !== 'completed').length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#18181A] flex flex-col md:flex-row font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#18181A] text-[#FAF7F2] p-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E8998D]/50 bg-[#18181A] shrink-0">
            <img src="/images/pink_salt_logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-canela text-lg font-bold tracking-wider">PINK SUGAR</span>
          <span className="badge-mono text-[9px] bg-[#E8998D]/20 text-[#E8998D] px-2 py-0.5 rounded">OWNER</span>
        </div>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-[#222226] text-[#FAF7F2]"
          aria-label="Toggle Navigation"
        >
          {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Left Sidebar (Desktop Fixed / Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-40 w-72 bg-[#18181A] text-[#FAF7F2] border-r border-white/10 flex flex-col justify-between p-6 transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } h-screen`}
      >
        <div>
          {/* Brand Header */}
          <div className="pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#E8998D]/50 shadow-md bg-[#18181A] shrink-0">
                <img
                  src="/images/pink_salt_logo.jpg"
                  alt="Pink Sugar Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-canela text-xl font-bold tracking-wider leading-none">
                    PINK SUGAR
                  </span>
                  <span className="font-mono text-[10px] bg-[#E8998D]/20 text-[#E8998D] px-1.5 py-0.5 rounded font-bold">
                    OWNER
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-[#E8998D] uppercase mt-1">
                  Hubballi • Terminal v2.4
                </span>
              </div>
            </div>

            {/* Live Terminal Online Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#222226] border border-white/10 text-xs font-mono w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-semibold text-[11px]">● Live POS Terminal Online</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#6E6B68] mb-2 px-3">
              Management Modules
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all ${
                    isActive
                      ? 'bg-[#B85B43] text-white font-semibold shadow-md'
                      : 'text-[#FAF7F2]/75 hover:bg-[#222226] hover:text-[#FAF7F2]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-white' : 'text-[#E8998D]'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badgeKey === 'activeOrders' && activeOrdersCount > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white text-[#B85B43]' : 'bg-[#B85B43] text-white'
                      }`}
                    >
                      {activeOrdersCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer & Public Storefront Link */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#FAF7F2]/60 px-1">
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-[#E8998D]" /> Live Clock:
            </span>
            <span className="font-bold text-[#FAF7F2]">{currentTime || '12:00 PM'}</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-[#222226] border border-white/10 text-xs font-mono text-[#FAF7F2] hover:border-[#E8998D] hover:text-[#E8998D] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Flame size={14} className="text-[#E8998D]" />
              <span>Public Storefront</span>
            </div>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-[#EFECE6] px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-2 mb-0.5">
              <span className="font-mono text-[10px] tracking-widest text-[#B85B43] uppercase font-bold">
                /STORE MANAGEMENT
              </span>
              <span className="h-px w-6 bg-[#B85B43]/40" />
            </div>
            <h1 className="font-canela text-2xl text-[#18181A] font-normal">
              Pink Sugar Cafe Operations
            </h1>
          </div>

          {/* Header Quick Metrics / Alerts */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#EFECE6] text-xs font-mono text-[#6E6B68]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Kusugal Road Hearth Active</span>
            </div>

            <button
              onClick={() => window.location.reload()}
              title="Refresh Live Data"
              className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#EFECE6] text-[#18181A] hover:border-[#B85B43] hover:text-[#B85B43] flex items-center justify-center transition-colors cursor-pointer"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <StoreProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </StoreProvider>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  Flame, 
  Sparkles, 
  Clock, 
  ChefHat, 
  Calendar,
  Eye
} from 'lucide-react';
import { useStore } from '../../src/context/StoreContext';

// Hourly Sales Heatmap (8 AM to 11 PM)
const HOURLY_SALES = [
  { hour: '8 AM', revenue: 1200, orders: 4, label: 'Morning Pulls' },
  { hour: '9 AM', revenue: 1850, orders: 6, label: 'Breakfast Bakes' },
  { hour: '10 AM', revenue: 1450, orders: 5, label: 'Espresso Rush' },
  { hour: '11 AM', revenue: 980, orders: 3, label: 'Prep Hour' },
  { hour: '12 PM', revenue: 3200, orders: 9, label: 'Hearth Lunch Peak' },
  { hour: '1 PM', revenue: 3850, orders: 11, label: 'Sourdough Firing' },
  { hour: '2 PM', revenue: 2650, orders: 7, label: 'Pasta Rush' },
  { hour: '3 PM', revenue: 1100, orders: 3, label: 'Midday Slump' },
  { hour: '4 PM', revenue: 2150, orders: 6, label: 'Cold Brew & Patisserie' },
  { hour: '5 PM', revenue: 1950, orders: 5, label: 'Tea & Sourdough' },
  { hour: '6 PM', revenue: 2800, orders: 8, label: 'Evening Gatherings' },
  { hour: '7 PM', revenue: 4100, orders: 12, label: 'Dinner Firing 1' },
  { hour: '8 PM', revenue: 4950, orders: 14, label: 'Prime Dinner Peak' },
  { hour: '9 PM', revenue: 3600, orders: 10, label: 'Dinner Firing 2' },
  { hour: '10 PM', revenue: 1850, orders: 5, label: 'Dessert Orders' },
  { hour: '11 PM', revenue: 750, orders: 2, label: 'Last Calls' },
];

const MAX_HOURLY_REV = 5000;

export default function AdminAnalyticsPage() {
  const { orders, menuItems } = useStore();
  const [hoveredHour, setHoveredHour] = useState(null);

  // Dynamically calculate KPIs based on live orders
  const baseRevenue = 21450;
  const liveOrderRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalRevenue = baseRevenue + liveOrderRevenue;

  const activeOrdersCount = orders.filter((o) => o.status !== 'completed').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'completed').length;
  const totalOrdersCount = 64 + orders.length;
  const aov = Math.round((totalRevenue / totalOrdersCount) * 10) / 10;

  const topDishes = [
    {
      name: 'Signature Pink Sauce Penne',
      category: 'Pastas',
      units: 42 + orders.filter(o => (o.items || []).some(i => i.name.includes('Penne'))).length,
      rev: '₹14,280',
      image: '/images/pink_sauce_penne.jpg',
      trend: '+18.4%',
    },
    {
      name: 'Blistered Margherita Pizza',
      category: 'Pizzas',
      units: 36 + orders.filter(o => (o.items || []).some(i => i.name.includes('Margherita'))).length,
      rev: '₹13,680',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80',
      trend: '+12.1%',
    },
    {
      name: 'Pink Salt Velvet Cold Brew',
      category: 'Brews',
      units: 51 + orders.filter(o => (o.items || []).some(i => i.name.includes('Cold Brew'))).length,
      rev: '₹14,280',
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80',
      trend: '+24.5%',
    },
    {
      name: 'Golden Butter Croissant',
      category: 'Bakes',
      units: 28 + orders.filter(o => (o.items || []).some(i => i.name.includes('Croissant'))).length,
      rev: '₹5,040',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80',
      trend: '+6.2%',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
              /TODAY'S METRICS
            </span>
            <span className="h-px w-8 bg-[#B85B43]/40" />
          </div>
          <h2 className="font-canela text-3xl sm:text-4xl text-[#18181A] font-normal">
            Executive Performance Overview
          </h2>
          <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] font-light mt-1">
            Real-time aggregate sales, customer velocity, and kitchen ticket metrics for Pink Salt Cafe.
          </p>
        </div>

        <Link
          href="/admin/orders"
          className="btn-primary self-start sm:self-auto flex items-center gap-2 text-xs"
          style={{ padding: '10px 20px' }}
        >
          <ChefHat size={15} />
          <span>Open Kitchen Terminal ({activeOrdersCount})</span>
        </Link>
      </div>

      {/* 4 Bento KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1: Today's Revenue */}
        <div className="card-editorial p-6 bg-white border border-[#EFECE6] rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-[#6E6B68] uppercase tracking-wider font-medium">
              Today's Gross Revenue
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#B85B43] flex items-center justify-center">
              <span className="font-bold text-sm">₹</span>
            </div>
          </div>

          <div>
            <div className="font-canela text-3xl sm:text-4xl text-[#18181A] font-normal mb-2">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono">
              <span className="text-emerald-700 font-bold flex items-center">
                <TrendingUp size={12} className="mr-0.5" /> +14.2%
              </span>
              <span className="text-[#6E6B68]">live synced</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Active Orders */}
        <div className="card-editorial p-6 bg-white border border-[#EFECE6] rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-[#6E6B68] uppercase tracking-wider font-medium">
              Active Live Orders
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#E8998D]/20 text-[#B85B43] flex items-center justify-center">
              <ShoppingBag size={18} />
            </div>
          </div>

          <div>
            <div className="font-canela text-3xl sm:text-4xl text-[#18181A] font-normal mb-2 flex items-center gap-3">
              <span>{activeOrdersCount}</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#E8998D]/20 text-[#B85B43] font-bold">
                In Kitchen
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6E6B68]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{completedOrdersCount} tickets settled today</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Total Guests / Customers */}
        <div className="card-editorial p-6 bg-white border border-[#EFECE6] rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-[#6E6B68] uppercase tracking-wider font-medium">
              Total Patrons Today
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#18181A] flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>

          <div>
            <div className="font-canela text-3xl sm:text-4xl text-[#18181A] font-normal mb-2">
              {totalOrdersCount} Orders
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono">
              <span className="text-emerald-700 font-bold flex items-center">
                <TrendingUp size={12} className="mr-0.5" /> +8.4%
              </span>
              <span className="text-[#6E6B68]">average footfall</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Average Order Value (AOV) */}
        <div className="card-editorial p-6 bg-white border border-[#EFECE6] rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-[#6E6B68] uppercase tracking-wider font-medium">
              Avg Order Value (AOV)
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#B85B43] flex items-center justify-center">
              <Sparkles size={18} />
            </div>
          </div>

          <div>
            <div className="font-canela text-3xl sm:text-4xl text-[#18181A] font-normal mb-2">
              ₹{aov}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono">
              <span className="text-emerald-700 font-bold flex items-center">
                <TrendingUp size={12} className="mr-0.5" /> +5.1%
              </span>
              <span className="text-[#6E6B68]">basket size growth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Sales Visualizer & Heatmap */}
      <div className="card-editorial p-6 sm:p-8 bg-white border border-[#EFECE6] rounded-3xl shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-canela text-2xl text-[#18181A] font-normal">
              Hourly Sales & Firing Volume
            </h3>
            <p className="font-subheading text-xs text-[#6E6B68] font-light mt-0.5">
              Live hourly peak heat map across Kusugal Road stone hearth operations (8 AM – 11 PM).
            </p>
          </div>

          {hoveredHour && (
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#18181A] text-[#FAF7F2] font-mono text-xs">
              <span className="text-[#E8998D] font-bold">{hoveredHour.hour}:</span>
              <span>₹{hoveredHour.revenue}</span>
              <span className="text-[#6E6B68]">({hoveredHour.orders} orders • {hoveredHour.label})</span>
            </div>
          )}
        </div>

        {/* Visualizer Bars Container */}
        <div className="h-64 flex items-end gap-2 sm:gap-3 pt-6 border-b border-[#EFECE6] pb-2">
          {HOURLY_SALES.map((item) => {
            const heightPercent = Math.round((item.revenue / MAX_HOURLY_REV) * 100);
            const isPeak = item.revenue > 3500;

            return (
              <div
                key={item.hour}
                onMouseEnter={() => setHoveredHour(item)}
                onMouseLeave={() => setHoveredHour(null)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    isPeak
                      ? 'bg-gradient-to-t from-[#B85B43] to-[#E8998D] group-hover:brightness-110 shadow-sm'
                      : 'bg-[#EFECE6] group-hover:bg-[#B85B43]/70'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="font-mono text-[9px] text-[#6E6B68] mt-2 group-hover:text-[#18181A] group-hover:font-bold">
                  {item.hour}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Split: Top Dishes & Live Order Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Top Selling Dishes Rank List (7 Cols) */}
        <div className="lg:col-span-7 card-editorial p-6 sm:p-8 bg-white border border-[#EFECE6] rounded-3xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-canela text-2xl text-[#18181A] font-normal">
                Top Selling Hearth Specialties
              </h3>
              <Link
                href="/admin/inventory"
                className="text-xs font-mono text-[#B85B43] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Inventory</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="space-y-4">
              {topDishes.map((dish, i) => (
                <div
                  key={dish.name}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFECE6] hover:border-[#E8998D] transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold text-[#6E6B68] w-4 text-center">
                      0{i + 1}
                    </span>
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#EFECE6] shrink-0 border border-[#EFECE6]">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-canela text-base text-[#18181A] font-normal leading-snug">
                        {dish.name}
                      </h4>
                      <span className="font-mono text-[11px] text-[#6E6B68]">
                        {dish.category} • {dish.units} units dispatched
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-sm font-bold text-[#18181A]">{dish.rev}</div>
                    <span className="text-[10px] text-emerald-700 font-semibold">{dish.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Quick Dispatch Summary (5 Cols) */}
        <div className="lg:col-span-5 card-editorial p-6 sm:p-8 bg-[#18181A] text-[#FAF7F2] border border-white/10 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#E8998D] font-bold">
                  Hearth Station
                </span>
                <h3 className="font-canela text-2xl text-[#FAF7F2] font-normal mt-0.5">
                  Live Dispatch Stream
                </h3>
              </div>
              <span className="badge-mono badge-rose text-[10px]">
                <Flame size={11} /> 450°C
              </span>
            </div>

            <div className="space-y-3.5">
              {orders.slice(0, 3).map((o) => (
                <div
                  key={o.id}
                  className="p-3.5 rounded-xl bg-[#222226] border border-white/10 flex items-center justify-between text-xs font-mono"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[#E8998D]">{o.id}</span>
                      <span className="text-[#FAF7F2]/60">• {o.tableOrTakeaway || 'Dine-in'}</span>
                    </div>
                    <p className="text-[11px] text-[#FAF7F2]/80 font-sans line-clamp-1">
                      {(o.items || []).map((it) => `${it.qty}x ${it.name}`).join(', ')}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        o.status === 'received'
                          ? 'bg-[#B85B43]/30 text-[#E8998D]'
                          : o.status === 'in_kitchen' || o.status === 'preparing'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {o.status}
                    </span>
                    <div className="text-[10px] text-[#FAF7F2]/50 mt-1">{o.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6">
            <Link
              href="/admin/orders"
              className="btn-primary w-full justify-center text-xs"
            >
              <span>Manage All Live Orders ({orders.length})</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

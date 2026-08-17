'use client';

import React, { useState } from 'react';
import { 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Search, 
  Utensils, 
  Phone, 
  User, 
  Sparkles,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useStore } from '../../../src/context/StoreContext';

const PIPELINE_COLUMNS = [
  { id: 'received', label: 'Received / New', color: 'border-rose-400 bg-rose-50/40 text-[#B85B43]' },
  { id: 'in_kitchen', label: 'In Kitchen / Preparing', color: 'border-amber-400 bg-amber-50/40 text-amber-700' },
  { id: 'ready', label: 'Ready for Pickup / Table', color: 'border-emerald-400 bg-emerald-50/40 text-emerald-700' },
  { id: 'completed', label: 'Completed & Settled', color: 'border-gray-300 bg-gray-50 text-gray-600' },
];

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((order) => {
    return (
      (order.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.tableOrTakeaway || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'received') return 'in_kitchen';
    if (currentStatus === 'in_kitchen' || currentStatus === 'preparing') return 'ready';
    if (currentStatus === 'ready') return 'completed';
    return 'completed';
  };

  return (
    <div className="space-y-8">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
              /LIVE KITCHEN POS
            </span>
            <span className="h-px w-8 bg-[#B85B43]/40" />
          </div>
          <h2 className="font-canela text-3xl sm:text-4xl text-[#18181A] font-normal">
            Order Receiving & Prep Pipeline
          </h2>
          <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] font-light mt-1">
            Real-time stone hearth kanban terminal for kitchen staff, runners, and floor management.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, Customer, Table #..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EFECE6] text-xs font-mono text-[#18181A] focus:outline-none focus:border-[#B85B43] shadow-xs"
          />
        </div>
      </div>

      {/* 4-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {PIPELINE_COLUMNS.map((col) => {
          const colOrders = filteredOrders.filter((o) => {
            if (col.id === 'in_kitchen') return o.status === 'in_kitchen' || o.status === 'preparing';
            return o.status === col.id;
          });

          return (
            <div
              key={col.id}
              className="bg-[#FAF7F2] rounded-2xl border border-[#EFECE6] p-4 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EFECE6]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B85B43]" />
                  <h3 className="font-mono text-xs font-bold text-[#18181A] uppercase tracking-wider">
                    {col.label}
                  </h3>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-white border border-[#EFECE6] font-bold text-[#18181A]">
                  {colOrders.length}
                </span>
              </div>

              {/* Order Cards List */}
              <div className="space-y-4 flex-1">
                {colOrders.length === 0 ? (
                  <div className="py-12 text-center text-[#6E6B68] font-mono text-xs border-2 border-dashed border-[#EFECE6] rounded-xl">
                    No tickets in this stage
                  </div>
                ) : (
                  colOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`bg-white rounded-2xl border border-[#EFECE6] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                        order.timestamp === 'Just now' ? 'ring-2 ring-[#E8998D] animate-pulse' : ''
                      }`}
                    >
                      {/* Ticket Header */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-sm font-bold text-[#18181A]">
                            {order.id}
                          </span>
                          <span className="badge-mono badge-rose text-[10px]">
                            {order.tableOrTakeaway || 'Dine-in'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6B68] mb-3 pb-2.5 border-b border-[#EFECE6]">
                          <span className="flex items-center gap-1 font-sans font-medium text-[#18181A]">
                            <User size={12} className="text-[#E8998D]" /> {order.customerName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {order.timestamp}
                          </span>
                        </div>

                        {/* Customer Phone if provided */}
                        {order.customerPhone && (
                          <div className="text-[10px] font-mono text-[#6E6B68] mb-2 flex items-center gap-1">
                            <Phone size={10} /> {order.customerPhone}
                          </div>
                        )}

                        {/* Itemized Dish List */}
                        <div className="space-y-2 mb-3">
                          {(order.items || []).map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs font-sans"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FAF7F2] border border-[#EFECE6] text-[#B85B43]">
                                  {item.qty}x
                                </span>
                                <span className="font-medium text-[#18181A]">{item.name}</span>
                              </div>
                              <span className="font-mono text-[11px] text-[#6E6B68]">
                                ₹{item.price * item.qty}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Special Customization Notes */}
                        {order.notes && (
                          <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFECE6] text-[11px] font-sans text-[#6E6B68] italic mb-3">
                            <span className="font-mono font-bold not-italic text-[#B85B43] mr-1">
                              Chef Note:
                            </span>
                            "{order.notes}"
                          </div>
                        )}
                      </div>

                      {/* Ticket Bottom & Action Button */}
                      <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[10px] text-[#6E6B68] block">Total</span>
                          <span className="font-mono text-sm font-bold text-[#18181A]">
                            ₹{order.total}
                          </span>
                        </div>

                        {order.status === 'received' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                            className="btn-primary text-xs flex items-center gap-1.5"
                            style={{ padding: '6px 14px' }}
                          >
                            <span>Accept & Fire</span>
                            <ArrowRight size={13} />
                          </button>
                        )}

                        {(order.status === 'in_kitchen' || order.status === 'preparing') && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-mono text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Mark Ready</span>
                            <CheckCircle2 size={13} />
                          </button>
                        )}

                        {order.status === 'ready' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Complete</span>
                            <CheckCircle2 size={13} />
                          </button>
                        )}

                        {order.status === 'completed' && (
                          <span className="text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 size={13} /> Settled
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

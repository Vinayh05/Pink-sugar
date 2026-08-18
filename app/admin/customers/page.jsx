'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  MessageCircle, 
  Sparkles, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  Filter, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useStore } from '../../../src/context/StoreContext';

const SEGMENTS = [
  'All Customers',
  'VIP Spenders (>₹2000)',
  'Repeat Diners',
  'Cold Brew Lovers',
];

export default function AdminCustomersPage() {
  const { customers, showToast } = useStore();
  const [selectedSegment, setSelectedSegment] = useState('All Customers');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter((cust) => {
    const matchSegment =
      selectedSegment === 'All Customers' || cust.segment === selectedSegment;
    const matchSearch =
      (cust.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cust.phone || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cust.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cust.favoriteCategory || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchSegment && matchSearch;
  });

  const handleSendWhatsAppPromo = (cust) => {
    const phoneDigits = (cust.phone || '').replace(/[^0-9]/g, '');
    const promoText = encodeURIComponent(
      `Namaste ${cust.name}! 🌸 Thank you for dining at Pink Sugar Cafe, Kusugal Road Hubballi. As a special treat for your love of ${cust.favoriteCategory}, enjoy 15% off your next stone-hearth table with code PINKSUGAR15. Reserve online: http://localhost:3000/reserve`
    );
    const waUrl = `https://wa.me/${phoneDigits}?text=${promoText}`;
    window.open(waUrl, '_blank');
    showToast(`WhatsApp promo dispatch opened for ${cust.name}`);
  };

  const handleExportCSV = () => {
    const headers = ['Name,Phone,Email,OrdersCount,LTV,LastVisited,FavoriteCategory,Segment\n'];
    const rows = filteredCustomers.map(
      (c) =>
        `"${c.name}","${c.phone}","${c.email}",${c.ordersCount},${c.ltv},"${c.lastVisited}","${c.favoriteCategory}","${c.segment}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n'))], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pinksalt_crm_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('CRM Database exported as CSV');
  };

  return (
    <div className="space-y-8">
      {/* Header & Export Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
              /CUSTOMER CRM & LEADS
            </span>
            <span className="h-px w-8 bg-[#B85B43]/40" />
          </div>
          <h2 className="font-canela text-3xl sm:text-4xl text-[#18181A] font-normal">
            Patron Database & Direct Marketing
          </h2>
          <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] font-light mt-1">
            Real-time synced customer lifetime value (LTV), dining history, and one-tap WhatsApp marketing dispatches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="btn-secondary text-xs flex items-center gap-2 bg-white shadow-xs"
          >
            <Download size={14} />
            <span>Export CSV ({filteredCustomers.length})</span>
          </button>
        </div>
      </div>

      {/* Segment Filter Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFECE6]">
        {/* Segment Pills */}
        <div className="flex flex-wrap gap-2">
          {SEGMENTS.map((seg) => (
            <button
              key={seg}
              onClick={() => setSelectedSegment(seg)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedSegment === seg
                  ? 'bg-[#18181A] text-[#FAF7F2] shadow-sm'
                  : 'bg-white text-[#6E6B68] hover:bg-[#EFECE6] border border-[#EFECE6]'
              }`}
            >
              {seg}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patron, phone, email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EFECE6] text-xs font-mono text-[#18181A] focus:outline-none focus:border-[#B85B43] shadow-xs"
          />
        </div>
      </div>

      {/* Customer Database Table */}
      <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#EFECE6] text-[11px] font-mono uppercase tracking-wider text-[#6E6B68]">
                <th className="py-4 px-6">Customer Profile</th>
                <th className="py-4 px-6">Contact Channels</th>
                <th className="py-4 px-6">Total Orders</th>
                <th className="py-4 px-6">Lifetime Value (LTV)</th>
                <th className="py-4 px-6">Last Visit</th>
                <th className="py-4 px-6">Favorite Craft</th>
                <th className="py-4 px-6 text-right">Marketing Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6] text-xs">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                  {/* Name & Segment Badge */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-canela text-base text-[#18181A] font-normal leading-snug">
                        {cust.name}
                      </span>
                      <span className="badge-mono badge-rose text-[9px] mt-1 self-start">
                        {cust.segment}
                      </span>
                    </div>
                  </td>

                  {/* Phone & Email */}
                  <td className="py-4 px-6 font-mono text-[11px] text-[#6E6B68]">
                    <div className="flex items-center gap-1.5 text-[#18181A]">
                      <Phone size={11} className="text-[#E8998D]" /> {cust.phone}
                    </div>
                    <div className="flex items-center gap-1.5 text-[#6E6B68] mt-0.5">
                      <Mail size={11} /> {cust.email}
                    </div>
                  </td>

                  {/* Orders Count */}
                  <td className="py-4 px-6 font-mono text-xs font-bold text-[#18181A]">
                    {cust.ordersCount} orders
                  </td>

                  {/* LTV */}
                  <td className="py-4 px-6 font-mono text-xs font-bold text-emerald-700">
                    ₹{cust.ltv}
                  </td>

                  {/* Last Visited */}
                  <td className="py-4 px-6 font-mono text-[11px] text-[#6E6B68]">
                    {cust.lastVisited}
                  </td>

                  {/* Favorite Category */}
                  <td className="py-4 px-6 font-mono text-[11px]">
                    <span className="badge-mono bg-[#FAF7F2] text-[#18181A] border border-[#EFECE6]">
                      {cust.favoriteCategory}
                    </span>
                  </td>

                  {/* WhatsApp Marketing Action Button */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleSendWhatsAppPromo(cust)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-semibold transition-colors cursor-pointer shadow-xs"
                      title="Send WhatsApp Discount Promo"
                    >
                      <MessageCircle size={13} />
                      <span>WhatsApp Promo</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

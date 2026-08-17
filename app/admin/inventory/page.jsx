'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Check, 
  X, 
  Sparkles, 
  Flame, 
  Clock, 
  Edit3, 
  Save, 
  Filter 
} from 'lucide-react';
import { useStore } from '../../../src/context/StoreContext';

const CATEGORIES = ['All', 'Pastas', 'Pizzas', 'Bakes', 'Brews'];

export default function AdminInventoryPage() {
  const { menuItems, toggleItemAvailability, toggleDailySpecial, updateItemPrice } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  const filteredItems = menuItems.filter((item) => {
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleStartEditPrice = (item) => {
    setEditingPriceId(item.id);
    setTempPrice(String(item.price));
  };

  const handleSavePrice = (itemId) => {
    updateItemPrice(itemId, tempPrice);
    setEditingPriceId(null);
  };

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
              /MENU & INVENTORY
            </span>
            <span className="h-px w-8 bg-[#B85B43]/40" />
          </div>
          <h2 className="font-canela text-3xl sm:text-4xl text-[#18181A] font-normal">
            Live Item Stock & Pricing Switcher
          </h2>
          <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] font-light mt-1">
            Toggling any dish updates the customer frontend menu and cart in real time without refreshing.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EFECE6] text-xs font-mono text-[#18181A] focus:outline-none focus:border-[#B85B43] shadow-xs"
          />
        </div>
      </div>

      {/* Filter Tabs & Quick Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFECE6]">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#18181A] text-[#FAF7F2] shadow-sm'
                  : 'bg-white text-[#6E6B68] hover:bg-[#EFECE6] border border-[#EFECE6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-[#6E6B68]">
          Showing <span className="font-bold text-[#18181A]">{filteredItems.length}</span> of {menuItems.length} dishes
        </div>
      </div>

      {/* Dishes Inventory Table */}
      <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#EFECE6] text-[11px] font-mono uppercase tracking-wider text-[#6E6B68]">
                <th className="py-4 px-6">Dish Details</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price (₹)</th>
                <th className="py-4 px-6">Daily Special</th>
                <th className="py-4 px-6">Availability</th>
                <th className="py-4 px-6 text-right">Live Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6] text-xs">
              {filteredItems.map((item) => {
                const isEditingPrice = editingPriceId === item.id;
                const isAvailable = item.isAvailable !== false;

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-[#FAF7F2]/60 transition-colors ${
                      !isAvailable ? 'opacity-60 bg-gray-50/50' : ''
                    }`}
                  >
                    {/* Thumbnail & Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#EFECE6] shrink-0 border border-[#EFECE6]">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-canela text-base text-[#18181A] font-normal leading-snug">
                            {item.name}
                          </h4>
                          <p className="font-sans text-[11px] text-[#6E6B68] line-clamp-1 max-w-xs mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 font-mono text-[11px] text-[#6E6B68]">
                      <span className="badge-mono bg-[#FAF7F2] text-[#18181A] border border-[#EFECE6]">
                        {item.category}
                      </span>
                    </td>

                    {/* Price (Editable) */}
                    <td className="py-4 px-6 font-mono text-xs">
                      {isEditingPrice ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#18181A]">₹</span>
                          <input
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(e.target.value)}
                            className="w-20 px-2 py-1 rounded-lg border border-[#B85B43] bg-white font-mono text-xs text-[#18181A] focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSavePrice(item.id)}
                            className="p-1 rounded-md bg-[#B85B43] text-white hover:bg-[#C66B53]"
                          >
                            <Save size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group/price cursor-pointer" onClick={() => handleStartEditPrice(item)}>
                          <span className="font-bold text-[#18181A]">₹{item.price}</span>
                          <Edit3 size={12} className="text-[#6E6B68] opacity-0 group-hover/price:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </td>

                    {/* Daily Special Pin */}
                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleDailySpecial(item.id)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                          item.isSpecial
                            ? 'bg-[#E8998D]/20 border-[#E8998D] text-[#B85B43]'
                            : 'bg-[#FAF7F2] border-[#EFECE6] text-[#6E6B68] hover:text-[#18181A]'
                        }`}
                        title={item.isSpecial ? 'Pinned to Daily Specials' : 'Pin to Daily Specials'}
                      >
                        <Star size={15} fill={item.isSpecial ? '#B85B43' : 'none'} />
                      </button>
                    </td>

                    {/* Stock Status Badge */}
                    <td className="py-4 px-6 font-mono text-[11px]">
                      {isAvailable ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          86'd / Sold Out
                        </span>
                      )}
                    </td>

                    {/* Live Switch Button */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => toggleItemAvailability(item.id)}
                        className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                          isAvailable
                            ? 'bg-[#18181A] text-white hover:bg-rose-700'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {isAvailable ? 'Mark Sold Out' : 'Restock Item'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

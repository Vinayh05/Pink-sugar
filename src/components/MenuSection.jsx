'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Filter, Clock, Ban, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

const CATEGORIES = ['All', 'Pastas', 'Pizzas', 'Bakes', 'Brews'];

export const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const { addToCart } = useCart();
  const { menuItems } = useStore();

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set();
    menuItems.forEach((item) => (item.tags || []).forEach((tag) => set.add(tag)));
    return ['All', ...Array.from(set)];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchTag =
        selectedTag === 'All' || (item.tags || []).includes(selectedTag);
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchTag && matchSearch;
    });
  }, [selectedCategory, selectedTag, searchQuery, menuItems]);

  return (
    <section
      id="menu"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-t border-[#EFECE6] relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
                /COMPLETE REPERTOIRE
              </span>
              <span className="h-px w-8 bg-[#B85B43]/40" />
            </div>
            <h2 className="font-canela text-4xl sm:text-5xl lg:text-6xl font-normal text-[#18181A] tracking-tight">
              Interactive Artisanal Menu
            </h2>
            <p className="font-subheading text-base sm:text-lg text-[#6E6B68] max-w-xl mt-3 font-light leading-relaxed">
              Every plate and pour calibrated with pink rock salt salinity, wild ferments, and hearth-fired warmth.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pastas, pizzas, bakes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#EFECE6] focus:border-[#B85B43] focus:outline-none font-sans text-sm text-[#18181A] shadow-xs placeholder-[#6E6B68]/70"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#6E6B68] hover:text-[#18181A]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EFECE6]">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#18181A] text-[#FAF7F2] shadow-sm'
                      : 'bg-[#EFECE6] text-[#18181A] hover:bg-[#E2DDD5] border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Tag Pills */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
            <span className="text-xs font-mono text-[#6E6B68] flex items-center gap-1 shrink-0 font-medium">
              <Filter size={12} /> Filter:
            </span>
            {allTags.slice(0, 5).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-[11px] font-mono px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#B85B43] text-white'
                    : 'bg-[#EFECE6] text-[#6E6B68] hover:bg-[#E2DDD5]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#EFECE6]">
            <p className="font-canela text-2xl text-[#18181A] mb-2">No culinary items found</p>
            <p className="font-subheading text-sm text-[#6E6B68] mb-4">
              Try adjusting your search query or category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTag('All');
                setSearchQuery('');
              }}
              className="btn-secondary text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isAvailable = item.isAvailable !== false;
              const isSpecial = item.isSpecial === true;

              return (
                <div
                  key={item.id}
                  className={`card-editorial group flex flex-col justify-between p-6 bg-white border border-[#EFECE6] hover:border-[#E8998D] shadow-xs hover:shadow-md transition-all duration-300 ${
                    !isAvailable ? 'opacity-75' : ''
                  }`}
                >
                  <div>
                    {/* Image Container with Zoom, Availability and Tags */}
                    <div className="relative h-52 rounded-2xl overflow-hidden mb-5 bg-[#EFECE6]">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                          !isAvailable ? 'filter grayscale-[40%] opacity-75' : ''
                        }`}
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                        {isSpecial && (
                          <span className="badge-mono bg-[#B85B43] text-white shadow-xs flex items-center gap-1 font-bold">
                            <Star size={10} fill="currentColor" /> Daily Special
                          </span>
                        )}
                        {!isAvailable && (
                          <span className="badge-mono bg-[#18181A]/90 text-white backdrop-blur-md shadow-xs flex items-center gap-1 font-bold border border-white/20">
                            <Ban size={10} /> Sold Out Today
                          </span>
                        )}
                        {isAvailable &&
                          (item.tags || []).map((tag) => (
                            <span
                              key={tag}
                              className="badge-mono badge-rose shadow-xs"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-[#18181A]/90 backdrop-blur-md text-[#FAF7F2] px-3 py-1 rounded-full font-mono text-sm font-bold shadow-md border border-white/10 z-10">
                        ₹{item.price}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#B85B43] font-semibold">
                        {item.category}
                      </span>
                      <span className="font-mono text-[11px] text-[#6E6B68] flex items-center gap-1">
                        <Clock size={11} /> {item.prepTime || '15 mins'}
                      </span>
                    </div>

                    <h3 className="font-canela text-2xl font-normal text-[#18181A] mb-2 group-hover:text-[#B85B43] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] leading-relaxed mb-4 font-light">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Bar with Calories & Add to Cart */}
                  <div className="pt-4 border-t border-[#EFECE6] flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#6E6B68]">
                      {item.calories}
                    </span>

                    {isAvailable ? (
                      <button
                        onClick={(e) => addToCart(item, e)}
                        className="btn-primary"
                        style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                      >
                        <Plus size={14} />
                        <span>+ Add to Cart</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 rounded-full bg-gray-200 text-gray-500 font-mono text-xs font-semibold cursor-not-allowed opacity-60 flex items-center gap-1.5"
                      >
                        <Ban size={13} />
                        <span>Unavailable</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

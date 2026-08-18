'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Plus, 
  Sparkles, 
  Filter, 
  Clock, 
  Ban, 
  Star, 
  Leaf, 
  Flame, 
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import { StoreProvider, useStore } from '../../src/context/StoreContext';
import { CartProvider, useCart } from '../../src/context/CartContext';
import { CartDrawer } from '../../src/components/CartDrawer';
import { ReservationModal } from '../../src/components/ReservationModal';
import { ReviewModal } from '../../src/components/ReviewModal';
import { CheckoutModal } from '../../src/components/CheckoutModal';
import { FloatingCartDock } from '../../src/components/FloatingCartDock';

const CATEGORIES = ['All', 'Pastas', 'Pizzas', 'Bakes', 'Brews'];

function MenuPageContent() {
  const { menuItems } = useStore();
  const { addToCart, totalItems, grandTotal, setIsCartOpen } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [specialsOnly, setSpecialsOnly] = useState(false);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchVeg = !vegetarianOnly || (item.tags || []).some((t) => t.toLowerCase().includes('veg') || t.toLowerCase().includes('basil') || t.toLowerCase().includes('cheese'));
      const matchSpecial = !specialsOnly || item.isSpecial === true;

      return matchCategory && matchSearch && matchVeg && matchSpecial;
    });
  }, [menuItems, selectedCategory, searchQuery, vegetarianOnly, specialsOnly]);

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#18181A] flex flex-col font-sans">
      {/* Navigation Bar */}
      <Header />

      {/* Hero Header */}
      <section className="pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-b border-[#EFECE6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
                /COMPLETE REPERTOIRE
              </span>
              <span className="h-px w-8 bg-[#B85B43]/40" />
            </div>
            <h1 className="font-canela text-4xl sm:text-6xl font-normal text-[#18181A] tracking-tight">
              Artisanal Culinary Menu
            </h1>
            <p className="font-subheading text-base sm:text-lg text-[#6E6B68] max-w-xl mt-2 font-light leading-relaxed">
              Every dish wood-fired, wild-fermented, or mineral cold-extracted in our Hubballi stone hearth kitchen.
            </p>
          </div>

          {/* Quick Cart Status Dock */}
          {totalItems > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-primary self-start md:self-auto flex items-center gap-3 shadow-xl animate-in fade-in"
              style={{ padding: '12px 24px' }}
            >
              <ShoppingBag size={16} />
              <span>
                View Active Cart ({totalItems} items • ₹{grandTotal})
              </span>
            </button>
          )}
        </div>
      </section>

      {/* Sticky Filter & Search Control Dock */}
      <section className="sticky top-[72px] z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EFECE6] py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#18181A] text-[#FAF7F2] shadow-sm'
                      : 'bg-white text-[#6E6B68] hover:bg-[#EFECE6] border border-[#EFECE6]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input & Quick Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients, dishes..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#EFECE6] focus:border-[#B85B43] focus:outline-none text-xs font-sans text-[#18181A] shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#6E6B68]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Specials Filter Toggle */}
            <button
              onClick={() => setSpecialsOnly(!specialsOnly)}
              className={`px-3.5 py-2 rounded-full font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer border ${
                specialsOnly
                  ? 'bg-[#B85B43] text-white border-[#B85B43]'
                  : 'bg-white text-[#6E6B68] border-[#EFECE6] hover:bg-[#EFECE6]'
              }`}
            >
              <Star size={13} fill={specialsOnly ? 'currentColor' : 'none'} />
              <span>Chef's Specials</span>
            </button>

            {/* Vegetarian Toggle */}
            <button
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              className={`px-3.5 py-2 rounded-full font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer border ${
                vegetarianOnly
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-[#6E6B68] border-[#EFECE6] hover:bg-[#EFECE6]'
              }`}
            >
              <Leaf size={13} />
              <span>Vegetarian Only</span>
            </button>
          </div>
        </div>
      </section>

      {/* Full Catalog Menu Grid */}
      <section className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {filteredItems.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border border-[#EFECE6] p-8 max-w-md mx-auto">
            <h3 className="font-canela text-2xl text-[#18181A] mb-2">No Matching Dishes</h3>
            <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] mb-6 font-light">
              We couldn't find any dishes matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setVegetarianOnly(false);
                setSpecialsOnly(false);
              }}
              className="btn-secondary text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                    {/* Image Container with Zoom & Badges */}
                    <div className="relative h-56 rounded-2xl overflow-hidden mb-5 bg-[#EFECE6]">
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
                            <Star size={10} fill="currentColor" /> Chef's Special
                          </span>
                        )}
                        {!isAvailable && (
                          <span className="badge-mono bg-[#18181A]/90 text-white backdrop-blur-md shadow-xs flex items-center gap-1 font-bold border border-white/20">
                            <Ban size={10} /> Sold Out Today
                          </span>
                        )}
                        {isAvailable &&
                          (item.tags || []).map((tag) => (
                            <span key={tag} className="badge-mono badge-rose shadow-xs">
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

                  {/* Bottom Action Bar */}
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
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CartDrawer />
      <ReservationModal />
      <ReviewModal />
      <CheckoutModal />
      <FloatingCartDock />
    </main>
  );
}

export default function MenuPage() {
  return (
    <StoreProvider>
      <CartProvider>
        <MenuPageContent />
      </CartProvider>
    </StoreProvider>
  );
}

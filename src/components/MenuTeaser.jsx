'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, ArrowRight, Clock, Star, Ban, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export const MenuTeaser = () => {
  const { addToCart } = useCart();
  const { menuItems } = useStore();

  // Pick the top 6 signature dishes
  const teaserDishes = menuItems.slice(0, 6);

  return (
    <section
      id="menu"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-t border-[#EFECE6] relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
                /CURATED SIGNATURES
              </span>
              <span className="h-px w-8 bg-[#B85B43]/40" />
            </div>
            <h2 className="font-canela text-4xl sm:text-5xl font-normal text-[#18181A] tracking-tight">
              Signature Hearth Selections
            </h2>
            <p className="font-subheading text-sm sm:text-base text-[#6E6B68] max-w-xl mt-2 font-light leading-relaxed">
              A glimpse into our daily baked wild sourdoughs, coarse pink rock salt pastas, and artisanal cold extractions.
            </p>
          </div>

          <Link
            href="/menu"
            className="btn-primary self-start md:self-auto flex items-center gap-2 shadow-lg"
            style={{ padding: '12px 24px', fontSize: '0.82rem' }}
          >
            <span>Explore Full Menu ({menuItems.length} Dishes)</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 6-Card Teaser Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teaserDishes.map((item) => {
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
                  {/* Thumbnail Image Container */}
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
                        (item.tags || []).slice(0, 2).map((tag) => (
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

                  <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] leading-relaxed mb-4 font-light line-clamp-2">
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

        {/* Bottom Full Menu CTA Banner */}
        <div className="mt-14 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#18181A] text-[#FAF7F2] hover:bg-[#B85B43] font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
          >
            <span>Explore Full Artisanal Menu ({menuItems.length}+ Dishes)</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

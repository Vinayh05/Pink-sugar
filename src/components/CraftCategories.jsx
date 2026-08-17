'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Sparkles, CheckCircle2, Utensils, Calendar } from 'lucide-react';
import { CRAFT_CATEGORIES } from '../data/menuData';
import { useCart } from '../context/CartContext';

export const CraftCategories = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Default Card 2: Hearth & Savory (index 1)
  const containerRef = useRef(null);
  const { setIsReservationOpen } = useCart();

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CRAFT_CATEGORIES.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < CRAFT_CATEGORIES.length - 1 ? prev + 1 : 0));
  };

  const activeCraft = CRAFT_CATEGORIES[activeIndex] || CRAFT_CATEGORIES[0];
  const highlights = activeCraft.highlights || [];

  return (
    <section
      id="craft"
      ref={containerRef}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#18181A] text-[#FAF7F2] relative overflow-hidden"
    >
      {/* Background Ambience / Subtle Himalayan Rose glow */}
      <div
        className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#E8998D]/10 blur-3xl pointer-events-none"
      />
      <div
        className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-[#B85B43]/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#2D2D32] pb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-mono text-xs tracking-widest text-[#E8998D] uppercase font-bold">
                /OUR CRAFT
              </span>
              <span className="h-px w-8 bg-[#E8998D]/40" />
            </div>
            <h2 className="font-canela text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF7F2] tracking-tight">
              Tailored Flavors for Every Gathering
            </h2>
            <p className="font-subheading text-base sm:text-lg text-[#FAF7F2]/75 max-w-xl mt-3 font-light leading-relaxed">
              Four distinct culinary chapters orchestrated throughout the day, each rooted in stone-hearth authenticity and artisanal craft.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#E8998D] mr-2">
              (0{activeIndex + 1} / 0{CRAFT_CATEGORIES.length})
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous Category"
              className="w-11 h-11 rounded-full bg-[#222226] border border-[#3A3A40] text-[#FAF7F2] hover:border-[#E8998D] hover:text-[#E8998D] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Category"
              className="w-11 h-11 rounded-full bg-[#222226] border border-[#3A3A40] text-[#FAF7F2] hover:border-[#E8998D] hover:text-[#E8998D] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* 4-Card Interactive Switcher / Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Tab Cards List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {CRAFT_CATEGORIES.map((craft, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={craft.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isActive
                      ? 'bg-[#222226] border-[#E8998D] shadow-xl'
                      : 'bg-[#18181A]/60 border-[#2D2D32] hover:border-[#3A3A40] hover:bg-[#222226]/50'
                  }`}
                >
                  {/* Left active indicator line */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B85B43] to-[#E8998D]" />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs tracking-widest text-[#E8998D] uppercase font-semibold">
                      Chapter 0{idx + 1}
                    </span>
                    <span className="font-mono text-xs text-[#FAF7F2]/60">
                      {craft.time}
                    </span>
                  </div>

                  <h3 className="font-canela text-2xl font-normal text-[#FAF7F2] mb-1">
                    {craft.title}
                  </h3>

                  <p className="font-subheading text-xs sm:text-sm text-[#FAF7F2]/70 line-clamp-2 font-light">
                    {craft.description || craft.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Category Showcase (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="card-dark flex-1 p-6 sm:p-10 rounded-3xl border border-[#3A3A40] relative overflow-hidden flex flex-col justify-between">
              {/* Background ambient image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={activeCraft.image}
                  alt={activeCraft.title}
                  className="w-full h-full object-cover brightness-[0.4] transition-all duration-700 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181A] via-[#18181A]/60 to-transparent z-10" />
              </div>

              {/* Top Meta */}
              <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181A]/80 backdrop-blur-md border border-[#3A3A40]">
                  <Clock size={12} className="text-[#E8998D]" />
                  <span className="font-mono text-xs text-[#FAF7F2]">
                    {activeCraft.time}
                  </span>
                </div>
                <span className="badge-mono badge-rose">
                  <Sparkles size={12} /> {activeCraft.subtitle || 'Artisanal Selection'}
                </span>
              </div>

              {/* Middle Content */}
              <div className="relative z-20 my-auto py-8">
                <h3 className="font-canela text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] font-normal mb-4 leading-tight">
                  {activeCraft.title}
                </h3>
                <p className="font-subheading text-base sm:text-lg text-[#FAF7F2]/85 mb-6 max-w-xl font-light leading-relaxed">
                  {activeCraft.description}
                </p>

                {/* Craft Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {highlights.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF7F2]/90 font-mono bg-[#18181A]/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10"
                    >
                      <CheckCircle2 size={14} className="text-[#E8998D] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="relative z-20 flex flex-wrap items-center gap-4 pt-6 border-t border-white/15">
                <a
                  href="#menu"
                  className="btn-primary flex items-center gap-2"
                >
                  <Utensils size={15} />
                  <span>Explore Chapter Dishes</span>
                </a>
                <Link
                  href="/reserve"
                  className="btn-secondary"
                  style={{
                    backgroundColor: 'rgba(24, 24, 26, 0.7)',
                    borderColor: '#3A3A40',
                    color: '#FAF7F2',
                  }}
                >
                  <Calendar size={15} />
                  <span>Reserve Chapter Table</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

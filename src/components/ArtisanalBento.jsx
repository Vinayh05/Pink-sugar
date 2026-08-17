'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Plus, Sparkles, Flame, Clock, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MENU_DATA } from '../data/menuData';

gsap.registerPlugin(ScrollTrigger);

export const ArtisanalBento = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const { addToCart } = useCart();

  // Find the 5 curated items from MENU_DATA
  const penne = MENU_DATA.find((i) => i.id === 'pink-sauce-penne') || MENU_DATA[0];
  const pizza = MENU_DATA.find((i) => i.id === 'stone-margherita') || MENU_DATA[3];
  const croissant = MENU_DATA.find((i) => i.id === 'butter-croissant') || MENU_DATA[6];
  const coldBrew = MENU_DATA.find((i) => i.id === 'pink-salt-cold-brew') || MENU_DATA[10];
  const cheesecake = MENU_DATA.find((i) => i.id === 'blueberry-cheesecake') || MENU_DATA[8];

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="offerings"
      ref={containerRef}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] grain-overlay relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
                /CURATED MENU
              </span>
              <span className="h-px w-8 bg-[#B85B43]/40" />
            </div>
            <h2 className="font-canela text-4xl sm:text-5xl lg:text-6xl font-normal text-[#18181A] tracking-tight">
              Artisanal Offerings
            </h2>
            <p className="font-subheading text-base sm:text-lg text-[#6E6B68] max-w-xl mt-3 leading-relaxed">
              Hand-tossed sourdoughs, slow-extracted cold brews, and stone-fired pasta emulsions crafted daily with artisanal precision.
            </p>
          </div>

          <a
            href="#menu"
            className="btn-secondary self-start md:self-auto group flex items-center gap-2 border-[#EFECE6] bg-white shadow-sm"
          >
            <span>SEE FULL MENU</span>
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#B85B43]"
            />
          </a>
        </div>

        {/* 5-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Signature Pink Sauce Penne (Wide - 7 Cols) */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="md:col-span-7 card-editorial group flex flex-col justify-between p-6 sm:p-8 min-h-[420px] relative overflow-hidden bg-white border border-[#EFECE6]"
          >
            {/* Background Image with Hover Zoom */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={penne.imageUrl}
                alt={penne.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/40 to-transparent z-10" />
            </div>

            {/* Top Bar: Badges & Tags */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="badge-mono badge-rose">
                <Sparkles size={12} /> {penne.tag}
              </span>
              <span className="font-mono text-base font-semibold text-[#FAF7F2] bg-[#18181A]/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                ₹{penne.price}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-20 pt-20">
              <h3 className="font-canela text-3xl sm:text-4xl text-[#FAF7F2] font-normal mb-2 leading-tight">
                {penne.name}
              </h3>
              <p className="font-subheading text-sm sm:text-base text-[#FAF7F2]/80 line-clamp-2 max-w-lg mb-4 font-light">
                {penne.desc}
              </p>

              <div className="flex items-center justify-between border-t border-white/15 pt-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E8998D]">
                  <Flame size={14} /> Stone Ground Cream & San Marzano
                </div>

                <button
                  onClick={(e) => addToCart(penne, e)}
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '12px' }}
                >
                  <Plus size={14} /> Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: 36h Sourdough Margherita (Tall - 5 Cols) */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="md:col-span-5 card-editorial group flex flex-col justify-between p-6 sm:p-8 min-h-[420px] relative overflow-hidden bg-white border border-[#EFECE6]"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={pizza.imageUrl}
                alt={pizza.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/40 to-transparent z-10" />
            </div>

            <div className="relative z-20 flex items-center justify-between">
              <span className="badge-mono badge-rose">
                <Flame size={12} /> {pizza.tag}
              </span>
              <span className="font-mono text-base font-semibold text-[#FAF7F2] bg-[#18181A]/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                ₹{pizza.price}
              </span>
            </div>

            <div className="relative z-20 pt-20">
              <h3 className="font-canela text-2xl sm:text-3xl text-[#FAF7F2] font-normal mb-2 leading-tight">
                {pizza.name}
              </h3>
              <p className="font-subheading text-sm text-[#FAF7F2]/80 line-clamp-2 mb-4 font-light">
                {pizza.desc}
              </p>

              <div className="flex items-center justify-between border-t border-white/15 pt-4">
                <span className="text-xs font-mono text-[#E8998D]">
                  36h Wild Sourdough
                </span>
                <button
                  onClick={(e) => addToCart(pizza, e)}
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '12px' }}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Butter Laminated Croissant (4 Cols) */}
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="md:col-span-4 card-editorial group flex flex-col justify-between p-6 sm:p-7 min-h-[380px] relative overflow-hidden bg-white border border-[#EFECE6]"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={croissant.imageUrl}
                alt={croissant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/35 to-transparent z-10" />
            </div>

            <div className="relative z-20 flex items-center justify-between">
              <span className="badge-mono bg-[#FAF7F2]/20 backdrop-blur-md text-[#FAF7F2] border border-white/30">
                <Clock size={12} /> {croissant.tag}
              </span>
              <span className="font-mono text-sm font-semibold text-[#FAF7F2] bg-[#18181A]/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                ₹{croissant.price}
              </span>
            </div>

            <div className="relative z-20 pt-16">
              <h3 className="font-canela text-2xl text-[#FAF7F2] font-normal mb-1 leading-snug">
                {croissant.name}
              </h3>
              <p className="font-subheading text-xs text-[#FAF7F2]/80 line-clamp-2 mb-4 font-light">
                {croissant.desc}
              </p>

              <div className="flex items-center justify-between border-t border-white/15 pt-3">
                <span className="text-[11px] font-mono text-[#E8998D]">
                  81 Flaky Layers
                </span>
                <button
                  onClick={(e) => addToCart(croissant, e)}
                  className="btn-primary"
                  style={{ padding: '6px 16px', fontSize: '11px' }}
                >
                  <Plus size={13} /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Signature Pink Salt Cold Brew (4 Cols) */}
          <div
            ref={(el) => (cardsRef.current[3] = el)}
            className="md:col-span-4 card-editorial group flex flex-col justify-between p-6 sm:p-7 min-h-[380px] relative overflow-hidden bg-white border border-[#EFECE6]"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={coldBrew.imageUrl}
                alt={coldBrew.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/35 to-transparent z-10" />
            </div>

            <div className="relative z-20 flex items-center justify-between">
              <span className="badge-mono badge-rose">
                <Sparkles size={12} /> {coldBrew.tag}
              </span>
              <span className="font-mono text-sm font-semibold text-[#FAF7F2] bg-[#18181A]/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                ₹{coldBrew.price}
              </span>
            </div>

            <div className="relative z-20 pt-16">
              <h3 className="font-canela text-2xl text-[#FAF7F2] font-normal mb-1 leading-snug">
                {coldBrew.name}
              </h3>
              <p className="font-subheading text-xs text-[#FAF7F2]/80 line-clamp-2 mb-4 font-light">
                {coldBrew.desc}
              </p>

              <div className="flex items-center justify-between border-t border-white/15 pt-3">
                <span className="text-[11px] font-mono text-[#E8998D]">
                  18h Cold Extraction
                </span>
                <button
                  onClick={(e) => addToCart(coldBrew, e)}
                  className="btn-primary"
                  style={{ padding: '6px 16px', fontSize: '11px' }}
                >
                  <Plus size={13} /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Card 5: Blueberry Cheesecake (4 Cols) */}
          <div
            ref={(el) => (cardsRef.current[4] = el)}
            className="md:col-span-4 card-editorial group flex flex-col justify-between p-6 sm:p-7 min-h-[380px] relative overflow-hidden bg-white border border-[#EFECE6]"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={cheesecake.imageUrl}
                alt={cheesecake.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/35 to-transparent z-10" />
            </div>

            <div className="relative z-20 flex items-center justify-between">
              <span className="badge-mono bg-[#FAF7F2]/20 backdrop-blur-md text-[#FAF7F2] border border-white/30">
                <Heart size={12} /> {cheesecake.tag}
              </span>
              <span className="font-mono text-sm font-semibold text-[#FAF7F2] bg-[#18181A]/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                ₹{cheesecake.price}
              </span>
            </div>

            <div className="relative z-20 pt-16">
              <h3 className="font-canela text-2xl text-[#FAF7F2] font-normal mb-1 leading-snug">
                {cheesecake.name}
              </h3>
              <p className="font-subheading text-xs text-[#FAF7F2]/80 line-clamp-2 mb-4 font-light">
                {cheesecake.desc}
              </p>

              <div className="flex items-center justify-between border-t border-white/15 pt-3">
                <span className="text-[11px] font-mono text-[#E8998D]">
                  Wild Berry Compote
                </span>
                <button
                  onClick={(e) => addToCart(cheesecake, e)}
                  className="btn-primary"
                  style={{ padding: '6px 16px', fontSize: '11px' }}
                >
                  <Plus size={13} /> Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

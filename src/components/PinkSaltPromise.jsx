'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Flame, Sparkles, Star, QrCode, ShieldCheck, HeartHandshake, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { REVIEWS_DATA } from '../data/menuData';

gsap.registerPlugin(ScrollTrigger);

export const PinkSaltPromise = () => {
  const containerRef = useRef(null);
  const leftCardRef = useRef(null);
  const gridItemsRef = useRef([]);

  const { setIsReviewOpen, setIsCheckoutOpen, showToast } = useCart();

  useGSAP(
    () => {
      gsap.fromTo(
        leftCardRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );

      const items = gridItemsRef.current.filter(Boolean);
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  const features = [
    {
      id: 'minerals',
      badge: 'Mineral Chemistry',
      title: 'Himalayan Minerals',
      desc: 'Hand-selected pristine Himalayan pink rock salt rich in 84+ trace minerals. Enhances natural aroma without bitter sharpness.',
      icon: Sparkles,
      actionText: 'View Mineral Profile',
      onClick: () => {
        showToast('Himalayan Salt: 84+ trace minerals, 100% unrefined');
      },
    },
    {
      id: 'fermentation',
      badge: 'Time-Honored',
      title: '36h Slow Fermentation',
      desc: 'Naturally cultured wild starter dough fermented in cool vaults for 36 hours. Produces light, airy, and gut-friendly digestible bakes.',
      icon: Flame,
      actionText: 'Dough Craft Notes',
      onClick: () => {
        showToast('36-hour slow cold fermentation with 100% live sourdough culture');
      },
    },
    {
      id: 'community',
      badge: '4.9 ★ Rating',
      title: '5-Star Community',
      desc: 'Over 1,200+ discerning patrons across Hubballi-Dharwad. Love your culinary order? Share your feedback with our hearth team.',
      icon: Star,
      actionText: 'Leave a Review',
      onClick: () => {
        setIsReviewOpen(true);
      },
    },
    {
      id: 'contactless',
      badge: 'Instant QR',
      title: 'Contactless Ordering',
      desc: 'Seamless digital ordering at your table or for quick artisanal takeaway collection at our Kusugal Road counter.',
      icon: QrCode,
      actionText: 'Open Digital QR Dock',
      onClick: () => {
        setIsCheckoutOpen(true);
      },
    },
  ];

  return (
    <section
      id="promise"
      ref={containerRef}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] relative border-t border-[#EFECE6]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
              /PHILOSOPHY & PROMISE
            </span>
            <span className="h-px w-8 bg-[#B85B43]/40" />
          </div>
          <h2 className="font-canela text-4xl sm:text-5xl lg:text-6xl font-normal text-[#18181A] tracking-tight">
            The Pink Salt Promise
          </h2>
          <p className="font-subheading text-base sm:text-lg text-[#6E6B68] max-w-2xl mt-3 font-light leading-relaxed">
            Uncompromising raw ingredients, ancestral fermentation methods, and a relentless devotion to culinary sensory harmony.
          </p>
        </div>

        {/* Dual Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Framed Vintage Monochrome Woodcut Card */}
          <div
            ref={leftCardRef}
            className="lg:col-span-5 rounded-3xl bg-[#18181A] text-[#FAF7F2] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border border-[#2D2D32] shadow-xl group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B85B43]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="badge-mono badge-rose">
                  <ShieldCheck size={12} /> Artisanal Seal
                </span>
                <span className="font-mono text-xs text-[#FAF7F2]/60">Est. Hubballi</span>
              </div>

              {/* Vintage Linocut Graphic */}
              <div className="my-4 p-6 rounded-2xl bg-[#222226] border border-[#3A3A40] flex flex-col items-center justify-center text-center relative overflow-hidden">
                <svg
                  viewBox="0 0 240 240"
                  className="w-48 h-48 text-[#FAF7F2]/90 stroke-current mb-4 transition-transform duration-700 group-hover:scale-105"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="30" y="70" width="180" height="130" rx="8" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2" />
                  <path d="M50 200 L190 200" stroke="currentColor" strokeWidth="3" />
                  <path d="M50 170 C50 110, 190 110, 190 170" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M70 170 C70 125, 170 125, 170 170" stroke="#E8998D" strokeWidth="2" fill="#E8998D" fillOpacity="0.1" />
                  
                  <path d="M100 170 C100 150, 110 140, 120 135 C130 140, 140 150, 140 170 Z" fill="#B85B43" stroke="#FAF7F2" strokeWidth="1.5" />
                  <path d="M110 170 C110 158, 115 152, 120 148 C125 152, 130 158, 130 170 Z" fill="#FAF7F2" />
                  
                  <line x1="20" y1="210" x2="110" y2="155" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <ellipse cx="115" cy="152" rx="14" ry="8" stroke="currentColor" strokeWidth="1.5" fill="#222226" />
                  
                  <path d="M110 90 Q115 75 110 60" stroke="#E8998D" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                  <path d="M120 85 Q125 70 120 55" stroke="#FAF7F2" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                  <path d="M130 90 Q135 75 130 60" stroke="#E8998D" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                </svg>

                <span className="font-mono text-[11px] uppercase tracking-widest text-[#E8998D] font-semibold">
                  Live Stone Oven • 450°C Hearth
                </span>
              </div>

              <h3 className="font-canela text-3xl font-normal text-[#FAF7F2] mb-3">
                Ancient Mineral Alchemy
              </h3>
              <p className="font-subheading text-sm text-[#FAF7F2]/80 leading-relaxed mb-6 font-light">
                We season every dough, roast, and sauce with pure Himalayan rock crystals — untamed trace minerals balancing bold culinary acidity.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs text-[#E8998D] flex items-center gap-1.5">
                <HeartHandshake size={14} /> 100% Unprocessed Purity
              </span>
              <span className="font-mono text-xs text-[#FAF7F2]/60">Hubballi, KA</span>
            </div>
          </div>

          {/* Right Column: 2x2 Interactive Feature Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  ref={(el) => (gridItemsRef.current[i] = el)}
                  className="card-editorial p-7 flex flex-col justify-between bg-white border border-[#EFECE6] hover:border-[#E8998D] group cursor-pointer shadow-xs hover:shadow-md"
                  onClick={feat.onClick}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#EFECE6] text-[#B85B43] flex items-center justify-center group-hover:bg-[#B85B43] group-hover:text-white transition-colors duration-300">
                        <Icon size={22} />
                      </div>
                      <span className="badge-mono badge-rose">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="font-canela text-2xl font-normal text-[#18181A] mb-2 group-hover:text-[#B85B43] transition-colors leading-snug">
                      {feat.title}
                    </h3>
                    <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] leading-relaxed mb-6 font-light">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EFECE6] flex items-center justify-between text-xs font-mono text-[#B85B43] font-semibold group-hover:text-[#C66B53]">
                    <span>{feat.actionText}</span>
                    <ArrowUpRight
                      size={15}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

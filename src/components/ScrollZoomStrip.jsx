'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, Flame, Clock, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 3-Column Card Content Matrix
const COLUMN_1_CARDS = [
  {
    id: 'col1-1',
    title: 'Golden Butter Croissant',
    tag: '81 Flaky Layers',
    badge: 'Morning Roast',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'col1-2',
    title: 'Single-Origin Morning Roast',
    tag: 'Arabica Pull',
    badge: 'Single Origin',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'col1-3',
    title: 'Baked Blueberry Cheesecake',
    tag: 'Wild Berry Compote',
    badge: 'Patisserie',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
  },
];

const COLUMN_2_CARDS = [
  {
    id: 'col2-1',
    title: 'Signature Pink Sauce Penne',
    tag: 'Crushed Pink Rock Salt',
    badge: 'Handcrafted',
    image: '/images/pink_sauce_penne.jpg',
  },
  {
    id: 'col2-2',
    title: 'Blistered Stone Hearth Margherita',
    tag: 'San Marzano D.O.P. & Fresh Basil',
    badge: '36h Sourdough • 450°C Hearth',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    isSpotlight: true,
  },
  {
    id: 'col2-3',
    title: 'Artisanal Sourdough Hearth Batard',
    tag: 'Wild Fermentation',
    badge: 'Ancestral Hearth',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
];

const COLUMN_3_CARDS = [
  {
    id: 'col3-1',
    title: 'Charred Truffle Mushroom Pizza',
    tag: 'White Truffle & Ricotta',
    badge: 'Stone Fired',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'col3-2',
    title: 'Pink Salt Velvet Cold Brew',
    tag: '18h Slow Extraction',
    badge: 'Salt-Foam Cap',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'col3-3',
    title: 'Rustic Garlic Arrabiata',
    tag: 'Bird\'s Eye Chili & EVOO',
    badge: 'Stone Ground',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
  },
];

export const ScrollZoomStrip = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const spotlightCardRef = useRef(null);
  const spotlightContentRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // 1. Desktop Layout (min-width: 1024px)
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Set initial positions
        gsap.set(col1Ref.current, { yPercent: 20 });
        gsap.set(col2Ref.current, { yPercent: 40 });
        gsap.set(col3Ref.current, { yPercent: 25 });
        gsap.set(spotlightCardRef.current, { transformOrigin: 'center center', scale: 1, zIndex: 1 });

        // Phase 1 (0% -> 50%): Column Parallax Movement
        tl.to(col1Ref.current, { yPercent: -40, ease: 'none', duration: 0.5 }, 0)
          .to(col2Ref.current, { yPercent: -18, ease: 'none', duration: 0.5 }, 0)
          .to(col3Ref.current, { yPercent: -35, ease: 'none', duration: 0.5 }, 0);

        // Phase 2 (50% -> 100%): Full 2.35x Spotlight Zoom
        tl.to(
          spotlightCardRef.current,
          {
            scale: 2.35,
            zIndex: 40,
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(232, 153, 141, 0.35)',
            borderColor: 'rgba(232, 153, 141, 0.6)',
            ease: 'power2.inOut',
            duration: 0.5,
          },
          0.5
        )
          .to(col1Ref.current, { x: -100, opacity: 0.12, scale: 0.9, ease: 'power2.inOut', duration: 0.5 }, 0.5)
          .to(col3Ref.current, { x: 100, opacity: 0.12, scale: 0.9, ease: 'power2.inOut', duration: 0.5 }, 0.5)
          .to(headerRef.current, { opacity: 0.2, y: -20, ease: 'power2.inOut', duration: 0.5 }, 0.5)
          .to(
            spotlightContentRef.current,
            { scale: 0.75, transformOrigin: 'bottom left', ease: 'power2.inOut', duration: 0.5 },
            0.5
          );
      });

      // 2. Tablet & Mobile Layout (max-width: 1023px)
      mm.add('(max-width: 1023px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=160%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        gsap.set(col1Ref.current, { yPercent: 10 });
        gsap.set(col2Ref.current, { yPercent: 20 });
        gsap.set(col3Ref.current, { yPercent: 15 });
        gsap.set(spotlightCardRef.current, { transformOrigin: 'center center', scale: 1, zIndex: 1 });

        // Phase 1 (0% -> 50%): Snappy mobile parallax
        tl.to(col1Ref.current, { yPercent: -25, ease: 'none', duration: 0.5 }, 0)
          .to(col2Ref.current, { yPercent: -10, ease: 'none', duration: 0.5 }, 0)
          .to(col3Ref.current, { yPercent: -20, ease: 'none', duration: 0.5 }, 0);

        // Phase 2 (50% -> 100%): Touch-friendly 1.35x Spotlight Zoom (no screen clipping)
        tl.to(
          spotlightCardRef.current,
          {
            scale: 1.35,
            zIndex: 40,
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.9), 0 0 25px rgba(232, 153, 141, 0.4)',
            borderColor: 'rgba(232, 153, 141, 0.8)',
            ease: 'power2.inOut',
            duration: 0.5,
          },
          0.5
        )
          .to(col1Ref.current, { x: -30, opacity: 0.15, scale: 0.85, ease: 'power2.inOut', duration: 0.5 }, 0.5)
          .to(col3Ref.current, { x: 30, opacity: 0.15, scale: 0.85, ease: 'power2.inOut', duration: 0.5 }, 0.5)
          .to(headerRef.current, { opacity: 0.25, y: -10, ease: 'power2.inOut', duration: 0.5 }, 0.5);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="specialties"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] bg-[#18181A] text-[#FAF7F2] overflow-hidden"
    >
      {/* Anchor targets */}
      <div id="offerings" className="absolute -top-24" />
      <div id="craft" className="absolute -top-24" />

      {/* Atmospheric Ambient Hearth Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#B85B43]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#E8998D]/15 blur-3xl pointer-events-none" />

      {/* Pinned Viewport Container */}
      <div className="h-screen min-h-[100dvh] w-full flex flex-col justify-between items-center relative overflow-hidden py-6 sm:py-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Floating / Pinned Editorial Header */}
        <div
          ref={headerRef}
          className="text-center pt-4 sm:pt-6 z-20 transition-all duration-300 pointer-events-none px-2"
        >
          <div className="inline-flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#E8998D] uppercase font-bold">
              /OUR CRAFT & SPECIALTIES
            </span>
            <span className="h-px w-6 sm:w-8 bg-[#E8998D]/40" />
          </div>
          <h2 className="font-canela text-2xl sm:text-4xl lg:text-5xl font-normal text-[#FAF7F2] tracking-tight">
            A Visual Journey Through Our Hearth
          </h2>
          <p className="font-subheading text-xs sm:text-sm text-[#FAF7F2]/70 max-w-xl mx-auto mt-1 sm:mt-2 font-light leading-relaxed">
            Slow-fermented sourdoughs, handcrafted pasta reductions, and mineral cold extractions.
          </p>
        </div>

        {/* 3-Column Scroll-Driven Vertical Parallax Grid */}
        <div className="w-full max-w-6xl mx-auto h-[68vh] sm:h-[76vh] relative grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 items-center overflow-hidden my-auto">
          {/* Column 1: Bakes & Breakfast */}
          <div
            ref={col1Ref}
            className="flex flex-col gap-3 sm:gap-6 will-change-transform"
          >
            {COLUMN_1_CARDS.map((card) => (
              <div
                key={card.id}
                className="h-[170px] sm:h-[240px] md:h-[290px] w-full rounded-xl sm:rounded-2xl overflow-hidden relative border border-white/10 shadow-lg group bg-[#222226]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
                  <span className="badge-mono bg-[#18181A]/75 backdrop-blur-md text-[#FAF7F2] border border-white/20 text-[8px] sm:text-[10px] px-2 py-0.5 sm:px-3 sm:py-1">
                    {card.badge}
                  </span>
                </div>

                {/* Bottom Title & Tag */}
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-10">
                  <h3 className="font-canela text-xs sm:text-base md:text-lg text-[#FAF7F2] font-normal leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-mono text-[9px] sm:text-xs text-[#E8998D] mt-0.5 font-medium">
                    {card.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Hearth & Signature (Spotlight Column) */}
          <div
            ref={col2Ref}
            className="flex flex-col gap-3 sm:gap-6 will-change-transform z-10"
          >
            {COLUMN_2_CARDS.map((card) => {
              if (card.isSpotlight) {
                return (
                  <div
                    key={card.id}
                    ref={spotlightCardRef}
                    className="h-[180px] sm:h-[250px] md:h-[300px] w-full rounded-xl sm:rounded-2xl overflow-hidden relative border-2 border-[#E8998D]/40 shadow-2xl group bg-[#222226] will-change-transform cursor-pointer"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover brightness-[0.92] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/20 to-transparent" />

                    {/* Top Spotlight Badge */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 flex items-center gap-1.5">
                      <span className="badge-mono badge-rose text-[9px] sm:text-xs shadow-md px-2 py-0.5 sm:px-3 sm:py-1">
                        <Flame size={11} className="hidden sm:inline" /> {card.badge}
                      </span>
                    </div>

                    {/* Bottom Title & Tag */}
                    <div
                      ref={spotlightContentRef}
                      className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-10 origin-bottom-left"
                    >
                      <h3 className="font-canela text-sm sm:text-lg md:text-2xl text-[#FAF7F2] font-normal leading-tight drop-shadow-md">
                        {card.title}
                      </h3>
                      <p className="font-mono text-[9px] sm:text-xs text-[#E8998D] mt-0.5 sm:mt-1 font-semibold flex items-center gap-1">
                        <Sparkles size={11} /> {card.tag}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={card.id}
                  className="h-[170px] sm:h-[240px] md:h-[290px] w-full rounded-xl sm:rounded-2xl overflow-hidden relative border border-white/10 shadow-lg group bg-[#222226]"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/30 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
                    <span className="badge-mono bg-[#18181A]/75 backdrop-blur-md text-[#FAF7F2] border border-white/20 text-[8px] sm:text-[10px] px-2 py-0.5 sm:px-3 sm:py-1">
                      {card.badge}
                    </span>
                  </div>

                  {/* Bottom Title & Tag */}
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-10">
                    <h3 className="font-canela text-xs sm:text-base md:text-lg text-[#FAF7F2] font-normal leading-snug">
                      {card.title}
                    </h3>
                    <p className="font-mono text-[9px] sm:text-xs text-[#E8998D] mt-0.5 font-medium">
                      {card.tag}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 3: Savory & Cold Brews */}
          <div
            ref={col3Ref}
            className="flex flex-col gap-3 sm:gap-6 will-change-transform"
          >
            {COLUMN_3_CARDS.map((card) => (
              <div
                key={card.id}
                className="h-[170px] sm:h-[240px] md:h-[290px] w-full rounded-xl sm:rounded-2xl overflow-hidden relative border border-white/10 shadow-lg group bg-[#222226]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
                  <span className="badge-mono bg-[#18181A]/75 backdrop-blur-md text-[#FAF7F2] border border-white/20 text-[8px] sm:text-[10px] px-2 py-0.5 sm:px-3 sm:py-1">
                    {card.badge}
                  </span>
                </div>

                {/* Bottom Title & Tag */}
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-10">
                  <h3 className="font-canela text-xs sm:text-base md:text-lg text-[#FAF7F2] font-normal leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-mono text-[9px] sm:text-xs text-[#E8998D] mt-0.5 font-medium">
                    {card.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Progress Indicator Hint */}
        <div className="z-20 text-center pb-2 pointer-events-none">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#FAF7F2]/50 uppercase">
            ↓ Scroll to explore hearth specialties
          </span>
        </div>
      </div>
    </section>
  );
};

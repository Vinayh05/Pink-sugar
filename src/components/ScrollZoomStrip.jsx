'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, Flame, Clock, ArrowDown, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Desktop 3-Column Card Matrix
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
    tag: "Bird's Eye Chili & EVOO",
    badge: 'Stone Ground',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
  },
];

// Key Featured Dishes for Mobile Single-Column Card Reel
const MOBILE_REEL_CARDS = [
  {
    id: 'mob-1',
    title: 'Blistered Stone Hearth Margherita',
    tag: 'San Marzano D.O.P. & Fresh Basil',
    badge: '450°C Stone Hearth',
    desc: '36-hour wild-fermented dough blistered to airy perfection.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    isSpotlight: true,
  },
  {
    id: 'mob-2',
    title: 'Signature Pink Sauce Penne',
    tag: 'Crushed Himalayan Salt Crystals',
    badge: 'Handmade Pasta',
    desc: 'Velvety slow-simmered tomato cream reduction with coarse pink rock salt.',
    image: '/images/pink_sauce_penne.jpg',
  },
  {
    id: 'mob-3',
    title: 'Pink Salt Velvet Cold Brew',
    tag: '18h Slow Kyoto Extraction',
    badge: 'Signature Brew',
    desc: 'Single-origin Arabica cold brew topped with mineral salt cream foam.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mob-4',
    title: 'Golden Butter Croissant',
    tag: '81 Flaky Laminations',
    badge: 'Ancestral Hearth Bake',
    desc: 'Cultured French butter dough baked fresh at sunrise.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
  },
];

export const ScrollZoomStrip = () => {
  const sectionRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const mobileContainerRef = useRef(null);

  // Desktop Refs
  const headerRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const spotlightCardRef = useRef(null);
  const spotlightContentRef = useRef(null);

  // Mobile Reel Refs
  const mobileCardsRef = useRef([]);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  // Window resize & orientation change handler for ScrollTrigger refresh
  useEffect(() => {
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleRefresh, { passive: true });
    window.addEventListener('orientationchange', handleRefresh, { passive: true });
    return () => {
      window.removeEventListener('resize', handleRefresh);
      window.removeEventListener('orientationchange', handleRefresh);
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ==========================================
      // 1. DESKTOP LAYOUT (min-width: 1024px)
      // ==========================================
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

      // ==========================================
      // 2. MOBILE & TABLET LAYOUT (max-width: 1023px)
      // Single-Column Vertical Sticky Card Reel / Scrub
      // ==========================================
      mm.add('(max-width: 1023px)', () => {
        const cards = mobileCardsRef.current.filter(Boolean);
        if (cards.length === 0) return;

        // Pinned sticky card reel
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const newIdx = Math.min(
                MOBILE_REEL_CARDS.length - 1,
                Math.floor(progress * MOBILE_REEL_CARDS.length)
              );
              setActiveMobileIdx(newIdx);
            },
          },
        });

        // Set initial card states
        cards.forEach((card, i) => {
          if (i === 0) {
            gsap.set(card, { opacity: 1, scale: 1, y: 0, zIndex: 10 });
          } else {
            gsap.set(card, { opacity: 0, scale: 0.92, y: 40, zIndex: 5 });
          }
        });

        // Step-by-step crossfade & elevation between the 4 featured cards
        const step = 1 / (cards.length - 1);

        for (let i = 0; i < cards.length - 1; i++) {
          const startTime = i * step;
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          mobileTl
            .to(
              currentCard,
              {
                opacity: 0,
                scale: 0.88,
                y: -30,
                ease: 'power2.inOut',
                duration: step,
              },
              startTime
            )
            .to(
              nextCard,
              {
                opacity: 1,
                scale: 1,
                y: 0,
                zIndex: 10 + i,
                ease: 'power2.out',
                duration: step,
              },
              startTime + step * 0.15
            );
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="specialties"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] bg-[#18181A] text-[#FAF7F2] overflow-x-hidden"
    >
      {/* Anchor targets */}
      <div id="offerings" className="absolute -top-24" />
      <div id="craft" className="absolute -top-24" />

      {/* Atmospheric Ambient Hearth Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#B85B43]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#E8998D]/15 blur-3xl pointer-events-none" />

      {/* ========================================================= */}
      {/* DESKTOP PIPELINE: 3-Column Parallax + 2.35x Spotlight Zoom */}
      {/* ========================================================= */}
      <div
        ref={desktopContainerRef}
        className="hidden lg:flex h-screen min-h-[100dvh] w-full flex-col justify-between items-center relative overflow-hidden py-10 px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Pinned Editorial Header */}
        <div
          ref={headerRef}
          className="text-center pt-4 z-20 transition-all duration-300 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="font-mono text-xs tracking-widest text-[#E8998D] uppercase font-bold">
              /OUR CRAFT & SPECIALTIES
            </span>
            <span className="h-px w-8 bg-[#E8998D]/40" />
          </div>
          <h2 className="font-canela text-4xl lg:text-5xl font-normal text-[#FAF7F2] tracking-tight">
            A Visual Journey Through Our Hearth
          </h2>
          <p className="font-subheading text-sm text-[#FAF7F2]/70 max-w-xl mx-auto mt-2 font-light leading-relaxed">
            Slow-fermented sourdoughs, handcrafted pasta reductions, and mineral cold extractions.
          </p>
        </div>

        {/* 3-Column Parallel Scroll Parallax Grid */}
        <div className="w-full max-w-6xl mx-auto h-[76vh] relative grid grid-cols-3 gap-6 items-center overflow-hidden my-auto">
          {/* Column 1: Bakes & Breakfast */}
          <div ref={col1Ref} className="flex flex-col gap-6 will-change-transform">
            {COLUMN_1_CARDS.map((card) => (
              <div
                key={card.id}
                className="h-[290px] w-full rounded-2xl overflow-hidden relative border border-white/10 shadow-lg group bg-[#222226]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/30 to-transparent" />
                <div className="absolute top-3 left-3 z-10">
                  <span className="badge-mono bg-[#18181A]/75 backdrop-blur-md text-[#FAF7F2] border border-white/20 text-[10px]">
                    {card.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h3 className="font-canela text-lg text-[#FAF7F2] font-normal leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-mono text-xs text-[#E8998D] mt-0.5 font-medium">
                    {card.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Center Spotlight Column */}
          <div ref={col2Ref} className="flex flex-col gap-6 will-change-transform z-10">
            {COLUMN_2_CARDS.map((card) => {
              if (card.isSpotlight) {
                return (
                  <div
                    key={card.id}
                    ref={spotlightCardRef}
                    className="h-[300px] w-full rounded-2xl overflow-hidden relative border-2 border-[#E8998D]/40 shadow-2xl group bg-[#222226] will-change-transform cursor-pointer"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover brightness-[0.92] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/20 to-transparent" />
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span className="badge-mono badge-rose text-xs shadow-md">
                        <Flame size={12} /> {card.badge}
                      </span>
                    </div>
                    <div
                      ref={spotlightContentRef}
                      className="absolute bottom-3 left-3 right-3 z-10 origin-bottom-left"
                    >
                      <h3 className="font-canela text-2xl text-[#FAF7F2] font-normal leading-tight drop-shadow-md">
                        {card.title}
                      </h3>
                      <p className="font-mono text-xs text-[#E8998D] mt-1 font-semibold flex items-center gap-1">
                        <Sparkles size={12} /> {card.tag}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={card.id}
                  className="h-[290px] w-full rounded-2xl overflow-hidden relative border border-white/10 shadow-lg group bg-[#222226]"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/30 to-transparent" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="badge-mono bg-[#18181A]/75 backdrop-blur-md text-[#FAF7F2] border border-white/20 text-[10px]">
                      {card.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <h3 className="font-canela text-lg text-[#FAF7F2] font-normal leading-snug">
                      {card.title}
                    </h3>
                    <p className="font-mono text-xs text-[#E8998D] mt-0.5 font-medium">
                      {card.tag}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 3: Cold Brews & Savory */}
          <div ref={col3Ref} className="flex flex-col gap-6 will-change-transform">
            {COLUMN_3_CARDS.map((card) => (
              <div
                key={card.id}
                className="h-[290px] w-full rounded-2xl overflow-hidden relative border border-white/10 shadow-lg group bg-[#222226]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/30 to-transparent" />
                <div className="absolute top-3 left-3 z-10">
                  <span className="badge-mono bg-[#18181A]/75 backdrop-blur-md text-[#FAF7F2] border border-white/20 text-[10px]">
                    {card.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h3 className="font-canela text-lg text-[#FAF7F2] font-normal leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-mono text-xs text-[#E8998D] mt-0.5 font-medium">
                    {card.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Progress Indicator Hint */}
        <div className="z-20 text-center pb-2 pointer-events-none">
          <span className="font-mono text-[10px] tracking-widest text-[#FAF7F2]/50 uppercase">
            ↓ Scroll to explore hearth specialties
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE & TABLET PIPELINE: Single-Column Vertical Sticky Reel */}
      {/* ========================================================= */}
      <div
        ref={mobileContainerRef}
        className="flex lg:hidden h-screen min-h-[100dvh] w-full flex-col justify-between items-center relative overflow-hidden py-6 px-4 max-w-lg mx-auto"
      >
        {/* Mobile Header */}
        <div className="text-center pt-2 z-20 w-full">
          <div className="inline-flex items-center gap-1.5 mb-1">
            <span className="font-mono text-[10px] tracking-widest text-[#E8998D] uppercase font-bold">
              /OUR CRAFT & SPECIALTIES
            </span>
            <span className="h-px w-6 bg-[#E8998D]/40" />
          </div>
          <h2 className="font-canela text-2xl sm:text-3xl font-normal text-[#FAF7F2] tracking-tight">
            Hearth Craft Showcase
          </h2>
          <p className="font-subheading text-xs text-[#FAF7F2]/75 mt-0.5 font-light">
            Scroll to cycle through our signature hearth creations
          </p>

          {/* Active Reel Indicator Pill */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {MOBILE_REEL_CARDS.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeMobileIdx === idx ? 'w-6 bg-[#E8998D]' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Full-Width Stacked Card Stage */}
        <div className="relative w-full aspect-[4/3] max-h-[360px] my-auto flex items-center justify-center">
          {MOBILE_REEL_CARDS.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => (mobileCardsRef.current[idx] = el)}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#222226] will-change-transform"
            >
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="w-full h-full object-cover brightness-[0.90]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/95 via-[#18181A]/35 to-transparent" />

              {/* Badge & Index */}
              <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                <span className="badge-mono badge-rose text-[9px] shadow-md px-2.5 py-1">
                  {card.badge}
                </span>
                <span className="font-mono text-[10px] bg-[#18181A]/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[#FAF7F2]">
                  0{idx + 1} / 0{MOBILE_REEL_CARDS.length}
                </span>
              </div>

              {/* Card Title & Desc */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                <h3 className="font-canela text-lg sm:text-xl text-[#FAF7F2] font-normal leading-snug">
                  {card.title}
                </h3>
                <p className="font-mono text-[10px] text-[#E8998D] mt-0.5 font-semibold">
                  {card.tag}
                </p>
                <p className="font-subheading text-[11px] text-[#FAF7F2]/80 mt-1 font-light line-clamp-2">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe / Scroll Helper */}
        <div className="z-20 text-center pb-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[#FAF7F2]/60 uppercase py-1 px-3 rounded-full bg-white/5 border border-white/10">
            <span>Scroll down for next dish</span>
            <ArrowDown size={11} className="text-[#E8998D] animate-bounce" />
          </span>
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, Flame, ArrowUpRight, ChevronDown, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CRAFT_PILLARS = [
  {
    id: '01',
    title: '36-Hour Wild Fermentation',
    subtitle: 'Sourdough & Hearth Crusts',
    desc: 'Long cold-fermented doughs built on wild yeast cultures, creating open airy crumbles and blistered, digestible wood-fired crusts.',
    badge: 'Ancestral Hearth',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '02',
    title: 'Himalayan Mineral Infusion',
    subtitle: 'Salt-Cured Savory Reductions',
    desc: 'Hand-harvested pink mineral salt crystals incorporated directly into our pastry laminations, slow-simmered sauces, and velvet cold brews.',
    badge: '84+ Trace Minerals',
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '03',
    title: 'Artisanal Laminated Bakes',
    subtitle: 'French Pastry Craft',
    desc: 'Multi-layered butter croissants and dark chocolate tarts baked fresh daily at dawn using European butter and 70% single-origin cocoa.',
    badge: '81 Flaky Layers',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '04',
    title: 'Single-Origin Specialty Roasts',
    subtitle: '18-Hour Cold Extraction',
    desc: 'Precision-extracted coffee beans paired with house-whipped pink salt sweet cream for a rich, smooth, and balanced finish.',
    badge: 'Kyoto Cold Drip',
    imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1400&q=80',
  },
];

export const EditorialMagneticSplit = () => {
  const containerRef = useRef(null);
  const leftListRef = useRef(null);
  const rightFrameRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileExpandedIdx, setMobileExpandedIdx] = useState(0);

  // Preload all 4 pillar images on mount to eliminate transition flicker
  useEffect(() => {
    CRAFT_PILLARS.forEach((pillar) => {
      const img = new Image();
      img.src = pillar.imageUrl;
    });

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
      // 1. DESKTOP PINNED MAGNETIC SCROLL (min-width: 1024px)
      // ==========================================
      mm.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const targetIdx = Math.min(
              CRAFT_PILLARS.length - 1,
              Math.floor(progress * CRAFT_PILLARS.length)
            );
            setActiveIdx(targetIdx);
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="specialties"
      ref={containerRef}
      className="relative w-full bg-[#18181A] text-[#FAF7F2] overflow-x-hidden"
    >
      {/* Anchor targets for navigation */}
      <div id="craft" className="absolute -top-24" />
      <div id="offerings" className="absolute -top-24" />

      {/* Atmospheric Ambient Hearth Glow Orbs */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#B85B43]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#E8998D]/15 blur-3xl pointer-events-none" />

      {/* ========================================================= */}
      {/* DESKTOP VIEWPORT: Magnetic 50/50 Split Screen Layout      */}
      {/* ========================================================= */}
      <div className="hidden lg:flex h-screen min-h-[100dvh] w-full max-w-7xl mx-auto px-8 py-12 flex-col justify-between relative z-10">
        {/* Section Top Eyebrow Header */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs tracking-widest text-[#E8998D] uppercase font-bold">
              /OUR CRAFT & SPECIALTIES
            </span>
            <span className="h-px w-8 bg-[#E8998D]/40" />
          </div>
          <h2 className="font-canela text-4xl lg:text-5xl font-normal text-[#FAF7F2] tracking-tight">
            The Four Pillars of Our Hearth
          </h2>
        </div>

        {/* 50/50 Split Interactive Grid */}
        <div className="grid grid-cols-12 gap-10 items-center my-auto w-full">
          {/* Left Column: Interactive Magnetic Typography List (6 Cols) */}
          <div ref={leftListRef} className="col-span-6 space-y-5">
            {CRAFT_PILLARS.map((pillar, idx) => {
              const isActive = activeIdx === idx;

              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group p-5 rounded-2xl transition-all duration-500 cursor-pointer border ${
                    isActive
                      ? 'bg-[#222226] border-l-4 border-l-[#E8998D] border-t-white/10 border-r-white/10 border-b-white/10 shadow-xl opacity-100 translate-x-2'
                      : 'bg-transparent border-transparent opacity-40 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-mono text-sm font-bold transition-colors ${
                        isActive ? 'text-[#E8998D]' : 'text-[#FAF7F2]/50'
                      }`}
                    >
                      {pillar.id}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-[#E8998D] font-semibold">
                          {pillar.subtitle}
                        </span>
                        {isActive && (
                          <span className="badge-mono badge-rose text-[9px] py-0.5 px-2">
                            {pillar.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="font-canela text-2xl text-[#FAF7F2] font-normal mt-0.5 leading-snug">
                        {pillar.title}
                      </h3>

                      <p
                        className={`font-subheading text-xs text-[#FAF7F2]/75 mt-2 font-light leading-relaxed transition-all duration-300 ${
                          isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                      >
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Viewport Image Frame (6 Cols) */}
          <div
            ref={rightFrameRef}
            className="col-span-6 h-[460px] lg:h-[500px] w-full rounded-3xl overflow-hidden relative border border-white/15 shadow-2xl bg-[#222226]"
          >
            {CRAFT_PILLARS.map((pillar, idx) => {
              const isActive = activeIdx === idx;

              return (
                <div
                  key={pillar.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out will-change-transform ${
                    isActive
                      ? 'opacity-100 scale-100 pointer-events-auto z-10'
                      : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                >
                  <img
                    src={pillar.imageUrl}
                    alt={pillar.title}
                    className="w-full h-full object-cover brightness-[0.92]"
                  />
                  {/* Organic Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/90 via-[#18181A]/20 to-transparent" />

                  {/* Floating Frame Metadata Pill */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between bg-[#18181A]/80 backdrop-blur-xl border border-white/15 p-4 rounded-2xl shadow-xl">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="salt-pulse-dot" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#E8998D] font-bold">
                          Craft Pillar {pillar.id}
                        </span>
                      </div>
                      <h4 className="font-canela text-lg text-[#FAF7F2] font-normal leading-tight mt-0.5">
                        {pillar.title}
                      </h4>
                    </div>

                    <a
                      href="#menu"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E8998D] hover:text-[#18181A] text-[#FAF7F2] flex items-center justify-center transition-all duration-300 shrink-0 shadow-md"
                      title="Explore in Menu"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Bottom Scroll Cue */}
        <div className="text-center pb-2 pointer-events-none">
          <span className="font-mono text-[10px] tracking-widest text-[#FAF7F2]/40 uppercase">
            ↓ Scroll or hover pillars to discover hearth techniques
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE & TABLET VIEWPORT: Interactive Accordion Sequence  */}
      {/* ========================================================= */}
      <div className="flex lg:hidden flex-col py-16 px-4 sm:px-6 max-w-lg mx-auto w-full relative z-10 space-y-6">
        {/* Mobile Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 mb-1.5">
            <span className="font-mono text-[10px] tracking-widest text-[#E8998D] uppercase font-bold">
              /OUR CRAFT & SPECIALTIES
            </span>
            <span className="h-px w-6 bg-[#E8998D]/40" />
          </div>
          <h2 className="font-canela text-3xl font-normal text-[#FAF7F2] tracking-tight">
            The Four Pillars
          </h2>
          <p className="font-subheading text-xs text-[#FAF7F2]/70 mt-1 font-light">
            Tap each pillar to inspect our stone-hearth gastronomy
          </p>
        </div>

        {/* Mobile Accordion Card Stack */}
        <div className="space-y-4 w-full">
          {CRAFT_PILLARS.map((pillar, idx) => {
            const isExpanded = mobileExpandedIdx === idx;

            return (
              <div
                key={pillar.id}
                onClick={() => setMobileExpandedIdx(isExpanded ? -1 : idx)}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                  isExpanded
                    ? 'bg-[#222226] border-[#E8998D]/60 shadow-xl'
                    : 'bg-[#18181A] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Accordion Header */}
                <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#E8998D]">
                      {pillar.id}
                    </span>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#E8998D] block">
                        {pillar.subtitle}
                      </span>
                      <h3 className="font-canela text-lg sm:text-xl text-[#FAF7F2] font-normal leading-snug">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 shrink-0 ${
                      isExpanded ? 'rotate-180 bg-[#E8998D]/20 text-[#E8998D]' : 'text-white/60'
                    }`}
                  >
                    <ChevronDown size={15} />
                  </div>
                </div>

                {/* Accordion Expandable Image & Description */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden relative border border-white/10 shadow-md bg-[#18181A]">
                      <img
                        src={pillar.imageUrl}
                        alt={pillar.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/80 via-transparent to-transparent" />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="badge-mono badge-rose text-[9px] shadow-sm">
                          {pillar.badge}
                        </span>
                      </div>
                    </div>

                    <p className="font-subheading text-xs text-[#FAF7F2]/80 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

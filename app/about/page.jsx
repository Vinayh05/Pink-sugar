'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  HeartHandshake, 
  ArrowUpRight, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Calendar,
  Star,
  CheckCircle2,
  Utensils
} from 'lucide-react';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import { StoreProvider } from '../../src/context/StoreContext';
import { CartProvider } from '../../src/context/CartContext';
import { CartDrawer } from '../../src/components/CartDrawer';
import { ReservationModal } from '../../src/components/ReservationModal';
import { ReviewModal } from '../../src/components/ReviewModal';
import { CheckoutModal } from '../../src/components/CheckoutModal';
import { FloatingCartDock } from '../../src/components/FloatingCartDock';

const CRAFT_MATRIX = [
  {
    id: '01',
    title: 'Himalayan Minerals',
    badge: 'Mineral Chemistry',
    desc: 'Hand-selected pristine Himalayan pink rock salt rich in 84+ trace minerals. Enhances natural aroma without bitter sharpness.',
    icon: Sparkles,
  },
  {
    id: '02',
    title: '36h Wild Fermentation',
    badge: 'Time-Honored',
    desc: 'Naturally cultured wild starter dough fermented in cool vaults for 36 hours. Produces light, airy, and gut-friendly digestible bakes.',
    icon: Flame,
  },
  {
    id: '03',
    title: 'Hubballi Community Hub',
    badge: '4.9 ★ Community',
    desc: 'A sanctuary on Kusugal Road designed for slow mornings, afternoon reading, and evening gatherings around wood-fired hearths.',
    icon: Star,
  },
  {
    id: '04',
    title: 'Contactless Smart Dining',
    badge: 'Instant QR Ordering',
    desc: 'Order directly from your phone for instant stone-hearth firing, live POS kitchen dispatch, or takeaway collection.',
    icon: Utensils,
  },
];

export default function AboutPage() {
  return (
    <StoreProvider>
      <CartProvider>
        <main className="min-h-screen bg-[#FAF7F2] text-[#18181A] flex flex-col font-sans">
          {/* Header Navigation */}
          <Header />

          {/* About Hero Banner */}
          <section className="pt-36 pb-20 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] border-b border-[#EFECE6] relative overflow-hidden">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
                  /OUR PHILOSOPHY & STORY
                </span>
                <span className="h-px w-8 bg-[#B85B43]/40" />
              </div>

              <h1 className="font-canela text-4xl sm:text-6xl lg:text-7xl font-normal text-[#18181A] leading-[1.12] tracking-tight mb-6">
                Culinary Craft Rooted in <br className="hidden sm:inline" />
                <span className="italic font-light text-[#B85B43]">Pure Elements</span> & Stone Hearth Traditions
              </h1>

              <p className="font-subheading text-base sm:text-xl text-[#6E6B68] max-w-3xl mx-auto font-light leading-relaxed mb-10">
                Founded on Kusugal Road in Hubballi, Pink Sugar Cafe was born from an obsession with elemental gastronomy: wild fermentation, raw Himalayan rock minerals, and single-origin Kyoto extractions.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/menu"
                  className="btn-primary flex items-center gap-2 shadow-lg"
                  style={{ padding: '12px 28px' }}
                >
                  <span>Explore The Artisanal Menu</span>
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/reserve"
                  className="btn-secondary shadow-sm"
                  style={{ padding: '12px 28px' }}
                >
                  Reserve a Table
                </Link>
              </div>
            </div>
          </section>

          {/* Section: The Founding Story Narrative */}
          <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Image Collage */}
              <div className="lg:col-span-6 relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#EFECE6] bg-[#18181A]">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
                    alt="Sourdough hearth bread"
                    className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-4 sm:p-5 rounded-2xl border border-[#EFECE6] shadow-xl max-w-xs">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B85B43]">
                    <Sparkles size={14} />
                    <span>Est. 2024 • Hubballi</span>
                  </div>
                  <p className="font-subheading text-xs text-[#6E6B68] mt-1 font-light">
                    Every batch seasoned with unrefined Himalayan pink salt crystals.
                  </p>
                </div>
              </div>

              {/* Right Column: Narrative Copy */}
              <div className="lg:col-span-6 space-y-6">
                <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold block">
                  /THE FOUNDING VISION
                </span>

                <h2 className="font-canela text-3xl sm:text-4xl text-[#18181A] font-normal leading-tight">
                  Where Ancient Minerals Balance Modern Acidity
                </h2>

                <p className="font-subheading text-sm sm:text-base text-[#6E6B68] leading-relaxed font-light">
                  Most culinary salt is stripped of its character through industrial processing. At Pink Sugar, we work exclusively with pristine mineral rocks harvested from ancient geological beds.
                </p>

                <p className="font-subheading text-sm sm:text-base text-[#6E6B68] leading-relaxed font-light">
                  When paired with 36-hour wild lactobacillus sourdough cultures and 450°C blistered stone hearth heat, the minerals unlock rich, buttery complexity without sharp sodium bite.
                </p>

                <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#EFECE6] font-mono text-xs">
                  <div>
                    <span className="text-2xl font-bold text-[#18181A] font-canela block">36 Hours</span>
                    <span className="text-[#6E6B68] text-[11px]">Wild Starter Vault Ferment</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-[#18181A] font-canela block">450°C</span>
                    <span className="text-[#6E6B68] text-[11px]">Stone Oven Baking Heat</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: The Pink Sugar Promise (Relocated from Home) */}
          <section className="py-20 px-6 sm:px-10 lg:px-16 bg-white border-y border-[#EFECE6]">
            <div className="max-w-7xl mx-auto">
              <div className="mb-14">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
                    /PHILOSOPHY & PROMISE
                  </span>
                  <span className="h-px w-8 bg-[#B85B43]/40" />
                </div>
                <h2 className="font-canela text-3xl sm:text-5xl font-normal text-[#18181A] tracking-tight">
                  The Pink Sugar Promise
                </h2>
                <p className="font-subheading text-sm sm:text-base text-[#6E6B68] max-w-2xl mt-2 font-light leading-relaxed">
                  Uncompromising raw ingredients, ancestral fermentation methods, and a relentless devotion to culinary sensory harmony.
                </p>
              </div>

              {/* Linocut Stone Hearth & 2x2 Craft Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Side: Vintage Monochrome Woodcut/Linocut Stone Hearth */}
                <div className="lg:col-span-5 rounded-3xl bg-[#18181A] text-[#FAF7F2] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border border-[#2D2D32] shadow-xl group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#B85B43]/20 blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="badge-mono badge-rose">
                        <ShieldCheck size={12} /> Artisanal Seal
                      </span>
                      <span className="font-mono text-xs text-[#FAF7F2]/60">Est. Hubballi</span>
                    </div>

                    {/* Linocut Hearth Vector */}
                    <div className="my-4 p-6 rounded-2xl bg-[#222226] border border-[#3A3A40] flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <svg viewBox="0 0 240 240" className="w-48 h-48 text-[#FAF7F2]/90 stroke-current mb-4 transition-transform duration-700 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                    <h3 className="font-canela text-2xl font-normal text-[#FAF7F2] mb-2">Ancient Mineral Alchemy</h3>
                    <p className="font-subheading text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed mb-6 font-light">
                      We season every dough, roast, and sauce with pure Himalayan rock crystals — untamed trace minerals balancing bold culinary acidity.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-xs text-[#E8998D] flex items-center gap-1.5">
                      <HeartHandshake size={14} /> 100% Unprocessed Purity
                    </span>
                    <span className="font-mono text-xs text-[#FAF7F2]/60">Hubballi, KA</span>
                  </div>
                </div>

                {/* Right Side: 2x2 Craft Matrix */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {CRAFT_MATRIX.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className="card-editorial p-6 sm:p-7 flex flex-col justify-between bg-[#FAF7F2] border border-[#EFECE6] hover:border-[#E8998D] group cursor-pointer shadow-xs hover:shadow-md"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-11 h-11 rounded-xl bg-white text-[#B85B43] flex items-center justify-center border border-[#EFECE6] group-hover:bg-[#B85B43] group-hover:text-white transition-colors duration-300">
                              <Icon size={20} />
                            </div>
                            <span className="badge-mono badge-rose">{item.badge}</span>
                          </div>

                          <h3 className="font-canela text-xl sm:text-2xl font-normal text-[#18181A] mb-2 group-hover:text-[#B85B43] transition-colors leading-snug">
                            {item.title}
                          </h3>

                          <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] leading-relaxed mb-4 font-light">
                            {item.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between text-xs font-mono text-[#B85B43] font-semibold">
                          <span>Craft Notes</span>
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Visit & Reservation Anchor */}
          <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto w-full">
            <div className="bg-[#18181A] text-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center sm:text-left">
                <div className="inline-flex items-center gap-2">
                  <span className="salt-pulse-dot" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E8998D] font-bold">
                    Kusugal Road • Hubballi
                  </span>
                </div>
                <h3 className="font-canela text-3xl sm:text-4xl text-[#FAF7F2] font-normal">
                  Reserve Your Hearth Table
                </h3>
                <p className="font-subheading text-xs sm:text-sm text-[#FAF7F2]/75 max-w-md font-light">
                  Open daily 8:00 AM – 11:00 PM for sourdough breakfast pulls, stone-oven lunches, and evening tasting vault dinners.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Link
                  href="/reserve"
                  className="btn-primary text-xs flex items-center gap-2 shadow-lg"
                  style={{ padding: '14px 28px' }}
                >
                  <Calendar size={15} />
                  <span>Book Online</span>
                </Link>

                <a
                  href="https://wa.me/919845012345?text=Hello%20Pink%20Sugar%20Cafe,%20I'd%20like%20to%20reserve%20a%20table%20at%20Kusugal%20Road."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary text-xs flex items-center gap-2 text-[#FAF7F2] border-white/30 hover:border-[#E8998D]"
                  style={{ padding: '14px 24px' }}
                >
                  <MessageSquare size={15} className="text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />

          {/* Overlays */}
          <CartDrawer />
          <ReservationModal />
          <ReviewModal />
          <CheckoutModal />
          <FloatingCartDock />
        </main>
      </CartProvider>
    </StoreProvider>
  );
}

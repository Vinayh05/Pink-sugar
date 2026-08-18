'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  ArrowUp, 
  MapPin, 
  Clock, 
  Star, 
  Mail, 
  Sparkles, 
  Check, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currentTimeIST, setCurrentTimeIST] = useState('');
  const { showToast } = useCart();

  useEffect(() => {
    const updateIST = () => {
      const now = new Date();
      setCurrentTimeIST(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateIST();
    const interval = setInterval(updateIST, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    if (showToast) {
      showToast('Welcome to the Pink Sugar Tasting Club list!');
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#18181A] text-[#FAF7F2] border-t border-white/10 pt-20 pb-10 px-6 md:px-16 relative overflow-hidden font-sans">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#B85B43]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#E8998D]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Live Status (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#E8998D]/50 shadow-md bg-[#18181A] shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src="/images/pink_salt_logo.jpg"
                  alt="Pink Sugar Cafe Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-canela text-2xl sm:text-3xl font-bold tracking-widest text-[#FAF7F2]">
                PINK SUGAR CAFE
              </span>
            </Link>

            {/* Micro-badge: Live pulsing green indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#222226] border border-white/10 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold uppercase tracking-wider">
                HUBBALLI — {currentTimeIST || 'LOCAL TIME IST'}
              </span>
            </div>

            <p className="font-subheading text-xs sm:text-sm text-[#FAF7F2]/75 max-w-sm leading-relaxed font-light">
              "Artisanal Wood-Fired Hearth & Mineral-Infused Roasts." Handcrafted 36h wild sourdoughs, signature pink sugar extractions, and European patisserie craft on Kusugal Road.
            </p>
          </div>

          {/* Column 2: Navigation Anchors (2.5 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#E8998D] font-bold block">
              /EXPERIENCE & REPERTOIRE
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-[#FAF7F2]/80">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#E8998D] hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>The Story & Craft (/about)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="hover:text-[#E8998D] hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>Artisanal Menu (/menu)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/reserve"
                  className="hover:text-[#E8998D] hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>Table Reservations (/reserve)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-[#E8998D] hover:underline transition-colors flex items-center gap-1.5 text-[#E8998D]"
                >
                  <span>Owner Portal (/admin)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Visit & Hours (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#E8998D] font-bold block">
              /VISIT & HEARTH
            </span>
            <div className="space-y-3 font-subheading text-xs text-[#FAF7F2]/80 font-light">
              <div>
                <span className="font-mono text-[10px] text-[#FAF7F2]/50 block uppercase">Address</span>
                <p className="mt-0.5">
                  Infinity Square, Kusugal Road, Keshwapur, Hubballi, Karnataka 580023
                </p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#FAF7F2]/50 block uppercase">Hours</span>
                <p className="mt-0.5">Monday – Sunday: 8:00 AM – 11:00 PM</p>
              </div>
              <a
                href="https://maps.google.com/?q=Pink+Sugar+Cafe+Kusugal+Road+Hubballi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-[#B85B43] hover:text-[#E8998D] font-semibold transition-colors"
              >
                <span>Get Directions on Google Maps</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Column 4: Digital Concierge & Newsletter (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#E8998D] font-bold">
                /TASTING CLUB
              </span>
              <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#FAF7F2]/80 bg-[#222226] px-2 py-0.5 rounded-full border border-white/10">
                <Star size={11} fill="#E8998D" className="text-[#E8998D]" />
                <span>4.9 on Google (320+)</span>
              </div>
            </div>

            {/* Newsletter Input */}
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <p className="font-subheading text-xs text-[#FAF7F2]/70 font-light">
                  Receive secret chef tasting invitations & seasonal sourdough batches.
                </p>
                <div className="flex rounded-xl overflow-hidden border border-white/20 focus-within:border-[#B85B43] bg-[#222226]">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2.5 bg-transparent text-xs font-mono text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#B85B43] hover:bg-[#C66B53] text-white px-3 py-2.5 text-xs font-mono font-semibold transition-colors shrink-0"
                  >
                    Join
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2">
                <Check size={14} />
                <span>Added to exclusive tasting dispatch!</span>
              </div>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#222226] hover:bg-[#2A2A30] border border-white/10 text-xs font-mono text-[#FAF7F2]/80 hover:text-[#FAF7F2] transition-colors"
              >
                <InstagramIcon size={13} />
                <span>@_pinksaltcafe</span>
              </a>

              <a
                href="https://wa.me/919845012345?text=Hello%20Pink%20Sugar%20Cafe,%20I'd%20like%20to%20inquire%20about%20a%20table%20reservation."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#222226] hover:bg-[#2A2A30] border border-white/10 text-xs font-mono text-[#FAF7F2]/80 hover:text-[#FAF7F2] transition-colors"
              >
                <MessageSquare size={13} className="text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Large Typographic Watermark */}
        <div className="my-8 sm:my-12 overflow-hidden pointer-events-none">
          <div className="font-canela text-center uppercase tracking-widest text-white/[0.04] text-[9vw] font-bold select-none leading-none whitespace-nowrap">
            CRAFTED AT THE HEARTH
          </div>
        </div>

        {/* Bottom Sub-strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#FAF7F2]/50">
          <div className="text-center sm:text-left">
            <span>© {new Date().getFullYear()} Pink Sugar Cafe Hubballi. All rights reserved.</span>
            <span className="block sm:inline sm:ml-3 text-[11px] text-[#FAF7F2]/40 mt-1 sm:mt-0">
              All sourdoughs wild-fermented. Contains gluten, dairy, & tree nuts.
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono text-[#E8998D] hover:text-[#FAF7F2] transition-colors cursor-pointer py-1.5 px-3 rounded-full bg-[#222226] border border-white/10"
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};

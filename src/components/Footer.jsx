'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Sparkles, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { setIsReservationOpen, showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      showToast('Subscribed to Pink Salt private tasting invites!');
    }
  };

  return (
    <footer id="location" className="bg-[#18181A] text-[#FAF7F2] pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#2D2D32] relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8998D]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#B85B43]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2D2D32]">
          {/* Brand Intro */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#E8998D]/50 shadow-md bg-[#18181A] shrink-0">
                <img
                  src="/images/pink_salt_logo.jpg"
                  alt="Pink Salt Cafe Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-canela text-3xl font-bold tracking-widest text-[#FAF7F2]">
                PINK SALT
              </span>
            </div>

            <p className="font-subheading text-sm text-[#FAF7F2]/75 max-w-sm leading-relaxed font-light">
              Artisanal stone-hearth gastronomy, 36h wild-fermented sourdoughs, and signature Himalayan rock salt roasts in the heart of Hubballi.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#222226] border border-[#3A3A40] text-xs font-mono text-[#FAF7F2] hover:border-[#E8998D] hover:text-[#E8998D] transition-colors"
              >
                <InstagramIcon size={14} />
                <span>@_PINKSALTCAFE</span>
              </a>
              <span className="badge-mono badge-rose">
                <Sparkles size={11} /> Kusugal Rd
              </span>
            </div>
          </div>

          {/* Tasting Club Subscription Form */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-[#E8998D] uppercase tracking-widest font-semibold block mb-2">
                Private Tasting Society
              </span>
              <h3 className="font-canela text-2xl sm:text-3xl text-[#FAF7F2] font-normal mb-3">
                Join our hearth table reservations list
              </h3>
              <p className="font-subheading text-xs sm:text-sm text-[#FAF7F2]/70 max-w-lg mb-6 font-light">
                Receive invitations to off-menu cold brew extraction flights, seasonal bake releases, and chef-curated evening tastings.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="px-4 py-3 rounded-full bg-[#222226] border border-[#3A3A40] focus:border-[#E8998D] focus:outline-none font-sans text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/40 flex-1"
              />
              <button
                type="submit"
                className="btn-primary shrink-0 justify-center"
              >
                {subscribed ? 'Joined' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Location & Hours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-[#2D2D32] text-xs font-mono">
          <div>
            <span className="text-[#E8998D] uppercase tracking-widest block mb-2 font-semibold">
              Location
            </span>
            <p className="text-[#FAF7F2]/80 leading-relaxed font-sans">
              Kusugal Road, Hubballi,<br />
              Karnataka 580023, India
            </p>
          </div>

          <div>
            <span className="text-[#E8998D] uppercase tracking-widest block mb-2 font-semibold">
              Hours
            </span>
            <p className="text-[#FAF7F2]/80 leading-relaxed font-sans">
              Mon – Sun: 8:00 AM – 11:30 PM<br />
              Hearth Firing: Daily from 11:00 AM
            </p>
          </div>

          <div>
            <span className="text-[#E8998D] uppercase tracking-widest block mb-2 font-semibold">
              Contact
            </span>
            <p className="text-[#FAF7F2]/80 leading-relaxed font-sans">
              hello@pinksaltcafe.com<br />
              +91 836 295 1084
            </p>
          </div>

          <div>
            <span className="text-[#E8998D] uppercase tracking-widest block mb-2 font-semibold">
              Reservations
            </span>
            <Link
              href="/reserve"
              className="text-[#E8998D] hover:underline flex items-center gap-1 font-mono font-semibold"
            >
              <span>Book Table Online</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#FAF7F2]/60">
          <p>© {new Date().getFullYear()} Pink Salt Cafe. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with Himalayan Rock Salt & Ancestral Hearth Fire</span>
            <Heart size={11} className="text-[#E8998D]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

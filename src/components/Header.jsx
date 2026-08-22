'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Calendar, 
  Menu as MenuIcon, 
  X, 
  Sparkles, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
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

export const Header = () => {
  const { totalItems, setIsCartOpen, setIsReservationOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  const handleMenuToggle = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setMobileMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { label: 'Craft & Pillars', href: '/#specialties' },
    { label: 'Our Story', href: '/about' },
    { label: 'Artisanal Menu', href: '/menu' },
  ];

  return (
    <>
      {/* Fixed Top Header Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
        style={{
          background: scrolled
            ? 'rgba(250, 247, 242, 0.96)'
            : 'linear-gradient(180deg, rgba(24, 24, 26, 0.92) 0%, rgba(24, 24, 26, 0.45) 65%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #EFECE6' : 'none',
          boxShadow: scrolled ? '0 2px 12px rgba(24, 24, 26, 0.04)' : 'none',
          transition: 'all 0.35s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 text-decoration-none group cursor-pointer"
            style={{ textDecoration: 'none' }}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#E8998D]/50 shadow-md group-hover:scale-105 group-hover:border-[#E8998D] transition-all duration-300 bg-[#18181A] shrink-0">
              <img
                src="/images/pink_salt_logo.jpg"
                alt="Pink Sugar Cafe Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span
                className="font-canela text-xl sm:text-2xl font-bold tracking-wider leading-none group-hover:text-[#E8998D] transition-colors"
                style={{
                  color: scrolled ? '#18181A' : '#FAF7F2',
                  letterSpacing: '0.08em',
                }}
              >
                PINK SUGAR
              </span>
              <span
                className="text-[9px] font-mono tracking-widest uppercase mt-0.5"
                style={{
                  color: scrolled ? '#6E6B68' : '#E8998D',
                  letterSpacing: '0.14em',
                }}
              >
                Hubballi • Kusugal Rd
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 whitespace-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-mono font-medium transition-all relative py-1 hover:text-[#B85B43] ${
                  scrolled ? 'text-[#6E6B68]' : 'text-[#FAF7F2]/85'
                }`}
                style={{ textDecoration: 'none', letterSpacing: '0.12em' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Instagram Link */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @_PINKSALTCAFE"
              className={`p-2 rounded-full transition-all hidden sm:flex items-center justify-center ${
                scrolled
                  ? 'text-[#6E6B68] hover:text-[#18181A] hover:bg-[#EFECE6]'
                  : 'text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:bg-[#FAF7F2]/10'
              }`}
            >
              <InstagramIcon size={16} />
            </a>

            {/* Reserve Table Button */}
            <Link
              href="/reserve"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
              style={{
                backgroundColor: scrolled ? '#18181A' : 'rgba(24, 24, 26, 0.75)',
                color: '#FAF7F2',
                border: scrolled ? '1px solid #18181A' : '1px solid rgba(250, 247, 242, 0.3)',
              }}
            >
              <Calendar size={13} className="text-[#E8998D]" />
              <span>Reserve Table</span>
            </Link>

            {/* Order Bag / Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="btn-primary relative touch-manipulation min-h-[42px]"
              style={{
                padding: '8px 18px',
                fontSize: '12px',
              }}
            >
              <ShoppingBag size={15} />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#B85B43] text-[10px] font-bold font-mono">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile/Tablet Menu Hamburger Trigger */}
            <button
              type="button"
              onClick={handleMenuToggle}
              className={`p-2.5 rounded-xl lg:hidden transition-colors touch-manipulation cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px] ${
                scrolled
                  ? 'bg-[#EFECE6] text-[#18181A] hover:bg-[#E8DECE]'
                  : 'bg-white/10 text-[#FAF7F2] hover:bg-white/20'
              }`}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <MenuIcon size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* REACT PORTAL: Isolated Fullscreen Mobile Navigation Drawer */}
      {/* ========================================================= */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="fixed inset-0 z-[9999] bg-[#18181A]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 text-[#FAF7F2] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
            style={{ touchAction: 'manipulation' }}
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E8998D]/50 bg-[#18181A] shrink-0">
                  <img
                    src="/images/pink_salt_logo.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-canela text-xl font-bold tracking-wider text-[#FAF7F2]">
                    PINK SUGAR
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#E8998D] uppercase">
                    Hubballi • Kusugal Rd
                  </span>
                </div>
              </Link>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleMenuToggle}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] flex items-center justify-center transition-colors cursor-pointer touch-manipulation"
                aria-label="Close Navigation Menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Navigation Links Body */}
            <div className="flex flex-col gap-6 my-auto py-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E8998D] uppercase tracking-widest">
                <Sparkles size={14} /> /ARTISANAL REPERTOIRE
              </div>

              <div className="flex flex-col gap-5">
                <Link
                  href="/#specialties"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-canela text-3xl text-[#FAF7F2] hover:text-[#E8998D] transition-colors flex items-center justify-between group"
                >
                  <span>Craft & Pillars</span>
                  <ArrowUpRight size={18} className="opacity-40 group-hover:opacity-100 transition-opacity text-[#E8998D]" />
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-canela text-3xl text-[#FAF7F2] hover:text-[#E8998D] transition-colors flex items-center justify-between group"
                >
                  <span>Our Story</span>
                  <ArrowUpRight size={18} className="opacity-40 group-hover:opacity-100 transition-opacity text-[#E8998D]" />
                </Link>

                <Link
                  href="/menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-canela text-3xl text-[#FAF7F2] hover:text-[#E8998D] transition-colors flex items-center justify-between group"
                >
                  <span>Artisanal Menu</span>
                  <ArrowUpRight size={18} className="opacity-40 group-hover:opacity-100 transition-opacity text-[#E8998D]" />
                </Link>

                <Link
                  href="/reserve"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-canela text-3xl text-[#FAF7F2] hover:text-[#E8998D] transition-colors flex items-center justify-between group"
                >
                  <span>Reserve a Table</span>
                  <ArrowUpRight size={18} className="opacity-40 group-hover:opacity-100 transition-opacity text-[#E8998D]" />
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-sm text-[#E8998D] hover:underline pt-2 flex items-center gap-1.5"
                >
                  <span>Owner Admin Portal ↗</span>
                </Link>
              </div>
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <Link
                href="/reserve"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full justify-center text-xs py-3.5 shadow-lg flex items-center gap-2"
              >
                <Calendar size={15} />
                <span>Reserve a Table Online</span>
              </Link>

              <div className="grid grid-cols-2 gap-3 mt-1">
                <a
                  href="https://wa.me/919845012345?text=Hello%20Pink%20Sugar%20Cafe,%20I'd%20like%20to%20inquire%20about%20a%20table."
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-2xl bg-[#222226] border border-white/10 text-xs font-mono text-[#FAF7F2] flex items-center justify-center gap-2 hover:bg-[#2A2A30] transition-colors"
                >
                  <MessageSquare size={14} className="text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Pink+Sugar+Cafe+Kusugal+Road+Hubballi"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-2xl bg-[#222226] border border-white/10 text-xs font-mono text-[#FAF7F2] flex items-center justify-center gap-2 hover:bg-[#2A2A30] transition-colors"
                >
                  <MapPin size={14} className="text-[#E8998D]" />
                  <span>Location</span>
                </a>
              </div>

              <div className="text-center pt-2">
                <span className="font-mono text-[10px] text-[#FAF7F2]/50">
                  Open Daily 8:00 AM – 11:00 PM • Kusugal Road, Hubballi
                </span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

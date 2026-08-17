'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Sparkles, MapPin } from 'lucide-react';
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
  const { totalItems, subtotal, setIsCartOpen, setIsReservationOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
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

  const navLinks = [
    { label: 'Craft & Specialties', href: '/#specialties' },
    { label: 'The Promise', href: '/#promise' },
    { label: 'Full Menu', href: '/#menu' },
    { label: 'Community', href: '/#promise' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
        style={{
          background: scrolled
            ? 'rgba(250, 247, 242, 0.96)'
            : 'linear-gradient(180deg, rgba(24, 24, 26, 0.9) 0%, rgba(24, 24, 26, 0.4) 65%, transparent 100%)',
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
                alt="Pink Salt Cafe Logo"
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
                PINK SALT
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
          <nav className="hidden md:flex items-center gap-8">
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
              className="btn-primary relative"
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

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg md:hidden transition-colors ${
                scrolled ? 'text-[#18181A]' : 'text-[#FAF7F2]'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#18181A]/95 backdrop-blur-xl flex flex-col justify-between p-6 pt-24 md:hidden text-[#FAF7F2] animate-in fade-in duration-200">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E8998D] uppercase tracking-widest pb-4 border-b border-[#2D2D32]">
              <Sparkles size={14} /> Artisanal Navigation
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-canela text-2xl text-[#FAF7F2] hover:text-[#E8998D] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-[#2D2D32]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsReservationOpen(true);
              }}
              className="btn-secondary w-full justify-center border-[#FAF7F2]/30 text-[#FAF7F2]"
            >
              <Calendar size={16} className="text-[#E8998D]" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

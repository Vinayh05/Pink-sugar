'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StoreProvider } from '../src/context/StoreContext';
import { CartProvider } from '../src/context/CartContext';
import { Header } from '../src/components/Header';
import { HeroScrub } from '../src/components/HeroScrub';
import { EditorialMagneticSplit } from '../src/components/EditorialMagneticSplit';
import { CommunityReviewsCanvas } from '../src/components/CommunityReviewsCanvas';
import { MenuTeaser } from '../src/components/MenuTeaser';
import { Footer } from '../src/components/Footer';
import { CartDrawer } from '../src/components/CartDrawer';
import { ReservationModal } from '../src/components/ReservationModal';
import { ReviewModal } from '../src/components/ReviewModal';
import { CheckoutModal } from '../src/components/CheckoutModal';
import { FloatingCartDock } from '../src/components/FloatingCartDock';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }
  }, []);

  return (
    <StoreProvider>
      <CartProvider>
        {/* Main Single Page Web App */}
        <main className="min-h-screen bg-[#18181A] text-[#FAF7F2] relative font-sans">
          {/* Navigation Bar */}
          <Header />

          {/* Section 1: Hero Video Scrub Canvas (#18181A) */}
          <HeroScrub />

          {/* Section 2: Craft & Specialties (Magnetic Split Reveal) (#18181A) */}
          <EditorialMagneticSplit />

          {/* Section 3: Floating Google Community Reviews (#FAF7F2) */}
          <CommunityReviewsCanvas />

          {/* Section 4: Curated Menu Teaser & Fly-to-Cart (#FAF7F2) */}
          <MenuTeaser />

          {/* Section 5: Modern Luxury Editorial Footer (#18181A) */}
          <Footer />

          {/* Modals & Overlays */}
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

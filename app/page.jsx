'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StoreProvider } from '../src/context/StoreContext';
import { CartProvider } from '../src/context/CartContext';
import { Header } from '../src/components/Header';
import { HeroScrub } from '../src/components/HeroScrub';
import { ScrollZoomStrip } from '../src/components/ScrollZoomStrip';
import { PinkSaltPromise } from '../src/components/PinkSaltPromise';
import { CommunityReviewsCanvas } from '../src/components/CommunityReviewsCanvas';
import { MenuSection } from '../src/components/MenuSection';
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
        {/* Main Single Page Web App - Immediate Zero-Lag First Paint */}
        <main className="min-h-screen bg-[#FAF7F2] text-[#18181A] relative font-sans">
          {/* Navigation Bar */}
          <Header />

          {/* Section 1: Hero Canvas Scrub Engine (rAF + 64 Frames) */}
          <HeroScrub />

          {/* Section 2: 3-Column Scroll-Driven Zoom Strip */}
          <ScrollZoomStrip />

          {/* Section 3: The Pink Salt Promise & Linocut Hearth Dual Split */}
          <PinkSaltPromise />

          {/* Section 4: Community Reviews Canvas (Shopify-Editions Style Scattered Floating Cards) */}
          <CommunityReviewsCanvas />

          {/* Section 5: Complete Interactive Menu & Repertoire */}
          <MenuSection />

          {/* Footer */}
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

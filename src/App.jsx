import React from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { HeroScrub } from './components/HeroScrub';
import { ArtisanalBento } from './components/ArtisanalBento';
import { CraftCategories } from './components/CraftCategories';
import { PinkSaltPromise } from './components/PinkSaltPromise';
import { MenuSection } from './components/MenuSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { ReviewModal } from './components/ReviewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingCartDock } from './components/FloatingCartDock';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#18181A] selection:bg-[#E8998D] selection:text-[#18181A] relative font-sans">
        {/* Navigation Bar */}
        <Header />

        {/* Section 1: Hero Canvas 300-Frame Scroll Scrub */}
        <HeroScrub />

        {/* Section 2: Artisanal Offerings (5-Card Bento Grid) */}
        <ArtisanalBento />

        {/* Section 3: Craft Categories (Interactive Switcher / Carousel) */}
        <CraftCategories />

        {/* Section 4: The Pink Salt Promise & Community (Dual Split) */}
        <PinkSaltPromise />

        {/* Section 5: Full Interactive Menu & Repertoire */}
        <MenuSection />

        {/* Footer */}
        <Footer />

        {/* Modals & Overlays */}
        <CartDrawer />
        <ReservationModal />
        <ReviewModal />
        <CheckoutModal />
        <FloatingCartDock />
      </div>
    </CartProvider>
  );
}

export default App;

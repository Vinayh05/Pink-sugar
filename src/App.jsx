import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { HeroScrub } from './components/HeroScrub';
import { EditorialMagneticSplit } from './components/EditorialMagneticSplit';
import { CommunityReviewsCanvas } from './components/CommunityReviewsCanvas';
import { MenuTeaser } from './components/MenuTeaser';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { ReviewModal } from './components/ReviewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingCartDock } from './components/FloatingCartDock';

function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#18181A] text-[#FAF7F2] relative font-sans">
          {/* Navigation Bar */}
          <Header />

          {/* Section 1: Hero Canvas Video Scrub */}
          <HeroScrub />

          {/* Section 2: Craft & Specialties (Editorial Magnetic Split - Single Instance) */}
          <EditorialMagneticSplit />

          {/* Section 3: Community Reviews Canvas */}
          <CommunityReviewsCanvas />

          {/* Section 4: Curated Menu Teaser */}
          <MenuTeaser />

          {/* Section 5: Modern Luxury Footer */}
          <Footer />

          {/* Modals & Overlays */}
          <CartDrawer />
          <ReservationModal />
          <ReviewModal />
          <CheckoutModal />
          <FloatingCartDock />
        </div>
      </CartProvider>
    </StoreProvider>
  );
}

export default App;

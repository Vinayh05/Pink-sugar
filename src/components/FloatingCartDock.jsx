'use client';

import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FloatingCartDock = () => {
  const { totalItems, subtotal, setIsCartOpen, toastMessage } = useCart();

  return (
    <>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 animate-bounce">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#18181A] text-[#FAF7F2] border border-[#3A3A40] shadow-xl text-xs font-mono">
            <span className="salt-pulse-dot" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Floating Bottom Cart Dock (Mobile & Quick Access) */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-40 md:hidden animate-fade-in">
          <button
            id="floating-cart-dock"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#B85B43] text-white shadow-2xl font-mono text-xs font-bold transition-transform active:scale-95 cursor-pointer border border-[#FAF7F2]/20"
            style={{
              boxShadow: '0 10px 25px rgba(184, 91, 67, 0.4), 0 0 20px rgba(232, 153, 141, 0.25)',
            }}
          >
            <div className="relative">
              <ShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#18181A] text-[#FAF7F2] text-[9px] flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span>View Tray (₹{subtotal})</span>
          </button>
        </div>
      )}
    </>
  );
};

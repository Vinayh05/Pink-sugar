'use client';

import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    gst,
    packaging,
    grandTotal,
    setIsCheckoutOpen,
  } = useCart();

  const [orderNote, setOrderNote] = useState('');

  if (!isCartOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsCartOpen(false)}>
      <div
        className="drawer-content fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF7F2] text-[#18181A] shadow-2xl flex flex-col justify-between z-50 overflow-hidden border-l border-[#E8DECE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E8DECE] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#18181A] text-[#FAF7F2] flex items-center justify-center">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold leading-none">
                Your Artisanal Order
              </h3>
              <span className="font-mono text-xs text-[#8F8C84]">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in bag
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-[#F3ECE2] text-[#575550] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Item List / Empty State */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#F3ECE2] text-[#B85B43] flex items-center justify-center mb-4">
                <Utensils size={28} />
              </div>
              <h4 className="font-display text-2xl font-semibold mb-2">
                Your tray is currently empty
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#8F8C84] max-w-xs mb-6">
                Explore our wood-fired pizzas, handcrafted pastas, and signature pink salt cold brews.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary text-xs"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {cart.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-[#E8DECE] flex gap-4 items-center shadow-xs"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#E8DECE]"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-display text-base font-semibold truncate text-[#18181A]">
                        {item.name}
                      </h5>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#8F8C84] hover:text-[#B85B43] transition-colors p-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <span className="font-mono text-xs text-[#B85B43] font-bold block mb-2">
                      ₹{item.price * quantity} <span className="text-[10px] text-[#8F8C84] font-normal">(₹{item.price} each)</span>
                    </span>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-[#E8DECE] rounded-full bg-[#FAF7F2] px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-[#575550] hover:text-[#18181A] p-1 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono text-xs font-semibold px-2">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-[#575550] hover:text-[#18181A] p-1 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-[10px] font-mono text-[#8F8C84] truncate">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Special Instructions Input */}
              <div className="pt-2">
                <label className="block font-mono text-xs text-[#575550] uppercase tracking-wider mb-1.5 font-semibold">
                  Artisanal Preparation Notes / Allergy
                </label>
                <textarea
                  rows={2}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="e.g., Extra parmesan, less ice on brew, oat milk preference..."
                  className="w-full p-3 rounded-xl bg-white border border-[#E8DECE] focus:border-[#B85B43] text-xs font-sans text-[#18181A] focus:outline-none resize-none"
                />
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E8DECE] bg-white space-y-3">
            <div className="space-y-1.5 font-mono text-xs text-[#575550]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#18181A]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Hearth Packaging & Eco Container</span>
                <span>₹{packaging}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="pt-2 border-t border-[#E8DECE] flex justify-between text-sm font-bold text-[#18181A]">
                <span className="font-display text-base">Grand Total</span>
                <span className="text-[#B85B43] text-base">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="btn-primary w-full justify-center py-3.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-xs font-mono text-[#8F8C84] hover:text-[#B85B43] transition-colors py-1 cursor-pointer"
            >
              Clear Order Tray
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

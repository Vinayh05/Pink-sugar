'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import gsap from 'gsap';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pinksalt_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('pinksalt_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3000);
  };

  const triggerFlyToCart = (startEl, imageUrl) => {
    const cartDock =
      document.getElementById('header-cart-btn') ||
      document.getElementById('floating-cart-dock') ||
      document.getElementById('cart-header-btn');
    if (!startEl || !cartDock) return;

    const startRect = startEl.getBoundingClientRect();
    const endRect = cartDock.getBoundingClientRect();

    const particle = document.createElement('div');
    particle.className = 'fly-particle';
    particle.style.width = '48px';
    particle.style.height = '48px';
    particle.style.left = `${startRect.left + startRect.width / 2 - 24}px`;
    particle.style.top = `${startRect.top + startRect.height / 2 - 24}px`;
    particle.style.backgroundImage = `url(${imageUrl || 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=200&q=80'})`;
    particle.style.backgroundSize = 'cover';
    particle.style.backgroundPosition = 'center';

    document.body.appendChild(particle);

    const targetX = endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2);
    const targetY = endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2);

    gsap.timeline({
      onComplete: () => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
        // Bump cart badge
        gsap.fromTo(
          cartDock,
          { scale: 1.25, rotate: -5 },
          { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(2.5)' }
        );
      },
    })
      .to(particle, {
        scale: 1.2,
        duration: 0.15,
        ease: 'power1.out',
      })
      .to(particle, {
        x: targetX,
        y: targetY,
        scale: 0.35,
        opacity: 0.7,
        rotation: 360,
        duration: 0.65,
        ease: 'power2.inOut',
      });
  };

  const addToCart = (item, event) => {
    if (event && event.currentTarget) {
      triggerFlyToCart(event.currentTarget, item.imageUrl);
    }

    setCart((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });

    showToast(`Added "${item.name}" to your order`);
  };

  const updateQuantity = (itemId, delta) => {
    setCart((prev) =>
      prev
        .map((entry) => {
          if (entry.item.id === itemId) {
            const newQty = entry.quantity + delta;
            return newQty > 0 ? { ...entry, quantity: newQty } : null;
          }
          return entry;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((entry) => entry.item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, entry) => acc + entry.quantity, 0);
  const subtotal = cart.reduce((acc, entry) => acc + entry.item.price * entry.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const packaging = subtotal > 0 ? 30 : 0;
  const grandTotal = subtotal + gst + packaging;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isReservationOpen,
        setIsReservationOpen,
        isReviewOpen,
        setIsReviewOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        totalItems,
        subtotal,
        gst,
        packaging,
        grandTotal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

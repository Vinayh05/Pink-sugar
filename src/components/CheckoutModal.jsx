'use client';

import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, ShoppingBag, Clock, MapPin, Sparkles, User, Phone, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, grandTotal, clearCart, showToast } = useCart();
  const { placeOrder } = useStore();

  const [orderType, setOrderType] = useState('dine-in');
  const [tableNo, setTableNo] = useState('Table 04 (Stone Hearth Front)');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderToken, setOrderToken] = useState('');

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const token = 'PS-' + Math.floor(1000 + Math.random() * 9000);
    setOrderToken(token);

    const orderPayload = {
      id: token,
      customerName: customerName.trim() || 'Guest Diner',
      customerPhone: phone.trim() || '+91 98450 12345',
      customerEmail: email.trim() || 'patron@pinksaltcafe.com',
      tableOrTakeaway: orderType === 'dine-in' ? tableNo : 'Takeaway Pickup',
      items: cart.map(({ item, quantity }) => ({
        name: item.name,
        qty: quantity,
        price: item.price,
      })),
      notes: specialNotes.trim(),
      total: grandTotal,
      status: 'received',
    };

    // Dispatch directly to unified global store (propagates instantly to /admin and localStorage)
    placeOrder(orderPayload);

    setOrderPlaced(true);

    if (typeof window !== 'undefined') {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E8998D', '#B85B43', '#18181A'],
      });
    }

    showToast(`Order #${token} confirmed! Sent directly to stone hearth kitchen.`);
  };

  const handleClose = () => {
    if (orderPlaced) {
      clearCart();
    }
    setIsCheckoutOpen(false);
    setOrderPlaced(false);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="bg-[#FAF7F2] text-[#18181A] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#EFECE6] relative overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EFECE6] text-[#6E6B68] transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {!orderPlaced ? (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="badge-mono badge-rose">
                  <QrCode size={11} /> Contactless Table Ordering
                </span>
              </div>
              <h3 className="font-canela text-3xl font-normal text-[#18181A]">
                Complete Your Order
              </h3>
              <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] mt-1 font-light leading-relaxed">
                Orders are dispatched directly to our stone hearth kitchen display terminal.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              {/* Order Mode Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-white rounded-2xl border border-[#EFECE6]">
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    orderType === 'dine-in'
                      ? 'bg-[#18181A] text-[#FAF7F2] shadow-sm'
                      : 'text-[#6E6B68] hover:bg-[#EFECE6]'
                  }`}
                >
                  Dine-In Table
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    orderType === 'takeaway'
                      ? 'bg-[#18181A] text-[#FAF7F2] shadow-sm'
                      : 'text-[#6E6B68] hover:bg-[#EFECE6]'
                  }`}
                >
                  Takeaway Pickup
                </button>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#6E6B68] mb-1 font-medium">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Aditi Deshmukh"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EFECE6] focus:border-[#B85B43] text-xs font-sans text-[#18181A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#6E6B68] mb-1 font-medium">
                      WhatsApp Phone (10 digits) *
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98450 12345"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EFECE6] focus:border-[#B85B43] text-xs font-mono text-[#18181A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#6E6B68] mb-1 font-medium">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aditi@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EFECE6] focus:border-[#B85B43] text-xs font-sans text-[#18181A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Selection or Pickup Info */}
              {orderType === 'dine-in' ? (
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#6E6B68] mb-1 font-medium">
                    Select Table / QR Station
                  </label>
                  <select
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-[#EFECE6] focus:border-[#B85B43] text-xs font-mono text-[#18181A] focus:outline-none"
                  >
                    <option>Table 01 (Stone Hearth Front)</option>
                    <option>Table 02 (Courtyard Booth)</option>
                    <option>Table 04 (Bar Counter)</option>
                    <option>Table 06 (Private Vault)</option>
                    <option>Table 07 (Garden Pergola)</option>
                  </select>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-white border border-[#EFECE6] flex items-center gap-3">
                  <Clock size={16} className="text-[#B85B43]" />
                  <span className="font-mono text-xs text-[#6E6B68]">
                    Ready for pickup in ~15 mins at Kusugal Rd artisanal counter
                  </span>
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#6E6B68] mb-1 font-medium">
                  Chef Instructions & Dietary Notes
                </label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Extra salt foam, less ice, warm croissant..."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#EFECE6] focus:border-[#B85B43] text-xs font-sans text-[#18181A] focus:outline-none"
                />
              </div>

              {/* Order Mini Summary */}
              <div className="p-4 rounded-2xl bg-white border border-[#EFECE6] text-xs font-mono space-y-1.5">
                <span className="text-[#6E6B68] uppercase tracking-wider block mb-1 font-bold">
                  Order Summary ({cart.length} items)
                </span>
                {cart.slice(0, 3).map(({ item, quantity }) => (
                  <div key={item.id} className="flex justify-between text-[#18181A]">
                    <span>{quantity}x {item.name}</span>
                    <span>₹{item.price * quantity}</span>
                  </div>
                ))}
                {cart.length > 3 && (
                  <span className="text-[10px] text-[#6E6B68] italic">
                    + {cart.length - 3} more items
                  </span>
                )}
                <div className="pt-2 border-t border-[#EFECE6] flex justify-between font-bold text-sm text-[#18181A]">
                  <span>Total Amount</span>
                  <span className="text-[#B85B43]">₹{grandTotal}</span>
                </div>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#6E6B68] mb-1.5 font-medium">
                  Payment Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / QR' },
                    { id: 'card', label: 'Card at Table' },
                    { id: 'cash', label: 'Counter Cash' },
                  ].map((pm) => (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-2.5 rounded-xl text-xs font-mono cursor-pointer transition-all ${
                        paymentMethod === pm.id
                          ? 'bg-[#18181A] text-[#FAF7F2] font-bold shadow-sm'
                          : 'bg-white text-[#6E6B68] border border-[#EFECE6]'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full justify-center py-3.5 mt-2 shadow-lg">
                <span>Place Order • ₹{grandTotal}</span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-[#18181A] text-[#E8998D] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={32} />
            </div>

            <span className="badge-mono badge-rose mb-2">Order Confirmed</span>

            <h3 className="font-canela text-3xl text-[#18181A] font-normal mb-1">
              Order Token: #{orderToken}
            </h3>

            <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] max-w-xs mx-auto mb-5 font-light leading-relaxed">
              Thank you, {customerName}! Our stone-hearth kitchen has received your ticket and is preparing your dishes.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-[#EFECE6] text-left text-xs font-mono space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-[#6E6B68]">Service:</span>
                <span className="font-semibold text-[#18181A]">{orderType === 'dine-in' ? tableNo : 'Takeaway Pickup'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6B68]">Status:</span>
                <span className="font-semibold text-[#B85B43]">Received & In Kitchen</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6B68]">Total Paid:</span>
                <span className="font-semibold text-[#18181A]">₹{grandTotal} ({paymentMethod.toUpperCase()})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6B68]">Estimated Time:</span>
                <span className="font-semibold text-[#18181A]">~12-15 Mins</span>
              </div>
            </div>

            <button onClick={handleClose} className="btn-primary text-xs w-full justify-center">
              Done & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

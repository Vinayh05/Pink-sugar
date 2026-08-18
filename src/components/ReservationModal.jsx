'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

export const ReservationModal = () => {
  const { isReservationOpen, setIsReservationOpen, showToast } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2 Guests');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('7:30 PM');
  const [zone, setZone] = useState('Stone Hearth Interior');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isReservationOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmed(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#E8998D', '#B85B43', '#18181A'],
    });
    showToast(`Table reserved for ${name} at Pink Sugar Cafe!`);
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setConfirmed(false);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="bg-[#FAF7F2] text-[#18181A] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E8DECE] relative overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F3ECE2] text-[#575550] transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {!confirmed ? (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="badge-mono badge-rose">
                  <Sparkles size={11} /> Table Reservation
                </span>
                <span className="font-mono text-xs text-[#8F8C84]">Kusugal Road, Hubballi</span>
              </div>
              <h3 className="font-display text-3xl font-bold text-[#18181A]">
                Reserve Your Hearth Table
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#575550] mt-1">
                Experience artisanal roasts and wood-fired gastronomy in our warm alabaster and charcoal ambiance.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575550] mb-1 font-semibold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aditi Rao"
                    className="w-full p-3 rounded-xl bg-white border border-[#E8DECE] focus:border-[#B85B43] text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575550] mb-1 font-semibold">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 rounded-xl bg-white border border-[#E8DECE] focus:border-[#B85B43] text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575550] mb-1 font-semibold">
                    Party Size
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-[#E8DECE] focus:border-[#B85B43] text-xs font-mono focus:outline-none"
                  >
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>4 Guests</option>
                    <option>6 Guests</option>
                    <option>8+ Private Table</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575550] mb-1 font-semibold">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-[#E8DECE] focus:border-[#B85B43] text-xs font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575550] mb-1 font-semibold">
                    Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-[#E8DECE] focus:border-[#B85B43] text-xs font-mono focus:outline-none"
                  >
                    <option>8:30 AM (Morning Roast)</option>
                    <option>11:00 AM (Brunch)</option>
                    <option>1:30 PM (Lunch)</option>
                    <option>5:00 PM (Afternoon Bakes)</option>
                    <option>7:30 PM (Hearth Dinner)</option>
                    <option>9:00 PM (Late Tasting)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#575550] mb-1 font-semibold">
                  Preferred Seating Zone
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Stone Hearth Interior', 'Garden Patio', 'Barista Counter'].map((z) => (
                    <button
                      type="button"
                      key={z}
                      onClick={() => setZone(z)}
                      className={`p-2.5 rounded-xl text-[11px] font-mono transition-all cursor-pointer text-center ${
                        zone === z
                          ? 'bg-[#18181A] text-[#FAF7F2] border-transparent font-bold'
                          : 'bg-white text-[#575550] border border-[#E8DECE] hover:bg-[#F3ECE2]'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#575550] mb-1 font-semibold">
                  Special Requests / Dietary Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anniversary celebration, vegan requirements, high chair needed..."
                  className="w-full p-3 rounded-xl bg-white border border-[#E8DECE] focus:border-[#B85B43] text-xs font-sans focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3">
                <button type="submit" className="btn-primary w-full justify-center py-3.5">
                  Confirm Table Reservation
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#18181A] text-[#E8998D] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <span className="badge-mono badge-terracotta mb-2">Reservation Confirmed</span>
            <h3 className="font-display text-3xl font-bold mb-2">
              We look forward to hosting you, {name}!
            </h3>
            <p className="font-sans text-sm text-[#575550] max-w-sm mx-auto mb-6">
              A confirmation SMS with your priority table access pin has been dispatched to <strong>{phone}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-[#E8DECE] text-left text-xs font-mono space-y-2 mb-6 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-[#8F8C84]">Guests:</span>
                <span className="font-semibold">{guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F8C84]">Date & Time:</span>
                <span className="font-semibold">{date} at {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F8C84]">Zone:</span>
                <span className="font-semibold">{zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F8C84]">Location:</span>
                <span className="font-semibold">Kusugal Rd, Hubballi</span>
              </div>
            </div>

            <button onClick={handleClose} className="btn-primary text-xs">
              Return to Cafe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft, 
  Flame, 
  ShieldCheck, 
  Utensils, 
  Phone, 
  Mail, 
  User, 
  HeartHandshake 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import { StoreProvider } from '../../src/context/StoreContext';
import { CartProvider } from '../../src/context/CartContext';

const SEATING_ZONES = [
  {
    id: 'hearth-counter',
    title: 'Stone Hearth Chef Counter',
    desc: 'Direct view of the 450°C wood-fired oven and live dough stretch & plating.',
    badge: 'Popular',
    icon: Flame,
    minParty: 1,
    maxParty: 4,
  },
  {
    id: 'courtyard-booth',
    title: 'Intimate Amber Booth',
    desc: 'Soft linen acoustics, warm brass glow, perfect for dates and quiet conversations.',
    badge: 'Intimate',
    icon: Sparkles,
    minParty: 2,
    maxParty: 6,
  },
  {
    id: 'tasting-vault',
    title: 'Private Tasting Vault',
    desc: 'Exclusive stone-walled chamber with custom 5-course chef cupping & pairings.',
    badge: 'Exclusive',
    icon: ShieldCheck,
    minParty: 4,
    maxParty: 12,
  },
];

const TIME_SLOTS = [
  { time: '08:30 AM', chapter: 'Morning Roast' },
  { time: '10:00 AM', chapter: 'Morning Roast' },
  { time: '12:30 PM', chapter: 'Hearth & Savory' },
  { time: '01:30 PM', chapter: 'Hearth & Savory' },
  { time: '02:30 PM', chapter: 'Hearth & Savory' },
  { time: '04:30 PM', chapter: 'Afternoon Bakes' },
  { time: '06:00 PM', chapter: 'Afternoon Bakes' },
  { time: '07:30 PM', chapter: 'Evening Hearth' },
  { time: '08:30 PM', chapter: 'Evening Hearth' },
  { time: '09:30 PM', chapter: 'Evening Hearth' },
];

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [selectedZone, setSelectedZone] = useState('hearth-counter');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('07:30 PM');
  const [partySize, setPartySize] = useState(2);
  const [dietary, setDietary] = useState([]);
  const [notes, setNotes] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [bookingId, setBookingId] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const toggleDietary = (item) => {
    setDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const id = `PS-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingId(id);
    setConfirmed(true);

    if (typeof window !== 'undefined') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E8998D', '#B85B43', '#FAF7F2', '#18181A'],
      });
    }
  };

  const chosenZone = SEATING_ZONES.find((z) => z.id === selectedZone);

  return (
    <StoreProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#FAF7F2] text-[#18181A] flex flex-col font-sans">
        {/* Navigation Bar */}
        <Header />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          {/* Back to Home Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#6E6B68] hover:text-[#18181A] transition-colors py-1 px-3 rounded-full bg-white border border-[#EFECE6] shadow-xs"
            >
              <ArrowLeft size={14} />
              <span>Back to Home Experience</span>
            </Link>
          </div>

          {confirmed ? (
            /* Booking Confirmation View */
            <div className="bg-white rounded-3xl border border-[#EFECE6] p-8 sm:p-12 shadow-xl text-center max-w-2xl mx-auto animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E8998D]/20 text-[#B85B43] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={36} />
              </div>

              <span className="badge-mono badge-rose mb-3">
                <Sparkles size={12} /> Table Reserved
              </span>

              <h1 className="font-canela text-3xl sm:text-4xl text-[#18181A] mb-3">
                We're Preparing Your Hearth Table
              </h1>

              <p className="font-subheading text-sm text-[#6E6B68] max-w-md mx-auto mb-8 font-light leading-relaxed">
                Your reservation at Pink Sugar Cafe is officially confirmed. A confirmation SMS & email have been dispatched.
              </p>

              {/* Confirmation Slip */}
              <div className="bg-[#FAF7F2] rounded-2xl border border-[#EFECE6] p-6 text-left mb-8 space-y-4 font-mono text-xs">
                <div className="flex justify-between border-b border-[#EFECE6] pb-3">
                  <span className="text-[#6E6B68]">Reservation ID</span>
                  <span className="font-bold text-[#B85B43]">{bookingId}</span>
                </div>
                <div className="flex justify-between border-b border-[#EFECE6] pb-3">
                  <span className="text-[#6E6B68]">Guest Name</span>
                  <span className="font-semibold text-[#18181A]">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#EFECE6] pb-3">
                  <span className="text-[#6E6B68]">Experience Zone</span>
                  <span className="font-semibold text-[#18181A]">{chosenZone?.title}</span>
                </div>
                <div className="flex justify-between border-b border-[#EFECE6] pb-3">
                  <span className="text-[#6E6B68]">Date & Time</span>
                  <span className="font-semibold text-[#18181A]">{selectedDate} • {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6B68]">Party Size</span>
                  <span className="font-semibold text-[#18181A]">{partySize} Patrons</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/menu"
                  className="btn-primary w-full sm:w-auto"
                >
                  <Utensils size={15} />
                  <span>Pre-select Dishes</span>
                </Link>
                <Link
                  href="/"
                  className="btn-secondary w-full sm:w-auto"
                >
                  <span>Return to Main Page</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Multi-step Reservation Wizard */
            <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-xl overflow-hidden">
              {/* Top Banner */}
              <div className="bg-[#18181A] text-[#FAF7F2] p-8 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#B85B43]/20 blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs tracking-widest text-[#E8998D] uppercase font-bold">
                      /TABLE RESERVATION
                    </span>
                    <span className="h-px w-8 bg-[#E8998D]/40" />
                  </div>
                  <h1 className="font-canela text-3xl sm:text-5xl font-normal tracking-tight mb-2">
                    Reserve Your Pink Sugar Experience
                  </h1>
                  <p className="font-subheading text-xs sm:text-sm text-[#FAF7F2]/75 max-w-xl font-light leading-relaxed">
                    Kusugal Road, Hubballi • Select your preferred dining zone, date, and bespoke artisanal requirements.
                  </p>
                </div>
              </div>

              {/* Stepper Progress Bar */}
              <div className="grid grid-cols-3 border-b border-[#EFECE6] bg-[#FAF7F2] text-xs font-mono">
                <button
                  onClick={() => setStep(1)}
                  className={`py-3.5 px-4 text-center font-semibold border-r border-[#EFECE6] transition-colors ${
                    step === 1 ? 'bg-white text-[#B85B43] border-b-2 border-b-[#B85B43]' : 'text-[#6E6B68]'
                  }`}
                >
                  1. Seating Zone
                </button>
                <button
                  onClick={() => setStep(2)}
                  className={`py-3.5 px-4 text-center font-semibold border-r border-[#EFECE6] transition-colors ${
                    step === 2 ? 'bg-white text-[#B85B43] border-b-2 border-b-[#B85B43]' : 'text-[#6E6B68]'
                  }`}
                >
                  2. Date & Time
                </button>
                <button
                  onClick={() => setStep(3)}
                  className={`py-3.5 px-4 text-center font-semibold transition-colors ${
                    step === 3 ? 'bg-white text-[#B85B43] border-b-2 border-b-[#B85B43]' : 'text-[#6E6B68]'
                  }`}
                >
                  3. Guest Details
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleBookingSubmit} className="p-6 sm:p-10">
                {/* STEP 1: Seating Zone */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div>
                      <h2 className="font-canela text-2xl text-[#18181A] mb-1">
                        Choose Your Dining Zone
                      </h2>
                      <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] font-light">
                        Every section is curated for distinctive sensory acoustics and culinary immersion.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {SEATING_ZONES.map((zone) => {
                        const Icon = zone.icon;
                        const isSelected = selectedZone === zone.id;
                        return (
                          <div
                            key={zone.id}
                            onClick={() => setSelectedZone(zone.id)}
                            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#B85B43] bg-[#FAF7F2] shadow-md'
                                : 'border-[#EFECE6] bg-white hover:border-[#E8998D]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  isSelected ? 'bg-[#B85B43] text-white' : 'bg-[#EFECE6] text-[#6E6B68]'
                                }`}>
                                  <Icon size={20} />
                                </div>
                                <span className="badge-mono badge-rose">
                                  {zone.badge}
                                </span>
                              </div>

                              <h3 className="font-canela text-xl text-[#18181A] mb-2 font-normal">
                                {zone.title}
                              </h3>

                              <p className="font-subheading text-xs text-[#6E6B68] leading-relaxed mb-4 font-light">
                                {zone.desc}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-[#EFECE6] text-[11px] font-mono text-[#6E6B68]">
                              Capacity: {zone.minParty}–{zone.maxParty} Patrons
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="btn-primary"
                      >
                        <span>Continue to Date & Time</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Date & Time & Party Size */}
                {step === 2 && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    {/* Party Size */}
                    <div>
                      <h2 className="font-canela text-2xl text-[#18181A] mb-1">
                        Select Party Size
                      </h2>
                      <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] mb-4 font-light">
                        How many guests will be joining the table?
                      </p>

                      <div className="flex items-center gap-3">
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => setPartySize(num)}
                            className={`w-11 h-11 rounded-full font-mono text-sm font-semibold transition-all cursor-pointer ${
                              partySize === num
                                ? 'bg-[#18181A] text-[#FAF7F2] shadow-md scale-105'
                                : 'bg-[#EFECE6] text-[#18181A] hover:bg-[#E2DDD5]'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div>
                      <h3 className="font-canela text-xl text-[#18181A] mb-2 font-normal">
                        Reservation Date
                      </h3>
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EFECE6] font-mono text-xs text-[#18181A] focus:outline-none focus:border-[#B85B43] shadow-xs"
                      />
                    </div>

                    {/* Time Slots */}
                    <div>
                      <h3 className="font-canela text-xl text-[#18181A] mb-2 font-normal">
                        Seating Time Slot
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = selectedTime === slot.time;
                          return (
                            <button
                              type="button"
                              key={slot.time}
                              onClick={() => setSelectedTime(slot.time)}
                              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#B85B43] bg-[#B85B43] text-white shadow-sm'
                                  : 'border-[#EFECE6] bg-[#FAF7F2] text-[#18181A] hover:bg-[#EFECE6]'
                              }`}
                            >
                              <div className="font-mono text-xs font-bold">{slot.time}</div>
                              <div className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#6E6B68]'}`}>
                                {slot.chapter}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-6 flex items-center justify-between border-t border-[#EFECE6]">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="btn-secondary text-xs"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="btn-primary"
                      >
                        <span>Continue to Guest Details</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Guest Details & Confirmation */}
                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div>
                      <h2 className="font-canela text-2xl text-[#18181A] mb-1">
                        Guest Information & Preferences
                      </h2>
                      <p className="font-subheading text-xs sm:text-sm text-[#6E6B68] font-light">
                        Please provide contact information so our concierge can coordinate your arrival.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-[#6E6B68] mb-1.5 uppercase font-medium">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
                          <input
                            type="text"
                            required
                            placeholder="Aditi Deshmukh"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFECE6] focus:border-[#B85B43] focus:outline-none font-sans text-xs text-[#18181A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#6E6B68] mb-1.5 uppercase font-medium">
                          Mobile Number *
                        </label>
                        <div className="relative">
                          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 98450 12345"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFECE6] focus:border-[#B85B43] focus:outline-none font-sans text-xs text-[#18181A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#6E6B68] mb-1.5 uppercase font-medium">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
                          <input
                            type="email"
                            required
                            placeholder="aditi@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFECE6] focus:border-[#B85B43] focus:outline-none font-sans text-xs text-[#18181A]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dietary / Special Requests */}
                    <div>
                      <label className="block text-xs font-mono text-[#6E6B68] mb-2 uppercase font-medium">
                        Dietary Focus & Occasion
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['100% Vegetarian', 'Vegan Prep', 'Anniversary / Birthday', 'Chef Sourdough Tasting', 'Decaf Cold Extraction'].map((tag) => (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => toggleDietary(tag)}
                            className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-colors cursor-pointer ${
                              dietary.includes(tag)
                                ? 'bg-[#B85B43] text-white'
                                : 'bg-[#EFECE6] text-[#6E6B68] hover:bg-[#E2DDD5]'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#6E6B68] mb-1.5 uppercase font-medium">
                        Special Notes for Chef
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Any seating preferences or custom requirements..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EFECE6] focus:border-[#B85B43] focus:outline-none font-sans text-xs text-[#18181A] placeholder-[#6E6B68]/60"
                      />
                    </div>

                    {/* Summary Strip */}
                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EFECE6] flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-[#6E6B68]">Booking Summary: </span>
                        <span className="font-bold text-[#18181A]">{chosenZone?.title} • {partySize} Patrons • {selectedTime} ({selectedDate})</span>
                      </div>
                    </div>

                    <div className="pt-6 flex items-center justify-between border-t border-[#EFECE6]">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="btn-secondary text-xs"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        style={{ padding: '12px 32px' }}
                      >
                        <CheckCircle2 size={16} />
                        <span>Confirm Reservation</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
      </CartProvider>
    </StoreProvider>
  );
}

'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, Sparkles, MessageSquarePlus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getReviews, subscribeToReviews } from '../services/dataService';

gsap.registerPlugin(ScrollTrigger);

export const CommunityReviewsCanvas = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [reviews, setReviews] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const { setIsReviewOpen } = useCart();

  // Load reviews on mount and subscribe to Realtime WebSocket updates
  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      const res = await getReviews();
      if (isMounted && res.data) {
        setReviews(res.data);
      }
    };
    fetchReviews();

    // Live Realtime WebSocket subscription
    const unsubscribe = subscribeToReviews((newReview) => {
      if (isMounted && newReview) {
        setReviews((prev) => [newReview, ...prev.filter((r) => r.id !== newReview.id)]);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // GSAP Floating Physics Animation for Desktop
  useGSAP(
    () => {
      if (reviews.length === 0) return;

      const mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP FLOATING CANVAS (min-width: 1024px)
      // ==========================================
      mm.add('(min-width: 1024px)', () => {
        const cards = cardsRef.current.filter(Boolean);

        // Entrance animation
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.88, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Floating ambient drift
        cards.forEach((card, index) => {
          if (!card) return;
          const yOffset = (index % 2 === 0 ? 1 : -1) * (10 + (index % 3) * 4);
          const duration = 3.5 + (index % 3) * 0.8;

          gsap.to(card, {
            y: `+=${yOffset}`,
            rotation: `+=${(index % 2 === 0 ? 1 : -1) * 1.5}`,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2,
          });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [reviews] }
  );

  // Duplicated reviews array for the infinite seamless marquee loop
  const displayReviews = reviews.length > 0 ? reviews : [];
  const marqueeReviews = [...displayReviews, ...displayReviews];

  return (
    <section
      id="community"
      ref={containerRef}
      className="relative w-full min-h-[680px] lg:h-[820px] bg-[#FAF7F2] text-[#18181A] overflow-hidden flex flex-col justify-between py-16 sm:py-20"
    >
      {/* Background Editorial Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-5">
        <span className="font-canela text-[22vw] font-bold text-[#18181A] whitespace-nowrap leading-none tracking-tight">
          PINK SUGAR
        </span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between h-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
              /COMMUNITY VOICE
            </span>
            <span className="h-px w-8 bg-[#B85B43]/40" />
          </div>

          <h2 className="font-canela text-3xl sm:text-4xl md:text-5xl font-normal text-[#18181A] tracking-tight mb-4">
            Loved by Hubballi, Crafted with Passion
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EFECE6] shadow-sm text-xs font-mono text-[#18181A]">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="#F59E0B" />
                ))}
              </div>
              <span className="font-bold">4.9 on Google Maps</span>
              <span className="text-[#6E6B68] text-[11px]">(500+ Reviews)</span>
            </div>

            <button
              onClick={() => setIsReviewOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B85B43]/10 hover:bg-[#B85B43]/20 border border-[#B85B43]/30 text-[#B85B43] text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              <MessageSquarePlus size={13} />
              <span>+ Share Your Experience</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP PIPELINE: Interactive Floating Gravity Canvas     */}
        {/* ========================================================= */}
        <div className="hidden lg:block relative w-full h-[520px]">
          {displayReviews.slice(0, 6).map((review, index) => {
            const isHovered = hoveredId === review.id;
            const defaultCoords = [
              { top: '12%', left: '8%', rotate: '-2deg' },
              { top: '18%', right: '10%', rotate: '2.5deg' },
              { top: '45%', left: '18%', rotate: '1deg' },
              { top: '42%', right: '16%', rotate: '-3deg' },
              { bottom: '14%', left: '12%', rotate: '2deg' },
              { bottom: '10%', right: '12%', rotate: '-1.5deg' },
            ][index] || { top: `${20 + index * 10}%`, left: `${10 + index * 12}%`, rotate: '0deg' };

            const coords = review.coords || defaultCoords;

            return (
              <div
                key={review.id}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseEnter={() => setHoveredId(review.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  ...coords,
                  position: 'absolute',
                  transform: `rotate(${coords.rotate || '0deg'})`,
                  zIndex: isHovered ? 40 : 10 + index,
                }}
                className={`w-[320px] p-5 rounded-2xl bg-white/95 backdrop-blur-md border transition-all duration-300 shadow-md flex flex-col justify-between cursor-pointer ${
                  isHovered
                    ? 'scale-105 shadow-2xl border-[#E8998D] ring-2 ring-[#E8998D]/30'
                    : 'border-[#18181A]/10 hover:border-[#18181A]/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-canela text-base text-[#18181A] font-normal">
                      {review.author}
                    </h3>
                    <div className="flex items-center gap-0.5 text-[#E8998D]">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} size={11} fill="#E8998D" />
                      ))}
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-[#6E6B68] block mb-2">
                    {review.tag || 'Verified Diner'}
                  </span>

                  <p className="font-subheading text-xs text-[#18181A]/85 italic leading-relaxed mb-3 font-light">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#EFECE6] flex items-center justify-between text-[10px] font-mono">
                  <span className="badge-mono badge-rose text-[9px] px-2 py-0.5">
                    <Sparkles size={9} /> {review.dish}
                  </span>
                  <span className="text-[#6E6B68] text-[10px]">{review.date || 'Recent'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* MOBILE & TABLET PIPELINE: Seamless Infinite Marquee Loop  */}
        {/* ========================================================= */}
        <div className="block lg:hidden relative w-full overflow-hidden py-4">
          {/* Left and Right Edge Atmospheric Vignette Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10" />

          {/* Continuous Infinite Scrolling Track */}
          <div className="review-marquee-track py-2">
            {marqueeReviews.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="w-[290px] sm:w-[340px] shrink-0 mr-4 sm:mr-5 p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-[#18181A]/10 hover:border-[#E8998D] transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-canela text-base sm:text-lg text-[#18181A] font-normal leading-snug">
                      {review.author}
                    </h3>
                    <div className="flex items-center gap-0.5 text-[#E8998D]">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} size={12} fill="#E8998D" />
                      ))}
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-[#6E6B68] block mb-2.5">
                    {review.tag || 'Verified Diner'}
                  </span>

                  <p className="font-subheading text-xs sm:text-sm text-[#18181A]/90 italic leading-relaxed mb-4 font-light">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between text-[10px] font-mono">
                  <span className="badge-mono badge-rose text-[9px] px-2.5 py-1">
                    <Sparkles size={10} /> {review.dish}
                  </span>
                  <span className="text-[#6E6B68]">{review.date || 'Recent'}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <span className="font-mono text-[10px] text-[#6E6B68] tracking-widest uppercase">
              • Touch to Pause & Read •
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

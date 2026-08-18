'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, MapPin, Sparkles, MessageSquarePlus, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

export const REVIEWS_DATA = [
  {
    id: 1,
    author: 'Ananya Deshmukh',
    tag: 'Local Guide • 42 reviews',
    rating: 5,
    date: '2 weeks ago',
    dish: 'Signature Pink Sauce Penne',
    text: 'The best pink sauce pasta in Hubballi! The ambience feels like a boutique European cafe. The pink salt cold brew is a must-try.',
    coords: { top: '12%', left: '8%', rotate: '-2deg' },
  },
  {
    id: 2,
    author: 'Rohit Kulkarni',
    tag: 'Verified Diner',
    rating: 5,
    date: 'a month ago',
    dish: 'Blistered Margherita Pizza',
    text: 'Authentic 36-hour fermented sourdough crust. Blistered to perfection with fresh mozzarella. Truly artisanal!',
    coords: { top: '18%', right: '10%', rotate: '2.5deg' },
  },
  {
    id: 3,
    author: 'Priya Patil',
    tag: 'Local Guide • 18 reviews',
    rating: 5,
    date: '3 weeks ago',
    dish: 'Pink Salt Velvet Cold Brew',
    text: 'That mineral pink salt sweet cream over cold brew is revolutionary. Smooth, rich, and never bitter.',
    coords: { top: '45%', left: '18%', rotate: '1deg' },
  },
  {
    id: 4,
    author: 'Siddharth Hegde',
    tag: 'Verified Diner',
    rating: 5,
    date: '2 months ago',
    dish: 'Golden Butter Croissant',
    text: 'Flaky, buttery layers that shatter with every bite. Pairing it with the flat white is my weekly ritual.',
    coords: { top: '42%', right: '16%', rotate: '-3deg' },
  },
  {
    id: 5,
    author: 'Kavya Joshi',
    tag: 'Food Enthusiast',
    rating: 5,
    date: '5 days ago',
    dish: 'Baked Blueberry Cheesecake',
    text: 'Not overly sweet, dense baked custard with real whole blueberries. Hands down the finest dessert spot in town.',
    coords: { bottom: '14%', left: '12%', rotate: '2deg' },
  },
  {
    id: 6,
    author: 'Vikram Shenoy',
    tag: 'Verified Diner',
    rating: 5,
    date: 'Just yesterday',
    dish: 'Charred Truffle Mushroom',
    text: 'The stone hearth flavor is unmatched. Great music, warm staff, and world-class craft coffee.',
    coords: { bottom: '10%', right: '12%', rotate: '-1.5deg' },
  },
];

export const CommunityReviewsCanvas = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const carouselRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [tappedId, setTappedId] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const { setIsReviewOpen } = useCart();

  // Handle carousel scroll listener for mobile pagination dots
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const cardWidth = clientWidth * 0.82;
    const index = Math.round(scrollLeft / (cardWidth + 16));
    setActiveSlide(Math.min(REVIEWS_DATA.length - 1, Math.max(0, index)));
  };

  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    const cardElements = carouselRef.current.children;
    if (cardElements[index]) {
      cardElements[index].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
      setActiveSlide(index);
    }
  };

  // Orientation & resize listener
  useEffect(() => {
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleRefresh, { passive: true });
    window.addEventListener('orientationchange', handleRefresh, { passive: true });
    return () => {
      window.removeEventListener('resize', handleRefresh);
      window.removeEventListener('orientationchange', handleRefresh);
    };
  }, []);

  // GSAP matchMedia Floating Physics Animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ==========================================
      // 1. DESKTOP FLOATING CANVAS (min-width: 1024px)
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
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Ambient Floating Sine Wave Physics
        cards.forEach((card, index) => {
          const floatDuration = 3.5 + (index % 3) * 0.7;
          const floatDelay = index * 0.35;

          gsap.to(card, {
            y: '+=8px',
            duration: floatDuration,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: floatDelay,
          });
        });
      });

      // ==========================================
      // 2. MOBILE & TABLET STAGGER (max-width: 1023px)
      // ==========================================
      mm.add('(max-width: 1023px)', () => {
        if (carouselRef.current) {
          gsap.fromTo(
            carouselRef.current,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="community"
      ref={containerRef}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] relative overflow-x-hidden border-t border-[#EFECE6]"
    >
      {/* Background Decorative Ambient Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#18181A]/[0.025] font-canela text-[20vw] font-bold select-none pointer-events-none whitespace-nowrap">
        PINK SUGAR
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="font-mono text-xs tracking-widest text-[#B85B43] uppercase font-bold">
              /COMMUNITY VOICE
            </span>
            <span className="h-px w-8 bg-[#B85B43]/40" />
          </div>

          <h2 className="font-canela text-3xl sm:text-4xl lg:text-5xl font-normal text-[#18181A] tracking-tight">
            Loved by Hubballi, Crafted with Passion
          </h2>

          {/* Trust Pill & Leave Review Button */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EFECE6] shadow-xs font-mono text-xs text-[#18181A]">
              <div className="flex items-center text-[#E8998D]">
                <Star size={13} fill="#E8998D" />
                <Star size={13} fill="#E8998D" />
                <Star size={13} fill="#E8998D" />
                <Star size={13} fill="#E8998D" />
                <Star size={13} fill="#E8998D" />
              </div>
              <span className="font-bold">4.9 on Google Maps</span>
              <span className="text-[#6E6B68]">(500+ Reviews)</span>
            </div>

            <button
              onClick={() => setIsReviewOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B85B43] hover:text-[#C66B53] font-semibold py-2 px-4 rounded-full bg-[#E8998D]/15 border border-[#E8998D]/30 transition-all cursor-pointer hover:scale-105 min-h-[44px]"
            >
              <MessageSquarePlus size={14} />
              <span>+ Share Your Experience</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP PIPELINE: Scattered Floating-Card Canvas */}
        {/* ========================================================= */}
        <div className="hidden lg:block relative w-full h-[680px] lg:h-[750px] rounded-3xl bg-transparent">
          {REVIEWS_DATA.map((review, idx) => {
            const isHovered = hoveredId === review.id;
            const hasHoveredOther = hoveredId !== null && !isHovered;

            const positionStyles = {
              top: review.coords.top || 'auto',
              bottom: review.coords.bottom || 'auto',
              left: review.coords.left || 'auto',
              right: review.coords.right || 'auto',
              transform: `rotate(${review.coords.rotate})`,
            };

            return (
              <div
                key={review.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                onMouseEnter={() => setHoveredId(review.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={positionStyles}
                className={`absolute max-w-[340px] lg:max-w-[370px] w-full p-5 lg:p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? 'bg-white shadow-2xl scale-105 z-50 border-2 border-[#18181A]/40 opacity-100'
                    : hasHoveredOther
                    ? 'bg-white/70 backdrop-blur-md border border-[#18181A]/10 opacity-20 shadow-xs z-10'
                    : 'bg-white/85 backdrop-blur-md border border-[#18181A]/10 shadow-sm opacity-95 hover:opacity-100 z-20'
                }`}
              >
                {/* Review Card Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-canela text-base lg:text-lg text-[#18181A] font-normal leading-snug">
                      {review.author}
                    </h3>
                    <span className="font-mono text-[10px] text-[#6E6B68] block mt-0.5">
                      {review.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-0.5 text-[#E8998D]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="#E8998D" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="font-subheading text-xs lg:text-sm text-[#18181A]/90 italic leading-relaxed mb-3.5 font-light">
                  "{review.text}"
                </p>

                {/* Dish Tag & Date */}
                <div className="pt-2.5 border-t border-[#EFECE6] flex items-center justify-between text-[11px] font-mono">
                  <span className="badge-mono badge-rose text-[9px]">
                    <Sparkles size={10} /> {review.dish}
                  </span>
                  <span className="text-[#6E6B68] text-[10px]">{review.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* MOBILE & TABLET PIPELINE: Touch Snap Carousel */}
        {/* ========================================================= */}
        <div className="block lg:hidden w-full">
          {/* Horizontal Snap Scroll Track */}
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-2 sm:px-4 pb-6 pt-2 no-scrollbar scroll-smooth"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {REVIEWS_DATA.map((review, idx) => {
              const isTapped = tappedId === review.id;
              const isActive = activeSlide === idx;

              return (
                <div
                  key={review.id}
                  onClick={() => setTappedId(isTapped ? null : review.id)}
                  className={`w-[82vw] sm:w-[340px] max-w-sm shrink-0 snap-center p-6 rounded-2xl bg-white/95 backdrop-blur-md border transition-all duration-300 shadow-md flex flex-col justify-between cursor-pointer ${
                    isTapped
                      ? 'border-[#B85B43] ring-2 ring-[#E8998D]/40 shadow-xl scale-[1.02]'
                      : isActive
                      ? 'border-[#E8998D]/60 shadow-lg'
                      : 'border-[#18181A]/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-canela text-base sm:text-lg text-[#18181A] font-normal leading-snug">
                        {review.author}
                      </h3>
                      <div className="flex items-center gap-0.5 text-[#E8998D]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={12} fill="#E8998D" />
                        ))}
                      </div>
                    </div>

                    <span className="font-mono text-[10px] text-[#6E6B68] block mb-3">
                      {review.tag}
                    </span>

                    <p className="font-subheading text-xs sm:text-sm text-[#18181A]/90 italic leading-relaxed mb-4 font-light">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between text-[10px] font-mono">
                    <span className="badge-mono badge-rose text-[9px] px-2.5 py-1">
                      <Sparkles size={10} /> {review.dish}
                    </span>
                    <span className="text-[#6E6B68]">{review.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swipeable Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {REVIEWS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx
                    ? 'w-7 bg-[#B85B43]'
                    : 'w-2 bg-[#18181A]/20 hover:bg-[#18181A]/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

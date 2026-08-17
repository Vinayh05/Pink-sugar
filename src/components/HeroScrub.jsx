'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowDown, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 64;

const getFramePath = (index) =>
  `/frames/A_seamless_cinematic_transform_${String(index).padStart(5, '0')}.jpg`;

export const HeroScrub = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const playheadRef = useRef({ frame: 0 });
  const imagesRef = useRef([]);
  const headlineRef = useRef(null);
  const badgeRef = useRef(null);
  const discoveryCardRef = useRef(null);
  const activeFrameRef = useRef(-1);

  const { setIsReservationOpen } = useCart();

  // Fast GPU canvas paint with aspect-ratio cover math
  const renderFrame = useCallback((img, canvas) => {
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;

    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const drawW = imgWidth * ratio;
    const drawH = imgHeight * ratio;
    const shiftX = (canvasWidth - drawW) / 2;
    const shiftY = (canvasHeight - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium';

    ctx.drawImage(img, 0, 0, imgWidth, imgHeight, shiftX, shiftY, drawW, drawH);
  }, []);

  // Update canvas resolution with devicePixelRatio caps (1.5 for mobile, 2.0 for desktop)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    const maxDpr = isMobile ? 1.5 : 2.0;
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, maxDpr);

    const width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    const height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const currentFrameIdx = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(playheadRef.current.frame))
    );
    const img = imagesRef.current[currentFrameIdx] || imagesRef.current[0];
    if (img) {
      renderFrame(img, canvas);
    }
  }, [renderFrame]);

  // Immediate Frame 0 Paint & Asynchronous Background Preloading
  useEffect(() => {
    let isCancelled = false;
    const images = new Array(TOTAL_FRAMES);

    // 1. Immediately instantiate & paint Frame 0 synchronously on mount
    const frame0 = new Image();
    frame0.src = getFramePath(0);
    frame0.onload = () => {
      if (isCancelled) return;
      resizeCanvas();
      renderFrame(frame0, canvasRef.current);
    };
    images[0] = frame0;
    imagesRef.current = images;

    if (frame0.complete) {
      resizeCanvas();
      renderFrame(frame0, canvasRef.current);
    }

    // 2. Non-blocking asynchronous background preloading of frames 1-63
    const preloadRemaining = async () => {
      const promises = [];
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const p = new Promise((resolve) => {
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img);
          images[i] = img;
        });
        promises.push(p);
      }

      await Promise.allSettled(promises);
      if (!isCancelled) {
        ScrollTrigger.refresh();
      }
    };

    preloadRemaining();

    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas, renderFrame]);

  // GSAP ScrollTrigger.matchMedia() for Device-Adaptive Performance
  useGSAP(
    () => {
      const playhead = playheadRef.current;
      const canvas = canvasRef.current;
      const mm = gsap.matchMedia();

      // 1. Desktop & Ultrawide Screens (min-width: 1024px)
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        });

        // 0% to 25% Scroll: Headline, badge lift & fade
        tl.to(
          [headlineRef.current, badgeRef.current],
          {
            opacity: 0,
            y: -35,
            ease: 'power2.out',
            duration: 0.25,
          },
          0
        );

        // 25% to 75% Scroll: Scrub through 64 frames
        tl.to(
          playhead,
          {
            frame: TOTAL_FRAMES - 1,
            ease: 'none',
            duration: 0.5,
            onUpdate: () => {
              const target = Math.round(playhead.frame);
              if (target !== activeFrameRef.current && imagesRef.current[target]) {
                activeFrameRef.current = target;
                requestAnimationFrame(() => {
                  renderFrame(imagesRef.current[target], canvas);
                });
              }
            },
          },
          0.25
        );

        // 75% to 100% Scroll: Extraction discovery card lifts in
        tl.fromTo(
          discoveryCardRef.current,
          {
            opacity: 0,
            y: 40,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power3.out',
            duration: 0.25,
          },
          0.75
        );
      });

      // 2. Tablet & Mobile Screens (max-width: 1023px)
      mm.add('(max-width: 1023px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
          },
        });

        // 0% to 25%: Smooth mobile text fade
        tl.to(
          [headlineRef.current, badgeRef.current],
          {
            opacity: 0,
            y: -20,
            ease: 'power2.out',
            duration: 0.25,
          },
          0
        );

        // 25% to 75%: Frame scrub with rAF throttle
        tl.to(
          playhead,
          {
            frame: TOTAL_FRAMES - 1,
            ease: 'none',
            duration: 0.5,
            onUpdate: () => {
              const target = Math.round(playhead.frame);
              if (target !== activeFrameRef.current && imagesRef.current[target]) {
                activeFrameRef.current = target;
                requestAnimationFrame(() => {
                  renderFrame(imagesRef.current[target], canvas);
                });
              }
            },
          },
          0.25
        );

        // 75% to 100%: Mobile discovery card fade in
        tl.fromTo(
          discoveryCardRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power3.out',
            duration: 0.25,
          },
          0.75
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden bg-[#18181A] flex items-center justify-center select-none"
    >
      {/* 60fps Hardware Canvas Video Engine */}
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full block z-0"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          backgroundColor: '#18181A',
        }}
      />

      {/* Atmospheric Contrast Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(24, 24, 26, 0.84) 0%, rgba(24, 24, 26, 0.35) 45%, rgba(24, 24, 26, 0.90) 100%)',
        }}
      />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col items-center justify-between h-full min-h-[100dvh] will-change-transform will-change-opacity">
        {/* Location Micro-badge */}
        <div ref={badgeRef} className="w-full flex justify-center opacity-100 will-change-transform will-change-opacity mt-2 sm:mt-0">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#FAF7F2]/15 backdrop-blur-md border border-[#FAF7F2]/25 shadow-sm">
            <span className="salt-pulse-dot" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#FAF7F2] font-semibold text-center">
              Kusugal Road • Hubballi Artisanal Hearth
            </span>
          </div>
        </div>

        {/* Center Main Headline */}
        <div
          ref={headlineRef}
          className="max-w-4xl mx-auto text-center my-auto opacity-100 will-change-transform will-change-opacity px-2"
        >
          <h1
            className="font-canela text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-[#FAF7F2] leading-[1.12] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.85)' }}
          >
            The Art of <span className="italic font-light text-[#E8998D]">Salted Roasts</span> & <br className="hidden sm:inline" />
            Hearth Bakes
          </h1>

          <p
            className="font-subheading text-xs sm:text-base md:text-xl text-[#FAF7F2]/90 font-light max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed tracking-wide"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.9)' }}
          >
            Where Himalayan rock salt mineral notes meet single-origin espresso pulls and 36-hour wild-fermented stone hearth culinary craft.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto sm:max-w-none">
            <a
              href="#specialties"
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg"
              style={{ minHeight: '48px', padding: '12px 28px' }}
            >
              <span>Explore Specialties</span>
              <Sparkles size={16} />
            </a>
            <Link
              href="/reserve"
              className="btn-secondary w-full sm:w-auto flex items-center justify-center shadow-lg cursor-pointer"
              style={{
                backgroundColor: 'rgba(24, 24, 26, 0.7)',
                borderColor: 'rgba(250, 247, 242, 0.4)',
                color: '#FAF7F2',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                minHeight: '48px',
                padding: '12px 28px',
              }}
            >
              Reserve a Table
            </Link>
          </div>
        </div>

        {/* Extraction Discovery Card */}
        <div
          ref={discoveryCardRef}
          className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 opacity-0 pointer-events-auto z-30 w-full max-w-sm sm:max-w-md px-4 will-change-transform will-change-opacity"
        >
          <div className="bg-[#18181A]/90 backdrop-blur-xl border border-[#FAF7F2]/20 rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center justify-between text-left">
            <div className="flex items-center gap-3 sm:gap-3.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E8998D]/20 text-[#E8998D] flex items-center justify-center shrink-0">
                <Flame size={18} />
              </div>
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-[#E8998D] font-bold">
                  Hearth Extraction Live
                </span>
                <h3 className="font-canela text-sm sm:text-base text-[#FAF7F2] font-normal leading-snug">
                  Transforming Raw Dough into Golden Crust
                </h3>
              </div>
            </div>
            <a
              href="#specialties"
              className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#E8998D] hover:text-[#18181A] transition-colors shrink-0 ml-2"
              aria-label="Scroll to specialties"
            >
              <ArrowDown size={14} />
            </a>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="w-full flex justify-center mt-4 sm:mt-6">
          <a
            href="#specialties"
            className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#FAF7F2]/80 uppercase tracking-widest hover:text-[#E8998D] transition-colors py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-full bg-[#18181A]/40 backdrop-blur-sm border border-[#FAF7F2]/10"
          >
            <span>Scroll to Explore</span>
            <ArrowDown size={13} className="animate-bounce text-[#E8998D]" />
          </a>
        </div>
      </div>
    </section>
  );
};

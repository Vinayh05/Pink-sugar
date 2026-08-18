'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const TOTAL_FRAMES = 64;

export const getFramePath = (index) =>
  `/frames/A_seamless_cinematic_transform_${String(index).padStart(5, '0')}.jpg`;

export const EditorialPreloader = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);
  const counterRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    let loaded = 0;
    let isCancelled = false;

    // Safety timeout: Ensure preloader finishes cleanly within 1.2s max
    const maxTimer = setTimeout(() => {
      if (!isCancelled) {
        setProgress(100);
        setIsComplete(true);
      }
    }, 1200);

    const preloadAllFrames = async () => {
      const promises = [];

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const p = new Promise((resolve) => {
          const img = new Image();
          img.src = getFramePath(i);

          img.onload = () => {
            if (isCancelled) return resolve();
            loaded++;
            const pct = Math.min(100, Math.round((loaded / TOTAL_FRAMES) * 100));
            setProgress((prev) => Math.max(prev, pct));
            resolve();
          };

          img.onerror = () => {
            if (isCancelled) return resolve();
            loaded++;
            const pct = Math.min(100, Math.round((loaded / TOTAL_FRAMES) * 100));
            setProgress((prev) => Math.max(prev, pct));
            resolve();
          };
        });

        promises.push(p);
      }

      await Promise.all(promises);

      if (!isCancelled) {
        setProgress(100);
        setIsComplete(true);
      }
    };

    preloadAllFrames();

    return () => {
      isCancelled = true;
      clearTimeout(maxTimer);
    };
  }, []);

  // When loading reaches 100%, trigger smooth GSAP curtain reveal
  useEffect(() => {
    if (!isComplete) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (typeof document !== 'undefined') {
            document.body.classList.add('loaded');
          }
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
          }
          if (onLoaded) onLoaded();
        },
      });

      // 1. Counter and text lift up
      tl.to([counterRef.current, badgeRef.current], {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      })
        // 2. Preloader curtains slide up with power4.inOut
        .to(
          preloaderRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
          },
          '+=0.05'
        );
    }, preloaderRef);

    return () => ctx.revert();
  }, [isComplete, onLoaded]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#18181A] text-[#FAF7F2] select-none"
      style={{ willChange: 'transform' }}
    >
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#E8998D]/10 blur-3xl pointer-events-none" />

      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Animated Linocut Coffee Cup & Ember Badge */}
        <div ref={badgeRef} className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#E8998D]/30 animate-ping" />
            <div className="w-20 h-20 rounded-full bg-[#222226] border border-[#3A3A40] flex items-center justify-center shadow-2xl">
              <svg
                viewBox="0 0 48 48"
                className="w-10 h-10 text-[#E8998D]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18C10 28 14 36 24 36C34 36 38 28 38 18H10Z"
                  stroke="#E8998D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18181A"
                />
                <path
                  d="M38 20H40C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28H36.5"
                  stroke="#E8998D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M16 12C16 12 17 9 19 9C21 9 21 12 23 12"
                  stroke="#FAF7F2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                />
                <path
                  d="M24 12C24 12 25 9 27 9C29 9 29 12 31 12"
                  stroke="#FAF7F2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                />
                <line x1="8" y1="40" x2="40" y2="40" stroke="#B85B43" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#222226] border border-[#3A3A40] mb-2">
            <span className="salt-pulse-dot" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#E8998D]">
              Artisanal Stone Hearth
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-wider text-[#FAF7F2]">
            PINK SUGAR
          </h2>
          <span className="font-mono text-[10px] text-[#A3A19B] tracking-widest uppercase">
            Kusugal Road • Hubballi
          </span>
        </div>

        {/* Live Counter & Progress Bar */}
        <div ref={counterRef} className="w-64 flex flex-col items-center">
          <div className="flex items-baseline justify-between w-full mb-2">
            <span className="font-mono text-xs text-[#A3A19B] tracking-wider uppercase">
              Brewing Pink Sugar Experience...
            </span>
            <span className="font-mono text-base font-bold text-[#E8998D]">
              {progress}%
            </span>
          </div>

          <div className="w-full h-1 rounded-full bg-[#2D2D32] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B85B43] to-[#E8998D] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="font-mono text-[9px] text-[#8F8C84] mt-3 tracking-widest uppercase">
            Pre-caching 64 Frames
          </span>
        </div>
      </div>
    </div>
  );
};

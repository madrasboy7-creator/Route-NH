'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface RouteNHSplashScreenProps {
  onFinish?: () => void;
  standalone?: boolean;
}

export default function RouteNHSplashScreen({
  onFinish,
  standalone = false,
}: RouteNHSplashScreenProps) {
  const router = useRouter();

  // Animation Stage Tracker: 1 through 6
  const [stage, setStage] = useState<number>(1);
  const [roadDrawn, setRoadDrawn] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [targetDestination, setTargetDestination] = useState<string>('/customer');

  useEffect(() => {
    // 1. Check Authentication in background during animation
    async function checkAuth() {
      try {
        const res = await fetch('/api/v1/auth/me');
        const json = await res.json();
        if (json.success && json.data?.role) {
          const role = json.data.role;
          if (role === 'CUSTOMER') setTargetDestination('/customer');
          else if (role === 'OPERATIONS' || role === 'DISPATCHER') setTargetDestination('/platform');
          else if (role === 'DRIVER') setTargetDestination('/driver');
          else if (role === 'ADMIN') setTargetDestination('/admin');
          else setTargetDestination('/customer');
        } else {
          setTargetDestination('/customer');
        }
      } catch (err) {
        setTargetDestination('/customer');
      }
    }

    checkAuth();

    // STAGE 01: Fade In (0ms - 800ms) - Ambient central glow begins immediately
    setStage(1);

    // STAGE 02: Road Draws (800ms - 1800ms) - Perspective highway draws from bottom
    const t2 = setTimeout(() => {
      setStage(2);
      requestAnimationFrame(() => {
        setRoadDrawn(true);
      });
    }, 800);

    // STAGE 03: R Forms (1800ms - 2700ms) - Navy R locks onto curved road with electric blue glow
    const t3 = setTimeout(() => {
      setStage(3);
    }, 1800);

    // STAGE 04: NH Reveals (2700ms - 3500ms) - Lower road retracts to compact emblem & NH reveals
    const t4 = setTimeout(() => {
      setStage(4);
    }, 2700);

    // STAGE 05: Logo Locks (3500ms - 4300ms) - ROUTE NH wordmark and 3-color accent line slide up
    const t5 = setTimeout(() => {
      setStage(5);
    }, 3500);

    // STAGE 06: Ready to Launch (4300ms - 5500ms) - Tagline appears & 3 bottom loading dots pulse
    const t6 = setTimeout(() => {
      setStage(6);
    }, 4300);

    // After 5500ms: Complete and transition smoothly
    const tFinish = setTimeout(() => {
      if (!standalone) {
        completeLaunch();
      }
    }, 5500);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(tFinish);
    };
  }, [standalone]);

  const completeLaunch = () => {
    try {
      sessionStorage.setItem('route_nh_splash_completed', 'true');
    } catch (e) {
      // ignore
    }

    setIsFadingOut(true);
    setTimeout(() => {
      if (onFinish) {
        onFinish();
      } else {
        router.replace(targetDestination);
      }
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#FFFFFF] flex flex-col justify-between items-center select-none overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        width: '100vw',
        height: '100dvh',
        backgroundColor: '#FFFFFF',
        transition: 'opacity 0.6s ease-in-out',
      }}
    >
      {/* STAGE 01: Ambient Central Glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '420px',
          height: '420px',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(8, 102, 216, 0.18) 0%, rgba(8, 102, 216, 0.06) 45%, rgba(255, 255, 255, 0) 72%)',
          opacity: stage >= 1 ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }}
      />

      {/* Full Responsive SVG Canvas Matching 6 Reference Stages */}
      <div className="relative w-full h-full max-w-[430px] mx-auto flex items-center justify-center">
        <svg
          viewBox="0 0 390 844"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Electric Blue Glow Filter for Glowing Outer Edge */}
            <filter id="splashNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Subtle Glow Filter for NH Reveal */}
            <filter id="nhGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Gradient for Electric Blue Neon Arc Trail */}
            <linearGradient id="splashNeonTrailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0866D8" stopOpacity="0.2" />
              <stop offset="45%" stopColor="#0866D8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
            </linearGradient>

            {/* Gradient mask for fading lower tail in Stage 03 */}
            <linearGradient id="tailFadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="65%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <mask id="lowerTailMask">
              <rect x="0" y="0" width="390" height="844" fill="url(#tailFadeGrad)" />
            </mask>
          </defs>

          {/* ======================================================== */}
          {/* STAGE 02 & STAGE 03: EXTENDED PERSPECTIVE HIGHWAY ROAD   */}
          {/* (Draws from bottom of screen upward, visible in S2 & S3)  */}
          {/* ======================================================== */}
          <g
            style={{
              opacity: stage >= 2 && stage < 4 ? 1 : 0,
              transition: 'opacity 0.6s ease-out',
            }}
            mask={stage === 3 ? 'url(#lowerTailMask)' : undefined}
          >
            {/* Asphalt Surface of Extended Highway Road */}
            <path
              d="M 195 680
                 L 275 680
                 C 265 590, 245 490, 218 420
                 C 192 355, 172 320, 192 280
                 C 202 260, 208 245, 206 235
                 L 204 235
                 C 200 248, 192 265, 180 288
                 C 155 330, 168 375, 188 435
                 C 210 500, 218 595, 195 680
                 Z"
              fill="#33363C"
              style={{
                strokeDasharray: 900,
                strokeDashoffset: roadDrawn ? 0 : 900,
                transition: 'stroke-dashoffset 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {/* White Dashed Center Markings (Perspective Tapering) */}
            <g
              stroke="#FFFFFF"
              strokeLinecap="round"
              style={{
                opacity: roadDrawn ? 1 : 0,
                transition: 'opacity 0.5s ease-out 0.2s',
              }}
            >
              <line x1="235" y1="655" x2="233" y2="610" strokeWidth="4.5" />
              <line x1="229" y1="580" x2="225" y2="540" strokeWidth="4.0" />
              <line x1="219" y1="510" x2="213" y2="475" strokeWidth="3.4" />
              <line x1="206" y1="450" x2="199" y2="420" strokeWidth="2.8" />
              <line x1="192" y1="398" x2="186" y2="372" strokeWidth="2.4" />
              <line x1="182" y1="352" x2="180" y2="330" strokeWidth="2.0" />
              <line x1="182" y1="312" x2="186" y2="294" strokeWidth="1.6" />
              <line x1="192" y1="280" x2="197" y2="264" strokeWidth="1.3" />
              <line x1="201" y1="254" x2="204" y2="242" strokeWidth="1.0" />
            </g>

            {/* Stage 03 Neon Blue Glowing Arc along Road Shoulder */}
            {stage === 3 && (
              <path
                d="M 270 660
                   C 260 580, 242 490, 218 420
                   C 192 355, 172 320, 192 280"
                stroke="url(#splashNeonTrailGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#splashNeonGlow)"
                style={{
                  opacity: 1,
                  transition: 'opacity 0.5s ease-in',
                }}
              />
            )}
          </g>

          {/* ======================================================== */}
          {/* STAGE 03+: THE STYLIZED NAVY 'R' SYMBOL (#103B82)        */}
          {/* ======================================================== */}
          <g
            style={{
              opacity: stage >= 3 ? 1 : 0,
              transform: stage >= 3 ? 'scale(1)' : 'scale(0.95)',
              transformOrigin: '140px 380px',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Navy R Outer Silhouette & Cutout Counter */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 85 440
                 L 115 325
                 L 205 325
                 C 232 325, 255 338, 255 365
                 C 255 390, 235 405, 205 405
                 L 165 405
                 L 165 412
                 C 165 412, 185 405, 205 405
                 C 240 405, 268 385, 268 360
                 C 268 322, 235 310, 195 310
                 L 105 310
                 L 70 345
                 L 70 440
                 L 85 440
                 Z
                 M 125 338
                 L 190 338
                 C 210 338, 225 348, 225 365
                 C 225 382, 210 392, 190 392
                 L 138 392
                 L 125 338
                 Z"
              fill="#103B82"
            />
          </g>

          {/* ======================================================== */}
          {/* STAGE 04+: COMPACT EMBLEM ROAD (Right Leg of the R)      */}
          {/* ======================================================== */}
          <g
            style={{
              opacity: stage >= 4 ? 1 : 0,
              transition: 'opacity 0.6s ease-out',
            }}
          >
            {/* Charcoal Asphalt Leg */}
            <path
              d="M 165 405
                 C 178 412, 192 422, 205 440
                 L 242 440
                 C 230 420, 218 405, 205 395
                 C 225 385, 245 365, 248 355
                 L 235 355
                 C 230 368, 215 388, 190 398
                 L 165 405
                 Z"
              fill="#33363C"
            />

            {/* White Dashed Markings on Compact Leg */}
            <g stroke="#FFFFFF" strokeLinecap="round">
              <line x1="222" y1="436" x2="216" y2="422" strokeWidth="3.2" />
              <line x1="210" y1="412" x2="204" y2="400" strokeWidth="2.6" />
            </g>

            {/* Electric Blue Neon Arc Edge */}
            <path
              d="M 242 440
                 C 230 418, 218 402, 205 392
                 C 225 382, 246 362, 248 355"
              stroke="url(#splashNeonTrailGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#splashNeonGlow)"
            />
          </g>

          {/* ======================================================== */}
          {/* STAGE 04+: ELECTRIC BLUE 'NH' REVEAL (#0866D8)           */}
          {/* ======================================================== */}
          <g
            style={{
              opacity: stage >= 4 ? 1 : 0,
              transform: stage >= 4 ? 'translateX(0px)' : 'translateX(-18px)',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            filter="url(#nhGlow)"
          >
            {/* Bold Italic 'N' */}
            <path
              d="M 235 440
                 L 248 360
                 L 262 360
                 L 282 415
                 L 290 360
                 L 304 360
                 L 291 440
                 L 277 440
                 L 257 384
                 L 249 440
                 Z"
              fill="#0866D8"
            />

            {/* Bold Italic 'H' */}
            <path
              d="M 308 440
                 L 321 360
                 L 335 360
                 L 330 392
                 L 353 392
                 L 358 360
                 L 372 360
                 L 359 440
                 L 345 440
                 L 350 408
                 L 327 408
                 L 322 440
                 Z"
              fill="#0866D8"
            />
          </g>

          {/* ======================================================== */}
          {/* STAGE 05+: LOGO LOCKS — 'ROUTE NH' & 3-COLOR ACCENT LINE  */}
          {/* ======================================================== */}
          <g
            style={{
              opacity: stage >= 5 ? 1 : 0,
              transform: stage >= 5 ? 'translateY(0px)' : 'translateY(14px)',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Wordmark: ROUTE NH */}
            <text
              x="215"
              y="484"
              textAnchor="middle"
              fill="#103B82"
              fontSize="21"
              fontWeight="800"
              letterSpacing="0.28em"
              fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            >
              ROUTE  NH
            </text>

            {/* Three Horizontal Accent Bars: Navy, Electric Blue, Grey */}
            <g
              style={{
                transform: stage >= 5 ? 'scaleX(1)' : 'scaleX(0.7)',
                transformOrigin: '215px 498px',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Left Bar: Navy */}
              <rect x="125" y="497" width="70" height="2.5" rx="1.25" fill="#103B82" />
              {/* Center Accent: Electric Blue */}
              <rect x="200" y="497" width="30" height="2.5" rx="1.25" fill="#0866D8" />
              {/* Right Bar: Grey */}
              <rect x="235" y="497" width="70" height="2.5" rx="1.25" fill="#A5A9B0" />
            </g>
          </g>

          {/* ======================================================== */}
          {/* STAGE 06: READY TO LAUNCH — TAGLINE                      */}
          {/* ======================================================== */}
          <g
            style={{
              opacity: stage >= 6 ? 1 : 0,
              transition: 'opacity 0.6s ease-out',
            }}
          >
            <text
              x="215"
              y="525"
              textAnchor="middle"
              fill="#103B82"
              fontSize="9.5"
              fontWeight="600"
              letterSpacing="0.32em"
              fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            >
              FIND YOUR WAY FORWARD
            </text>
          </g>

          {/* ======================================================== */}
          {/* STAGE 06: THREE SEQUENTIAL PULSING LOADING DOTS          */}
          {/* ======================================================== */}
          <g
            style={{
              opacity: stage >= 6 ? 1 : 0,
              transition: 'opacity 0.5s ease-out',
            }}
          >
            {/* Dot 1: Electric Blue */}
            <circle cx="195" cy="760" r="3" fill="#0866D8" className="animate-pulse" />
            {/* Dot 2: Slate Grey */}
            <circle
              cx="210"
              cy="760"
              r="3"
              fill="#CBD5E1"
              className="animate-pulse"
              style={{ animationDelay: '0.25s' }}
            />
            {/* Dot 3: Slate Grey */}
            <circle
              cx="225"
              cy="760"
              r="3"
              fill="#CBD5E1"
              className="animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

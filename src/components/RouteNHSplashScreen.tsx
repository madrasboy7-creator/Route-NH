'use client';

import React, { useEffect, useState, useRef } from 'react';
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
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [authResolved, setAuthResolved] = useState<boolean>(false);
  const [targetDestination, setTargetDestination] = useState<string>('/login');
  const animationFinishedRef = useRef<boolean>(false);

  useEffect(() => {
    // Check Authentication in background during animation
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
          setTargetDestination('/login');
        }
      } catch (err) {
        setTargetDestination('/login');
      } finally {
        setAuthResolved(true);
      }
    }

    checkAuth();

    // STAGE 01: Fade In (0ms - 800ms)
    // Ambient glow begins immediately
    setStage(1);

    // STAGE 02: Road Draws (800ms - 1800ms)
    const t2 = setTimeout(() => {
      setStage(2);
    }, 800);

    // STAGE 03: R Forms (1800ms - 2700ms)
    const t3 = setTimeout(() => {
      setStage(3);
    }, 1800);

    // STAGE 04: NH Reveals (2700ms - 3500ms)
    const t4 = setTimeout(() => {
      setStage(4);
    }, 2700);

    // STAGE 05: Logo Locks (3500ms - 4400ms)
    const t5 = setTimeout(() => {
      setStage(5);
    }, 3500);

    // STAGE 06: Ready to Launch (4400ms - 5500ms)
    const t6 = setTimeout(() => {
      setStage(6);
    }, 4400);

    // After 5500ms: Animation timing finished
    const tFinish = setTimeout(() => {
      animationFinishedRef.current = true;
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

  // Once both 5.5s animation and auth check are done, trigger smooth exit
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
      className={`fixed inset-0 z-[9999] bg-[#FFFFFF] flex flex-col justify-between items-center select-none overflow-hidden transition-opacity duration-600 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        width: '100vw',
        height: '100dvh',
      }}
    >
      {/* STAGE 01: Ambient Central Glow */}
      <div
        className={`absolute rounded-full pointer-events-none transition-opacity duration-1000 ease-in-out ${
          stage >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '360px',
          height: '360px',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(8, 102, 216, 0.16) 0%, rgba(8, 102, 216, 0.05) 45%, rgba(255, 255, 255, 0) 72%)',
        }}
      />

      {/* Main Logo & Typography Display Group (Centered) */}
      <div
        className="absolute flex flex-col items-center w-full px-4"
        style={{
          top: '44%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* SVG Canvas for R + Curved Road + NH */}
        <div className="relative w-[280px] h-[190px] flex items-center justify-center">
          <svg
            viewBox="0 0 290 200"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Electric blue glow filter for road trail */}
              <filter id="routeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Gradient for electric blue light trail */}
              <linearGradient id="roadTrailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0866D8" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#0866D8" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
              </linearGradient>

              {/* Progressive road reveal clip path for Stage 02 */}
              <clipPath id="progressiveRoadClip">
                <rect
                  x="0"
                  y={stage === 1 ? 200 : stage === 2 ? 0 : 0}
                  width="290"
                  height="200"
                  className="transition-all duration-1000 ease-out"
                />
              </clipPath>
            </defs>

            {/* STAGE 03: The Stylized Navy R Symbol (#103B82) */}
            <g
              className="transition-all duration-900 ease-in-out"
              style={{
                opacity: stage >= 3 ? 1 : 0,
                transform: stage >= 3 ? 'scale(1)' : 'scale(0.96)',
                transformOrigin: '90px 95px',
              }}
            >
              <path
                d="M 32 72
                   L 54 44
                   L 138 44
                   C 166 44, 188 58, 188 85
                   C 188 111, 168 124, 138 124
                   L 95 124
                   L 95 135
                   C 95 135, 118 121, 142 121
                   C 178 121, 204 102, 204 82
                   C 204 46, 172 26, 130 26
                   L 46 26
                   L 18 60
                   L 18 165
                   L 40 165
                   L 40 72
                   Z"
                fill="#103B82"
              />
            </g>

            {/* STAGE 02: Curved Highway Road (#33363C) */}
            <g
              clipPath="url(#progressiveRoadClip)"
              className="transition-opacity duration-600 ease-out"
              style={{
                opacity: stage >= 2 ? 1 : 0,
              }}
            >
              {/* Dark Charcoal Asphalt Surface */}
              <path
                d="M 28 165
                   L 68 165
                   C 84 153, 110 128, 132 105
                   C 152 85, 174 65, 208 45
                   C 186 58, 162 78, 142 98
                   C 120 120, 92 146, 68 158
                   L 28 165
                   Z"
                fill="#33363C"
              />

              {/* White Dashed Center Markings */}
              <path
                d="M 44 163 L 56 160
                   M 74 148 L 88 138
                   M 104 125 L 118 112
                   M 134 99 L 146 86
                   M 160 75 L 172 64
                   M 184 54 L 194 46"
                stroke="#FFFFFF"
                strokeWidth="3.2"
                strokeLinecap="round"
                className="transition-opacity duration-800"
                style={{ opacity: stage >= 2 ? 1 : 0 }}
              />

              {/* Electric Blue Outer Glowing Edge Trail */}
              <path
                d="M 46 163
                   C 78 148, 114 118, 144 96
                   C 168 78, 190 58, 215 42"
                stroke="url(#roadTrailGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#routeGlow)"
              />
            </g>

            {/* STAGE 04: NH Reveals (#0866D8) */}
            <g
              className="transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)"
              style={{
                opacity: stage >= 4 ? 1 : 0,
                transform: stage >= 4 ? 'translateX(0px)' : 'translateX(-15px)',
              }}
            >
              {/* N */}
              <path
                d="M 152 165
                   L 165 92
                   L 179 92
                   L 200 144
                   L 209 92
                   L 223 92
                   L 210 165
                   L 196 165
                   L 175 113
                   L 166 165
                   Z"
                fill="#0866D8"
              />
              {/* H */}
              <path
                d="M 226 165
                   L 239 92
                   L 253 92
                   L 248 121
                   L 272 121
                   L 277 92
                   L 291 92
                   L 278 165
                   L 264 165
                   L 269 135
                   L 245 135
                   L 240 165
                   Z"
                fill="#0866D8"
              />
            </g>
          </svg>
        </div>

        {/* STAGE 05: Brand Wordmark 'ROUTE NH' & Three Decorative Lines */}
        <div
          className="flex flex-col items-center mt-3 transition-all duration-700 ease-out"
          style={{
            opacity: stage >= 5 ? 1 : 0,
            transform: stage >= 5 ? 'translateY(0px)' : 'translateY(12px)',
          }}
        >
          {/* Wordmark: ROUTE NH */}
          <div
            className="text-[21px] font-extrabold tracking-[0.28em] text-[#103B82] leading-none mb-2.5 pl-[0.28em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ROUTE NH
          </div>

          {/* Three Decorative Lines */}
          <div
            className="flex items-center w-[190px] h-[2.5px] gap-[5px] mb-3.5 transition-all duration-600 ease-out"
            style={{
              opacity: stage >= 5 ? 1 : 0,
              transform: stage >= 5 ? 'scaleX(1)' : 'scaleX(0.7)',
            }}
          >
            {/* 1. Navy Blue */}
            <div className="flex-[3.5] h-full bg-[#103B82] rounded-full" />
            {/* 2. Electric Blue */}
            <div className="flex-[2] h-full bg-[#0866D8] rounded-full" />
            {/* 3. Grey */}
            <div className="flex-[3.5] h-full bg-[#A5A9B0] rounded-full" />
          </div>

          {/* STAGE 06: Tagline 'FIND YOUR WAY FORWARD' */}
          <div
            className="text-[9.5px] font-semibold tracking-[0.32em] text-[#103B82] uppercase pl-[0.32em] transition-opacity duration-600 ease-out"
            style={{
              opacity: stage >= 6 ? 1 : 0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            FIND YOUR WAY FORWARD
          </div>
        </div>
      </div>

      {/* STAGE 06: Three Sequential Pulsing Loading Dots */}
      <div
        className="absolute bottom-12 flex items-center justify-center space-x-2.5 transition-opacity duration-600 ease-out"
        style={{
          opacity: stage >= 6 ? 1 : 0,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#0866D8] animate-pulse"
          style={{ animationDuration: '1.2s', animationDelay: '0s' }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1] animate-pulse"
          style={{ animationDuration: '1.2s', animationDelay: '0.25s' }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1] animate-pulse"
          style={{ animationDuration: '1.2s', animationDelay: '0.5s' }}
        />
      </div>
    </div>
  );
}

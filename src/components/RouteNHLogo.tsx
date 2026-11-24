import React from 'react';

interface RouteNHLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  showTagline?: boolean;
}

export default function RouteNHLogo({
  className = '',
  size = 'md',
  theme = 'dark',
  showTagline = true,
}: RouteNHLogoProps) {
  const isDark = theme === 'dark';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {/* Curved Highway Graphic */}
      <svg
        className={`${iconSizes[size]} flex-shrink-0`}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Teal Curved Road Surface */}
        <path
          d="M10 70 C 25 65, 45 40, 50 15 C 53 10, 57 10, 60 15 C 65 40, 85 65, 95 70 L 80 75 C 65 65, 53 45, 52 25 L 48 25 C 47 45, 35 65, 20 75 Z"
          fill="#0D9488"
        />
        {/* White Center Dashes on Highway */}
        <path
          d="M48 65 L 52 65 L 51.5 54 L 48.5 54 Z"
          fill="#FFFFFF"
        />
        <path
          d="M48.8 48 L 51.2 48 L 51 38 L 49 38 Z"
          fill="#FFFFFF"
        />
        <path
          d="M49.2 32 L 50.8 32 L 50.5 24 L 49.5 24 Z"
          fill="#FFFFFF"
        />
        {/* Road Border Accent */}
        <path
          d="M10 70 C 25 65, 45 40, 50 15"
          stroke="#0F766E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M95 70 C 85 65, 65 40, 60 15"
          stroke="#115E59"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight leading-none ${textSizes[size]} ${
            isDark ? 'text-[#0B1B36]' : 'text-white'
          }`}
        >
          ROUTE <span className="text-[#0D9488]">NH</span>
        </span>
        {showTagline && (
          <span
            className={`text-[9px] font-semibold tracking-tight mt-0.5 ${
              isDark ? 'text-slate-500' : 'text-slate-300'
            }`}
          >
            Moving Goods. Connecting Businesses.
          </span>
        )}
      </div>
    </div>
  );
}

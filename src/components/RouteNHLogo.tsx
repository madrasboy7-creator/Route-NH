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
    sm: 'w-10 h-7',
    md: 'w-14 h-9',
    lg: 'w-16 h-11',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {/* Official ROUTE NH R + Road + NH Vector Emblem */}
      <svg
        className={`${iconSizes[size]} flex-shrink-0 overflow-visible`}
        viewBox="0 0 290 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="logoTrailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0866D8" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#0866D8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* 1. Navy R Symbol */}
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
          fill={isDark ? '#103B82' : '#FFFFFF'}
        />

        {/* 2. Curved Highway Road */}
        <path
          d="M 28 165
             L 68 165
             C 84 153, 110 128, 132 105
             C 152 85, 174 65, 208 45
             C 186 58, 162 78, 142 98
             C 120 120, 92 146, 68 158
             L 28 165
             Z"
          fill={isDark ? '#33363C' : '#475569'}
        />

        {/* White Center Dashed Markings */}
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
        />

        {/* Electric Blue Outer Glow Trail */}
        <path
          d="M 46 163
             C 78 148, 114 118, 144 96
             C 168 78, 190 58, 215 42"
          stroke="url(#logoTrailGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#logoGlow)"
        />

        {/* 3. Electric Blue NH */}
        <g>
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

      {/* Brand Text */}
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight leading-none ${textSizes[size]} ${
            isDark ? 'text-[#103B82]' : 'text-white'
          }`}
        >
          ROUTE <span className="text-[#0866D8]">NH</span>
        </span>
        {showTagline && (
          <span
            className={`text-[9px] font-semibold tracking-wider mt-0.5 uppercase ${
              isDark ? 'text-[#103B82]/80' : 'text-slate-300'
            }`}
          >
            Find Your Way Forward
          </span>
        )}
      </div>
    </div>
  );
}

import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Emblem SVG */}
      <div className={`relative ${iconSizes[size]} shrink-0 shadow-sm rounded-lg overflow-hidden`}>
        <svg
          viewBox="0 0 512 512"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Background */}
          <rect width="512" height="512" rx="112" fill="#103B2C" />
          
          {/* Shield Boundary */}
          <path
            d="M 256 64 C 360 64 420 100 420 180 C 420 310 256 432 256 448 C 256 448 92 310 92 180 C 92 100 152 64 256 64 Z"
            fill="#176B4B"
            stroke="#B7DB76"
            strokeWidth="16"
          />

          {/* G Glyphic Core */}
          <path
            d="M 296 160 C 230 148 168 190 168 256 C 168 322 224 366 296 362 C 344 358 376 332 376 288 L 264 288 L 264 246 L 416 246 C 418 360 336 406 256 406 C 146 406 122 320 122 256 C 122 178 178 116 280 116 C 322 116 360 132 390 160 L 350 196 C 330 178 308 168 280 164 Z"
            fill="#FFFFFF"
          />

          {/* Sprouting Guardian Leaf on Top Right */}
          <path
            d="M 256 120 C 310 80 370 110 370 160 C 330 168 270 144 256 120 Z"
            fill="#B7DB76"
          />
        </svg>
      </div>

      <div className="flex flex-col leading-tight">
        <div className={`font-bold tracking-tight text-[#103B2C] ${titleSizes[size]} flex items-center gap-1.5`}>
          <span>그린가디언</span>
          <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[#176B4B]/10 text-[#176B4B]">
            INFO HUB
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] text-[#176B4B] font-medium tracking-tight">
            신뢰할 수 있는 릴게임 정보의 수호자
          </span>
        )}
      </div>
    </div>
  );
};

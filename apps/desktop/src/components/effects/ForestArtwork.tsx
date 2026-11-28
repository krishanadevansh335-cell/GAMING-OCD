interface ForestArtworkProps {
  variant?: 'hero' | 'discover' | 'subtle';
  className?: string;
}

/**
 * Reference-matched Forest Crimson vector landscape:
 * deep obsidian charcoal, emerald mist, vivid crimson moon, and crimson-lit pines.
 */
export function ForestArtwork({ variant = 'hero', className = '' }: ForestArtworkProps) {
  const showMoon = variant === 'hero' || variant === 'discover';
  const opacityClass = variant === 'subtle' ? 'opacity-45' : 'opacity-95';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none h-full w-full ${opacityClass} ${className}`}
    >
      <defs>
        <linearGradient id={`sky-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B0E0D" />
          <stop offset="48%" stopColor="#0E2419" />
          <stop offset="100%" stopColor="#143826" />
        </linearGradient>
        <radialGradient id={`crimson-moon-${variant}`} cx="78%" cy="28%" r="36%">
          <stop offset="0%" stopColor="#DC2638" stopOpacity="0.82" />
          <stop offset="42%" stopColor="#941C2C" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#0B0E0D" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`emerald-mist-${variant}`} cx="40%" cy="75%" r="48%">
          <stop offset="0%" stopColor="#20A66A" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0E2419" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="520" fill={`url(#sky-${variant})`} />
      <rect width="1200" height="520" fill={`url(#crimson-moon-${variant})`} />
      <rect width="1200" height="520" fill={`url(#emerald-mist-${variant})`} />

      {showMoon && (
        <g>
          <circle cx="920" cy="140" r="95" fill="#DC2638" fillOpacity="0.24" />
          <circle cx="920" cy="140" r="64" fill="#DC2638" fillOpacity="0.58" />
          <circle cx="920" cy="140" r="62" stroke="#FF6B7A" strokeOpacity="0.28" strokeWidth="1.5" fill="none" />
        </g>
      )}

      {/* Distant mountain ridge */}
      <path
        d="M0 375 L140 275 L280 335 L450 225 L610 315 L770 190 L930 285 L1080 215 L1200 295 L1200 520 L0 520 Z"
        fill="#0D1E16"
        fillOpacity="0.85"
      />

      {/* Mid mountain ridge */}
      <path
        d="M0 420 L190 315 L350 375 L540 285 L710 365 L880 270 L1050 345 L1200 280 L1200 520 L0 520 Z"
        fill="#0E1713"
        fillOpacity="0.94"
      />

      {/* Foreground pine silhouettes */}
      <path
        d="M0 520 L0 445 L25 410 L42 440 L60 390 L82 435 L102 385 L126 442 L150 405 L175 450 L205 420 L230 458 L260 415 L290 462 L325 430 L355 468 L410 440 L450 472 L520 445 L580 470 L660 448 L720 468 L785 432 L820 462 L855 405 L885 450 L918 395 L950 448 L985 385 L1018 442 L1055 375 L1088 435 L1122 392 L1158 440 L1200 410 L1200 520 Z"
        fill="#0B0E0D"
      />

      {/* Crimson moonlit rim on right-hand pines */}
      <path
        d="M720 468 L785 432 L820 462 L855 405 L885 450 L918 395 L950 448 L985 385 L1018 442 L1055 375 L1088 435 L1122 392 L1158 440 L1200 410"
        fill="none"
        stroke="#DC2638"
        strokeOpacity="0.48"
        strokeWidth="2"
      />
    </svg>
  );
}

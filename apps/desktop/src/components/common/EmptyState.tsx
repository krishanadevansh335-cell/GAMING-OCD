import type { ReactNode } from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  badgeText?: string;
  onAction?: () => void;
  backdrop?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  badgeText = 'Coming Soon',
  onAction,
  backdrop,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`relative flex min-h-[340px] flex-1 flex-col items-center justify-center overflow-hidden rounded-[14px] border border-[#242D28] bg-[#121715]/80 px-6 py-12 text-center shadow-[0_12px_32px_rgba(0,0,0,0.4)] ${className}`}
    >
      {backdrop}
      {/* Emerald center glow & subtle crimson bottom-left accent matching reference */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, rgba(32, 166, 106, 0.15), transparent 58%), radial-gradient(circle at 12% 92%, rgba(220, 38, 56, 0.12), transparent 45%)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#25C47A]/35 bg-[#0E2419]/90 text-[#25C47A] shadow-[0_0_32px_rgba(32,166,106,0.24)]">
          {icon}
        </div>
        <h2 className="font-display text-xl font-semibold text-[#EEF2EF]">{title}</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-[#9AA59E]">{description}</p>
        {badgeText && (
          <div className="mt-6">
            {onAction ? (
              <Button variant="crimson" size="sm" onClick={onAction}>
                {badgeText}
              </Button>
            ) : (
              <span className="inline-flex items-center rounded-lg border border-[#DC2638]/50 bg-gradient-to-b from-[#DC2638] to-[#941C2C] px-4 py-1.5 text-xs font-semibold text-[#FFFFFF] shadow-[0_6px_18px_rgba(220,38,56,0.28)]">
                {badgeText}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

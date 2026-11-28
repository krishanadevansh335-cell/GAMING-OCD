import type { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: ReactNode;
  backdrop?: ReactNode;
  children: ReactNode;
}

export function PageContainer({
  title,
  subtitle,
  badge,
  actions,
  backdrop,
  children,
}: PageContainerProps) {
  return (
    <section className="relative flex min-h-full w-full flex-col">
      {backdrop}
      <div className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-1 flex-col px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 xl:px-10 2xl:px-14">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-5 sm:gap-4">
          <div className="min-w-0">
            <h1 className="font-display text-[clamp(1.5rem,2.4vw,2.15rem)] font-bold leading-tight tracking-tight text-[#EEF2EF]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-xs text-[#9AA59E] sm:text-sm">{subtitle}</p>
            )}
          </div>
          {(badge || actions) && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {badge && (
                <span className="rounded-lg border border-[#242D28] bg-[#121715]/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#9AA59E] sm:px-3 sm:text-[11px]">
                  {badge}
                </span>
              )}
              {actions}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-4 sm:gap-5">{children}</div>
      </div>
    </section>
  );
}

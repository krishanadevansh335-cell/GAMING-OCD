import type { ReactNode } from 'react';

interface PlaceholderPanelProps {
  title: string;
  description: string;
  status?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function PlaceholderPanel({
  title,
  description,
  status = 'Not available in GCC 0.0.01',
  icon,
  className = '',
  children,
}: PlaceholderPanelProps) {
  return (
    <div
      className={`flex flex-col justify-between rounded-[14px] border border-[#303A33] bg-[#1C2420]/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.24)] ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#303A33] bg-[#111413] text-[#20A66A]">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-display text-[15px] font-semibold text-[#E9EFEB]">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#A2ADA6]">{description}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-md border border-[#303A33] bg-[#111413] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[#A2ADA6]">
          {status}
        </span>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

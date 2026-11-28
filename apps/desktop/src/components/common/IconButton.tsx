import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
  active?: boolean;
}

export function IconButton({
  label,
  children,
  active = false,
  className = '',
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-[10px] border transition-colors duration-150 ${
        disabled
          ? 'cursor-not-allowed border-transparent text-[#626B65] opacity-60'
          : active
            ? 'border-[#20A66A]/45 bg-[#10291D] text-[#20A66A]'
            : 'border-transparent bg-transparent text-[#A2ADA6] hover:border-[#303A33] hover:bg-[#1C2420] hover:text-[#E9EFEB]'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

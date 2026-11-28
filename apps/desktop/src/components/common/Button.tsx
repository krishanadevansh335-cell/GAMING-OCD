import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';

export type ButtonVariant = 'forest' | 'crimson' | 'crimson-outline' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  forest:
    'bg-gradient-to-r from-[#20A66A] to-[#145A36] text-[#FFFFFF] border border-[#25C47A]/40 shadow-[0_6px_20px_rgba(32,166,106,0.3)] hover:brightness-110',
  crimson:
    'bg-gradient-to-b from-[#DC2638] to-[#941C2C] text-[#FFFFFF] border border-[#DC2638]/50 shadow-[0_6px_20px_rgba(220,38,56,0.3)] hover:brightness-110',
  'crimson-outline':
    'bg-[#121715]/90 text-[#EEF2EF] border border-[#DC2638]/55 hover:border-[#DC2638] hover:bg-[#941C2C]/25',
  outline:
    'bg-[#121715]/85 text-[#EEF2EF] border border-[#242D28] hover:border-[#20A66A]/50 hover:bg-[#0E2419]/60',
  ghost:
    'bg-transparent text-[#9AA59E] border border-transparent hover:text-[#EEF2EF] hover:bg-[#121715]/70',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-xs rounded-lg gap-1.5',
  md: 'h-10 px-4 text-[13px] rounded-[10px] gap-2',
  lg: 'h-11 px-5 text-sm rounded-[11px] gap-2.5',
};

export function Button({
  variant = 'forest',
  size = 'md',
  icon,
  iconRight,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 select-none ${
        disabled
          ? 'opacity-50 cursor-not-allowed bg-[#121715] text-[#58615C] border border-[#242D28]'
          : `cursor-pointer ${VARIANT_CLASSES[variant]}`
      } ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {icon}
      <span>{children}</span>
      {iconRight}
    </motion.button>
  );
}

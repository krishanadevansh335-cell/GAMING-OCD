import { motion } from 'motion/react';
import type { NavItemConfig } from '../../app/router';
import { Tooltip } from '../common/Tooltip';

interface SidebarItemProps {
  item: NavItemConfig;
  active: boolean;
  collapsed: boolean;
  onSelect: () => void;
}

export function SidebarItem({ item, active, collapsed, onSelect }: SidebarItemProps) {
  const Icon = item.icon;

  const button = (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ x: collapsed ? 0 : 2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.14, ease: [0.2, 0.8, 0.2, 1] }}
      aria-current={active ? 'page' : undefined}
      aria-label={collapsed ? item.label : undefined}
      className={`group relative flex h-10 w-full items-center rounded-[10px] border text-left text-[13px] font-medium transition-colors duration-150 ${
        collapsed ? 'justify-center px-0' : 'gap-3 px-3.5'
      } ${
        active
          ? 'border-[#25C47A]/45 text-[#FFFFFF]'
          : 'border-transparent text-[#A2ADA6] hover:bg-[#171E1B]/80 hover:text-[#EEF2EF]'
      }`}
    >
      {active && (
        <motion.span
          layoutId="gcc-active-nav"
          transition={{ duration: 0.26, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-[#22B570] via-[#1A8B56] to-[#145A36] shadow-[0_4px_18px_rgba(32,166,106,0.38)]"
        />
      )}

      <span
        className={`relative z-10 flex shrink-0 items-center justify-center transition-colors ${
          active ? 'text-[#FFFFFF]' : 'text-[#A2ADA6] group-hover:text-[#25C47A]'
        }`}
      >
        <Icon size={17} strokeWidth={2} />
      </span>

      {!collapsed && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.16 }}
          className="relative z-10 truncate whitespace-nowrap"
        >
          {item.label}
        </motion.span>
      )}
    </motion.button>
  );

  return (
    <Tooltip content={item.label} enabled={collapsed} side="right">
      <div className="w-full">{button}</div>
    </Tooltip>
  );
}

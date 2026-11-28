import { Bell, CircleHelp, Menu, Search, User } from 'lucide-react';
import type { PageId } from '../../app/router';
import { useUIStore } from '../../store/useUIStore';
import { IconButton } from '../common/IconButton';

interface TopbarProps {
  page: PageId;
  onNavigate: (page: PageId) => void;
}

export function Topbar({ page, onNavigate }: TopbarProps) {
  const { notify, openModal, toggleMobileNav } = useUIStore();

  const handlePlaceholderTopbar = (label: string) => {
    notify({
      title: `${label} placeholder`,
      message: `${label} is not available in GCC 0.0.01.`,
      tone: 'neutral',
    });
  };

  return (
    <header className="relative z-20 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[#242D28]/60 bg-[#080B0A]/65 px-3 backdrop-blur-md sm:px-6 md:px-7">
      {/* Left slot: Mobile drawer trigger on small screens, balancing spacer on md+ */}
      <div className="flex items-center md:w-28">
        <IconButton
          label="Open navigation menu"
          onClick={toggleMobileNav}
          className="md:hidden"
        >
          <Menu size={18} />
        </IconButton>
      </div>

      {/* Centered fluid Search GCC... pill */}
      <div
        title="Search is a visual placeholder in GCC 0.0.01"
        className="flex min-w-0 flex-1 max-w-[320px] items-center gap-2 rounded-full border border-[#242D28] bg-[#101513]/90 px-3.5 py-1.5 text-xs text-[#58615C] shadow-inner"
      >
        <Search size={14} className="shrink-0 text-[#9AA59E]" />
        <input
          type="text"
          disabled
          aria-label="Search GCC placeholder"
          placeholder="Search GCC..."
          className="min-w-0 w-full cursor-not-allowed bg-transparent text-xs text-[#9AA59E] placeholder:text-[#58615C] focus:outline-none"
        />
      </div>

      {/* Right utility icons */}
      <div className="flex items-center justify-end gap-1 sm:gap-1.5 md:w-28">
        <IconButton
          label="Notifications (Not available in GCC 0.0.01)"
          onClick={() => handlePlaceholderTopbar('Notifications')}
        >
          <Bell size={16} />
        </IconButton>

        <IconButton
          label="About GCC v0.0.01"
          onClick={() => openModal('foundation-info')}
        >
          <CircleHelp size={16} />
        </IconButton>

        <button
          type="button"
          onClick={() => onNavigate('settings')}
          aria-label="Open Settings"
          aria-current={page === 'settings' ? 'page' : undefined}
          title="Settings & Profile placeholder"
          className="ml-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#20A66A]/45 bg-[#0E2419] text-[#25C47A] transition-colors hover:border-[#25C47A] hover:bg-[#145A36]/70"
        >
          <User size={14} />
        </button>
      </div>
    </header>
  );
}

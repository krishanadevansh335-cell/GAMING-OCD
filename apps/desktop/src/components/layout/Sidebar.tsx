import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Gamepad2, Pin, PinOff, X } from 'lucide-react';
import { NAV_ITEMS, type PageId } from '../../app/router';
import { usePreferencesStore } from '../../store/usePreferencesStore';
import { useUIStore } from '../../store/useUIStore';
import { SidebarItem } from './SidebarItem';
import { Tooltip } from '../common/Tooltip';

interface SidebarProps {
  page: PageId;
  onNavigate: (page: PageId) => void;
}

export function Sidebar({ page, onNavigate }: SidebarProps) {
  const { sidebarBehaviour, sidebarPinned, sidebarHoverExpand, toggleSidebarPin } =
    usePreferencesStore();
  const { mobileNavOpen, setMobileNavOpen } = useUIStore();
  const [hovered, setHovered] = useState(false);
  const leaveTimer = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (leaveTimer.current !== null) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHovered(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimer.current !== null) {
      window.clearTimeout(leaveTimer.current);
    }
    leaveTimer.current = window.setTimeout(() => {
      setHovered(false);
    }, 110);
  };

  const isPinnedLayout =
    sidebarBehaviour === 'expanded' ||
    (sidebarBehaviour === 'collapsible' && sidebarPinned);

  const isExpanded =
    sidebarBehaviour === 'expanded'
      ? true
      : sidebarBehaviour === 'compact'
        ? false
        : sidebarPinned || (sidebarHoverExpand && hovered);

  const effectiveCollapsed = !isExpanded;

  const mainItems = NAV_ITEMS.filter((item) => item.section === 'main');
  const systemItems = NAV_ITEMS.filter((item) => item.section === 'system');

  const handleSelect = (id: PageId) => {
    onNavigate(id);
    setMobileNavOpen(false);
  };

  const renderSidebarBody = (collapsed: boolean, isMobileDrawer = false) => (
    <>
      {/* Bottom-left crimson atmospheric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-12 h-60 w-56 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgba(220, 38, 56, 0.34) 0%, rgba(148, 28, 44, 0.16) 55%, transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2638]/80 via-[#941C2C]/40 to-transparent"
      />

      {/* Brand header */}
      <div className="relative z-10 flex items-center justify-between gap-2 pb-4 sm:pb-5">
        <button
          type="button"
          onClick={() => handleSelect('home')}
          aria-label="GCC Home"
          className={`flex items-center gap-3 rounded-xl p-1 text-left transition-opacity hover:opacity-90 ${
            collapsed ? 'mx-auto' : ''
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#DC2638] drop-shadow-[0_0_12px_rgba(220,38,56,0.55)]">
            <Gamepad2 size={28} strokeWidth={1.9} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-display text-lg font-bold leading-none tracking-[0.08em] text-[#EEF2EF]">
                GCC
              </div>
              <div className="mt-0.5 text-[10px] tracking-wide text-[#9AA59E]">
                Gaming Control Center
              </div>
            </div>
          )}
        </button>

        {isMobileDrawer ? (
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#242D28] bg-[#121715] text-[#9AA59E] hover:text-[#EEF2EF]"
          >
            <X size={16} />
          </button>
        ) : (
          !collapsed &&
          sidebarBehaviour === 'collapsible' && (
            <Tooltip
              content={sidebarPinned ? 'Auto-collapse on leave' : 'Pin sidebar open'}
              side="right"
            >
              <button
                type="button"
                onClick={toggleSidebarPin}
                aria-label={sidebarPinned ? 'Unpin sidebar' : 'Pin sidebar open'}
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                  sidebarPinned
                    ? 'border-[#20A66A]/45 bg-[#0E2419] text-[#25C47A]'
                    : 'border-transparent text-[#58615C] hover:border-[#242D28] hover:bg-[#121715] hover:text-[#EEF2EF]'
                }`}
              >
                {sidebarPinned ? <Pin size={14} /> : <PinOff size={14} />}
              </button>
            </Tooltip>
          )
        )}
      </div>

      {/* Navigation items */}
      <nav
        className="relative z-10 flex flex-1 flex-col gap-1 overflow-y-auto gcc-scroll"
        aria-label="Main navigation"
      >
        {mainItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            active={page === item.id}
            collapsed={collapsed}
            onSelect={() => handleSelect(item.id)}
          />
        ))}
        {systemItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            active={page === item.id}
            collapsed={collapsed}
            onSelect={() => handleSelect(item.id)}
          />
        ))}
      </nav>

      {/* Bottom version chip */}
      <div className="relative z-10 mt-3 pt-2">
        <div
          className={`flex items-center rounded-lg border border-[#242D28]/70 bg-[#0D1210]/80 px-2.5 py-1.5 font-mono text-[10px] text-[#9AA59E] ${
            collapsed ? 'justify-center px-0' : 'justify-between'
          }`}
        >
          {collapsed ? (
            <span className="text-[#25C47A]">0.01</span>
          ) : (
            <>
              <span className="rounded bg-[#0E2419] px-1.5 py-0.5 text-[9px] font-semibold tracking-wider text-[#25C47A]">
                v0.0.01
              </span>
              <span className="text-[#58615C]">
                {isMobileDrawer ? 'Menu' : sidebarPinned ? 'Pinned' : 'Hover Expand'}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop/tablet layout spacer: keeps 76px when unpinned so hover-expand overlays smoothly without page reflow */}
      <div
        aria-hidden="true"
        className={`hidden shrink-0 transition-[width] duration-250 ease-gcc md:block ${
          isPinnedLayout ? 'w-[244px]' : 'w-[76px]'
        }`}
      />

      {/* Desktop/tablet interactive hover-expand sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: effectiveCollapsed ? 76 : 244 }}
        transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setHovered(false);
          }
        }}
        className={`fixed inset-y-0 left-0 z-30 hidden flex-col overflow-hidden border-r border-[#242D28] bg-[#080B0A]/96 px-3 py-4 backdrop-blur-md md:flex ${
          !isPinnedLayout && isExpanded ? 'shadow-[16px_0_40px_rgba(0,0,0,0.72)]' : ''
        }`}
        aria-label="Primary sidebar"
      >
        {renderSidebarBody(effectiveCollapsed, false)}
      </motion.aside>

      {/* Narrow/mobile slide-over drawer (< 768px) */}
      <AnimatePresence>
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 bg-[#050706]/80 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative z-10 flex h-full w-64 max-w-[82vw] flex-col overflow-hidden border-r border-[#242D28] bg-[#080B0A] px-3 py-4 shadow-[16px_0_48px_rgba(0,0,0,0.85)]"
              aria-label="Mobile navigation drawer"
            >
              {renderSidebarBody(false, true)}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

import React from 'react';
import { Sparkles, Dna, GitBranch, Clock, Layers, BookOpen, Compass, Cpu } from 'lucide-react';

export type ActiveTab = 'helix' | 'graph' | 'timeline' | 'prophecy' | 'reader' | 'wisdom' | 'theology';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onRandomDiscover: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onRandomDiscover }) => {
  const navItems: { id: ActiveTab; label: string; mobileLabel: string; code: string; icon: React.ReactNode }[] = [
    { id: 'helix', label: 'Double-Helix', mobileLabel: 'Helix', code: '01', icon: <Dna className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'graph', label: 'Knowledge Graph', mobileLabel: 'Graph', code: '02', icon: <GitBranch className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'timeline', label: 'Narrative Timelines', mobileLabel: 'Timelines', code: '03', icon: <Clock className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'prophecy', label: 'Prophecy Matrix', mobileLabel: 'Prophecies', code: '04', icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'reader', label: 'Canon Catalog', mobileLabel: 'Canon', code: '05', icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'wisdom', label: 'Economy of Wisdom', mobileLabel: 'Wisdom', code: '06', icon: <Compass className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'theology', label: 'Theological AI', mobileLabel: 'Theology AI', code: '07', icon: <Cpu className="w-3.5 h-3.5 shrink-0" /> }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full max-w-full overflow-hidden bg-[#050609]/95 backdrop-blur-xl border-b border-amber-500/15 px-2.5 sm:px-5 py-2 transition-colors">
        <div className="max-w-[1600px] mx-auto w-full flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Zone 1: Brand Wordmark (Strictly contained for 320px-430px mobile viewports) */}
          <div className="flex items-center gap-2 min-w-0 shrink">
            <button
              onClick={() => onTabChange('helix')}
              aria-label="Scripture Universe Home — Return to Double-Helix Observatory"
              className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md flex items-center gap-2 min-w-0 py-1"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-amber-500/40 bg-gradient-to-br from-amber-500/20 to-orange-950/50 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)] shrink-0">
                <Dna className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              </div>
              <div className="min-w-0">
                <span className="block text-[13px] xs:text-sm sm:text-base xl:text-lg font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase font-serif-title text-amber-100 group-hover:text-amber-300 transition-colors truncate leading-tight">
                  Scripture Universe
                </span>
                <span className="hidden xl:block text-[9px] font-mono uppercase tracking-[0.2em] text-amber-500/75 mt-0.5 truncate">
                  Canonical Double-Helix Observatory
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-medium shrink-0"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative whitespace-nowrap shrink-0 px-2.5 xl:px-3 py-2 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-amber-200 font-semibold bg-amber-500/15 border border-amber-500/35 shadow-[0_0_20px_rgba(245,158,11,0.14)]'
                      : 'text-zinc-300 hover:text-amber-100 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <span className="text-[10px] font-mono text-amber-400/70 hidden 2xl:inline">{item.code}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-[9px] left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action (Compact on mobile so it never bleeds off-screen) */}
          <div className="flex items-center shrink-0">
            <button
              onClick={onRandomDiscover}
              aria-label="Discover a random prophetic cross-reference link"
              className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 min-h-[38px] sm:min-h-[40px] text-[11px] sm:text-xs font-bold tracking-wider uppercase text-amber-950 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 rounded-lg hover:brightness-110 active:scale-98 transition-all whitespace-nowrap shrink-0 shadow-[0_0_18px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-950 shrink-0" />
              <span className="hidden sm:inline">Discover Link</span>
              <span className="sm:hidden">Discover</span>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Contained Navigation Strip (All 7 tabs accessible with 40px+ touch targets & scroll fade indicator) */}
        <nav
          aria-label="Mobile Section Navigation"
          className="lg:hidden flex items-center overflow-x-auto gap-1.5 pt-2 mt-1.5 border-t border-amber-500/15 text-xs scrollbar-none w-full"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`whitespace-nowrap shrink-0 px-3 py-1.5 min-h-[38px] rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/45 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'text-zinc-300 bg-zinc-900/60 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/80'
                }`}
              >
                {item.icon}
                <span>{item.mobileLabel}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Signature Mobile Sanctuary Bottom Dock (44x44px ergonomic touch hitboxes) */}
      <nav
        aria-label="Mobile Quick Sanctuary Dock"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 pointer-events-none px-3 pb-2 pt-1 bg-gradient-to-t from-[#040508] via-[#040508]/95 to-transparent"
      >
        <div className="pointer-events-auto max-w-md mx-auto bg-[#080a0f]/95 backdrop-blur-xl border border-amber-500/25 rounded-2xl px-2 py-1 flex items-center justify-around shadow-[0_-10px_35px_rgba(0,0,0,0.9)]">
          <button
            onClick={() => onTabChange('helix')}
            aria-current={activeTab === 'helix' ? 'page' : undefined}
            aria-label="Double-Helix Observatory"
            className={`min-w-[52px] min-h-[44px] flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'helix' ? 'text-amber-300 bg-amber-500/10' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Dna className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-wider uppercase">Helix</span>
          </button>

          <button
            onClick={() => onTabChange('graph')}
            aria-current={activeTab === 'graph' ? 'page' : undefined}
            aria-label="Knowledge Graph & Cross-References"
            className={`min-w-[52px] min-h-[44px] flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'graph' ? 'text-amber-300 bg-amber-500/10' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-wider uppercase">Graph</span>
          </button>

          {/* Center Glowing Molten Amber Sanctuary Orb */}
          <button
            onClick={onRandomDiscover}
            aria-label="Discover Random Prophetic Fulfillment"
            title="Discover Prophetic Link"
            className="relative -mt-3.5 w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-orange-600 text-amber-950 flex items-center justify-center amber-orb-glow cursor-pointer active:scale-95 transition-transform shrink-0"
          >
            <Sparkles className="w-5 h-5 text-amber-950" />
          </button>

          <button
            onClick={() => onTabChange('reader')}
            aria-current={activeTab === 'reader' ? 'page' : undefined}
            aria-label="Canon Catalog & Reader"
            className={`min-w-[52px] min-h-[44px] flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'reader' ? 'text-amber-300 bg-amber-500/10' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-wider uppercase">Canon</span>
          </button>

          <button
            onClick={() => onTabChange('wisdom')}
            aria-current={activeTab === 'wisdom' ? 'page' : undefined}
            aria-label="The Economy of Wisdom"
            className={`min-w-[52px] min-h-[44px] flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'wisdom' ? 'text-amber-300 bg-amber-500/10' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-wider uppercase">Wisdom</span>
          </button>
        </div>
      </nav>
    </>
  );
};

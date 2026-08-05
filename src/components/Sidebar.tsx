import React from 'react';
import { NavTab } from '../types';
import { 
  Brain, 
  Users, 
  LineChart, 
  GitMerge, 
  Settings, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  documentCount: number;
  totalTokens: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
  documentCount,
  totalTokens
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { 
      id: 'creative-brain', 
      label: 'Creative Brain', 
      icon: <Brain className="w-4 h-4" />,
      badge: `${documentCount}`
    },
    { 
      id: 'executive-team', 
      label: 'Executive Team', 
      icon: <Users className="w-4 h-4" /> 
    },
    { 
      id: 'client-intelligence', 
      label: 'Client Intelligence', 
      icon: <LineChart className="w-4 h-4" /> 
    },
    { 
      id: 'workflows', 
      label: 'Workflows', 
      icon: <GitMerge className="w-4 h-4" /> 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: <Settings className="w-4 h-4" /> 
    },
  ];

  return (
    <aside 
      id="sidebar-navigation"
      className={`relative flex flex-col bg-[#18181B] border-r border-[#27272A] transition-all duration-300 ease-in-out shrink-0 z-20 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Header / Brand */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#27272A]">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono text-xs font-semibold shadow-inner">
              CS
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#F4F4F5] tracking-tight">
                Creative Strategy OS
              </span>
              <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">
                v1.0 MVP
              </span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-8 h-8 mx-auto rounded-md bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono text-xs font-semibold">
            CS
          </div>
        )}

        <button
          id="toggle-sidebar-button"
          onClick={onToggleCollapse}
          className="p-1.5 text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#27272A] rounded-md transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <div className={`px-2 pb-2 text-[10px] font-mono uppercase text-[#A1A1AA] tracking-wider ${isCollapsed ? 'sr-only' : 'block'}`}>
          Navigation
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group relative ${
                isActive 
                  ? 'bg-[#27272A] text-[#F4F4F5] shadow-xs' 
                  : 'text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#27272A]/50'
              }`}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#3B82F6] rounded-r-full" />
              )}
              
              <span className={`${isActive ? 'text-[#3B82F6]' : 'text-[#A1A1AA] group-hover:text-[#F4F4F5]'}`}>
                {item.icon}
              </span>

              {!isCollapsed && (
                <span className="flex-1 text-left truncate">
                  {item.label}
                </span>
              )}

              {!isCollapsed && item.badge && (
                <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded-full ${
                  isActive ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Brain System Status Quick Card (Expanded Only) */}
      {!isCollapsed && (
        <div className="mx-3 mb-3 p-3 bg-zinc-950/60 border border-[#27272A] rounded-xl text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#A1A1AA] font-mono uppercase text-[10px] tracking-wider">Brain Index</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
          </div>
          <div className="text-xs text-[#F4F4F5] font-mono">
            {(totalTokens / 1000).toFixed(1)}k <span className="text-[#A1A1AA] font-sans text-[11px]">tokens active</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full w-[78%]" />
          </div>
        </div>
      )}

      {/* Footer / Badge */}
      <div className="p-3 border-t border-[#27272A] bg-[#18181B]">
        {!isCollapsed ? (
          <div className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg bg-zinc-950/40 border border-[#27272A]/60">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-[#F4F4F5] leading-none">
                  Claude Pro Engine
                </span>
                <span className="text-[9px] font-mono text-[#A1A1AA] tracking-tight mt-0.5">
                  Anthropic API Active
                </span>
              </div>
            </div>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        ) : (
          <div className="flex justify-center" title="Powered by Claude Pro">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

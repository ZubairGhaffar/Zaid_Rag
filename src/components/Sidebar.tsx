import React from 'react';
import { NavTab } from '../types';
import { 
  Brain, 
  Users, 
  LineChart, 
  GitMerge, 
  Settings, 
  Sparkles,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Volume2
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
      className={`relative flex flex-col bg-[#F9F9F8] dark:bg-[#0C0A09] border-r border-stone-200 dark:border-stone-800/80 transition-all duration-300 ease-in-out shrink-0 z-20 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Header / ElevenLabs Branding */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800/80">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            {/* ElevenLabs iconic || logo mark */}
            <div className="w-7 h-7 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-950 flex items-center justify-center font-mono text-xs font-black shadow-xs tracking-tighter">
              ||
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 tracking-tight">
                ElevenLabs Studio
              </span>
              <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Creative Brain OS
              </span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-8 h-8 mx-auto rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-950 flex items-center justify-center font-mono text-xs font-black shadow-xs tracking-tighter">
            ||
          </div>
        )}

        <button
          id="toggle-sidebar-button"
          onClick={onToggleCollapse}
          className="p-1.5 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 rounded-lg transition-colors cursor-pointer"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 py-4 px-2.5 space-y-1.5 overflow-y-auto">
        <div className={`px-2 pb-2 text-[10px] font-mono uppercase text-stone-400 dark:text-stone-500 tracking-wider ${isCollapsed ? 'sr-only' : 'block'}`}>
          Navigation
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-xs font-medium transition-all group relative cursor-pointer ${
                isActive 
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950 shadow-sm font-semibold' 
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-900/60'
              }`}
            >
              <span className={`${isActive ? 'text-white dark:text-stone-950' : 'text-stone-500 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100'}`}>
                {item.icon}
              </span>

              {!isCollapsed && (
                <span className="flex-1 text-left truncate">
                  {item.label}
                </span>
              )}

              {!isCollapsed && item.badge && (
                <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full font-semibold ${
                  isActive 
                    ? 'bg-stone-800 text-stone-200 dark:bg-stone-200 dark:text-stone-900' 
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ElevenLabs Equalizer / Audio Memory Status Box */}
      {!isCollapsed && (
        <div className="mx-3 mb-3 p-3.5 bg-white dark:bg-[#161412] border border-stone-200 dark:border-stone-800/90 rounded-2xl text-xs space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-stone-500 dark:text-stone-400 font-mono uppercase text-[10px] tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-3 h-3 text-stone-700 dark:text-stone-300" />
              Brain Index
            </span>
            <div className="flex items-center gap-1 h-3">
              <span className="w-0.5 bg-emerald-500 animate-eq-1 rounded-full" />
              <span className="w-0.5 bg-emerald-500 animate-eq-2 rounded-full" />
              <span className="w-0.5 bg-emerald-500 animate-eq-3 rounded-full" />
              <span className="w-0.5 bg-emerald-500 animate-eq-4 rounded-full" />
            </div>
          </div>
          <div className="text-xs text-stone-900 dark:text-stone-100 font-mono font-semibold">
            {(totalTokens / 1000).toFixed(1)}k <span className="text-stone-500 dark:text-stone-400 font-sans text-[11px] font-normal">tokens indexed</span>
          </div>
          <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden border border-stone-200 dark:border-stone-700">
            <div className="bg-stone-900 dark:bg-white h-full rounded-full w-[84%]" />
          </div>
        </div>
      )}

      {/* Footer / Badge */}
      <div className="p-3 border-t border-stone-200 dark:border-stone-800/80 bg-[#F9F9F8] dark:bg-[#0C0A09]">
        {!isCollapsed ? (
          <div className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl bg-white dark:bg-[#161412] border border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-800 dark:text-stone-200">
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-stone-900 dark:text-stone-100 leading-none">
                  ElevenLabs Engine
                </span>
                <span className="text-[9px] font-mono text-stone-500 dark:text-stone-400 tracking-tight mt-0.5">
                  Gemini RAG Active
                </span>
              </div>
            </div>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
        ) : (
          <div className="flex justify-center" title="Powered by ElevenLabs Theme">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-800 dark:text-stone-200">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};


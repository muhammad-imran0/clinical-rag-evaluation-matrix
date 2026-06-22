import { useState } from 'react';
import { 
  BookOpen, 
  Cpu, 
  Layers, 
  Database, 
  ShieldAlert, 
  Milestone, 
  Menu, 
  X,
  Award,
  User,
  GraduationCap,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (viewId: string) => void;
  simpleMode?: boolean;
}

export default function Sidebar({ currentView, onViewChange, simpleMode = false }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: 'papers', label: 'Literature Gaps', icon: BookOpen },
    { id: 'llm', label: 'AI Brain Comparison', icon: Cpu },
    { id: 'stack', label: 'How System Works', icon: Layers },
    { id: 'datasets', label: 'Patient Data Source', icon: Database },
    { id: 'limits', label: 'Project Limits', icon: ShieldAlert },
    { id: 'phases', label: 'Our Work Timeline', icon: Milestone },
  ];

  const handleNavClick = (id: string) => {
    onViewChange(id);
    setMobileOpen(false);
  };

  const containerClasses = simpleMode 
    ? "bg-[#FAF7F0] border-[#E6DEC9] text-[#2C2A24]"
    : "bg-slate-950 border-slate-900 text-slate-100";

  return (
    <>
      {/* Mobile Header Bar */}
      <header className={`lg:hidden border-b h-16 px-4 flex items-center justify-between sticky top-0 z-50 ${simpleMode ? 'bg-[#FAF7F0] border-[#E6DEC9]' : 'bg-slate-900 border-slate-800'}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${simpleMode ? 'bg-amber-100 text-amber-800' : 'bg-blue-600/20 text-blue-400'}`}>
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className={`text-sm font-bold ${simpleMode ? 'text-stone-900' : 'text-white'} tracking-tight`}>MSc Dissertation Dashboard</h1>
            <p className="text-sm text-stone-500">Muhammad Imran · UEL</p>
          </div>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-stone-500 hover:text-stone-800 transition-colors"
          aria-label="Toggle menu"
          id="mobile-menu-toggle-btn"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 border-r flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${containerClasses}
        ${mobileOpen ? 'translate-x-0 pt-20 lg:pt-6' : '-translate-x-full'}
      `}>
        {/* Header Block */}
        <div className="flex flex-col gap-6">
          <div className="hidden lg:flex items-center gap-3 pb-6 border-b border-stone-200/60">
            <div className={`p-2.5 rounded-xl border shadow-xs ${simpleMode ? 'bg-amber-50 text-amber-800 border-amber-250' : 'bg-blue-600/10 text-blue-500 border-blue-500/10'}`}>
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className={`text-base font-bold tracking-tight ${simpleMode ? 'text-stone-900' : 'text-slate-100'}`}>MSc AI Dissertation</h1>
              <p className="text-xs text-stone-500 font-medium font-mono">Portfolio Reviewer</p>
            </div>
          </div>

          {/* Student ID Card Badge */}
          <div className={`rounded-xl p-4 border transition-colors ${simpleMode ? 'bg-white border-[#E6DEC9] hover:bg-[#FDFCF7]' : 'bg-slate-900/60 border-slate-900 hover:border-slate-800'}`}>
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-gradient-to-tr from-amber-600 to-amber-700 text-white rounded-lg">
                <User className="h-4 w-4" />
              </div>
              <div>
                <span className="text-sm uppercase tracking-wider text-stone-500 font-extrabold font-mono">Student</span>
                <h3 className={`font-bold text-sm ${simpleMode ? 'text-stone-900' : 'text-slate-200'}`}>Muhammad Imran</h3>
                <code className="text-sm text-amber-700 mt-0.5 block font-mono">u3004795 · UEL</code>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-stone-200/50 flex gap-2 items-center text-stone-600 text-xs">
              <Award className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <div className="truncate">
                <span className="text-sm text-stone-400 block">Supervisor</span>
                <span className={`font-semibold ${simpleMode ? 'text-stone-800' : 'text-slate-300'}`}>Dr. Shaheen Khatoon</span>
              </div>
            </div>
          </div>

          {/* Nav Menu */}
          <nav className="flex flex-col gap-1">
            <span className={`text-sm font-bold uppercase tracking-wider px-3 mb-2 block font-mono ${simpleMode ? 'text-stone-500' : 'text-slate-600'}`}>
              Review Chapters
            </span>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-btn-${item.id}`}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-lg text-base transition-all duration-200 cursor-pointer
                    ${isActive 
                      ? simpleMode
                        ? 'bg-[#EFE9DA] text-stone-950 font-bold border-l-3 border-amber-700'
                        : 'bg-blue-600/10 text-blue-400 font-semibold border-l-2 border-blue-500' 
                      : simpleMode
                        ? 'text-stone-600 hover:text-stone-900 hover:bg-[#F4EFE0]/60 border-l-2 border-transparent'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border-l-2 border-transparent'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-amber-700' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {simpleMode && isActive && (
                    <span className="h-2 w-2 rounded-full bg-amber-700 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Block */}
        <div className={`pt-6 border-t font-mono text-sm ${simpleMode ? 'border-amber-200 text-stone-500' : 'border-slate-900 text-slate-500'}`}>
          <div className="flex justify-between items-center mb-1">
            <span>PREVIEW</span>
            <span className="flex items-center gap-1 text-amber-700 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse"></span>
              READY FOR REVIEW
            </span>
          </div>
          <span>Draft Version 1.2 (2026)</span>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-30 transition-opacity"
        />
      )}
    </>
  );
}

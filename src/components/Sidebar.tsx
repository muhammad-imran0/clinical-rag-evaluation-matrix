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
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (viewId: string) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: 'papers', label: 'Literature Matrix', icon: BookOpen },
    { id: 'llm', label: 'LLM Evaluation (§5.4)', icon: Cpu },
    { id: 'stack', label: 'System Architecture', icon: Layers },
    { id: 'datasets', label: 'Database Index', icon: Database },
    { id: 'limits', label: 'Project Boundaries', icon: ShieldAlert },
    { id: 'phases', label: 'Progress Track', icon: Milestone },
  ];

  const handleNavClick = (id: string) => {
    onViewChange(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <header className="lg:hidden bg-slate-900 border-b border-slate-800 h-16 px-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">Dissertation Tracker</h1>
            <p className="text-[10px] text-slate-400">Muhammad Imran · UEL</p>
          </div>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
          id="mobile-menu-toggle-btn"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-950 border-r border-slate-900 flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${mobileOpen ? 'translate-x-0 pt-20 lg:pt-6' : '-translate-x-full'}
      `}>
        {/* Header Block */}
        <div className="flex flex-col gap-6">
          <div className="hidden lg:flex items-center gap-3 pb-6 border-b border-slate-900">
            <div className="p-2.5 bg-blue-600/10 text-blue-500 rounded-xl border border-blue-500/10 shadow-sm shadow-blue-500/5">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-100 tracking-tight">MSc AI Dissertation</h1>
              <p className="text-xs text-slate-500 font-medium font-mono">UEL Portfolio Tracker</p>
            </div>
          </div>

          {/* Student ID Card Badge */}
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-900 hover:border-slate-800 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-gradient-to-tr from-sky-500 to-indigo-500 text-white rounded-lg">
                <User className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold font-mono">Researcher</span>
                <h3 className="font-semibold text-slate-200 text-sm">Muhammad Imran</h3>
                <code className="text-[11px] text-sky-400 mt-0.5 block font-mono">u3004795 · UEL</code>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-900/50 flex gap-2 items-center text-slate-400 text-xs">
              <Award className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block">Supervisor</span>
                <span className="font-medium text-slate-300">Dr. Shaheen Khatoon</span>
              </div>
            </div>
          </div>

          {/* Nav Menu */}
          <nav className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-3 mb-2 block font-mono">Navigation Modules</span>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-btn-${item.id}`}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 cursor-pointer
                    ${isActive 
                      ? 'bg-blue-600/10 text-blue-400 font-semibold border-l-2 border-blue-500' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border-l-2 border-transparent'}
                  `}
                >
                  <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Block */}
        <div className="pt-6 border-t border-slate-900 text-[11px] text-slate-500 font-mono">
          <div className="flex justify-between items-center mb-1">
            <span>SYSTEM STATE</span>
            <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              PORTFOLIO ACTIVE
            </span>
          </div>
          <span>Academic Draft Year · 2026</span>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30 transition-opacity"
        />
      )}
    </>
  );
}

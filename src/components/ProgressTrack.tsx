import { useState, useMemo } from 'react';
import { PHASES_DATA } from '../data';
import { PhaseItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Milestone, 
  Check, 
  Clock,
  CheckCircle,
  Circle
} from 'lucide-react';

export default function ProgressTrack({ simpleMode = false }: { simpleMode?: boolean }) {
  const [phases, setPhases] = useState<PhaseItem[]>(PHASES_DATA);
  const [activePhaseId, setActivePhaseId] = useState<string>('ph-2');

  const toggleTask = (phaseId: string, taskTitle: string) => {
    setPhases(prevPhases => {
      return prevPhases.map(phase => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          tasks: phase.tasks.map(task => {
            if (task.title !== taskTitle) return task;
            return { ...task, completed: !task.completed };
          })
        };
      });
    });
  };

  // Dynamic progress stats
  const progressStats = useMemo(() => {
    let totalTasksCount = 0;
    let completedTasksCount = 0;

    phases.forEach(phase => {
      phase.tasks.forEach(task => {
        totalTasksCount++;
        if (task.completed) {
          completedTasksCount++;
        }
      });
    });

    return {
      total: totalTasksCount,
      completed: completedTasksCount,
      percent: Math.round((completedTasksCount / totalTasksCount) * 100)
    };
  }, [phases]);

  const activePhase = useMemo(() => {
    return phases.find(p => p.id === activePhaseId) || phases[1];
  }, [phases, activePhaseId]);

  if (simpleMode) {
    return (
      <div className="space-y-6">
        {/* Simple Page Header */}
        <div className="pb-4 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-display text-stone-900 tracking-tight flex items-center gap-2.5">
              <Milestone className="h-7 w-7 text-amber-700" />
              Our Dissertation Work Plan
            </h2>
            <p className="text-base text-stone-600 mt-1.5">
              A dynamic, real-time interactive checklist tracking Muhammad Imran's progress toward the final thesis submission.
            </p>
          </div>

          {/* Progress bar info */}
          <div className="flex items-center gap-3 bg-stone-900 text-[#FCFBF9] px-5 py-3 rounded-xl text-sm font-semibold">
            <div className="text-right">
              <span className="text-xs uppercase font-bold text-amber-100 block font-mono">My Thesis Progress</span>
              <span className="font-mono text-lg text-amber-400 font-bold">{progressStats.percent}% Completed</span>
            </div>
            <div className="w-16 bg-stone-800 h-2.5 rounded-full overflow-hidden shrink-0 border border-stone-700">
              <div 
                className="h-full bg-amber-400 rounded-full transition-all duration-300" 
                style={{ width: `${progressStats.percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Checklist Card container */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          
          {/* Timeline side */}
          <div className="xl:col-span-8 bg-white border border-stone-200 rounded-xl p-6 space-y-4">
            <span className="text-sm font-bold text-stone-500 uppercase tracking-wider font-mono">Interactive Plan Chapters</span>
            <div className="space-y-3">
              {phases.map((phase) => {
                const isActive = activePhaseId === phase.id;
                const completedCount = phase.tasks.filter(t => t.completed).length;

                return (
                  <div
                    key={phase.id}
                    onClick={() => setActivePhaseId(phase.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-[#FAF8F4] border-amber-600 shadow-2xs' 
                        : 'bg-white border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-mono font-bold px-2 py-0.5 rounded ${
                        phase.status === 'done' ? 'bg-emerald-100 text-emerald-800' :
                        phase.status === 'now' ? 'bg-amber-100 text-amber-800' :
                        'bg-stone-100 text-stone-600'
                      }`}>
                        {phase.status === 'done' ? '✓ DONE' :
                         phase.status === 'now' ? '⏳ ACTIVE NOW' :
                         '🔜 UP NEXT'}
                      </span>
                      <span className="text-sm text-stone-600 font-mono font-bold">
                        ({completedCount}/{phase.tasks.length} Completed)
                      </span>
                    </div>
                    <h4 className="font-bold text-stone-900 text-base mt-1.5">{phase.title}</h4>
                    <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed mt-1">{phase.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Checklist side */}
          <div className="xl:col-span-4 bg-white border border-stone-200 rounded-xl p-6 space-y-4">
            <div>
              <span className="text-sm font-bold text-stone-500 uppercase tracking-widest font-mono">Detailed Supervisor Sign-off</span>
              <h3 className="font-bold text-stone-900 text-lg mt-1">Tasks for "{activePhase.title}"</h3>
              <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                Click any checkbox below to check off or test-complete tasks. Notice how our thesis progress score updates at the top!
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-100">
              {activePhase.tasks.map((task) => (
                <div 
                  key={task.title}
                  onClick={() => toggleTask(activePhase.id, task.title)}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all select-none ${
                    task.completed 
                      ? 'bg-emerald-50/20 border-emerald-250 text-stone-900' 
                      : 'bg-[#FDFCFB]/80 hover:bg-[#FAF8F5] border-stone-200 text-stone-600'
                  }`}
                >
                  <button className="shrink-0 mt-0.5">
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-emerald-800 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-stone-400 shrink-0" />
                    )}
                  </button>
                  <span className={`text-base select-none leading-snug ${task.completed ? 'line-through font-semibold text-stone-500' : ''}`}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // STANDARD EXPERT LAYOUT
  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2.5">
            <Milestone className="h-6 w-6 text-blue-600" />
            Implementation Progress Tracker
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time interactive vertical timeline mapping research milestones, completed tasks, and upcoming pipeline assemblies.
          </p>
        </div>
        
        {/* Dynamic overall progress meter */}
        <div className="flex items-center gap-3 bg-slate-900 text-slate-100 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-950 shadow-md">
          <div className="text-right">
            <span className="text-xs uppercase font-bold text-slate-400 block font-mono">Completed Core Tasks</span>
            <span className="font-mono text-sm text-sky-400 font-bold">{progressStats.percent}% Overall Complete</span>
          </div>
          <div className="w-16 bg-slate-800 h-2.5 rounded-full overflow-hidden shrink-0 border border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-teal-400 to-sky-400 rounded-full transition-all duration-300" 
              style={{ width: `${progressStats.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Timeline Stages (Left) + Detail Task Checklist (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Timeline column */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs relative">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono mb-6">Interactive Pipeline Stages</span>

          {/* Vertical pipeline line */}
          <div className="absolute left-10 top-18 bottom-8 w-0.5 bg-slate-100 hidden sm:block" />

          <div className="space-y-6">
            {phases.map((phase) => {
              const isActive = activePhaseId === phase.id;
              const compCount = phase.tasks.filter(t => t.completed).length;

              return (
                <div 
                  key={phase.id}
                  onClick={() => setActivePhaseId(phase.id)}
                  className={`
                    relative flex items-start gap-4 p-4 rounded-xl border select-none duration-200 cursor-pointer
                    ${isActive 
                      ? 'bg-blue-600/5 ring-1 ring-blue-500/20 border-blue-200' 
                      : 'border-slate-100 hover:bg-slate-50/50 hover:border-slate-200'}
                  `}
                >
                  {/* Step status icon bullet */}
                  <div className="relative z-10 shrink-0 hidden sm:block">
                    {phase.status === 'done' ? (
                      <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-white shadow-xs">
                        <Check className="h-4.5 w-4.5 stroke-[3]" />
                      </div>
                    ) : phase.status === 'now' ? (
                      <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white shadow-sm font-bold font-mono text-sm leading-none animate-pulse">
                        ⌛
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-2 border-slate-200 font-bold font-mono text-xs">
                        {phase.id.replace('ph-', '')}
                      </div>
                    )}
                  </div>

                  {/* Text descriptions */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-bold text-slate-400 uppercase">{phase.id}</span>
                      <span className="text-sm text-slate-400 font-mono font-bold">
                        {compCount} of {phase.tasks.length} Done
                      </span>
                    </div>
                    <h3 className={`font-bold text-sm md:text-base leading-tight ${isActive ? 'text-blue-700' : 'text-slate-900'}`}>
                      {phase.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{phase.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Task checklist (Right side card) */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4 self-start">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 font-mono uppercase tracking-widest">Active Checklist</span>
              <span className="flex items-center gap-1 text-sm text-amber-500 font-bold font-mono">
                <Clock className="h-3.5 w-3.5 text-amber-500" /> TIMELINE EXECUTABLE
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-base mt-1">Milestone Action Gaps</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans mt-0.5">
              Review granular tasks required to successfully validate the {activePhase.id} core.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-50 pt-4">
            {activePhase.tasks.map((task) => (
              <div 
                key={task.title}
                onClick={() => toggleTask(activePhase.id, task.title)}
                className={`
                  p-3 rounded-xl border flex items-center gap-3 transition-all duration-200 cursor-pointer select-none
                  ${task.completed 
                    ? 'bg-emerald-50/10 border-emerald-100 text-slate-650' 
                    : 'bg-slate-50/50 border-slate-150 hover:bg-slate-100/30 text-slate-800'}
                `}
                id={`task-item-${task.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <button className="shrink-0">
                  {task.completed ? (
                    <div className="h-4.5 w-4.5 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                      <Check className="h-3 w-3 stroke-[3.5]" />
                    </div>
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-slate-310 bg-white" />
                  )}
                </button>
                <span className={`text-xs font-sans font-medium select-none ${task.completed ? 'line-through text-slate-450' : ''}`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

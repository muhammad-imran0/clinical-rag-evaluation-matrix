import { useState, useMemo } from 'react';
import { PHASES_DATA } from '../data';
import { PhaseItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Milestone, 
  CheckCircle, 
  Calendar, 
  Check, 
  ChevronRight, 
  Circle, 
  Activity, 
  Award,
  RefreshCw,
  Clock
} from 'lucide-react';

export default function ProgressTrack() {
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

  // Calculations for dynamic progress metrics
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

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2.5">
            <Milestone className="h-6 w-6 text-blue-600" />
            Implementation Progress Tracker
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time interactive vertical timeline mapping research milestones, completed tasks, and upcoming pipeline assemblies.
          </p>
        </div>
        
        {/* Dynamic overall progress meter */}
        <div className="flex items-center gap-3 bg-slate-900 text-slate-100 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-955 shadow-md">
          <div className="text-right">
            <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Completed Core Tasks</span>
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

      {/* Main Grid: Interactive Timeline Steps (Left) + Detail Task Checklist (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Timeline column */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs relative">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono mb-6">Interactive Pipeline Stages</span>

          {/* Vertical pipeline line */}
          <div className="absolute left-10 top-18 bottom-8 w-0.5 bg-slate-100 hidden sm:block" />

          <div className="space-y-6">
            {phases.map((phase, idx) => {
              const isActive = activePhaseId === phase.id;
              
              // Calculate specific phase completion rate
              const compCount = phase.tasks.filter(t => t.completed).length;
              const ratePercent = Math.round((compCount / phase.tasks.length) * 100);

              return (
                <div 
                  key={phase.id}
                  onClick={() => setActivePhaseId(phase.id)}
                  className={`
                    relative flex items-start gap-4 p-4 rounded-xl border select-none duration-250 cursor-pointer
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
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 overflow-hidden">
                      <span className="text-[9px] uppercase font-mono font-bold text-slate-405 shrink-0">STAGE MODEL 0{idx + 1}</span>
                      <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                        phase.status === 'done' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        phase.status === 'now' ? 'bg-blue-50 text-blue-700 border-blue-100 animate-pulse' :
                        'bg-slate-50 text-slate-500 border-slate-150'
                      }`}>
                        {phase.status === 'done' ? 'Stage Clear' : phase.status === 'now' ? 'Active Focus' : 'Scheduled'}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm md:text-base leading-snug truncate">{phase.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">{phase.desc}</p>

                    {/* Progress tracking badge details */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                        <Clock className="h-3 w-3" />
                        <span>Tasks Check: {compCount} / {phase.tasks.length}</span>
                      </div>
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${phase.status === 'done' ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                          style={{ width: `${ratePercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{ratePercent}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Task checklist Column (Right) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-950 rounded-2xl p-5 text-slate-200 shadow-md flex flex-col justify-between self-start">
          <div className="space-y-4">
            <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Stage Checklist Assembly</span>
              <Activity className="h-4 w-4 text-blue-400" />
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-blue-400 font-mono">ACTIVE DISSERTATION BLOCK DETAILED VIEW</span>
                <h3 className="text-base font-bold text-slate-50 mt-1 leading-snug">
                  {activePhase.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {activePhase.desc}
                </p>
              </div>

              {/* Task list with inputs */}
              <div className="space-y-2 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-mono block">Milestone Interactive Tasks</span>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {activePhase.tasks.map((task, idx) => (
                    <label 
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-850 hover:border-slate-800 cursor-pointer select-none transition-all group"
                      id={`task-label-${activePhase.id}-${idx}`}
                    >
                      <input 
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(activePhase.id, task.title)}
                        className="mt-0.5 h-4 w-4 text-blue-600 bg-slate-900 rounded border-slate-800 focus:ring-blue-500 hover:ring-1 shrink-0 cursor-pointer"
                        id={`task-checkbox-${activePhase.id}-${idx}`}
                      />
                      <span className={`text-[12.5px] leading-snug transition-colors duration-150 ${task.completed ? 'line-through text-slate-500' : 'text-slate-300 group-hover:text-slate-100'}`}>
                        {task.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Verification Box */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex gap-2 items-start text-xs text-slate-400 p-3 bg-slate-950/50 rounded-xl border border-slate-850/40">
            <Award className="h-4.5 w-4.5 text-amber-500 shrink-0" />
            <p className="leading-relaxed">
              <strong>Checklist State Persistent</strong>: Checking off tasks reflects instantly on the master indicator percentage at the top. Use this to audit and verify current progress stages interactively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

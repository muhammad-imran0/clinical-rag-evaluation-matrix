import { useState } from 'react';
import Sidebar from './components/Sidebar';
import LiteratureMatrix from './components/LiteratureMatrix';
import LlmEvaluation from './components/LlmEvaluation';
import SystemArchitecture from './components/SystemArchitecture';
import DatabaseIndex from './components/DatabaseIndex';
import ProjectBoundaries from './components/ProjectBoundaries';
import ProgressTrack from './components/ProgressTrack';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('papers');
  const [simpleMode, setSimpleMode] = useState<boolean>(true); // Defaults to true as requested for simplicity

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen transition-colors duration-300 ${simpleMode ? 'bg-[#FCFBF9] text-stone-900' : 'bg-slate-50/50 text-slate-800'} antialiased font-sans`}>
      {/* Navigation Sidebar Drawer */}
      <Sidebar currentView={currentView} onViewChange={setCurrentView} simpleMode={simpleMode} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden p-3 md:p-5 lg:p-6 w-full min-w-0 flex flex-col text-base">
        
        {/* Professor-friendly Switch Banner */}
        <div className={`mb-6 p-4 rounded-xl border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
          simpleMode 
            ? 'bg-[#F4EFE6] border-[#DCD5C5] shadow-xs' 
            : 'bg-blue-50/50 border-blue-100 shadow-xs'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${simpleMode ? 'bg-[#E3DAC9] text-stone-800' : 'bg-blue-100 text-blue-700'}`}>
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className={`text-sm font-bold font-mono tracking-wider uppercase ${simpleMode ? 'text-amber-800' : 'text-blue-700'}`}>
                {simpleMode ? '🎓 Academic Evaluation Mode Active' : '🔬 Technical Blueprint Mode Active'}
              </p>
              <h2 className="text-base font-semibold mt-1 leading-snug">
                {simpleMode 
                  ? 'Showing simplified summaries with plain language explanations of literature gaps and results.'
                  : 'Showing detailed research references with code parameters, mathematical metrics, and file tags.'}
              </h2>
            </div>
          </div>
          
          <button
            onClick={() => setSimpleMode(!simpleMode)}
            id="mode-toggle-button"
            className={`cursor-pointer px-5 py-2.5 rounded-lg text-sm font-bold font-mono tracking-wide shadow-xs transition-all hover:scale-[1.02] flex items-center gap-1.5 shrink-0 ${
              simpleMode 
                ? 'bg-stone-900 hover:bg-stone-800 text-[#FCFBF9]' 
                : 'bg-white hover:bg-slate-100 text-blue-700 border border-blue-200'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {simpleMode ? 'Switch to Technical Details' : 'Switch to Simple Reading Layout'}
          </button>
        </div>

        {/* Dynamic Navigation Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView + '-' + (simpleMode ? 'simple' : 'tech')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              id={`view-container-${currentView}`}
              className="w-full"
            >
              {currentView === 'papers' && <LiteratureMatrix simpleMode={simpleMode} />}
              {currentView === 'llm' && <LlmEvaluation simpleMode={simpleMode} />}
              {currentView === 'stack' && <SystemArchitecture simpleMode={simpleMode} />}
              {currentView === 'datasets' && <DatabaseIndex simpleMode={simpleMode} />}
              {currentView === 'limits' && <ProjectBoundaries simpleMode={simpleMode} />}
              {currentView === 'phases' && <ProgressTrack simpleMode={simpleMode} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

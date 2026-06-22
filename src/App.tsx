import { useState } from 'react';
import Sidebar from './components/Sidebar';
import LiteratureMatrix from './components/LiteratureMatrix';
import LlmEvaluation from './components/LlmEvaluation';
import SystemArchitecture from './components/SystemArchitecture';
import DatabaseIndex from './components/DatabaseIndex';
import ProjectBoundaries from './components/ProjectBoundaries';
import ProgressTrack from './components/ProgressTrack';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('papers');

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50/50 text-slate-800 antialiased font-sans">
      {/* Navigation Sidebar Drawer */}
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            id={`view-container-${currentView}`}
            className="w-full"
          >
            {currentView === 'papers' && <LiteratureMatrix />}
            {currentView === 'llm' && <LlmEvaluation />}
            {currentView === 'stack' && <SystemArchitecture />}
            {currentView === 'datasets' && <DatabaseIndex />}
            {currentView === 'limits' && <ProjectBoundaries />}
            {currentView === 'phases' && <ProgressTrack />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

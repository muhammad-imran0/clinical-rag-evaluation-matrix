import { useState, useMemo } from 'react';
import { PAPERS_DATA } from '../data';
import { LitPaper } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ExternalLink, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  BadgeHelp, 
  Settings,
  Filter,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function LiteratureMatrix({ simpleMode = false }: { simpleMode?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [openPaperId, setOpenPaperId] = useState<string | null>('primary-survey');

  // Extract unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    PAPERS_DATA.forEach(paper => {
      paper.tags.forEach(tag => tagsSet.add(tag));
    });
    return ['All', ...Array.from(tagsSet)];
  }, []);

  // Filter papers
  const filteredPapers = useMemo(() => {
    return PAPERS_DATA.filter(paper => {
      const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.limitation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.solution.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesTag = selectedTag === 'All' || paper.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  // Plain-English translations of paper limitations and fixes
  const getSimpleExplanation = (id: string) => {
    switch(id) {
      case 'primary-survey':
        return {
          focus: "A complete study of AI models in hospitals.",
          problem: "Standard medical AI systems easily get confused by complex terminology and can match words incorrectly.",
          solution: "Imran's work adds a clean visual assistant that filters and coordinates data before making conclusions, preventing errors."
        };
      case 'paper-1':
        return {
          focus: "X-ray reasoning system designed for clinical use.",
          problem: "The AI fails and crashes when diagnostic feedback tools give conflictive or opposite labels.",
          solution: "Imran added an 'intelligence filter' to check and resolve conflicting outputs before they reach the main system."
        };
      case 'paper-2':
        return {
          focus: "System designed to match images and past text history.",
          problem: "The AI copies too much from a patient's historical medical files instead of actually looking at their new image.",
          solution: "Imran maps visual heatmaps (colored highlights) that force the AI to anchor word generation to the current image details."
        };
      case 'paper-3':
        return {
          focus: "Search tool to find past images similar to a patient's case.",
          problem: "It finds similar images, but it cannot write a summary report for physicians.",
          solution: "Imran connected this search tool to a document writer (LangChain) to automatically generate human-readable medical reports."
        };
      case 'paper-4':
        return {
          focus: "Multi-Agent group of AI bots writing medical files.",
          problem: "The AI bots rewrite reports blind without actually looking at the visual scan itself.",
          solution: "Imran forces the AI agent team to use visual attention overlays, providing an explainable reviewer screen to check findings."
        };
      case 'paper-5':
        return {
          focus: "Evidence-based helper bot for radiologists.",
          problem: "It only matches plain text to patient logs, remaining entirely oblivious to visual image anomalies.",
          solution: "Imran builds a robust two-way lookup system that matches both visual features (using CLIP) and written history."
        };
      case 'paper-6':
        return {
          focus: "Helper copilot assistant for diagnostic clinics.",
          problem: "The AI assistant depends completely on internal memory, creating a significant risk of 'hallucinating' fake facts.",
          solution: "Imran adds an external check-step checkpoint to verify every model finding against proven medical databases."
        };
      case 'paper-7':
        return {
          focus: "Deep CT lung nodule detection agent system.",
          problem: "The AI only knows how to examine 3D CT spots and cannot process 2D X-rays or use visual heatmaps.",
          solution: "Imran extends the team-verification layout to handle 2D X-rays and breast ultrasound scans with clear explainable visual grids."
        };
      case 'paper-8':
        return {
          focus: "Multimodal AI assistant team that generates diagnostic reports.",
          problem: "The system is a closed black-box with no visual review screen to check or trace specific words back to image pixels.",
          solution: "Imran configures a parallel visual review interface displaying dynamic matching scores and heatmaps overlaid directly on the scan."
        };
      default:
        return {
          focus: "Structured clinical RAG lookup reference.",
          problem: "Naive text match errors.",
          solution: "Added localized metadata verification loops."
        };
    }
  };

  const togglePaper = (id: string) => {
    setOpenPaperId(openPaperId === id ? null : id);
  };

  if (simpleMode) {
    return (
      <div className="space-y-6">
        {/* Simple Page Header */}
        <div className="pb-4 border-b border-stone-200">
          <h2 className="text-2xl font-bold font-display text-stone-900 tracking-tight flex items-center gap-2.5">
            <BookOpen className="h-6 w-6 text-amber-700" />
            Literature Gaps & Solutions
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            To build a great dissertation, we must find what earlier scientific research was missing (the "limitations"), and show how Imran's project fixes those gaps.
          </p>
        </div>

        {/* Professor Quick Guide */}
        <div className="p-5 bg-[#FAF7F0] border border-[#E6DEC9] rounded-xl text-stone-800 space-y-2">
          <p className="text-xs font-bold font-mono text-amber-800 uppercase tracking-wider">💡 Supervisor Quick Guide</p>
          <p className="text-sm leading-relaxed">
            Every row below represents one key paper from our dissertation review. Clicking any of them instantly shows 
            <strong className="text-stone-950"> what that paper lacked</strong> and <strong className="text-amber-800">how my project solves it</strong> in simple, easy-to-read terms.
          </p>
        </div>

        {/* Simplified Paper Cards Group */}
        <div className="space-y-4">
          {PAPERS_DATA.map((paper, index) => {
            const simpleExp = getSimpleExplanation(paper.id);
            const isOpen = openPaperId === paper.id;
            const isPrimary = paper.id === 'primary-survey';

            return (
              <div 
                key={paper.id} 
                className={`transition-all duration-200 border rounded-xl overflow-hidden bg-white shadow-xs ${
                  isOpen 
                    ? 'border-amber-600 ring-1 ring-amber-600/25 bg-[#FAF9F5]' 
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                {/* Header Block button */}
                <div 
                  onClick={() => togglePaper(paper.id)}
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FDFBFA] select-none"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isPrimary ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {isPrimary ? 'PRIMARY RESEARCH GUIDE' : `REFERENCE MODEL 0${index}`}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">({paper.venue})</span>
                    </div>
                    <h3 className="font-bold text-stone-900 text-base leading-snug">{paper.title}</h3>
                    <p className="text-xs text-stone-600 italic">
                      <strong className="text-stone-700">What it does:</strong> {simpleExp.focus}
                    </p>
                  </div>
                  <button 
                    className={`p-1.5 rounded-lg border border-stone-200 text-stone-500 ${isOpen ? 'rotate-180 bg-stone-100' : ''} transition-transform`}
                    aria-label="Toggle details"
                    id={`toggle-simple-paper-${paper.id}`}
                  >
                    <ChevronDown className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Details Section */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="border-t border-stone-200 overflow-hidden bg-white"
                    >
                      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* Column 1: Missing Piece */}
                        <div className="p-4 bg-red-50/60 border border-red-200 rounded-lg space-y-2">
                          <div className="flex items-center gap-2 text-red-700">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider font-mono">The Problem (What was missing)</span>
                          </div>
                          <p className="text-sm text-red-950 leading-relaxed font-serif">
                            "{simpleExp.problem}"
                          </p>
                          <div className="text-[11px] text-red-800 italic pt-1 border-t border-red-100 mt-2">
                            <strong className="font-mono">Original paper issue:</strong> {paper.limitation}
                          </div>
                        </div>

                        {/* Column 2: Imran's Solution */}
                        <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-2">
                          <div className="flex items-center gap-2 text-emerald-800">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider font-mono">Imran's Solution & Integration</span>
                          </div>
                          <p className="text-sm text-emerald-950 leading-relaxed font-sans">
                            {simpleExp.solution}
                          </p>
                          <div className="text-[11px] text-emerald-800 pt-1 border-t border-emerald-100 mt-2">
                            <strong className="font-mono">System integration:</strong> {paper.solution}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // STANDARD EXPERT TECHNICAL MODE
  return (
    <div className="space-y-6">
      {/* Top Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2.5">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Literature Matrix & Traceability
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Academic source analysis, identified research limitations, and custom modular solutions mapping gaps.
          </p>
        </div>
        <div className="text-xs bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-slate-500 font-mono flex items-center gap-2">
          <span>Active Bibliographic Trace: </span>
          <span className="font-bold text-blue-600">Post-Retrieval Refinement</span>
        </div>
      </div>

      {/* Advanced Literature Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Literature Size</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{PAPERS_DATA.filter(p => p.id !== 'primary-survey').length}</span>
            <span className="text-xs font-semibold text-slate-500">Indexed Cases</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Foundations</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{PAPERS_DATA.filter(p => p.id === 'primary-survey').length}</span>
            <span className="text-xs font-semibold text-sky-600">Core Surveys</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Dataset Focus</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{PAPERS_DATA.filter(p => p.tags.some(t => t.includes('MIMIC-CXR'))).length}</span>
            <span className="text-xs font-semibold text-indigo-600">MIMIC-CXR Focus</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Agent Design</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{PAPERS_DATA.filter(p => p.tags.some(t => t.toLowerCase().includes('agent'))).length}</span>
            <span className="text-xs font-semibold text-purple-600">Multi-Agent Systems</span>
          </div>
        </div>
      </div>

      {/* Primary Survey Source Card Group */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono mb-3">Primary Source Reference</span>
        {PAPERS_DATA.filter(p => p.id === 'primary-survey').map(paper => (
          <div key={paper.id} id={`paper-card-${paper.id}`} className="bg-gradient-to-r from-blue-500/5 to-slate-50/50 rounded-xl border border-blue-100/60 p-5 shadow-xs">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug">{paper.title}</h3>
                <a 
                  href={paper.doi} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors mt-1"
                >
                  <ExternalLink className="h-3 w-3 shrink-0" />
                  <span>{paper.venue}</span>
                </a>
              </div>
              <span className="shrink-0 text-[10px] font-bold px-2 py-1 rounded bg-blue-100/80 text-blue-700 font-mono border border-blue-200 uppercase tracking-wider">
                {paper.fileLabel}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3.5">
              {paper.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100/50">
                  {t}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="p-3 bg-white/80 rounded-lg border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Survey Scope Description</span>
                <p className="text-[12.5px] text-slate-600 leading-relaxed font-sans">{paper.context}</p>
              </div>
              <div className="p-3 bg-emerald-50/40 rounded-lg border border-emerald-100/50 space-y-1">
                <span className="text-[10px] font-bold text-emerald-600/80 uppercase tracking-wider block font-mono">Architecture Alignment</span>
                <p className="text-[12.5px] text-emerald-800 leading-relaxed font-sans">{paper.integration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Filters and Search */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">Curated Benchmark Matrix</span>
        
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search literature references, gaps, formulas or venues..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-xs placeholder:text-slate-400 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-sans"
              id="literature-search-input"
            />
          </div>

          {/* Tag filters scrolling pill list */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar shrink-0">
            <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            {['All', 'MIMIC-CXR', 'Reasoning Agent', 'ACL 2026', 'Nature 2025', 'AAAI 2026', 'Multimodal'].map((pillTag) => (
              <button
                key={pillTag}
                onClick={() => setSelectedTag(pillTag)}
                id={`tag-filter-${pillTag}`}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer
                  ${selectedTag === pillTag 
                    ? 'bg-slate-900 text-white font-semibold' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}
                `}
              >
                {pillTag}
              </button>
            ))}
          </div>
        </div>

        {/* Papers List */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredPapers.filter(p => p.id !== 'primary-survey').map((paper, index) => {
              const isOpen = openPaperId === paper.id;
              return (
                <motion.div
                  layout="position"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={paper.id}
                  id={`paper-card-${paper.id}`}
                  className={`
                    bg-white border rounded-xl overflow-hidden transition-all duration-200
                    ${isOpen ? 'ring-1 ring-blue-500/30 border-blue-200 shadow-sm' : 'border-slate-100 hover:border-slate-350 hover:shadow-xs'}
                  `}
                >
                  {/* Header/Title collapsed bar */}
                  <div 
                    onClick={() => togglePaper(paper.id)}
                    className="p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors select-none"
                  >
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="font-mono text-xs font-bold text-slate-400">RESEARCH BLOCK [0{index + 1}]</span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 align-middle shrink-0">
                          <FileText className="h-3 w-3" />
                          {paper.fileLabel}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm md:text-base tracking-tight leading-snug">{paper.title}</h4>
                      
                      {/* Condensed Tag pills */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                          {paper.venue}
                        </span>
                        {paper.tags.filter(t => t !== paper.fileLabel && t !== paper.venue).map(t => (
                          <span key={t} className="text-[10.5px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button 
                      className={`p-1.5 rounded-lg border border-slate-150 text-slate-500 hover:bg-slate-100 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      aria-label="Expand details"
                      id={`reveal-btn-${paper.id}`}
                    >
                      <ChevronDown className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  {/* Expandable details panel */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-slate-50 overflow-hidden"
                      >
                        <div className="p-4 md:p-5 bg-slate-50/40 space-y-4">
                          {/* Main contextual background */}
                          <div className="space-y-1">
                            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Paper Context & Methodology</h5>
                            <p className="text-xs text-slate-600 leading-relaxed font-sans">{paper.context}</p>
                          </div>

                          {/* Dual-column gap vs formula resolution */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            {/* Identified clinical gap */}
                            <div className="p-4 bg-red-50/20 border border-red-100/60 rounded-xl space-y-2">
                              <div className="flex items-center gap-2 text-red-700">
                                <BadgeHelp className="h-4 w-4 shrink-0" />
                                <span className="text-xs font-bold uppercase tracking-wider font-mono">Identified Limitation & Gap</span>
                              </div>
                              <p className="text-xs text-red-800 leading-relaxed font-medium font-sans">
                                {paper.limitation}
                              </p>
                            </div>

                            {/* Designed Pipeline solution */}
                            <div className="p-4 bg-emerald-50/20 border border-emerald-100/60 rounded-xl space-y-2">
                              <div className="flex items-center gap-2 text-emerald-700">
                                <Settings className="h-4 w-4 shrink-0" />
                                <span className="text-xs font-bold uppercase tracking-wider font-mono">Design Solution & Fix</span>
                              </div>
                              <p className="text-xs text-emerald-800 leading-relaxed font-sans">
                                {paper.solution}
                              </p>
                            </div>
                          </div>

                          {/* DOI Direct link */}
                          <div className="flex justify-start text-[11px] pt-1">
                            <a 
                              href={paper.doi} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 border border-blue-50 bg-white hover:bg-blue-50/50 px-3 py-1 rounded-md"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Validate index reference directly at source ({paper.venue})
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredPapers.length === 0 && (
            <div className="text-center py-12 bg-slate-50 border border-slate-100 rounded-xl">
              <HelpCircle className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <h5 className="font-semibold text-slate-600 text-sm">No clinical references match your query</h5>
              <p className="text-xs text-slate-400 mt-1">Try resetting the selection tags or adjusting the search query keywords.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedTag('All'); }}
                className="mt-3 text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

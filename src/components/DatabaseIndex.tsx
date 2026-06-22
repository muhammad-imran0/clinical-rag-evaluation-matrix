import { useState, useMemo } from 'react';
import { DATASETS_DATA } from '../data';
import { DatasetItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  ExternalLink, 
  Search, 
  FileText, 
  Info, 
  TrendingUp, 
  Tag,
  BookOpen,
  CornerDownRight,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

export default function DatabaseIndex() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('mimic-cxr');
  const [activeDiagnosisKey, setActiveDiagnosisKey] = useState<string>('normal');

  // Pre-baked clinical record registry simulating MIMIC-CXR files
  const SIMULATED_CXR_REGISTRY = {
    normal: {
      id: 'REC-29381',
      anatomy: 'Chest (AP and Lateral)',
      findingTags: ['Anatomically Clear', 'Regular Silhouettes'],
      findings: 'The lungs are clear and fully expanded bilaterals. There is no pleural effusion or pneumothorax. The cardiomediastinal silhouette and pulmonary vasculature are within standard physiological limits. No bony abnormalities in the thoracic cage are seen. Surgical clips within the right axilla are stable.',
      impression: 'No acute cardiopulmonary disease. Symmetrically clear visual field mapping.'
    },
    pneumonia: {
      id: 'REC-88472',
      anatomy: 'Chest (Portable)',
      findingTags: ['Pneumonia', 'Focal Infiltration'],
      findings: 'There is a new patchy consolidation in the right lung base, consistent with a localized aspiration pneumonia. Left lung is clear. Heart size is slightly enlarged but unchanged from prior examination. High placement of NG tube is noted. No large pleural collections or air leaks are seen.',
      impression: 'Focal air-space consolidation in the right base, highly suggesting active pneumonia.'
    },
    atelectasis: {
      id: 'REC-55104',
      anatomy: 'Chest (AP Single View)',
      findingTags: ['Atelectasis', 'Pleural Effusion'],
      findings: 'Bilateral lung volumes are low, provoking prominent expiratory crowding. Sheetlike atelectasis is noted at both lung bases. Moderate right-sided pleural effusion is present, slightly larger compared to the previous radiologic study. Centrally, the trachea is well aligned. Cardiomegaly is noted.',
      impression: 'Severe subsegmental atelectasis accompanied by moderate bilateral pleural effusions.'
    },
    pacemaker: {
      id: 'REC-11239',
      anatomy: 'Chest (Dual-view)',
      findingTags: ['Pacemaker', 'Tubular structures'],
      findings: 'Dual-lead permanent pacemaker is stably situated within the left chest wall. Lead tips terminate at the right atrium and right ventricular apex, stable compared to prior. Interstitial markings are slightly prominent throughout the pulmonary parenchyma. Heart silhouette is stable. No pleural leaks.',
      impression: 'Stable situation of dual-lead pacemaker system with mild chronic pulmonary congestion.'
    }
  };

  const currentDataset = useMemo(() => {
    return DATASETS_DATA.find(d => d.id === selectedDatasetId) || DATASETS_DATA[0];
  }, [selectedDatasetId]);

  const activeRecord = useMemo(() => {
    return SIMULATED_CXR_REGISTRY[activeDiagnosisKey as keyof typeof SIMULATED_CXR_REGISTRY] || SIMULATED_CXR_REGISTRY.normal;
  }, [activeDiagnosisKey]);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2.5">
            <Database className="h-6 w-6 text-blue-600" />
            Clinical Data Index
          </h2>
          <p className="text-sm text-slate-500 mt-1.5">
            Secure, anonymous medical dataset coordinates, MIMIC-CXR validation parameters, and Phase-1 prototype metadata.
          </p>
        </div>
        <div className="text-xs bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-slate-500 font-mono flex items-center gap-2">
          <span>Active Warehouse: </span>
          <span className="font-bold text-blue-600">MIMIC-CXR Mirror (30k rows)</span>
        </div>
      </div>

      {/* Dataset Selection Tabs */}
      <div className="flex border-b border-slate-100 gap-1">
        {DATASETS_DATA.map((dataset) => (
          <button
            key={dataset.id}
            onClick={() => setSelectedDatasetId(dataset.id)}
            id={`dataset-tab-btn-${dataset.id}`}
            className={`
              px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer
              ${selectedDatasetId === dataset.id 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-550 hover:text-slate-800'}
            `}
          >
            {dataset.id === 'mimic-cxr' ? 'MIMIC-CXR Target' : 'BrEaST Prototype Archive'}
          </button>
        ))}
      </div>

      {/* Primary dataset showcase card */}
      <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs relative overflow-hidden space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-4 gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 tracking-widest font-mono">Verified Validation Source</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">{currentDataset.title}</h3>
            {currentDataset.link && (
              <a 
                href={currentDataset.link} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors mt-1"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Access Public Hugging Face Mirror Node
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 shrink-0">
            {currentDataset.statusTags.map((t, idx) => (
              <span key={idx} className="px-2.5 py-1 text-sm font-semibold rounded bg-emerald-50 text-emerald-850 border border-emerald-100">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Quant stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {currentDataset.stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-50/50 border border-slate-100/80 p-4 rounded-xl text-center shadow-2xs hover:bg-slate-50">
              <span className="text-lg md:text-2xl font-bold text-slate-900 font-mono block">{stat.value}</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mt-1 font-mono">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Text descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50/40 rounded-xl border border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">Case Findings Schema</span>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">{currentDataset.findings}</p>
          </div>
          <div className="p-4 bg-blue-50/20 rounded-xl border border-blue-100/60 space-y-2">
            <span className="text-xs font-bold text-blue-600/80 uppercase tracking-wider block font-mono">Diagnostic Impressions Schema</span>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">{currentDataset.impression}</p>
          </div>
        </div>
      </div>

      {/* MIMIC-CXR SIMULATED RECORD EXPLORER PANEL */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-900 text-slate-100 shadow-md space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-900 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-blue-400 rounded-lg border border-blue-500/10">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                MIMIC-CXR Simulated Record Browser
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/20 font-mono">EXPLORER</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Toggle different radiographic classifications below to inspect how reports are structured before vector indexing.</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto shrink-0 pb-1">
            {Object.keys(SIMULATED_CXR_REGISTRY).map((key) => (
              <button
                key={key}
                onClick={() => setActiveDiagnosisKey(key)}
                id={`diag-tab-btn-${key}`}
                className={`
                  px-3 py-1.5 rounded-lg text-xs whitespace-nowrap border transition-all shrink-0 cursor-pointer capitalize
                  ${activeDiagnosisKey === key 
                    ? 'bg-blue-600 text-white font-semibold border-blue-500 shadow-md shadow-blue-500/10' 
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-400 border-slate-800'}
                `}
              >
                {key === 'normal' ? 'Normal Lungs' : key === 'atelectasis' ? 'Atelectasis (Effusion)' : key === 'pacemaker' ? 'Stable Pacemaker' : key}
              </button>
            ))}
          </div>
        </div>

        {/* Selected index content */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-850 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800/80 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
                SIM ID: {activeRecord.id}
              </span>
              <span className="text-xs text-slate-400 font-sans font-medium">Anatomy Target: <strong className="text-slate-200">{activeRecord.anatomy}</strong></span>
            </div>

            <div className="flex flex-wrap gap-1">
              {activeRecord.findingTags.map((t, idx) => (
                <span key={idx} className="text-xs font-semibold bg-slate-800 px-2.5 py-0.5 rounded text-indigo-300 font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left Findings */}
            <div className="md:col-span-8 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1">
                <FileText className="h-3 w-3 text-blue-400" />
                Raw Findings (Factual Transcription)
              </span>
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-850 text-xs text-slate-300 font-sans leading-relaxed min-h-[90px]">
                {activeRecord.findings}
              </div>
            </div>

            {/* Right Impressions */}
            <div className="md:col-span-4 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-450" />
                Final Diagnostic Impression
              </span>
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-850 text-xs text-emerald-400 font-sans font-medium leading-relaxed min-h-[90px]">
                {activeRecord.impression}
              </div>
            </div>
          </div>
        </div>

        {/* Summary note */}
        <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900 border border-slate-850 p-3 rounded-lg font-mono">
          <Info className="h-4 w-4 text-blue-500 shrink-0" />
          <span>Note: Storing reports in structured findings vs impression splits ensures the RAG pipeline models learn clean logical boundaries during cross-validation runs.</span>
        </div>
      </div>
    </div>
  );
}

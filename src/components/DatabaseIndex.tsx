import { useState, useMemo } from 'react';
import { DATASETS_DATA } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  ExternalLink, 
  Info, 
  FileText, 
  CheckCircle, 
  Sliders
} from 'lucide-react';

export default function DatabaseIndex({ simpleMode = false }: { simpleMode?: boolean }) {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('mimic-cxr');
  const [activeDiagnosisKey, setActiveDiagnosisKey] = useState<string>('normal');

  // Pre-baked clinical record registry simulating MIMIC-CXR files
  const SIMULATED_CXR_REGISTRY = {
    normal: {
      id: 'REC-29381',
      profile: "Healthy General Patient Checkup",
      anatomy: 'Chest Area Scan',
      findingTags: ['Healthy Clear Lungs', 'Regular Heart Silhouette'],
      findings: 'The lungs are clear and fully expanded on both sides. No extra fluid or air pocket anomalies detected. The heart shape and size are normal. The bones of the ribs look clean and regular.',
      translation: 'Everything looks completely standard. Lungs are clear, air is flowing evenly, and there is no disease found.'
    },
    pneumonia: {
      id: 'REC-88472',
      profile: "Aspiration Pneumonia (Lung Infection)",
      anatomy: 'Chest Scan (Portable Bedside)',
      findingTags: ['Active Infection', 'Fluid Consolidation'],
      findings: 'There is a new, dark patchy spot at the bottom of the right lung, suggesting lung infection (aspiration pneumonia). The left lung is clear. Heart size is slightly larger but unchanged.',
      translation: 'The patient has a localized fluid blockage on the bottom-right lung. This is classic pneumonia and requires antibiotics.'
    },
    atelectasis: {
      id: 'REC-55104',
      profile: "Low Lung Volume & Water Buildup",
      anatomy: 'Chest Scan (AP View)',
      findingTags: ['Low Inflation', 'Water Around Lungs (Effusion)'],
      findings: 'The patient did not take a deep breath during the scan. There are thin flat lines at the bottom of the lungs (atelectasis). Moderate fluid is visible around the lungs, more on the right.',
      translation: 'The lung is partially collapsed due to shallow breathing, with some fluid collecting in the chest cavities.'
    },
    pacemaker: {
      id: 'REC-11239',
      profile: "Heart Pacemaker Checkup",
      anatomy: 'Chest Scan (Post-Surgical Check)',
      findingTags: ['Pacemaker Coils Well Placed', 'Stable Leads'],
      findings: 'A permanent pacemaker device is visible with leads placed correctly to the top and bottom cavities of the heart. No new lung fluid, collapse, or major leaks shown.',
      translation: 'The patient’s heart pacemaker electrical wires are in the correct place and functioning properly with no post-operation side effects.'
    }
  };

  const currentDataset = useMemo(() => {
    return DATASETS_DATA.find(d => d.id === selectedDatasetId) || DATASETS_DATA[0];
  }, [selectedDatasetId]);

  const activeRecord = useMemo(() => {
    return SIMULATED_CXR_REGISTRY[activeDiagnosisKey as keyof typeof SIMULATED_CXR_REGISTRY] || SIMULATED_CXR_REGISTRY.normal;
  }, [activeDiagnosisKey]);

  if (simpleMode) {
    return (
      <div className="space-y-6">
        {/* Simple Page Header */}
        <div className="pb-4 border-b border-stone-200">
          <h2 className="text-3xl font-bold font-display text-stone-900 tracking-tight flex items-center gap-2.5">
            <Database className="h-6 w-6 text-amber-700" />
            Where Patients' Data Comes From
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            To teach and validate our AI, we feed it genuine, anonymous medical libraries. This page lets you see where those records come from and translates what they mean.
          </p>
        </div>

        {/* Dataset Selection Tabs */}
        <div className="flex border-b border-stone-200 gap-1 overflow-x-auto">
          {DATASETS_DATA.map((dataset) => (
            <button
              key={dataset.id}
              onClick={() => setSelectedDatasetId(dataset.id)}
              className={`
                px-4 py-2.5 text-xs font-bold border-b-3 transition-colors cursor-pointer whitespace-nowrap
                ${selectedDatasetId === dataset.id 
                  ? 'border-amber-700 text-amber-900 font-bold bg-[#FAF8F3]/60' 
                  : 'border-transparent text-stone-500 hover:text-stone-800'}
              `}
            >
              {dataset.id === 'mimic-cxr' 
                ? 'MIMIC-CXR Validation Target' 
                : dataset.id === 'breast-proto' 
                  ? 'BrEaST Ultrasound Prototype Archive' 
                  : 'IU X-Ray Backup Source'}
            </button>
          ))}
        </div>

        {/* Dataset Intro block */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div>
            <span className="text-sm uppercase font-bold text-[#b45309] font-mono tracking-wider">Patient Record Warehouse</span>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">{currentDataset.title}</h3>
            {currentDataset.link && (
              <a 
                href={currentDataset.link} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1 text-xs text-amber-800 hover:underline font-semibold mt-1"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Dataset on Hugging Face Mirror Node
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentDataset.statusTags.map((t, idx) => (
              <span key={idx} className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                ✓ {t}
              </span>
            ))}
          </div>

          {/* Simple Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {currentDataset.stats.map((stat, idx) => (
              <div key={idx} className="bg-stone-50 border border-stone-150 p-4 rounded-xl text-center">
                <span className="text-xl md:text-2xl font-bold text-stone-900 font-mono block">{stat.value}</span>
                <span className="text-sm text-stone-500 font-bold uppercase tracking-wider block mt-1 font-mono">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Case Translator */}
        <div className="border border-stone-200 rounded-xl bg-white overflow-hidden shadow-xs">
          <div className="p-4 bg-[#FAF7F2] border-b border-stone-200">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <Sliders className="h-4.5 w-4.5 text-amber-800" />
              Interactive Case File Report Translator
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">Click any diagnostic case below to read its complex medical log translated into easy, clear terms.</p>
          </div>

          {/* Diagnosis selection tabs */}
          <div className="p-3 bg-[#FDFCFB] border-b border-stone-200/50 flex flex-wrap gap-2">
            {Object.keys(SIMULATED_CXR_REGISTRY).map((key) => {
              const reg = SIMULATED_CXR_REGISTRY[key as keyof typeof SIMULATED_CXR_REGISTRY];
              const isSelected = activeDiagnosisKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveDiagnosisKey(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer font-medium ${
                    isSelected 
                      ? 'bg-stone-900 text-white font-bold' 
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {reg.profile}
                </button>
              );
            })}
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded">
                SIMULATED ID: {activeRecord.id}
              </span>
              <span className="text-xs text-stone-500 font-medium">| Target region: {activeRecord.anatomy}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Complex medical prose */}
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5">
                <span className="text-sm uppercase font-bold text-stone-400 font-mono tracking-wider block">Complex Radiologist Text Log</span>
                <p className="text-xs text-stone-850 font-serif leading-relaxed italic">
                  "{activeRecord.findings}"
                </p>
                <div className="flex flex-wrap gap-1 pt-2">
                  {activeRecord.findingTags.map(tag => (
                    <span key={tag} className="text-sm bg-stone-200/60 text-stone-700 px-2 py-0.5 rounded font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simple plain explanation */}
              <div className="p-4 bg-amber-50/20 rounded-lg border border-amber-200 space-y-1.5">
                <span className="text-sm uppercase font-bold text-amber-800 font-mono tracking-wider block flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> Plain-English Interpretation
                </span>
                <p className="text-xs text-stone-900 leading-relaxed font-sans">
                  {activeRecord.translation}
                </p>
                <p className="text-sm text-stone-500 pt-1.5 border-t border-stone-200/50">
                  ⚡ My system uses these patterns to verify report relevance immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD EXPERT TECHNICAL LAYOUT
  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2.5">
            <Database className="h-6 w-6 text-blue-600" />
            Clinical Data Index
          </h2>
          <p className="text-xs text-slate-500 mt-1">
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
            {dataset.id === 'mimic-cxr' 
              ? 'MIMIC-CXR Target' 
              : dataset.id === 'breast-proto' 
                ? 'BrEaST Prototype Archive' 
                : 'IU X-Ray Backup'}
          </button>
        ))}
      </div>

      {/* Primary dataset showcase card */}
      <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs relative overflow-hidden space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-4 gap-4">
          <div>
            <span className="text-sm uppercase font-bold text-slate-400 tracking-widest font-mono">Verified Validation Source</span>
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
              <span className="text-sm text-slate-400 font-bold uppercase tracking-wider block mt-1 font-mono">{stat.label}</span>
            </div>
          ))}
        </div>

        {currentDataset.description && (
          <div className="p-3 bg-blue-50/20 border border-blue-50 text-xs text-slate-600 rounded-lg">
            <strong>Prototype Scope Note:</strong> {currentDataset.description}
          </div>
        )}
      </div>

      {/* MIMIC-CXR Simulated Record registry container */}
      {selectedDatasetId === 'mimic-cxr' && (
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs space-y-4">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Simulated MIMIC-CXR Data Warehouse Records</h3>
            <span className="text-xs bg-slate-205 px-2 py-0.5 rounded text-slate-500 font-mono font-bold">Queryable</span>
          </div>

          <div className="p-4 flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveDiagnosisKey('normal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans cursor-pointer transition-all ${
                activeDiagnosisKey === 'normal' 
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10' 
                  : 'bg-slate-50 border border-slate-150 hover:bg-slate-100 text-slate-750'
              }`}
            >
              Normal Lungs (REC-29381)
            </button>
            <button 
              onClick={() => setActiveDiagnosisKey('pneumonia')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans cursor-pointer transition-all ${
                activeDiagnosisKey === 'pneumonia' 
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10' 
                  : 'bg-slate-50 border border-slate-150 hover:bg-slate-100 text-slate-750'
              }`}
            >
              Pneumonia Spot (REC-88472)
            </button>
            <button 
              onClick={() => setActiveDiagnosisKey('atelectasis')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans cursor-pointer transition-all ${
                activeDiagnosisKey === 'atelectasis' 
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10' 
                  : 'bg-slate-50 border border-slate-150 hover:bg-slate-100 text-slate-750'
              }`}
            >
              Bilateral Effusion (REC-55104)
            </button>
            <button 
              onClick={() => setActiveDiagnosisKey('pacemaker')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans cursor-pointer transition-all ${
                activeDiagnosisKey === 'pacemaker' 
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10' 
                  : 'bg-slate-50 border border-slate-150 hover:bg-slate-100 text-slate-750'
              }`}
            >
              Pacemaker Leads (REC-11239)
            </button>
          </div>

          <div className="px-5 pb-5 space-y-4">
            <div className="text-xs bg-slate-50/50 p-4 border border-slate-150 rounded-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-mono text-[10.5px] font-bold text-slate-450 uppercase">TARGET RAW TEXT LOG</span>
                <span className="text-sm text-slate-400 font-mono">REC STATUS: ACTIVE</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3 space-y-2">
                  <div className="space-y-0.5">
                    <span className="text-xs uppercase font-bold text-slate-400 font-mono block">Scanned Region</span>
                    <span className="font-medium text-slate-800">{activeRecord.anatomy}</span>
                  </div>
                </div>
                <div className="md:col-span-9 space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold text-slate-400 font-mono block">Doc Findings Text Log</span>
                    <p className="text-slate-700 italic leading-relaxed text-base font-serif">
                      "{activeRecord.findings}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

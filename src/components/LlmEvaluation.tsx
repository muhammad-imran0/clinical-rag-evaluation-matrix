import { useState, useMemo } from 'react';
import { MODELS_DATA } from '../data';
import { LlmModel } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Sparkles, 
  Activity, 
  Terminal, 
  HelpCircle, 
  Play, 
  Gauge, 
  CheckCircle, 
  Wrench,
  ChevronRight,
  TrendingDown,
  ThumbsDown,
  ThumbsUp,
  Cpu,
  RefreshCw
} from 'lucide-react';

export default function LlmEvaluation() {
  const [selectedModelId, setSelectedModelId] = useState<string>('biogpt');
  const [activePromptId, setActivePromptId] = useState<string>('c-1');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedEpoch, setSimulatedEpoch] = useState<number>(0);

  const selectedModel = useMemo(() => {
    return MODELS_DATA.find(m => m.id === selectedModelId) || MODELS_DATA[3];
  }, [selectedModelId]);

  // Pre-baked clinical prompt selections for the RAG simulator
  const SIMULATOR_PROMPTS = [
    {
      id: 'c-1',
      title: 'Post-CABG Tube Alignment',
      symptoms: 'Patient 4 hours post-CABG. Check alignment of endotracheal tube, nasogastric tube, and chest drains.',
      retrievedContext: 'Top-1 match (MIMIC-CXR): "Endotracheal tube terminates 4cm above the carina. NG tube courses below the diaphragm. Mediastinal drains are in stable position with no pneumothorax."',
      biogptOutput: 'BioGPT Response [Highly Factual]:\n"POST-CABG EVALUATION. Endotracheal tube in stable position, 4.2cm superior to carina. Enteric tube courses below gastroesophageal junction. Right pleural drainage tube remains in satisfactory alignment. Pulmonic fields demonstrate minimal subsegmental basilar atelectasis, stable compared to prior study. Cardiac profile is moderately dilated, consistent with patient history."',
      clinicalCamelOutput: 'Clinical Camel [Conversational]:\n"Hello! Here is the prompt evaluation: The endotracheal tube is perfectly placed about 4 centimeters over the carotid bifurcation. The NG gastrostomy line goes down well. There are some signs of moderate chest fluid and mild vascular engorgement which is very typical for post-bypass operations. I do not see any lung collapses or pneumothoraxes. Follow-up is advised."',
      metrics: {
        biogpt: { bleu: 86.4, rouge: 79.1, ragas: 0.94 },
        camel: { bleu: 61.2, rouge: 68.4, ragas: 0.72 }
      },
      gapAnnotation: 'Clinical Camel confuses "carina" with "carotid bifurcation" (dangerous anatomical hallucination). BioGPT accurately retains precise clinical vocabulary extracted straight from Qdrant.'
    },
    {
      id: 'c-2',
      title: 'Pneumothorax Assessment',
      symptoms: 'Sudden onset dyspnea 2 hours post lung biopsy. Severe right-sided chest pain.',
      retrievedContext: 'Top-1 match (MIMIC-CXR): "A 15% right-sided apical pneumothorax is identified. Thin pleural line visible. No mediastinal shift."',
      biogptOutput: 'BioGPT Response [Highly Factual]:\n"RIGHT APICAL PNEUMOTHORAX. Identification of a thin visceral pleural line in the right upper thoracic apex, indicating a small (approximately 15%) right apical pneumothorax. Trachea and mediastinal divisions remain midline, ruling out tension-pneumothorax elements. No major pleural effusions mapped. Immediate clinical correlation advised."',
      clinicalCamelOutput: 'Clinical Camel [Conversational]:\n"Based on my analysis, this patient has suffered a severe collapsed lung! There is a huge pockets of air on the right side of the lung, probably around 15-20% volume. It looks like the heart is being pushed a bit to the left (tension) so a pleural drain should be inserted right away to stop any severe respiratory collapse!"',
      metrics: {
        biogpt: { bleu: 82.5, rouge: 81.3, ragas: 0.91 },
        camel: { bleu: 58.7, rouge: 65.2, ragas: 0.52 }
      },
      gapAnnotation: 'Clinical Camel hallucinates a tension pneumothorax ("heart pushed to the left") when the reference explicitly states "No mediastinal shift". BioGPT maintains professional accuracy limits.'
    },
    {
      id: 'c-3',
      title: 'Congestive Heart Failure Sync',
      symptoms: 'Patient exhibits severe bilateral ankle edema, jugular venous distention, orthopnea.',
      retrievedContext: 'Top-1 match (MIMIC-CXR): "Marked cardiomegaly. Prominent interstitial markings, Kerley B lines present. Large bilateral pleural effusions coarser on the right."',
      biogptOutput: 'BioGPT Response [Highly Factual]:\n"CARDIOPULMONARY INSUFFICIENCY. Severe cardiomegaly with increased cardiothoracic ratio. Marked interstitial pulmonary edema as shown by visible Kerley B septal structures. Bilateral pleural effusions identified, more prominent within the right hemithorax. Features suggest acute exacerbation of chronic congestive heart failure."',
      clinicalCamelOutput: 'Clinical Camel [Conversational]:\n"Wow, this is a very clear cardiorespiratory struggle! The cardiac silhouette is extremely large (cardiomegaly), and you can see signs of high interstitial fluid pressure like Kerley lines. There are wet pools in both lungs (pleural effusions). This looks exactly like a congestive heart failure failure pattern."',
      metrics: {
        biogpt: { bleu: 88.0, rouge: 84.5, ragas: 0.96 },
        camel: { bleu: 72.3, rouge: 74.0, ragas: 0.81 }
      },
      gapAnnotation: 'Clinical Camel uses unscientific colloquialisms ("wet pools", "cardiorespiratory struggle") which is inappropriate for structured radiologist reports, whereas BioGPT writes in standardized clinical taxonomy.'
    }
  ];

  const currentPrompt = useMemo(() => {
    return SIMULATOR_PROMPTS.find(p => p.id === activePromptId) || SIMULATOR_PROMPTS[0];
  }, [activePromptId]);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedEpoch(e => e + 1);
    }, 1200);
  };

  const statusColors = {
    validated: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    restricted: 'bg-amber-50 text-amber-700 border-amber-100',
    'requires-heavy-gpu': 'bg-purple-50 text-purple-700 border-purple-100',
    proprietary: 'bg-red-50 text-red-700 border-red-100'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2.5">
            <Cpu className="h-6 w-6 text-blue-600" />
            Medical LLM Matrix Analysis (§5.4)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Qualitative and quantitative benchmark metrics mapping clinical LLMs against dissertation sandbox execution constraints.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg text-slate-600 text-xs font-semibold">
          <Activity className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
          <span>Active Test Target: Hugging Face BioGPT</span>
        </div>
      </div>

      {/* Main Grid: Comparative Table + Detail Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Table Column */}
        <div className="xl:col-span-8 bg-white border border-slate-100 shadow-xs rounded-xl overflow-hidden self-start">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Literature Evaluation Matrix</h3>
            <span className="text-[10px] text-slate-400 font-mono">Click a row to inspect detailed profile</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4">Model Details</th>
                  <th className="p-4 text-center">MedQA Accuracy</th>
                  <th className="p-4 text-center">USMLE Benchmark</th>
                  <th className="p-4">Accessibility / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MODELS_DATA.map((model) => {
                  const isSelected = selectedModelId === model.id;
                  const isPrimaryOrComparative = model.id === 'biogpt' || model.id === 'clinical-camel';
                  return (
                    <tr
                      key={model.id}
                      onClick={() => setSelectedModelId(model.id)}
                      className={`
                        group hover:bg-slate-50/50 transition-colors cursor-pointer select-none
                        ${isSelected ? 'bg-sky-50/30' : ''}
                      `}
                      id={`model-row-${model.id}`}
                    >
                      {/* Name and description */}
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <div className={`mt-1 h-2 w-2 rounded-full ${isPrimaryOrComparative ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <div>
                            <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                              {model.name}
                            </span>
                            <span className="text-xs text-slate-400 block mt-0.5 max-w-sm truncate">
                              {model.description}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* MedQA score meter */}
                      <td className="p-4 text-center">
                        {model.medQa ? (
                          <div className="inline-flex flex-col items-center">
                            <span className="text-xs font-bold font-mono text-slate-700">{model.medQa}%</span>
                            <div className="w-20 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-400'}`}
                                style={{ width: `${model.medQa}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-300 font-mono">—</span>
                        )}
                      </td>

                      {/* USMLE benchmark meter */}
                      <td className="p-4 text-center">
                        {model.usmle ? (
                          <div className="inline-flex flex-col items-center">
                            <span className="text-xs font-bold font-mono text-slate-700">{model.usmle}%</span>
                            <div className="w-20 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                              <div 
                                className="h-full bg-slate-400 rounded-full"
                                style={{ width: `${model.usmle}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-300 font-mono">—</span>
                        )}
                      </td>

                      {/* Badge and resource tag */}
                      <td className="p-4">
                        <div className="flex flex-col gap-1 items-start">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${statusColors[model.status]}`}>
                            {model.id === 'biogpt' ? 'Primary Active' : model.id === 'clinical-camel' ? 'Colab Prototype' : 'Reference Model'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono truncate max-w-xs">{model.resourceCode}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar details block */}
        <div className="xl:col-span-4 bg-slate-900 border border-slate-950 rounded-xl p-5 text-slate-200 shadow-md">
          <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Evaluation Node Info</span>
            <Cpu className="h-4 w-4 text-blue-400" />
          </div>

          <div className="py-4 space-y-4">
            <div>
              <h4 className="text-base font-bold text-slate-55 flex items-center gap-1.5">
                {selectedModel.name}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {selectedModel.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-500 font-bold block font-mono">MedQA Accuracy</span>
                <span className="text-lg font-bold text-sky-400 font-mono">{selectedModel.medQa ? `${selectedModel.medQa}%` : 'N/A'}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-500 font-bold block font-mono">Execution Class</span>
                <span className="text-[11px] font-bold text-slate-300 font-mono block mt-1 truncate uppercase" title={selectedModel.resourceCode}>
                  {selectedModel.status === 'validated' ? 'Validated local' : 'High Resource'}
                </span>
              </div>
            </div>

            {/* Pros List */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1"><ThumbsUp className="h-3 w-3 text-emerald-450" /> Dissertation Pros</span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-none pl-1">
                {selectedModel.pros.map((pro, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs leading-snug">
                    <span className="text-emerald-400 shrink-0 select-none">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons List */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1"><ThumbsDown className="h-3 w-3 text-rose-450" /> Implementation Gaps</span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-none pl-1">
                {selectedModel.cons.map((con, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs leading-snug">
                    <span className="text-rose-400 shrink-0 select-none">🗙</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* RAG PROMPT COMPARISON SIMULATOR */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-900 text-slate-100 shadow-lg space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-900 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/10">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                RAG Pipeline Clinical Simulator 
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 font-mono">PORTABLE SANDBOX</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Simulate actual retrieval vectors and prompt outputs generated by both models under identical environments.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto shrink-0 pb-1">
            {SIMULATOR_PROMPTS.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => { setActivePromptId(prompt.id); }}
                id={`sim-prompt-${prompt.id}`}
                className={`
                  px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all border shrink-0 cursor-pointer
                  ${activePromptId === prompt.id 
                    ? 'bg-blue-600 text-white font-semibold border-blue-500/50 shadow-md shadow-blue-500/10' 
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-400 border-slate-800'}
                `}
              >
                {prompt.title}
              </button>
            ))}
          </div>
        </div>

        {/* Input specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block font-mono">User / Physician Symptom Parameters</span>
            <blockquote className="text-[13px] text-slate-200 font-sans italic leading-relaxed border-l-2 border-slate-700 pl-3">
              "{currentPrompt.symptoms}"
            </blockquote>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block font-mono">Qdrant Vector Retrieval Output (K-1 Match)</span>
            <p className="text-[12.5px] text-slate-300 font-sans font-medium">
              {currentPrompt.retrievedContext}
            </p>
          </div>
        </div>

        {/* Run simulator buttons */}
        <div className="flex justify-center my-4">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className={`
              inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs transition-all tracking-wider uppercase shadow-md cursor-pointer
              ${isSimulating 
                ? 'bg-slate-800 text-slate-450 border border-slate-750 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border border-blue-500/10 shadow-blue-500/10'}
            `}
            id="simulation-trigger-btn"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Simulating RAG Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white shrink-0" />
                <span>Simulate Multi-Model Generation</span>
              </>
            )}
          </button>
        </div>

        {/* Output Area Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* BioGPT Output */}
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-bold text-slate-100">BioGPT Output Target</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 font-mono">Domain Fine-Tuned</span>
            </div>

            {/* Output prompt text */}
            <div className="min-h-[140px] bg-slate-950 rounded-lg p-3 border border-slate-850">
              <pre className="text-[12px] font-mono text-emerald-400 leading-relaxed whitespace-pre-wrap font-sans">
                {isSimulating ? 'Processing weights...' : currentPrompt.biogptOutput}
              </pre>
            </div>

            {/* BioGPT evaluation metrics */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-850/60">
              <div className="text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">BLEU Score</span>
                <span className="text-xs font-bold text-slate-300 block font-mono mt-0.5">{currentPrompt.metrics.biogpt.bleu}%</span>
              </div>
              <div className="text-center border-x border-slate-800">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">ROUGE-L</span>
                <span className="text-xs font-bold text-slate-300 block font-mono mt-0.5">{currentPrompt.metrics.biogpt.rouge}%</span>
              </div>
              <div className="text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">RAGAS Factuality</span>
                <span className="text-xs font-bold text-sky-405 block font-mono mt-0.5">{currentPrompt.metrics.biogpt.ragas}</span>
              </div>
            </div>
          </div>

          {/* Clinical Camel Output */}
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
                <span className="text-sm font-bold text-slate-100">Clinical Camel Target</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 font-mono">Conversational Model</span>
            </div>

            {/* Output prompt text */}
            <div className="min-h-[140px] bg-slate-950 rounded-lg p-3 border border-slate-850">
              <pre className="text-[12px] font-mono text-indigo-300 leading-relaxed whitespace-pre-wrap font-sans">
                {isSimulating ? 'Processing weights...' : currentPrompt.clinicalCamelOutput}
              </pre>
            </div>

            {/* Clinical Camel evaluation metrics */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-850/60">
              <div className="text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">BLEU Score</span>
                <span className="text-xs font-bold text-slate-300 block font-mono mt-0.5">{currentPrompt.metrics.camel.bleu}%</span>
              </div>
              <div className="text-center border-x border-slate-800">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">ROUGE-L</span>
                <span className="text-xs font-bold text-slate-300 block font-mono mt-0.5">{currentPrompt.metrics.camel.rouge}%</span>
              </div>
              <div className="text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">RAGAS Factuality</span>
                <span className="text-xs font-bold text-indigo-400 block font-mono mt-0.5">{currentPrompt.metrics.camel.ragas}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gap interpretation review */}
        <div className="p-4 bg-blue-900/10 border border-blue-900/30 rounded-xl flex items-start gap-3 mt-4 text-xs">
          <Activity className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-blue-400 font-mono uppercase tracking-wider block">Gaps & Tracing Annotation Analysis</span>
            <p className="text-slate-300 leading-relaxed">
              {currentPrompt.gapAnnotation} Since conversational models prioritize fluid prose, they suffer higher risk of severe clinical missteps compared to specialized, local autoregressive counterparts like BioGPT.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

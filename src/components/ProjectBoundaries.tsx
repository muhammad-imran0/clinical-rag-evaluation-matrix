import { BOUNDARIES_DATA } from '../data';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Database, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle,
  Scale
} from 'lucide-react';

export default function ProjectBoundaries({ simpleMode = false }: { simpleMode?: boolean }) {
  const iconsMap = {
    cpu: Cpu,
    database: Database,
    'shield-alert': ShieldAlert
  };

  const threatMitigations = {
    'b-1': {
      threat: 'Out-of-memory crashes on free T4 nodes while loading deep 70B models.',
      mitigation: 'Caching models directly, setting quantized floating point depths (FP16/INT4), and compiling autoregressive BioGPT directly on CPU pipelines.'
    },
    'b-2': {
      threat: 'Administrative/ethical access permission loops delaying project timeline.',
      mitigation: 'Utilizing clean, pre-certified 30.6k MIMIC-CXR mirror archives hosted securely on public Hugging Face hubs, keeping standard academic validity.'
    },
    'b-3': {
      threat: 'Clinical diagnostic claims made lacking human specialist verification.',
      mitigation: 'Validating pipelines through mathematical metrics (BLEU, ROUGE, and RAGAS factuality indicators) comparing generation output to ground truth reports.'
    }
  };

  if (simpleMode) {
    return (
      <div className="space-y-6">
        {/* Simple Page Header */}
        <div className="pb-4 border-b border-stone-200">
          <h2 className="text-2xl font-bold font-display text-stone-900 tracking-tight flex items-center gap-2.5">
            <ShieldAlert className="h-6 w-6 text-amber-700" />
            Project Rules & Boundaries
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            An honest, clean look at the hardware limits, patient privacy filters, and safety rules of Muhammad Imran's research project.
          </p>
        </div>

        {/* 3 Simple Grid Cards detailing Project Boundaries under simpleMode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Boundary 1 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg">
                  <Cpu className="h-5 w-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-stone-400 font-mono">Limit 01</span>
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base">Humble Computer Power</h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Huge medical AI computers cost thousands of dollars per month to run. To show this can run on standard university setups, we configured a "lighter" AI brain (BioGPT) that runs fast on basic student laptops.
                </p>
              </div>
            </div>
            <div className="mt-5 p-3 bg-[#FAF8F5] border border-stone-150 rounded-lg text-xs">
              <strong className="text-stone-900 block font-bold mb-0.5">🟢 How we handle it:</strong>
              We optimized code memory so it never crashes!
            </div>
          </div>

          {/* Boundary 2 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg">
                  <Database className="h-5 w-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-stone-400 font-mono">Limit 02</span>
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base">Ethical Data Access</h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Gaining direct access to hospital database servers requires up to 6 months of administrative paperwork and background checks. 
                </p>
              </div>
            </div>
            <div className="mt-5 p-3 bg-[#FAF8F5] border border-stone-150 rounded-lg text-xs">
              <strong className="text-stone-900 block font-bold mb-0.5">🟢 How we handle it:</strong>
              We utilize a certified, fully anonymous public research archive of 30,000 chest files.
            </div>
          </div>

          {/* Boundary 3 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-stone-400 font-mono">Limit 03</span>
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base">No Actual Patient Risks</h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  This academic draft does not claim to diagnose real human hospital patients. No medical treatment decisions are ever made from this research.
                </p>
              </div>
            </div>
            <div className="mt-5 p-3 bg-[#FAF8F5] border border-stone-150 rounded-lg text-xs">
              <strong className="text-stone-900 block font-bold mb-0.5">🟢 How we handle it:</strong>
              We validate accuracy strictly using industry math scores comparing draft files to written doctor outputs.
            </div>
          </div>

        </div>

        {/* Ethical statement */}
        <div className="p-4 bg-amber-50/20 border border-amber-200 rounded-xl flex gap-3 text-xs leading-relaxed text-stone-850">
          <Scale className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-900 font-bold block mb-0.5">Academic Compliance Notice</strong>
            This portfolio complies fully with the ethical code of the University of East London (UEL). No patient names or identifying features are included, maintaining 100% data compliance rules.
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
          <h2 className="text-2xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShieldAlert className="h-6 w-6 text-blue-600" />
            Project Boundaries & Constraints
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Carefully defined hardware boundaries, data repository limits, and ethical clinical evaluation scope.
          </p>
        </div>
        <div className="text-xs bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg text-red-700 font-mono flex items-center gap-2">
          <span>Boundary Status: </span>
          <span className="font-bold">Strictly Controlled</span>
        </div>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {BOUNDARIES_DATA.map((boundary, index) => {
          const IconComponent = iconsMap[boundary.iconName] || ShieldAlert;
          const threatData = threatMitigations[boundary.id as keyof typeof threatMitigations];
          
          return (
            <div 
              key={boundary.id}
              id={`boundary-bento-card-${boundary.id}`}
              className="bg-white border border-slate-100 hover:border-slate-350 rounded-2xl p-5 shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-sm"
            >
              <div className="space-y-4">
                {/* Header Icon Block */}
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${
                    boundary.type === 'critical' ? 'bg-rose-50 text-rose-600 border-rose-100/50' : 
                    boundary.type === 'alert' ? 'bg-amber-50 text-amber-600 border-amber-100/50' : 
                    'bg-sky-50 text-sky-600 border-sky-100/50'
                  }`}>
                    <IconComponent className="h-5.5 w-5.5 shrink-0" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">CONSTRAINT [0{index + 1}]</span>
                </div>

                {/* Content description list */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug">{boundary.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{boundary.text}</p>
                </div>
              </div>

              {/* Advanced Threat / Mitigation boxes */}
              <div className="mt-6 pt-4 border-t border-slate-50 space-y-3.5">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider font-mono flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 shrink-0" /> Potential Risk Gaps
                  </span>
                  <p className="text-[11.5px] text-slate-500 font-sans leading-relaxed">
                    {threatData?.threat}
                  </p>
                </div>

                <div className="space-y-1 p-2.5 bg-emerald-50/30 border border-emerald-100/40 rounded-lg">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider font-mono flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-emerald-600 shrink-0" /> Architecture Mitigation
                  </span>
                  <p className="text-[11.5px] text-emerald-800 font-sans leading-relaxed font-normal">
                    {threatData?.mitigation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Broad Scope Statement */}
      <div className="bg-gradient-to-r from-blue-50/20 to-slate-50 border border-slate-150/60 p-5 rounded-2xl flex items-start gap-4">
        <span className="p-2.5 bg-white rounded-xl border border-slate-200/50 shrink-0 text-slate-500">
          <Scale className="h-6 w-6" />
        </span>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Academic Framework Compliancy Statement</h4>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            This workspace acts perfectly compliant with the University of East London of Higher Education ethical standards. No mock identifiers are constructed, and all clinical data coordinates strictly respect non-parametric historical structures to avoid any artificial hallucinations, validating precision in true sandbox environments.
          </p>
        </div>
      </div>
    </div>
  );
}

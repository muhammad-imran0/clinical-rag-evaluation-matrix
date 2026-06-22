import { BOUNDARIES_DATA } from '../data';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Database, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle,
  FileCheck,
  Scale
} from 'lucide-react';

export default function ProjectBoundaries() {
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
        <div className="p-2.5 bg-white rounded-xl border border-slate-200/50 shrink-0 text-slate-500">
          <Scale className="h-6 w-6" />
        </div>
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

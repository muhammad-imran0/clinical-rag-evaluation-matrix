import { useState, useMemo } from 'react';
import { ARCH_LAYERS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Layers, 
  Database, 
  Cpu, 
  ImageIcon, 
  Sparkles,
  Eye,
  Settings,
  HelpCircle,
  FileText,
  Workflow
} from 'lucide-react';

export default function SystemArchitecture({ simpleMode = false }: { simpleMode?: boolean }) {
  const [activeStepId, setActiveStepId] = useState<string>('ingest');
  
  const STEPS_DATA = [
    {
      id: 'ingest',
      title: 'Raw X-Ray Ingestion',
      metric: 'Source Input',
      input: 'Image File (PNG/JPEG)',
      output: 'Pixel Array (Normalized)',
      desc: 'The pipeline receives radiographic raw files immediately on clinician uploads, handling structural checks for contrast normalization and corrupt file limits.',
      code: `def preprocess_image(image_path: str):\n    # Normalize aspect ratios and pixel depth limits\n    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)\n    img_resized = cv2.resize(img, (224, 224))\n    normalized = img_resized / 255.0\n    return np.expand_dims(normalized, axis=0)`
    },
    {
      id: 'clip',
      title: 'CLIP Spatial Encoder',
      metric: 'ViT-B/32 Weight',
      input: '224x224x3 Matrix',
      output: '512d Visual Feature Vector',
      desc: 'Passes preprocessed lung scans through the visual branch of a pre-trained CLIP transformer, producing high fidelity semantic coordinates.',
      code: `import torch\nfrom PIL import Image\nfrom transformers import CLIPProcessor, CLIPVisionModel\n\nmodel = CLIPVisionModel.from_pretrained("openai/clip-vit-base-patch32")\nprocessor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")\n\ndef extract_features(img_pil):\n    inputs = processor(images=img_pil, return_tensors="pt")\n    with torch.no_grad():\n        outputs = model(**inputs)\n    return outputs.pooler_output.numpy().flatten()  # 512-dim float`
    },
    {
      id: 'qdrant',
      title: 'Qdrant Cosine search',
      metric: 'Fast Vector Match',
      input: '512d Normalized Vector',
      output: 'Top-K Historical Reports',
      desc: 'Executes cosine similarity indices against the Qdrant local database cluster, isolating Top-K similar cases matching the visual morphology coordinates.',
      code: `from qdrant_client import QdrantClient\n\nclient = QdrantClient("http://localhost:6333")\n\ndef retrieve_similar_reports(vis_vector, top_k=3):\n    search_result = client.search(\n        collection_name="mimic_cxr_collection",\n        query_vector=vis_vector.tolist(),\n        limit=top_k\n    )\n    return [hit.payload["findings"] for hit in search_result]`
    },
    {
      id: 'langchain',
      title: 'Orchestrator Injection',
      metric: 'Template Compilation',
      input: 'Context Vectors + Prompt String',
      output: 'Structured Prompts',
      desc: 'Applies LangChain text variables to format custom template anchors. Injects matched history reports, current target anomalies, and the clinical query.',
      code: `from langchain.prompts import PromptTemplate\n\ntemplate = """\nYou are a clinical report synthesizer. Analyze the current conditions.\nHistorical similar reference findings:\n{retrieved_context}\n\nClinical prompt query: {query}\nSynthesize highly factual diagnostic report:\n"""\nprompt_builder = PromptTemplate(\n    input_variables=["retrieved_context", "query"],\n    template=template\n)`
    },
    {
      id: 'generator',
      title: 'BioGPT Report Synthesis',
      metric: 'Autoregressive Run',
      input: 'Prompt Strings',
      output: 'Factual Case Reports',
      desc: 'Feeds structured prompts into the local BioGPT node. Runs autoregressive decoding steps to output clinical report categories matching standard taxonomy.',
      code: `# Autoregressive generation execution parameter\noutputs = biogpt_model.generate(\n    inputs=encoded_prompt["input_ids"],\n    max_length=256,\n    temperature=0.2,\n    top_p=0.90,\n    repetition_penalty=1.2\n)`
    },
    {
      id: 'explain',
      title: 'Grad-CAM XAI Map',
      metric: 'Feature Attention Maps',
      input: 'CLIP Encoder Weights',
      output: 'Spatial Focus Overlay Map',
      desc: 'Retrieves spatial gradients from CLIP layers, creating heatmaps that align report words to exact pixel locations on the uploaded image.',
      code: `from pytorch_grad_cam import GradCAM\nfrom pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget\n\ndef extract_attention_grid(image_tensor, target_layer):\n    cam = GradCAM(model=model, target_layers=[target_layer])\n    grayscale_cam = cam(input_tensor=image_tensor, targets=[ClassifierOutputTarget(0)])\n    return grayscale_cam[0, :] # 2D attention values`
    }
  ];

  const currentStep = useMemo(() => {
    return STEPS_DATA.find(s => s.id === activeStepId) || STEPS_DATA[0];
  }, [activeStepId]);

  if (simpleMode) {
    return (
      <div className="space-y-6">
        {/* Simple Page Header */}
        <div className="pb-4 border-b border-stone-200">
          <h2 className="text-2xl font-bold font-display text-stone-900 tracking-tight flex items-center gap-2.5">
            <Layers className="h-6 w-6 text-amber-700" />
            How Muhammad Imran's System Works
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            A quick, visual guide explaining how we translate a raw chest X-ray image into a safe text diagnosis report.
          </p>
        </div>

        {/* Beautiful Simple Flow Diagram */}
        <div className="p-6 bg-[#FAF7F0] border border-[#E6DEC9] rounded-2xl">
          <h3 className="text-sm font-bold font-mono text-amber-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Workflow className="h-4.5 w-4.5 text-amber-700" />
            Interactive 4-Step Patient Journey Flow
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 text-center relative flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">STEP 1</span>
                <ImageIcon className="h-8 w-8 mx-auto my-3 text-stone-600" />
                <h4 className="font-bold text-stone-900 text-sm">Image Scanner</h4>
                <p className="text-xs text-stone-600 mt-1 lines-clamp-3 leading-relaxed">
                  We upload the raw chest X-ray. The scanner (CLIP model) translates physical lines and details into a mathematical coordinate.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 text-center relative flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">STEP 2</span>
                <Database className="h-8 w-8 mx-auto my-3 text-stone-600" />
                <h4 className="font-bold text-stone-900 text-sm">Library Search</h4>
                <p className="text-xs text-stone-600 mt-1 lines-clamp-3 leading-relaxed">
                  The system runs the coordinate through our secure database (Qdrant) to quickly find 3 past cases that look almost identical.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 text-center relative flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">STEP 3</span>
                <FileText className="h-8 w-8 mx-auto my-3 text-stone-600" />
                <h4 className="font-bold text-stone-900 text-sm">Draft Organizer</h4>
                <p className="text-xs text-stone-600 mt-1 lines-clamp-3 leading-relaxed">
                  An automatic organizer (LangChain) combines the new symptoms with details from those 3 past cases to prepare a draft outline.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 text-center relative flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">STEP 4</span>
                <Cpu className="h-8 w-8 mx-auto my-3 text-stone-600" />
                <h4 className="font-bold text-stone-900 text-sm">Medical Writer</h4>
                <p className="text-xs text-stone-600 mt-1 lines-clamp-3 leading-relaxed">
                  Our hospital-ready medical AI model (BioGPT) reads the organizer's draft and writes a final, factually correct diagnosis report.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Component Table explained simply */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-stone-50 border-b border-stone-200">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider font-mono">The Professional Parts Utilized</h4>
          </div>
          <div className="divide-y divide-stone-150">
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2">
              <strong className="text-stone-900 text-sm">System Link: LangChain</strong>
              <span className="text-xs font-mono py-0.5 px-2 bg-stone-100 text-stone-700 rounded-md max-w-max">Orchestrator</span>
              <p className="text-xs text-stone-600">This is the "glue" that hooks the database and model together seamlessly so they can talk easily.</p>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2">
              <strong className="text-stone-900 text-sm">Vector Matcher: CLIP model</strong>
              <span className="text-xs font-mono py-0.5 px-2 bg-stone-100 text-stone-700 rounded-md max-w-max">Image Translation</span>
              <p className="text-xs text-stone-600">Acts like human eyes, translating complex lung shapes into coordinates so searching is super fast.</p>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2">
              <strong className="text-stone-900 text-sm">Storage: Qdrant</strong>
              <span className="text-xs font-mono py-0.5 px-2 bg-stone-100 text-stone-700 rounded-md max-w-max">Secure Database</span>
              <p className="text-xs text-stone-600">Uses mathematical formulas to retrieve chest medical reports within fraction-of-a-second intervals.</p>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2">
              <strong className="text-stone-900 text-sm">Verification: RAGAS</strong>
              <span className="text-xs font-mono py-0.5 px-2 bg-stone-100 text-stone-700 rounded-md max-w-max font-bold">Accuracy Checker</span>
              <p className="text-xs text-stone-600">A strict built-in checker scoring how factually correct the system's generated reports are.</p>
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
          <h2 className="text-2xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2.5">
            <Layers className="h-6 w-6 text-blue-600" />
            System Framework Architecture
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Component specifications, system dependencies, and interactive dataflow steps mapping the processing engine boundaries.
          </p>
        </div>
        <div className="text-xs bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg text-emerald-700 font-mono flex items-center gap-2">
          <span>Deployment Class: </span>
          <span className="font-bold">Offline-First Vector Search</span>
        </div>
      </div>

      {/* Quick Infrastructure Table / Matrix Grid */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Core Infrastructure Stack</span>
          <span className="text-[10px] text-slate-400 font-mono">System requirements validated</span>
        </div>
        
        <div className="divide-y divide-slate-100">
          {ARCH_LAYERS.map((layer) => (
            <div key={layer.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/20 transition-all">
              <div className="md:w-1/4 shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">Layer Area</span>
                <span className="text-xs font-semibold text-slate-650 mt-0.5 block">{layer.layer}</span>
              </div>
              <div className="md:w-1/4 shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">Selected Stack</span>
                <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 mt-0.5 inline-block font-mono">
                  {layer.value}
                </span>
              </div>
              <div className="flex-1 md:pl-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">Trace Implementation Justification</span>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-0.5">
                  {layer.why}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE WORKFLOW PIPELINE MODEL */}
      <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Interactive Vector Ingestion Pipeline</h3>
            <p className="text-xs text-slate-400 mt-1">Click any step in the data pipeline to inspect its processing format, input/output data rules, and back-end source code.</p>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Select Step Below</span>
        </div>

        {/* Workflow horizontal blocks */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {STEPS_DATA.map((step, idx) => {
            const isActive = activeStepId === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`
                  p-3 rounded-xl border text-left flex flex-col justify-between h-24 transition-all cursor-pointer select-none
                  ${isActive 
                    ? 'bg-blue-600/10 border-blue-500 shadow-sm' 
                    : 'bg-slate-50/50 border-slate-200 hover:border-slate-350 hover:bg-slate-100/30'}
                `}
                id={`step-tab-${step.id}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-bold font-mono text-slate-400">0{idx + 1}</span>
                  {isActive && <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />}
                </div>
                <h4 className={`text-xs font-bold leading-tight ${isActive ? 'text-blue-700' : 'text-slate-800'}`}>
                  {step.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Flow representation details cards */}
        <div className="bg-slate-50/50 border border-slate-200/80 rounded-xl p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Properties description block */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-[9px] font-bold text-blue-600 font-mono uppercase tracking-widest">Active Component Analysis</span>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">{currentStep.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">{currentStep.desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div className="p-2.5 bg-white rounded-lg border border-slate-150/80">
                <span className="text-[9px] font-extrabold text-slate-400 font-mono block">Data Inbound</span>
                <span className="text-xs text-slate-800 font-bold block mt-0.5">{currentStep.input}</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-150/80">
                <span className="text-[9px] font-extrabold text-slate-400 font-mono block">Result Outbound</span>
                <span className="text-xs text-blue-700 font-bold block mt-0.5">{currentStep.output}</span>
              </div>
            </div>
          </div>

          {/* Code execution terminal mockup block */}
          <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-900 overflow-hidden self-start">
            <div className="px-4 py-2 bg-slate-900 flex items-center justify-between border-b border-slate-950">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="font-mono text-[9px] text-slate-500">{currentStep.id}.py</span>
            </div>
            <pre className="p-4 text-[10px] text-slate-300 font-mono overflow-x-auto select-all leading-relaxed bg-[#0b0c10]">
              <code>{currentStep.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

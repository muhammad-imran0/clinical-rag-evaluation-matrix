import { LitPaper, LlmModel, ArchLayer, DatasetItem, BoundaryItem, PhaseItem } from './types';

export const PAPERS_DATA: LitPaper[] = [
  {
    id: 'primary-survey',
    title: 'A Survey on Retrieval-Augmentation Generation (RAG) Models for Healthcare Applications',
    doi: 'https://doi.org/10.1007/s00521-025-11666-9',
    venue: 'Neural Computing and Applications (2025) 37:28191–28267',
    year: 2025,
    fileLabel: 'RAG Survey.pdf',
    tags: ['Primary Source', 'System Taxonomy', 'Advanced RAG'],
    limitation: 'Highlights constraints in naive clinical text retrievals such as semantic shift and clinical phrase mismatch.',
    solution: 'Establishes full RAG taxonomy structural evolution (Naive, Advanced, Modular) and highlights technical benchmarks for clinical applications.',
    context: 'Establishes full RAG taxonomy structural evolution (Naive, Advanced, Modular) and highlights technical benchmarks for clinical applications.',
    integration: 'The proposed advanced post-retrieval refinement layout directly builds upon the framework components mapped out in this text.'
  },
  {
    id: 'paper-1',
    title: '[1] MedRAX: Medical Reasoning Agent for Chest X-ray',
    doi: 'https://arxiv.org/abs/2502.02673',
    venue: 'ICML 2025',
    year: 2025,
    fileLabel: '2502.02673v2.pdf',
    tags: ['MedRAX', 'ICML 2025', 'MIMIC-CXR', 'Reasoning Agent'],
    limitation: 'Experiences severe optimization failures when pipeline evaluation tools generate contradictory or conflicting intermediate diagnostic labels.',
    solution: 'Post-retrieval Refinement block: Interjects an analytical reranker and filter to resolve conflicting tool metadata before context hits the final LLM.',
    context: 'Analyses chest X-ray reports iteratively using medical agent toolsets, but fails during high-conflict diagnostic logic trees.',
    integration: 'Post-retrieval Refinement block: Interjects an analytical reranker and filter to resolve conflicting tool metadata before context hits the final LLM.'
  },
  {
    id: 'paper-2',
    title: '[2] MMed-RAG: Versatile Multimodal RAG System for Medical VLMs',
    doi: 'https://arxiv.org/abs/2410.13085',
    venue: '2025 Baseline',
    year: 2025,
    fileLabel: 'RAG Survey_2.pdf',
    tags: ['MMed-RAG', 'MIMIC-CXR', 'Pre-print', 'VLM'],
    limitation: 'Presents a high "copy-reference rate" (28.19%), where the generating LLM tracks and copies retrieved historical reports rather than checking the new image data.',
    solution: 'Explainable AI (XAI) track: Parallel Grad-CAM spatial heatmaps and SHAP scores explicitly anchor the output generation tokens to current image pixels.',
    context: 'Applies multimodal visual embeddings to medical report lookup libraries, leading to reports relying too heavily on patient history databases.',
    integration: 'Explainable AI (XAI) track: Parallel Grad-CAM spatial heatmaps and SHAP scores explicitly anchor the output generation tokens to current image pixels.'
  },
  {
    id: 'paper-3',
    title: '[3] Content-Based Medical Image Retrieval System for X-ray Images',
    doi: 'https://doi.org/10.1038/s41598-025-14282-8',
    venue: 'Nature Scientific Reports (2025)',
    year: 2025,
    fileLabel: 's41598-025-14282-8.pdf',
    tags: ['CBIR', 'Nature 2025', 'Vector Lookup'],
    limitation: 'Functions as a closed, non-generative search pipeline. Successfully isolates similar vector profiles but cannot produce a text-based report summary.',
    solution: 'Extends vector lookup results straight into a generative LangChain execution workflow to convert matched historical matrices into clinical report text.',
    context: 'Demonstrates outstanding retrieval accuracy using cosine similarity on visual features, but does not provide clinical report synthesis capabilities.',
    integration: 'Extends vector lookup results straight into a generative LangChain execution workflow to convert matched historical matrices into clinical report text.'
  },
  {
    id: 'paper-4',
    title: '[4] MARCH: Multi-Agent Radiology Clinical Hierarchy for CT Report Generation',
    doi: 'https://arxiv.org/abs/2604.16175',
    venue: 'ACL 2026',
    year: 2026,
    fileLabel: 'AgenticHealthAI Repository',
    tags: ['MARCH', 'ACL 2026', 'Agentic Hierarchy', 'CT Scan'],
    limitation: 'Optimized solely for 3D volumetric CT scan text sequences; relies on a black-box prompt architecture completely lacking 2D visual verification.',
    solution: 'Adapts clinical organizational logic down to the 2D chest X-ray profile, verified by explicit spatial focus maps for the human reviewer interface.',
    context: 'Uses hierarchical agent roles (Radiology Resident, Senior Attending) to refine report text, but completely ignores image visual correlation during editing tiers.',
    integration: 'Adapts clinical organizational logic down to the 2D chest X-ray profile, verified by explicit spatial focus maps for the human reviewer interface.'
  },
  {
    id: 'paper-5',
    title: '[5] EviAgent: Evidence-Driven Agent for Radiology Report Generation',
    doi: 'https://arxiv.org/abs/2603.13956',
    venue: 'arXiv 2026',
    year: 2026,
    fileLabel: 'AgenticHealthAI Repository',
    tags: ['EviAgent', 'Evidence-Driven', 'arXiv 2026'],
    limitation: 'Constrained entirely to text-to-text semantic matching, running completely blind to pixel-level image anomalies and visual patterns.',
    solution: 'Executes a true multimodal retrieval system: CLIP encodes visual vectors, matching image profiles via Qdrant before extracting paired text context records.',
    context: 'Matches unstructured patient logs to historical reports, ignoring the visual content of the new image itself.',
    integration: 'Executes a true multimodal retrieval system: CLIP encodes visual vectors, matching image profiles via Qdrant before extracting paired text context records.'
  },
  {
    id: 'paper-6',
    title: '[6] Radiologist Copilot: Agentic AI Assistant for Holistic Radiology Reporting',
    doi: 'https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare',
    venue: '2025 Framework',
    year: 2025,
    fileLabel: 'AgenticHealthAI Repository',
    tags: ['Copilot', 'Holistic Reporting', 'Awesome Healthcare'],
    limitation: 'Report evaluation and quality controls depend entirely on the model\'s internal memory space, introducing high hallucination risks.',
    solution: 'Implements an external validation step via the "Is retrieval enough?" gateway loop to evaluate findings against non-parametric historical databases.',
    context: 'A comprehensive visual-to-text framework that still relies heavily on the final LLM accurately structuring output details without external verification loops.',
    integration: 'Implements an external validation step via the "Is retrieval enough?" gateway loop to evaluate findings against non-parametric historical databases.'
  }
];

export const MODELS_DATA: LlmModel[] = [
  {
    id: 'gazal-r1',
    name: 'Gazal-R1 (2025)',
    description: 'Step-by-step clinical reasoning agent optimized for structured diagnostic trees.',
    medQa: 87.1,
    usmle: null,
    status: 'restricted',
    resourceCode: 'Restricted Core Access',
    pros: ['Very deep diagnostic tracing', 'Exceptional clinical logic validation logs', 'High factuality score'],
    cons: ['Heavy computational overhead', 'Proprietary core license restricts offline runtimes', 'High latency for conversational feedback']
  },
  {
    id: 'med42-v2',
    name: 'Med42-v2 (2024)',
    description: 'State-of-the-art clinical open-access model designed for comprehensive clinical dialogues.',
    medQa: 80.4,
    usmle: 94.5,
    status: 'requires-heavy-gpu',
    resourceCode: 'Requires A100 Compute Node',
    pros: ['Excellent standard test performance', 'Fine-tuned on high-volume professional datasets', 'Fully open-weights structure'],
    cons: ['Requires substantial local hardware configuration', 'Poor scaling on smaller mobile and edge servers', 'Vulnerable to context window limits on extreme prompt structures']
  },
  {
    id: 'med-palm-2',
    name: 'Med-PaLM 2 (2023)',
    description: 'Google\'s clinical flagship foundation model series, establishing a high quality baseline.',
    medQa: 86.5,
    usmle: null,
    status: 'proprietary',
    resourceCode: 'Proprietary API Barrier',
    pros: ['Human-expert level evaluation matches', 'Top-tier diagnostic taxonomy mapping', 'Fully managed secure deployment'],
    cons: ['Restricted behind organizational permission panels', 'No offline execution capabilities', 'Prohibitive pricing structure for research prototyping']
  },
  {
    id: 'biogpt',
    name: 'BioGPT (Selected Primary)',
    description: 'Autoregressive domain-specific transformer framework optimized for medical texts.',
    medQa: 75.0,
    usmle: null,
    status: 'validated',
    resourceCode: 'Validated On CPU / Low-spec GPU',
    pros: ['Directly compiles on modest local CPU structures', 'Highly focused vocabulary on medical literature terms', 'Guaranteed local container privacy'],
    cons: ['Slightly lower raw reasoning accuracy scores', 'Limited multi-turn natural language conversational flexibility']
  },
  {
    id: 'clinical-camel',
    name: 'Clinical Camel (Comparative)',
    description: 'DBKE conversational clinical model optimized for fast, responsive dialogue.',
    medQa: 60.7,
    usmle: 64.3,
    status: 'validated',
    resourceCode: 'Runs on Google Colab T4 Node',
    pros: ['Bypasses hardware barriers (Fully validated on free T4 node)', 'Active open-source community support', 'Excellent response formatting speed'],
    cons: ['Susceptible to hallucinating fine clinical numbers', 'Smaller baseline model size narrows deep literature tracking']
  }
];

export const ARCH_LAYERS: ArchLayer[] = [
  {
    id: 'orch',
    layer: 'Orchestration',
    value: 'LangChain',
    why: 'Manages multi-component links, structures semantic variables, and controls execution routes.'
  },
  {
    id: 'vect',
    layer: 'Feature Vectors',
    value: 'CLIP ViT-B/32',
    why: 'Generates aligned 512-dimensional visual structural arrays from preprocessed image feeds.'
  },
  {
    id: 'store',
    layer: 'Vector Store',
    value: 'Qdrant Database',
    why: 'Runs isolated high-performance vector lookup indices via local Docker containers (mapped to port 6333).'
  },
  {
    id: 'mem',
    layer: 'Context Memory',
    value: 'ConversationBuffer',
    why: 'Maintains ongoing chat dialogue constraints for continuous doctor-assistant diagnostic interaction.'
  },
  {
    id: 'xai',
    layer: 'Explainability (XAI)',
    value: 'Grad-CAM / SHAP',
    why: 'Extracts deep visual state coordinates from CLIP encoders to render spatial focus heatmaps.'
  },
  {
    id: 'val',
    layer: 'Validation Layer',
    value: 'RAGAS Framework',
    why: 'Measures factual alignment, answer relevance, and context utilization indicators against clinical references.'
  },
  {
    id: 'ui',
    layer: 'User Interface',
    value: 'React + FastAPI',
    why: 'Provides a clean, responsive medical dashboard replacing the simplified, transient Gradio script.'
  }
];

export const DATASETS_DATA: DatasetItem[] = [
  {
    id: 'mimic-cxr',
    title: 'MIMIC-CXR Validation Target (Hugging Face Mirror)',
    link: 'https://huggingface.co/datasets/itsanmolgupta/mimic-cxr-dataset',
    statusTags: ['First-Choice Target', 'Approved Setup', 'No Access Barriers'],
    stats: [
      { value: '30,633', label: 'X-ray Records' },
      { value: '2 Fields', label: 'Findings & Impressions' },
      { value: '512px', label: 'Standard Dimensions' }
    ],
    findings: 'Contains raw clinician observations describing pulmonary shadows, cardiac sizes, pleural conditions, and skeletal anatomy.',
    impression: 'Synthesizes primary diagnostic classifications, which serve as the definitive evaluation ground truth to calculate model accuracy metrics.'
  },
  {
    id: 'breast-proto',
    title: 'BrEaST Dataset (Phase 1 Micro-Prototype Archive)',
    statusTags: ['Completed Prototype', 'Fully Indexed in Qdrant'],
    stats: [
      { value: '256', label: 'Ultrasound Files' },
      { value: '512d', label: 'CLIP Vectors' },
      { value: '7 Attributes', label: 'Metadata fields' }
    ],
    findings: 'Contains structural descriptors mapping patients age profiles, BIRADS categories, and clinical status findings.',
    impression: 'Maps patient attributes such as age, diagnostic classification, lesion shapes, features margins, visual scores and tumor categories.',
    description: 'Served as the core validation target for establishing baseline vector retrieval confidence during Phase 1.'
  }
];

export const BOUNDARIES_DATA: BoundaryItem[] = [
  {
    id: 'b-1',
    title: 'Hardware Environment Limits',
    text: 'Advanced models require major storage and processing hardware. To maintain execution within free-tier Google Colab constraints, BioGPT compiles directly via local CPU pipelines, while larger VLMs are managed by strict caching strategies on T4 runtimes.',
    iconName: 'cpu',
    type: 'critical'
  },
  {
    id: 'b-2',
    title: 'Data Repository Scope Constraints',
    text: 'The complete 377k image MIMIC-CXR warehouse requires extensive credentialing loops. Utilizing the clean 30.6k row Hugging Face mirror preserves identical informational value while bypassing administrative loops to keep the build timeline on track.',
    iconName: 'database',
    type: 'alert'
  },
  {
    id: 'b-3',
    title: 'Clinical Evaluation Scope Boundaries',
    text: 'The system does not claim real-world clinical validation by human medical professionals. Performance is validated strictly using algorithmic metrics (ROUGE-L, BLEU, RAGAS), tracking execution quality against documented ground truth.',
    iconName: 'shield-alert',
    type: 'info'
  }
];

export const PHASES_DATA: PhaseItem[] = [
  {
    id: 'ph-1',
    title: 'Phase 1: Vector Space Prototyping',
    desc: '256 breast ultrasound scans successfully processed via CLIP ViT-B/32 pipelines and indexed into local Qdrant engines. Verified retrieval accuracy metrics using a prototype Gradio interface.',
    status: 'done',
    tasks: [
      { title: 'Ingest 256 BrEaST ultrasound images', completed: true },
      { title: 'Implement CLIP ViT-B/32 vector generator', completed: true },
      { title: 'Provision local Qdrant Vector database and set up collections', completed: true },
      { title: 'Benchmark baseline visual query recall', completed: true },
      { title: 'Build mock Gradio reviewer panel', completed: true }
    ]
  },
  {
    id: 'ph-2',
    title: 'Phase 2: Reference Engineering & Proposal Structure',
    desc: 'Mapping architectural layout requirements against modern 2025/2026 agent frameworks (MedRAX, EviAgent, MARCH) to explicitly lock down open research gaps.',
    status: 'now',
    tasks: [
      { title: 'Document comprehensive literature traceability matrix', completed: true },
      { title: 'Establish specific clinical architecture gaps', completed: true },
      { title: 'Design the post-retrieval refinement layout', completed: true },
      { title: 'Confirm Hugging Face mirror mapping requirements', completed: false },
      { title: 'Validate compilation patterns for local LLM nodes', completed: false }
    ]
  },
  {
    id: 'ph-3',
    title: 'Phase 3: Generation & Orchestration Build',
    desc: 'Assembling LangChain prompt injection blocks using BioGPT and Clinical Camel. Coding short-term memory wrappers using ConversationBufferMemory models.',
    status: 'todo',
    tasks: [
      { title: 'Configure LangChain chains with dynamic templates', completed: false },
      { title: 'Integrate BioGPT and Clinical Camel tokenizers', completed: false },
      { title: 'Implement Memory system via ConversationBuffer', completed: false },
      { title: 'Structure XML-structured routing triggers', completed: false }
    ]
  },
  {
    id: 'ph-4',
    title: 'Phase 4: Comparative Evaluation Runs',
    desc: 'Running evaluation batch loops across the 30,633 row mirror dataset. Generating comparative performance plots for ROUGE, BLEU, and RAGAS metrics to identify the strongest textual generation engine.',
    status: 'todo',
    tasks: [
      { title: 'Execute comparative evaluate prompts over the 30.6k target matrix', completed: false },
      { title: 'Log accurate BLEU-1 to BLEU-4 indicators', completed: false },
      { title: 'Map ROUGE-F1 recall parameters across runs', completed: false },
      { title: 'Output precision charts for RAGAS faithfulness datasets', completed: false }
    ]
  },
  {
    id: 'ph-5',
    title: 'Phase 5: Explainability (XAI) Matrix Integration',
    desc: 'Injecting PyTorch Grad-CAM configurations into the workflow to generate overlay heatmaps, rendering visual proof directly inside the user\'s browser dashboard.',
    status: 'todo',
    tasks: [
      { title: 'Extract CLIP attention coordinates', completed: false },
      { title: 'Generate high-contrast Grad-CAM spatial overlay overlays', completed: false },
      { title: 'Convert SHAP text token dependencies to dashboard visual layouts', completed: false },
      { title: 'Replace temporary Gradio pipeline with the final interactive React UI', completed: false }
    ]
  }
];

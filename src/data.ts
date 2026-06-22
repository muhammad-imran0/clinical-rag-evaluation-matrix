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
    limitation: 'Highlights core constraints in naive clinical text retrievals such as semantic shift and clinical phrase mismatch.',
    solution: 'Establishes full Advanced RAG taxonomies (Section 5.4 context routing, post-retrieval reranking blocks) that directly provide blueprints for safe, modular pipelines.',
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
    limitation: 'Experiences severe optimization and reasoning failures when different pipeline evaluation tools generate contradictory or conflicting intermediate diagnostic labels, with no integrated context filter.',
    solution: 'Implements a post-retrieval refinement block (reranker + context filter + prompt compression) to analytically resolve conflicting metadata labels before context is forwarded to the LLM.',
    context: 'LLM-driven ReAct loop that dynamically selects and calls specialised CXR tools (segmentation, classification, VQA) without retraining. Decomposes queries into observe → think → act steps.',
    integration: 'Post-retrieval Refinement block: Interjects an analytical reranker and filter to resolve conflicting tool metadata before context hits the final LLM.'
  },
  {
    id: 'paper-2',
    title: '[2] MMed-RAG: Versatile Multimodal RAG System for Medical VLMs',
    doi: 'https://arxiv.org/abs/2410.13085',
    venue: '2025 Baseline',
    year: 2025,
    fileLabel: '2410.13085v2.pdf',
    tags: ['MMed-RAG', 'MIMIC-CXR', 'Pre-print', 'VLM'],
    limitation: 'Presents a high "copy-reference rate" (28.19%), where the generating VLM matches and copies retrieved historical reports blind rather than evaluating current visual image features, lacking pixel-level explainable attribution metrics.',
    solution: 'Implements a parallel explainability (XAI) stack (Grad-CAM spatial heatmap, SHAP, LIME) to anchor output generation tokens directly to the query image pixels.',
    context: 'Domain-aware retrieval mechanism + adaptive context selection + Direct Preference Optimization (DPO) to fine-tune VLM alignment on medical content.',
    integration: 'Explainable AI (XAI) track: Parallel Grad-CAM spatial heatmaps and SHAP scores explicitly anchor the output generation tokens to current image pixels.'
  },
  {
    id: 'paper-3',
    title: '[3] Content-Based Medical Image Retrieval System for X-ray Images',
    doi: 'https://doi.org/10.1038/s41598-025-14282-8',
    venue: 'Nature Scientific Reports (2025)',
    year: 2025,
    fileLabel: 's41598-025-14282-8.pdf',
    tags: ['CBIR', 'Nature 2025', 'Vector Lookup', 'Cosine similarity'],
    limitation: 'Operates as a completely closed, non-generative visual-only database search system. Finds visually matching scan coordinates but lacks downstream text-based diagnostic synthesis capabilities.',
    solution: 'Extends vector database query similarity matches directly into a LangChain + VLM orchestration generation layout to compile findings into human-readable text.',
    context: 'Image preprocessing → subband decomposition (HWHT) → GLCM feature extraction → SCARO dimensionality reduction → cosine similarity image retrieval.',
    integration: 'Extends vector lookup results straight into a generative LangChain execution workflow to convert matched historical matrices into clinical report text.'
  },
  {
    id: 'paper-4',
    title: '[4] MARCH: Multi-Agent Radiology Clinical Hierarchy for CT Report Generation',
    doi: 'https://arxiv.org/abs/2604.16175',
    venue: 'ACL 2026',
    year: 2026,
    fileLabel: '2604.16175v1.pdf',
    tags: ['MARCH', 'ACL 2026', 'Agentic Hierarchy', 'CT Scan'],
    limitation: 'Optimized solely for 3D volumetric CT scan text sequences in a black-box prompt architecture completely lacking 2D visual chest X-ray support, visual heatmaps, or explainability interfaces.',
    solution: 'Translates hierarchical agent department consensus mechanisms to 2D chest scans and breast ultrasound, bolstered by Grad-CAM pixel overlays for clinical reviewers.',
    context: 'Emulates hospital radiology department hierarchy using specialised agents. Resident drafts → Fellow revises → Attending gives final consensus with stance-based checks.',
    integration: 'Adapts clinical organizational logic down to the 2D chest X-ray profile, verified by explicit spatial focus maps for the human reviewer interface.'
  },
  {
    id: 'paper-5',
    title: '[5] EviAgent: Evidence-Driven Agent for Radiology Report Generation',
    doi: 'https://arxiv.org/abs/2603.13956',
    venue: 'arXiv 2026',
    year: 2026,
    fileLabel: '2603.13956v1.pdf',
    tags: ['EviAgent', 'Evidence-Driven', 'arXiv 2026'],
    limitation: 'Constrained entirely to text-to-text semantic matching of historical logs, running completely blind to raw medical image visual features and pixel-level diagnostic correlations.',
    solution: 'Deploys a true multimodal retrieval system: CLIP encodes query visual features, matching images on visual similarity before extracting paired text records as evidence.',
    context: 'Systematic token routing to dynamically harvest relevant text evidence chunks from open clinical literature during report generation.',
    integration: 'Executes a true multimodal retrieval system: CLIP encodes visual vectors, matching image profiles via Qdrant before extracting paired text context records.'
  },
  {
    id: 'paper-6',
    title: '[6] Radiologist Copilot: Agentic AI Assistant for Holistic Radiology Reporting',
    doi: 'https://arxiv.org/abs/2512.10857',
    venue: 'arXiv 2025',
    year: 2025,
    fileLabel: '2512.10857v1.pdf',
    tags: ['Copilot', 'Holistic', 'arXiv 2025'],
    limitation: 'Verification and quality controls depend entirely on the model\'s internal parameters, risking severe clinical hallucinations and ungrounded claims.',
    solution: 'Integrates an external verification checkpoint using RAGAS faithfulness metrics ("Is retrieval enough?") against proven non-parametric databases.',
    context: 'Automated chat layout with built-in quality control mechanisms that evaluate report completeness during the final drafting stage using the VLM\'s internal knowledge.',
    integration: 'Implements an external validation step via the "Is retrieval enough?" gateway loop to evaluate findings against non-parametric historical databases.'
  },
  {
    id: 'paper-7',
    title: '[7] LungNoduleAgent: Collaborative Multi-Agent for Precision Lung Diagnosis',
    doi: 'https://ojs.aaai.org/index.php/AAAI',
    venue: 'AAAI 2026',
    year: 2026,
    fileLabel: 'LungNoduleAgent_AAAI2026.pdf',
    tags: ['LungNoduleAgent', 'AAAI 2026', 'CT Nodule'],
    limitation: 'Restricted exclusively to CT-based lung nodule characterization, lacking 2D support, pixel-level explainable attribution, or generalizability to other modalities.',
    solution: 'Generalizes multi-agent validation logic to 2D X-rays and breast ultrasound with custom Grad-CAM overlays mapping specific focal coordinates.',
    context: 'Collaborative multi-agent pipeline where specialised agents independently analyse lung nodules and consensus is reached through agent communication.',
    integration: 'Adapts multi-agent pipeline structures for 2D X-Ray and Breast Ultrasound modalities, leveraging explainable visual highlights.'
  },
  {
    id: 'paper-8',
    title: '[8] A Multimodal Multi-Agent Framework for Radiology Report Generation',
    doi: 'https://arxiv.org/abs/2505.19660',
    venue: 'arXiv 2025',
    year: 2025,
    fileLabel: '2505.19660v1.pdf',
    tags: ['Multimodal', 'Multi-Agent', 'arXiv 2025'],
    limitation: 'Operates as a black-box text synthesizer that retrieves text and outputs reports, completely lacking an XAI attribution layer to trace written claims to spatial pixels.',
    solution: 'Implements a full parallel explainability stack (overlapping Grad-CAM, SHAP text dependencies, and local token-to-visual surrogates in a unified review layout).',
    context: 'Multiple specialised agents collaborate: one processes images, one handles retrieval, one generates text. Reports assembled from agent outputs.',
    integration: 'Provides a visual review interface with robust XAI tracing layers to verify and check specific textual claims against raw pixel highlight overlays.'
  }
];

export const MODELS_DATA: LlmModel[] = [
  {
    id: 'llava-med',
    name: 'LLaVA-Med-1.5 (Primary VLM)',
    description: 'Specialized clinical multimodal vision-language framework. Direct scientific baseline matching MMed-RAG [2].',
    medQa: 73.0,
    usmle: null,
    status: 'validated',
    resourceCode: 'Validated on Colab T4 / Hugging Face',
    pros: ['Excellent multi-modal scan feature integration', 'Allows direct comparative baseline reviews with literature', 'Runs comfortably on free T4 nodes'],
    cons: ['Moderate prompt alignment drift on multi-turn interactions', 'Slightly higher latency on auto-regressive text outputs than smaller scale LMs']
  },
  {
    id: 'biogpt',
    name: 'BioGPT (Selected Compare LM)',
    description: 'PubMed trained generative language model. Compares output with LLaVA-Med to test text-only context versus vision alignments.',
    medQa: 75.0,
    usmle: null,
    status: 'validated',
    resourceCode: 'Runs on Colab CPU / Low-spec GPU',
    pros: ['PubMed and medical terminology vocab pre-trained', 'Low computational footprint, compiles directly on standard local CPUs', 'Guaranteed local container privacy'],
    cons: ['Limited visual feature map integration (requires external BLIP captions)', 'Reduced conversational dialogue flexibility']
  },
  {
    id: 'gazal-r1',
    name: 'Gazal-R1 (2025)',
    description: 'Step-by-step clinical reasoning agent optimized for structured diagnostic trees.',
    medQa: 87.1,
    usmle: null,
    status: 'restricted',
    resourceCode: 'Restricted Core Access',
    pros: ['Very deep diagnostic tracing with reason logs', 'Exceptional clinical logic validation logs', 'High faithfulness score'],
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
    id: 'clinical-camel',
    name: 'Clinical Camel (250m Comparative)',
    description: 'Conversational clinical database model optimized for lightweight chat experiments.',
    medQa: 60.7,
    usmle: 64.3,
    status: 'validated',
    resourceCode: 'Runs on Google Colab T4 Node',
    pros: ['Low memory footprint, easy training scripts', 'Excellent response formatting speed', 'Active open-source community support'],
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
    why: 'Generates aligned 512-dimensional visual structural arrays from preprocessed chest images and scans.'
  },
  {
    id: 'store',
    layer: 'Vector Store',
    value: 'Qdrant Database',
    why: 'Runs isolated high-performance vector lookup indices via local Docker containers (mapped to port 6333).'
  },
  {
    id: 'llm1',
    layer: 'Primary VLM Model',
    value: 'LLaVA-Med-1.5',
    why: 'Primary clinical multi-modal model used as the baseline generator matching modern literature standards.'
  },
  {
    id: 'llm2',
    layer: 'Compare Language Model',
    value: 'BioGPT Node',
    why: 'Trained on medical datasets; acts as the control target to contrast text-only performance with visual inputs.'
  },
  {
    id: 'vlm',
    layer: 'Visual Captioner',
    value: 'BLIP-2',
    why: 'Generates natural language clinical descriptions of query X-rays to feed into prompt configurations.'
  },
  {
    id: 'xai',
    layer: 'Explainability (XAI)',
    value: 'Grad-CAM / SHAP / LIME',
    why: 'Extracts deep visual state coordinates from CLIP encoders to render spatial focus heatmaps overlaid on scans.'
  },
  {
    id: 'val',
    layer: 'Faithfulness Verifier',
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
      { value: '30,600', label: 'X-ray Records' },
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
  },
  {
    id: 'iu-xray',
    title: 'IU X-Ray (Indiana University Backup Archive)',
    link: 'https://www.kaggle.com/datasets/raddar/chest-xrays-indiana-university',
    statusTags: ['Available Backup Source'],
    stats: [
      { value: '7,470', label: 'CXR Images' },
      { value: 'Paired', label: 'Reports Included' },
      { value: 'Kaggle', label: 'Download Ready' }
    ],
    findings: 'Chest radiographs with paired clinical reports including observations, findings, and impressions.',
    impression: 'Helps in rapid pipeline prototyping and serves as an alternative clinical baseline before scaling up to full MIMIC-CXRs.',
    description: 'Used in MMed-RAG [2] literature benchmarks, offering a highly validated backup framework.'
  }
];

export const BOUNDARIES_DATA: BoundaryItem[] = [
  {
    id: 'b-1',
    title: 'Humble Computer Power',
    text: 'Advanced models require major storage and processing hardware. To maintain execution within free-tier Google Colab constraints, BioGPT compiles directly via local CPU pipelines, while larger VLMs are managed by strict caching strategies on T4 runtimes.',
    iconName: 'cpu',
    type: 'critical'
  },
  {
    id: 'b-2',
    title: 'Ethical Data Access',
    text: 'Gain direct access to hospital database servers requires up to 6 months of administrative paperwork. Utilizing the clean 30.6k row Hugging Face mirror preserves identical informational value while bypassing administrative loops to keep the build timeline on track.',
    iconName: 'database',
    type: 'alert'
  },
  {
    id: 'b-3',
    title: 'No Actual Patient Risks',
    text: 'The system does not claim real-world clinical validation on alive patients. Performance is validated strictly using algorithmic metrics (ROUGE-L, BLEU, RAGAS), tracking execution quality against documented ground truth.',
    iconName: 'shield-alert',
    type: 'info'
  }
];

export const PHASES_DATA: PhaseItem[] = [
  {
    id: 'ph-1',
    title: 'Phase 1: Image embedding + retrieval',
    desc: '256 BrEaST ultrasound images processed via CLIP ViT-B/32 pipelines and successfully indexed into local Qdrant collections. Tested visual query recall with a prototype search dashboard.',
    status: 'done',
    tasks: [
      { title: 'Incorporate 256 BrEaST images into pipeline', completed: true },
      { title: 'Deploy CLIP ViT-B/32 generator', completed: true },
      { title: 'Provision local Qdrant collections and load vectors', completed: true },
      { title: 'Calculate baseline visual search scores', completed: true },
      { title: 'Build basic PCA visual query plot matrix', completed: true }
    ]
  },
  {
    id: 'ph-2',
    title: 'Phase 2: Literature review',
    desc: 'Reading RAG Survey Section 5.4, MedRAX, MMed-RAG, MARCH, EviAgent, LungNoduleAgent, and other relevant agent studies to isolate and document engineering omissions.',
    status: 'now',
    tasks: [
      { title: 'Review medical LLM benchmarks in Survey Sec 5.4', completed: true },
      { title: 'Identify core limitations across all 8 radiology papers', completed: true },
      { title: 'Design post-retrieval reranking & contextual layout', completed: true },
      { title: 'Analyze Hugging Face MIMIC-CXR mirror specifications', completed: true },
      { title: 'Document comprehensive literature traceability matrix', completed: true }
    ]
  },
  {
    id: 'ph-3',
    title: 'Phase 3: Generation phase',
    desc: 'LangChain + LLaVA-Med-1.5 generation block setup. Creating PromptTemplates that accept retrieved context, query images, and setting up ConversationBufferMemory for multi-turn clinical chat dialogues.',
    status: 'todo',
    tasks: [
      { title: 'Setup LangChain chains and custom prompt templates', completed: false },
      { title: 'Incorporate ConversationBufferMemory short-term state containers', completed: false },
      { title: 'Anchor MIMIC-CXR historical reports as evidence chunks', completed: false },
      { title: 'Configure prompt templates with dynamic variables', completed: false }
    ]
  },
  {
    id: 'ph-4',
    title: 'Phase 4: LLM comparison',
    desc: 'contrasting natural language generations from LLaVA-Med-1.5 vs BioGPT over the same MIMIC-CXR mirror dataset, running evaluation metrics like BLEU-4, ROUGE-L, METEOR, and RAGAS.',
    status: 'todo',
    tasks: [
      { title: 'Conduct batch prompting loops over mirror records', completed: false },
      { title: 'Calculate BLEU-1 to BLEU-4 exact token scores', completed: false },
      { title: 'Audit ROUGE-L classification quality scores', completed: false },
      { title: 'Document comparative graphs of model results', completed: false }
    ]
  },
  {
    id: 'ph-5',
    title: 'Phase 5: Pre/post retrieval enhancements',
    desc: 'Developing query rewriter triggers, cross-encoder rerankers, and custom prompt compression to guarantee that critical evidence fits inside model context windows seamlessly.',
    status: 'todo',
    tasks: [
      { title: 'Implement pre-retrieval query rewriting logic', completed: false },
      { title: 'Build cross-encoder reranking layers', completed: false },
      { title: 'Integrate prompt token compression engines', completed: false },
      { title: 'Enable retry loop if RAGAS faithfulness is too low', completed: false }
    ]
  },
  {
    id: 'ph-6',
    title: 'Phase 6: XAI integration',
    desc: 'Embedding Grad-CAM focus highlights, SHAP token dependency graphs, and LIME local surrogate explanations to visualize clinical findings clearly on scans.',
    status: 'todo',
    tasks: [
      { title: 'Extract attention grids from models vision layers', completed: false },
      { title: 'Generate high-contrast Grad-CAM heatmaps overlaid on images', completed: false },
      { title: 'Perform SHAP calculation and print feature attribution sheets', completed: false },
      { title: 'Produce LIME explanations for generated tokens', completed: false }
    ]
  },
  {
    id: 'ph-7',
    title: 'Phase 7: MIMIC-CXR scale up + BLIP-2',
    desc: 'Loading and parsing the full 30,600 Parquet mirror files from Hugging Face, creating a scaled Qdrant database, and implementing BLIP-2 image captioners.',
    status: 'todo',
    tasks: [
      { title: 'Load and parse 30k parquet mirror datasets from HF', completed: false },
      { title: 'Index scaled MIMIC-CXR vectors into Qdrant collections', completed: false },
      { title: 'Configure BLIP-2 visual captioning models', completed: false },
      { title: 'Evaluate full end-to-end multimodal pipeline performance', completed: false }
    ]
  },
  {
    id: 'ph-8',
    title: 'Phase 8: React + FastAPI frontend',
    desc: 'Constructing a production-grade clinical workspace displaying patient uploads, similarity scores, retrieved medical files, XAI overlays, and generated reports.',
    status: 'todo',
    tasks: [
      { title: 'Build FastAPI endpoint scripts in Python servers', completed: false },
      { title: 'Code responsive frontend panels in React', completed: false },
      { title: 'Hook dashboard to active Qdrant + local LLM ports', completed: false },
      { title: 'Review image overlays and Grad-CAM layers rendering', completed: false }
    ]
  },
  {
    id: 'ph-9',
    title: 'Phase 9: Dissertation write-up',
    desc: 'Structuring the final IEEE-compliant master thesis proposal: introduction, literary matrices, modular architecture diagrams, experimental findings, and conclusion.',
    status: 'todo',
    tasks: [
      { title: 'Format academic draft in IEEE-compliant files', completed: false },
      { title: 'Add full literature review with robust bibliography registers', completed: false },
      { title: 'Compile statistical evaluation spreadsheets and plots', completed: false },
      { title: 'Deliver finalized copy to Dr. Shaheen Khatoon', completed: false }
    ]
  }
];

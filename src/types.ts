export interface LitPaper {
  id: string;
  title: string;
  doi: string;
  venue: string;
  year: number;
  fileLabel: string;
  tags: string[];
  limitation: string;
  solution: string;
  context: string;
  integration: string;
}

export interface LlmModel {
  id: string;
  name: string;
  description: string;
  medQa: number | null; // out of 100
  usmle: number | null; // out of 100
  status: 'validated' | 'restricted' | 'requires-heavy-gpu' | 'proprietary';
  resourceCode: string;
  pros: string[];
  cons: string[];
}

export interface ArchLayer {
  id: string;
  layer: string;
  value: string;
  why: string;
}

export interface DatasetItem {
  id: string;
  title: string;
  link?: string;
  statusTags: string[];
  stats: { value: string; label: string }[];
  findings: string;
  impression: string;
  description?: string;
}

export interface BoundaryItem {
  id: string;
  title: string;
  text: string;
  iconName: 'cpu' | 'database' | 'shield-alert';
  type: 'critical' | 'alert' | 'info';
}

export interface PhaseItem {
  id: string;
  title: string;
  desc: string;
  status: 'done' | 'now' | 'todo';
  tasks: { title: string; completed: boolean }[];
}

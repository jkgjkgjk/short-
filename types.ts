export enum FormulaType {
  AUTO = 'Auto-detect',
  FAKE_PROOF = 'Fake/Proof',
  REVELATION = 'Revelation',
  BACKSTORY = 'Backstory Reveal',
  DISCOVERY = 'Discovery',
  CONTRADICTION = 'Contradiction',
}

export interface ScriptMetrics {
  wordCount: number;
  duration: string;
  viralScore: number;
  hookLength: number;
  commaCount: number;
  presentTenseScore: boolean;
  forbiddenWordCount: number;
}

export interface GeneratorOptions {
  includeSubscribe: boolean;
  strictMode: boolean;
  targetWordCount: number;
}

export interface GeneratedScript {
  text: string;
  formula: FormulaType;
  metrics: ScriptMetrics;
  timestamp: number;
}

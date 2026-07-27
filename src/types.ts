/**
 * Research with MXR - Data Types
 */

export interface PicoFramework {
  population: {
    description: string;
    sampleSizeTotal: number;
    keyCharacteristics: string[];
    inclusionCriteria?: string[];
    exclusionCriteria?: string[];
  };
  intervention: {
    name: string;
    dosage: string;
    route: string;
    frequency: string;
    duration: string;
    details: string;
  };
  comparator: {
    name: string;
    type: 'Placebo' | 'Active Control' | 'Standard of Care' | 'None' | string;
    details: string;
  };
  outcomes: {
    primaryEndpoint: string;
    secondaryEndpoints: string[];
    timeframe: string;
    primaryOutcomeMet: boolean | 'Inconclusive';
  };
}

export interface StatisticalResults {
  sampleSize: {
    total: number;
    interventionGroup: number;
    controlGroup: number;
  };
  primaryEffectSize: {
    metric: 'Hazard Ratio (HR)' | 'Odds Ratio (OR)' | 'Relative Risk (RR)' | 'Mean Difference' | 'Absolute Risk Reduction' | string;
    value: string;
    ci95: string;
    pValue: string;
    statisticallySignificant: boolean;
  };
  secondaryResults?: Array<{
    endpoint: string;
    effectValue: string;
    ci95?: string;
    pValue?: string;
    significant?: boolean;
  }>;
  statisticalPower: string;
  analysisType: 'Intention-to-Treat (ITT)' | 'Per-Protocol (PP)' | 'Modified ITT' | 'As-Treated' | string;
}

export interface BiasDimension {
  rating: 'Low' | 'Moderate' | 'High' | 'Unclear';
  justification: string;
}

export interface RiskOfBiasAssessment {
  overallRisk: 'Low' | 'Moderate' | 'High';
  overallSummary: string;
  selectionBias: BiasDimension; // Random sequence generation & allocation concealment
  blindingBias: BiasDimension;  // Blinding of participants and personnel
  attritionBias: BiasDimension; // Incomplete outcome data
  reportingBias: BiasDimension; // Selective outcome reporting
  otherBias?: BiasDimension;
}

export interface AdverseEventItem {
  event: string;
  interventionRate: string;
  controlRate?: string;
  pValue?: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Life-threatening';
}

export interface PharmacovigilanceNotes {
  adverseEvents: AdverseEventItem[];
  seriousAdverseEventsSummary: string;
  blackBoxWarningsOrContraindications: string[];
  monitoringRecommendations: {
    labTests: string[];
    frequency: string;
    specialPopulations: string; // e.g. Renal impairment eGFR < 30, Hepatic
  };
  drugInteractions: string[];
  pharmacistClinicalPearls: string[];
}

export interface LiteratureEvidenceGrade {
  gradeRating: 'HIGH (Level A)' | 'MODERATE (Level B)' | 'LOW (Level C)' | 'VERY LOW (Level D)';
  strengthOfRecommendation: 'Strong For' | 'Weak/Conditional For' | 'Neutral' | 'Against';
  clinicalSummary: string;
  practiceImplications: string;
}

export interface ExtractedTrialData {
  id: string;
  createdAt: string; // ISO string
  title: string;
  authorsAndJournal?: string;
  publicationYear?: string;
  pmidOrDoi?: string;
  rawText: string;
  
  executiveSummary: {
    headline: string;
    keyTakeaways: string[];
    primaryConclusion: string;
  };
  
  pico: PicoFramework;
  statistics: StatisticalResults;
  riskOfBias: RiskOfBiasAssessment;
  pharmacovigilance: PharmacovigilanceNotes;
  evidenceGrade: LiteratureEvidenceGrade;
  
  sourceHighlights?: Array<{
    textSnippet: string;
    category: 'Population' | 'Intervention' | 'Outcome' | 'Bias' | 'Safety';
  }>;
}

export interface SampleTrial {
  id: string;
  title: string;
  subtitle: string;
  drugClass: string;
  condition: string;
  abstractText: string;
}

export interface SynthesisRequest {
  trialIds?: string[];
  customTexts?: string[];
  focusTopic?: string;
}

export interface MultiTrialSynthesis {
  topic: string;
  trialCount: number;
  overallConsensus: string;
  comparativeMatrix: Array<{
    trialTitle: string;
    picoSummary: string;
    primaryOutcomeResult: string;
    safetyProfile: string;
    evidenceQuality: string;
  }>;
  clinicalRecommendations: string[];
  conflictingFindings: string[];
  gapsInEvidence: string[];
}

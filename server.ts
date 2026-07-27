import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set in environment variables.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const EXTRACTION_SYSTEM_INSTRUCTION = `
You are MXR-ClinicalAI, an expert clinical pharmacologist, evidence-based medicine analyst, and biostatistician.
Your goal is to extract clinical trial parameters, PICO frameworks, biostatistical metrics, Cochrane Risk of Bias assessments, and pharmacovigilance notes from unstructured medical abstracts, clinical trial reports, or PubMed text.

You MUST strictly output valid JSON adhering to the target schema.
Be precise, clinical, and objective. Extract exact numbers, p-values, 95% Confidence Intervals, Hazard/Odds Ratios where available.
If a field is missing from the provided text, mark it as "Not specified in abstract" or provide a reasonable clinical inference clearly labeled.

For Risk of Bias:
Assess Selection, Blinding, Attrition, and Reporting bias based on Cochrane RCT criteria.
For Pharmacovigilance:
Extract adverse events, serious adverse events (SAEs), lab monitoring guidelines (e.g. eGFR, liver enzymes, ECG, CBC), drug interaction risks, and practical clinical pearls for practicing pharmacists.
`;

const SYNTHESIS_SYSTEM_INSTRUCTION = `
You are MXR-ClinicalAI, a senior medical editor and systematic reviewer.
Synthesize multiple clinical trials into a cohesive, evidence-based literature review matrix for healthcare professionals.
Highlight consensus, conflicting findings, evidence gaps, and actionable clinical practice recommendations.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Research with MXR" });
  });

  // Extract Endpoint
  app.post("/api/extract", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== "string" || text.trim().length === 0) {
        return res.status(400).json({ error: "Please provide clinical trial text or abstract." });
      }

      const ai = getGeminiClient();

      const prompt = `Please extract and structure the following clinical trial text/abstract into JSON format:
      
=== CLINICAL TRIAL TEXT ===
${text}
=== END CLINICAL TRIAL TEXT ===

Return a JSON object with the following structure:
{
  "title": "Concise trial title",
  "authorsAndJournal": "Authors/Journal or Clinical Trial identifier if mentioned",
  "publicationYear": "Year if mentioned, or N/A",
  "pmidOrDoi": "PMID, DOI, or NCT ID if mentioned",
  "executiveSummary": {
    "headline": "1-line executive takeaway",
    "keyTakeaways": ["Key point 1", "Key point 2", "Key point 3"],
    "primaryConclusion": "Main clinical conclusion"
  },
  "pico": {
    "population": {
      "description": "Patient population summary",
      "sampleSizeTotal": 1000,
      "keyCharacteristics": ["Age >18", "Diagnosed condition", "Baseline metric"],
      "inclusionCriteria": ["Criterion 1"],
      "exclusionCriteria": ["Criterion 1"]
    },
    "intervention": {
      "name": "Drug / Therapy name",
      "dosage": "100 mg",
      "route": "Oral / Subcutaneous / IV",
      "frequency": "Once daily",
      "duration": "24 weeks",
      "details": "Full regimen summary"
    },
    "comparator": {
      "name": "Placebo or Active drug",
      "type": "Placebo / Active Control",
      "details": "Control group details"
    },
    "outcomes": {
      "primaryEndpoint": "Primary endpoint description",
      "secondaryEndpoints": ["Secondary endpoint 1", "Secondary endpoint 2"],
      "timeframe": "12 months / 24 weeks",
      "primaryOutcomeMet": true
    }
  },
  "statistics": {
    "sampleSize": {
      "total": 1000,
      "interventionGroup": 500,
      "controlGroup": 500
    },
    "primaryEffectSize": {
      "metric": "Hazard Ratio (HR) / Odds Ratio (OR) / Mean Difference",
      "value": "0.75",
      "ci95": "0.62 to 0.90",
      "pValue": "p < 0.001",
      "statisticallySignificant": true
    },
    "secondaryResults": [
      {
        "endpoint": "Secondary metric 1",
        "effectValue": "12.5%",
        "ci95": "10% to 15%",
        "pValue": "p=0.02",
        "significant": true
      }
    ],
    "statisticalPower": "Power statement or estimated rigor",
    "analysisType": "Intention-to-Treat (ITT) / Per-Protocol (PP)"
  },
  "riskOfBias": {
    "overallRisk": "Low" | "Moderate" | "High",
    "overallSummary": "Summary of overall bias assessment",
    "selectionBias": {
      "rating": "Low" | "Moderate" | "High" | "Unclear",
      "justification": "Randomization & allocation concealment evaluation"
    },
    "blindingBias": {
      "rating": "Low" | "Moderate" | "High" | "Unclear",
      "justification": "Double-blind / Single-blind / Open-label evaluation"
    },
    "attritionBias": {
      "rating": "Low" | "Moderate" | "High" | "Unclear",
      "justification": "Dropouts and missing data handling"
    },
    "reportingBias": {
      "rating": "Low" | "Moderate" | "High" | "Unclear",
      "justification": "Pre-specified endpoint reporting evaluation"
    }
  },
  "pharmacovigilance": {
    "adverseEvents": [
      {
        "event": "Nausea",
        "interventionRate": "15.2%",
        "controlRate": "4.1%",
        "pValue": "p<0.01",
        "severity": "Mild"
      }
    ],
    "seriousAdverseEventsSummary": "Summary of SAEs",
    "blackBoxWarningsOrContraindications": ["Contraindication 1"],
    "monitoringRecommendations": {
      "labTests": ["eGFR / Serum Creatinine", "Liver Function Tests (ALT/AST)"],
      "frequency": "Baseline and every 3-6 months",
      "specialPopulations": "Renal dose adjustment if eGFR < 30 mL/min"
    },
    "drugInteractions": ["CYP3A4 inhibitors", "P-gp substrates"],
    "pharmacistClinicalPearls": ["Clinical pearl 1 for patient counseling", "Clinical pearl 2"]
  },
  "evidenceGrade": {
    "gradeRating": "HIGH (Level A)" | "MODERATE (Level B)" | "LOW (Level C)" | "VERY LOW (Level D)",
    "strengthOfRecommendation": "Strong For" | "Weak/Conditional For" | "Neutral" | "Against",
    "clinicalSummary": "Clinical synthesis for evidence-based practice",
    "practiceImplications": "Direct guidance for hospital/community pharmacists and prescribers"
  },
  "sourceHighlights": [
    {
      "textSnippet": "exact key quote from text",
      "category": "Population" | "Intervention" | "Outcome" | "Bias" | "Safety"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction: EXTRACTION_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const rawJson = response.text || "{}";
      let parsed;
      try {
        parsed = JSON.parse(rawJson);
      } catch (err) {
        console.error("Failed to parse Gemini output JSON:", rawJson);
        return res.status(500).json({
          error: "Failed to parse structured output from AI response.",
          rawText: rawJson,
        });
      }

      res.json({
        success: true,
        data: {
          id: `ext-${Date.now()}`,
          createdAt: new Date().toISOString(),
          rawText: text,
          ...parsed,
        },
      });
    } catch (error: any) {
      console.error("Extraction API Error:", error);
      res.status(500).json({
        error: error.message || "An error occurred while analyzing the clinical text.",
      });
    }
  });

  // Multi-Trial Synthesis Endpoint
  app.post("/api/synthesize", async (req, res) => {
    try {
      const { extractions, topic } = req.body;
      if (!Array.isArray(extractions) || extractions.length === 0) {
        return res.status(400).json({ error: "Please select at least 1 extracted trial to synthesize." });
      }

      const ai = getGeminiClient();

      const prompt = `Synthesize the following ${extractions.length} clinical trials into a single comparative review matrix and literature synthesis:

Topic / Focus: ${topic || "Clinical Evidence & Pharmacotherapeutic Comparison"}

=== TRIALS DATA ===
${JSON.stringify(extractions, null, 2)}
=== END TRIALS DATA ===

Return JSON format:
{
  "topic": "${topic || "Comparative Clinical Synthesis"}",
  "trialCount": ${extractions.length},
  "overallConsensus": "Comprehensive high-level consensus across studies",
  "comparativeMatrix": [
    {
      "trialTitle": "Title of study",
      "picoSummary": "Brief population & dose summary",
      "primaryOutcomeResult": "Main statistical result (HR/OR, p-value)",
      "safetyProfile": "Primary safety & AE concerns",
      "evidenceQuality": "HIGH / MODERATE / LOW"
    }
  ],
  "clinicalRecommendations": [
    "Practice recommendation 1",
    "Practice recommendation 2"
  ],
  "conflictingFindings": [
    "Divergence 1 between trial A and trial B"
  ],
  "gapsInEvidence": [
    "Unanswered question 1 regarding long-term outcomes or subgroup"
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction: SYNTHESIS_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const rawJson = response.text || "{}";
      const parsed = JSON.parse(rawJson);

      res.json({
        success: true,
        data: parsed,
      });
    } catch (error: any) {
      console.error("Synthesis API Error:", error);
      res.status(500).json({
        error: error.message || "An error occurred while synthesizing trial evidence.",
      });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

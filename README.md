# Research with MXR — Clinical Trial Extraction & Pharmacovigilance Engine

## 🌐 Live Deployed App
[Click Here to Open Research with MXR](https://research-with-mxr.ai.studio)
## 📌 Problem & Purpose
Pharmacists, medical researchers, and health students spend hours manually reading, extracting, and synthesizing dense PubMed abstracts and clinical trial manuscripts. 

**Research with MXR** automates this workflow instantly—synthesizing raw, unstructured medical text into structured clinical takeaways, GRADE evidence levels, statistical summaries ($p$-values, HRs, 95% CIs), and pharmacovigilance safety alerts.

## ✨ Features List
- **PICO Framework Extraction:** Automatically isolates Population, Intervention, Comparator, and Outcomes.
- **Statistical Significance Summaries:** Extracts sample sizes ($n$), hazard ratios, confidence intervals, and $p$-values.
- **Risk of Bias & GRADE Evidence Assessment:** Classifies quality of evidence (e.g., High, Level A) and highlights study design limitations.
- **Pharmacovigilance & Safety Notes:** Highlights adverse drug events and safety endpoints for patient monitoring.
- **Multi-Format Export:** Copy extracted structured evidence as Markdown or print/export as a clean PDF summary.

## 🤖 AI Features & System Instructions
Powered by a structured, domain-tuned clinical extraction system prompt.

**System Instructions / Core Prompt Behind the AI Feature:**
> "You are an expert Clinical Pharmacologist and Systematic Literature Reviewer. Analyze unstructured clinical trial abstracts and extract key clinical takeaways following strict PICO framework standards. Evaluate biostats, risk of bias, and pharmacovigilance endpoints with high scientific precision."

## 🛠️ Tools, Services & AI Models
- **Vibe Coding Platform:** Google AI Studio / Firebase App Hosting
- **AI Models & API:** Gemini 1.5 Pro / Flash
- **Frontend Stack:** React, Tailwind CSS, TypeScript, Lucide Icons
- **Deployment:** Firebase / Cloud Run
- **Version Control:** Public GitHub Repository

## 📸 App in Action
1. **Unstructured Abstract Input:** Paste raw PubMed clinical text or load pre-configured trials (Metformin, Semaglutide, Empagliflozin).
2. **One-Click Extraction:** Processes structured PICO framework, sample sizes, and biostatistical significance in under 3 seconds.
3. **Structured Dashboard:** View Executive Headings, Risk of Bias Cards, Pharmacovigilance Notes, and side-by-side evidence analysis.

## 🚀 How to Run the Project Locally
1. Clone this repository:
   ```bash
   git clone [https://github.com/Mazhar-RPh/Research-with-MXR.git]

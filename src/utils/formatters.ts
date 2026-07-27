import { ExtractedTrialData, MultiTrialSynthesis } from '../types';

export function generateTrialMarkdown(data: ExtractedTrialData): string {
  const { title, authorsAndJournal, publicationYear, pmidOrDoi, executiveSummary, pico, statistics, riskOfBias, pharmacovigilance, evidenceGrade } = data;

  return `# CLINICAL TRIAL EXTRACTION REPORT: ${title}
*Generated via Research with MXR | ${new Date(data.createdAt).toLocaleDateString()}*

${authorsAndJournal ? `**Source / Citation:** ${authorsAndJournal} ${publicationYear ? `(${publicationYear})` : ''}` : ''}
${pmidOrDoi ? `**PMID/DOI/NCT:** ${pmidOrDoi}` : ''}

---

## 1. EXECUTIVE SUMMARY & KEY FINDINGS
**Headline:** ${executiveSummary.headline}
**Primary Conclusion:** ${executiveSummary.primaryConclusion}

### Key Takeaways:
${executiveSummary.keyTakeaways.map(t => `- ${t}`).join('\n')}

---

## 2. PICO FRAMEWORK
- **Population (P):** ${pico.population.description} (N = ${pico.population.sampleSizeTotal})
  - *Key Characteristics:* ${pico.population.keyCharacteristics.join(', ')}
${pico.population.inclusionCriteria?.length ? `  - *Inclusion:* ${pico.population.inclusionCriteria.join('; ')}` : ''}
${pico.population.exclusionCriteria?.length ? `  - *Exclusion:* ${pico.population.exclusionCriteria.join('; ')}` : ''}

- **Intervention (I):** ${pico.intervention.name}
  - *Dosage & Regimen:* ${pico.intervention.dosage}, ${pico.intervention.frequency} via ${pico.intervention.route} for ${pico.intervention.duration}
  - *Details:* ${pico.intervention.details}

- **Comparator (C):** ${pico.comparator.name} (${pico.comparator.type})
  - *Details:* ${pico.comparator.details}

- **Outcomes (O):**
  - *Primary Endpoint:* ${pico.outcomes.primaryEndpoint} (Timeframe: ${pico.outcomes.timeframe})
  - *Primary Endpoint Met:* **${pico.outcomes.primaryOutcomeMet === true ? 'YES (Statistically Significant)' : pico.outcomes.primaryOutcomeMet === false ? 'NO' : 'INCONCLUSIVE'}**
  - *Secondary Endpoints:* ${pico.outcomes.secondaryEndpoints.join('; ')}

---

## 3. STATISTICAL RIGOR & POWER
- **Sample Size:** Total N = ${statistics.sampleSize.total} (Intervention: ${statistics.sampleSize.interventionGroup}, Control: ${statistics.sampleSize.controlGroup})
- **Primary Effect Size (${statistics.primaryEffectSize.metric}):** ${statistics.primaryEffectSize.value} (95% CI: ${statistics.primaryEffectSize.ci95})
- **P-Value:** ${statistics.primaryEffectSize.pValue} (${statistics.primaryEffectSize.statisticallySignificant ? 'Statistically Significant' : 'Not Significant'})
- **Analysis Method:** ${statistics.analysisType}
- **Statistical Power Notes:** ${statistics.statisticalPower}

${statistics.secondaryResults?.length ? `### Secondary Outcomes:
${statistics.secondaryResults.map(s => `- **${s.endpoint}:** ${s.effectValue} ${s.ci95 ? `(95% CI: ${s.ci95})` : ''} | ${s.pValue || ''}`).join('\n')}` : ''}

---

## 4. COCHRANE RISK OF BIAS ASSESSMENT
**Overall Risk Rating:** **${riskOfBias.overallRisk.toUpperCase()} RISK OF BIAS**
*Summary:* ${riskOfBias.overallSummary}

| Bias Domain | Rating | Assessment / Justification |
| :--- | :--- | :--- |
| Selection Bias | **${riskOfBias.selectionBias.rating}** | ${riskOfBias.selectionBias.justification} |
| Performance/Blinding | **${riskOfBias.blindingBias.rating}** | ${riskOfBias.blindingBias.justification} |
| Attrition Bias | **${riskOfBias.attritionBias.rating}** | ${riskOfBias.attritionBias.justification} |
| Selective Reporting | **${riskOfBias.reportingBias.rating}** | ${riskOfBias.reportingBias.justification} |

---

## 5. PHARMACOVIGILANCE & PATIENT SAFETY (PHARMACIST NOTES)
### Adverse Events Summary:
${pharmacovigilance.adverseEvents.map(ae => `- **${ae.event} (${ae.severity}):** Intervention: ${ae.interventionRate} vs Control: ${ae.controlRate || 'N/A'} (p = ${ae.pValue || 'N/A'})`).join('\n')}

**Serious Adverse Events (SAEs):** ${pharmacovigilance.seriousAdverseEventsSummary}

${pharmacovigilance.blackBoxWarningsOrContraindications?.length ? `### Warnings & Contraindications:
${pharmacovigilance.blackBoxWarningsOrContraindications.map(w => `- 🚨 ${w}`).join('\n')}` : ''}

### Pharmacist Monitoring Recommendations:
- **Lab Tests Required:** ${pharmacovigilance.monitoringRecommendations.labTests.join(', ')}
- **Monitoring Frequency:** ${pharmacovigilance.monitoringRecommendations.frequency}
- **Special Populations (Renal/Hepatic):** ${pharmacovigilance.monitoringRecommendations.specialPopulations}

### Potential Drug Interactions:
${pharmacovigilance.drugInteractions.map(di => `- ⚠️ ${di}`).join('\n')}

### Clinical Pearls:
${pharmacovigilance.pharmacistClinicalPearls.map(cp => `- 💡 ${cp}`).join('\n')}

---

## 6. EVIDENCE GRADE & CLINICAL IMPLICATIONS
- **GRADE Evidence Quality:** ${evidenceGrade.gradeRating}
- **Strength of Recommendation:** ${evidenceGrade.strengthOfRecommendation}
- **Clinical Summary:** ${evidenceGrade.clinicalSummary}
- **Practice Implications:** ${evidenceGrade.practiceImplications}
`;
}

export function printFormattedReport(data: ExtractedTrialData): void {
  const markdownText = generateTrialMarkdown(data);
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Clinical Trial Summary - ${data.title}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; max-width: 900px; margin: 0 auto; line-height: 1.6; }
          h1 { color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 10px; font-size: 24px; }
          h2 { color: #0369a1; border-bottom: 1px solid #e2e8f0; margin-top: 30px; font-size: 18px; }
          h3 { color: #334155; font-size: 15px; margin-top: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; font-size: 13px; }
          th { background-color: #f1f5f9; font-weight: 600; }
          .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-weight: 600; font-size: 12px; }
          .badge-low { background: #dcfce7; color: #166534; }
          .badge-moderate { background: #fef9c3; color: #854d0e; }
          .badge-high { background: #fee2e2; color: #991b1b; }
          ul { padding-left: 20px; }
          li { margin-bottom: 6px; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;" class="no-print">
          <button onclick="window.print()" style="background: #0284c7; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; cursor: pointer;">
            🖨️ Print / Save as PDF
          </button>
          <span style="font-size: 12px; color: #64748b;">Research with MXR Clinical Platform</span>
        </div>
        <pre style="white-space: pre-wrap; font-family: inherit;">${markdownText}</pre>
      </body>
    </html>
  `);
  printWindow.document.close();
}

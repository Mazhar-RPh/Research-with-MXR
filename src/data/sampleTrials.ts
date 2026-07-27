import { SampleTrial } from '../types';

export const SAMPLE_TRIALS: SampleTrial[] = [
  {
    id: 'sample-metformin',
    title: 'Metformin Extended-Release vs Immediate-Release in Type 2 Diabetes (FORTE-RENAL Trial)',
    subtitle: 'Renal Safety, Glycemic Efficacy, and Gastrointestinal Tolerability',
    drugClass: 'Biguanide Anti-hyperglycemic',
    condition: 'Type 2 Diabetes Mellitus (T2DM) & Moderate CKD',
    abstractText: `BACKGROUND: Metformin remains first-line therapy for type 2 diabetes mellitus (T2DM), but gastrointestinal adverse effects and concerns in patients with moderate chronic kidney disease (CKD Stage 3, eGFR 30-59 mL/min/1.73m2) often limit optimal dosing.

METHODS: In this 24-week double-blind, double-dummy, randomized controlled phase 3b trial, 640 adult patients with T2DM and eGFR 35-50 mL/min/1.73m2 were randomized 1:1 to receive Metformin Extended-Release (XR) 1500 mg once daily with the evening meal (n=320) or Metformin Immediate-Release (IR) 750 mg twice daily with meals (n=320). The primary outcome was the change in HbA1c from baseline to week 24 (non-inferiority margin 0.3%). Key secondary outcomes included GI adverse event discontinuation rates, eGFR stability, and plasma lactic acid monitoring.

RESULTS: At week 24, baseline mean HbA1c (8.4%) dropped by -1.21% (95% CI: -1.34% to -1.08%) in the XR group and -1.18% (95% CI: -1.31% to -1.05%) in the IR group, demonstrating non-inferiority (adjusted difference -0.03%, 95% CI: -0.12% to 0.06%; p<0.001 for non-inferiority). Severe GI intolerance led to study drug discontinuation in 3.4% (11/320) of XR patients compared to 9.1% (29/320) of IR patients (HR 0.36, 95% CI: 0.18 to 0.72; p=0.004). Mean eGFR remained unchanged in both arms (+0.4 vs -0.2 mL/min/1.73m2; p=0.48). No cases of metformin-associated lactic acidosis (MALA) were observed; peak lactate levels remained <2.1 mmol/L across all subjects.

CONCLUSIONS: Metformin XR 1500 mg qd achieved equivalent glycemic control to Metformin IR 750 mg bid with significantly superior gastrointestinal tolerability and demonstrated reassuring renal safety in T2DM patients with eGFR 35-50 mL/min/1.73m2.

TRIAL REGISTRATION: ClinicalTrials.gov NCT04820194. Funding supported by the Global Diabetes Clinical Network.`
  },
  {
    id: 'sample-semaglutide',
    title: 'Semaglutide 2.4 mg Once Weekly for Cardiovascular Outcomes in Obesity (SELECT-CV Study)',
    subtitle: 'Cardiovascular Risk Reduction in Non-Diabetic Patients with Overweight or Obesity',
    drugClass: 'GLP-1 Receptor Agonist',
    condition: 'Atherosclerotic Cardiovascular Disease & Obesity (BMI ≥27)',
    abstractText: `BACKGROUND: Glucagon-like peptide-1 (GLP-1) receptor agonists reduce major adverse cardiovascular events (MACE) in patients with type 2 diabetes. Whether semaglutide reduces cardiovascular risk in patients with established cardiovascular disease who have overweight or obesity but not diabetes is unknown.

METHODS: In a double-blind, randomized, placebo-controlled trial, 17,604 patients aged 45 years or older with established cardiovascular disease (prior myocardial infarction, stroke, or symptomatic peripheral artery disease) and BMI ≥27 kg/m2 without a history of diabetes were assigned 1:1 to receive subcutaneous once-weekly semaglutide 2.4 mg or matching placebo. The primary cardiovascular outcome was a composite of death from cardiovascular causes, nonfatal myocardial infarction, or nonfatal stroke in a time-to-event analysis.

RESULTS: The mean duration of follow-up was 39.8 months. A primary outcome event occurred in 569 of 8,802 patients (6.5%) in the semaglutide group and in 701 of 8,802 patients (8.0%) in the placebo group (Hazard Ratio 0.80; 95% Confidence Interval, 0.72 to 0.90; p<0.001). Mean body weight decreased by -9.4% in the semaglutide group versus -0.8% in the placebo group (p<0.001). Serious adverse events were reported in 33.4% of semaglutide recipients and 36.4% of placebo recipients (p=0.002). However, adverse events leading to permanent trial product discontinuation occurred in 16.6% in the semaglutide group vs 8.2% in placebo (p<0.001), predominantly due to gastrointestinal symptoms (nausea, diarrhea, vomiting). Gastrointestinal disorders were reported in 10.2% vs 2.0% as reasons for discontinuation. Acute pancreatitis occurred in 0.2% vs 0.1% (p=0.23). Gallstone disease occurred in 2.8% vs 2.3% (p=0.04).

CONCLUSIONS: In patients with pre-existing cardiovascular disease and overweight/obesity but without diabetes, weekly semaglutide 2.4 mg superiorly reduced MACE by 20% over 3.3 years compared with placebo.

FUNDING: Supported by Novo Nordisk; ClinicalTrials.gov NCT03574597.`
  },
  {
    id: 'sample-pembrolizumab',
    title: 'Pembrolizumab plus Platinum Chemotherapy in First-Line Advanced Non-Small-Cell Lung Cancer',
    subtitle: 'Phase 3 KEYNOTE-189 Trial Update: Overall Survival & Biomarker Subgroups',
    drugClass: 'PD-1 Immune Checkpoint Inhibitor + Platinum Chemotherapy',
    condition: 'Metastatic Non-Squamous NSCLC (EGFR/ALK Wild-Type)',
    abstractText: `BACKGROUND: First-line pembrolizumab plus pemetrexed and platinum chemotherapy significantly improved overall survival (OS) and progression-free survival (PFS) in patients with metastatic non-squamous non-small-cell lung cancer (NSCLC) without EGFR or ALK alterations in the KEYNOTE-189 trial.

METHODS: 616 eligible patients were randomized 2:1 to receive pembrolizumab 200 mg or placebo every 3 weeks for up to 35 cycles, plus 4 cycles of pemetrexed and cisplatin/carboplatin, followed by maintenance pemetrexed. Primary endpoints were OS and PFS assessed by blinded independent central review.

RESULTS: With a median follow-up of 31.0 months, median OS was 22.0 months (95% CI, 19.5 to 24.5) in the pembrolizumab combination group versus 10.6 months (95% CI, 8.7 to 13.6) in the placebo-combination group (Hazard Ratio 0.56; 95% CI, 0.46 to 0.69; p<0.0001). 2-year OS rates were 45.7% vs 27.3%. OS benefit was observed across all PD-L1 Tumor Proportion Score (TPS) categories: TPS <1% (HR 0.52; 95% CI, 0.36 to 0.74), TPS 1-49% (HR 0.62; 95% CI, 0.42 to 0.92), and TPS ≥50% (HR 0.59; 95% CI, 0.40 to 0.86). Median PFS was 9.0 months vs 4.9 months (HR 0.48; 95% CI, 0.40 to 0.58; p<0.0001). Grade 3-5 adverse events occurred in 72.1% of patients receiving pembrolizumab combination and 66.8% receiving placebo combination. Immune-mediated adverse events occurred in 27.2% vs 11.9%, including Grade 3-4 pneumonitis in 5.2% vs 2.5% and acute kidney injury in 5.2% vs 2.0%.

CONCLUSIONS: First-line pembrolizumab plus pemetrexed-platinum continued to demonstrate substantial, clinically meaningful overall survival and PFS improvements in metastatic non-squamous NSCLC regardless of PD-L1 expression.

FUNDING: Merck Sharp & Dohme LLC; ClinicalTrials.gov NCT02578680.`
  },
  {
    id: 'sample-dapagliflozin',
    title: 'Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction (DAPA-HF)',
    subtitle: 'Cardiovascular Mortality and Heart Failure Hospitalization Outcomes',
    drugClass: 'SGLT2 Inhibitor',
    condition: 'Heart Failure with Reduced Ejection Fraction (HFrEF, LVEF ≤40%)',
    abstractText: `BACKGROUND: Sodium-glucose cotransporter 2 (SGLT2) inhibitors reduce the risk of hospitalization for heart failure in patients with type 2 diabetes. Data are needed regarding efficacy in patients with heart failure with reduced ejection fraction, with or without diabetes.

METHODS: In this phase 3 international, double-blind trial, 4,744 patients with New York Heart Association (NYHA) class II, III, or IV heart failure and an ejection fraction of 40% or less were randomly assigned to receive either dapagliflozin 10 mg once daily or placebo, in addition to recommended standard therapy. The primary composite outcome was a worsening heart failure event (hospitalization or urgent visit resulting in intravenous therapy for heart failure) or death from cardiovascular causes.

RESULTS: Over a median of 18.2 months, the primary outcome occurred in 386 of 2,373 patients (16.3%) in the dapagliflozin group and in 502 of 2,371 patients (21.2%) in the placebo group (Hazard Ratio 0.74; 95% CI, 0.65 to 0.85; p<0.001). A first worsening heart failure event occurred in 10.0% of dapagliflozin patients vs 13.7% of placebo patients (HR 0.70; 95% CI, 0.59 to 0.83; p<0.001). Death from cardiovascular causes occurred in 9.6% vs 11.5% (HR 0.82; 95% CI, 0.69 to 0.98; p=0.029). All-cause mortality was 11.6% vs 13.9% (HR 0.83; 95% CI, 0.71 to 0.97). Findings in patients with diabetes were similar to those in patients without diabetes. Adverse events related to volume depletion occurred in 7.5% vs 6.8% (p=0.40); renal adverse events occurred in 6.5% vs 7.2% (p=0.36); major hypoglycemia occurred in 0.2% in both groups. Diabetic ketoacidosis was reported in 3 patients in the dapagliflozin group and none in placebo.

CONCLUSIONS: Among patients with heart failure and a reduced ejection fraction, dapagliflozin 10 mg once daily added to standard care significantly reduced the risk of worsening heart failure and death from cardiovascular causes, regardless of diabetes status.

FUNDING: AstraZeneca; ClinicalTrials.gov NCT03036124.`
  },
  {
    id: 'sample-lecanemab',
    title: 'Lecanemab in Early Alzheimer’s Disease (CLARITY AD Phase 3 Trial)',
    subtitle: 'Cognitive Decline and Amyloid PET Imaging Outcomes',
    drugClass: 'Anti-Amyloid Beta Protofibril Humanized IgG1 Monoclonal Antibody',
    condition: 'Early Alzheimer’s Disease (Mild Cognitive Impairment or Mild Dementia)',
    abstractText: `BACKGROUND: Accumulation of soluble and insoluble amyloid-beta (Aβ) aggregates is a defining pathological feature of Alzheimer's disease. Lecanemab is a humanized IgG1 monoclonal antibody that binds with high affinity to Aβ soluble protofibrils.

METHODS: In an 18-month, multicenter, double-blind, phase 3 trial, 1,795 patients aged 50 to 90 years with early Alzheimer's disease (mild cognitive impairment or mild dementia due to Alzheimer's disease with confirmed amyloid positivity on PET or CSF) were randomly assigned in a 1:1 ratio to receive intravenous lecanemab (10 mg per kilogram of body weight every 2 weeks) or placebo. The primary end point was the change from baseline at 18 months in the score on the Clinical Dementia Rating–Sum of Boxes (CDR-SB; range 0 to 18, with higher scores indicating greater impairment). Secondary endpoints included change in amyloid burden on PET, ADAS-cog14, and ADCS-MCI-ADL.

RESULTS: Baseline mean CDR-SB score was approximately 3.2 in both groups. At 18 months, the adjusted mean change from baseline was 1.21 with lecanemab and 1.66 with placebo (mean difference, -0.45; 95% CI, -0.67 to -0.23; p<0.001), representing a 27% slowing of clinical decline. Amyloid burden on PET dropped significantly by -59.1 centiloids in the lecanemab group vs +3.6 centiloids in placebo (p<0.001). Infusion-related reactions occurred in 26.4% of lecanemab recipients and 7.4% of placebo recipients. Amyloid-related imaging abnormalities with edema or effusions (ARIA-E) occurred in 12.6% of the lecanemab group and 1.7% of the placebo group; symptomatic ARIA-E occurred in 2.8%. ARIA with microhemorrhages or superficial siderosis (ARIA-H) occurred in 17.3% vs 9.0%. APOE ε4 homozygotes had higher incidence of ARIA-E (32.6% in lecanemab arm).

CONCLUSIONS: Lecanemab reduced markers of amyloid in early Alzheimer's disease and resulted in moderately less decline on measures of cognition and function than placebo at 18 months, but was associated with adverse events including ARIA and infusion reactions.

FUNDING: Eisai and Biogen; ClinicalTrials.gov NCT03887416.`
  }
];

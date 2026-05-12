import { resumeScenarios } from './resumeScenarios';

// Education Audit Challenge — Final Simulation Data
// This is the capstone for Day 3. 10 complex scenarios.

export const riskTags = [
  { id: 'degree', label: 'Degree', icon: 'fa-scroll' },
  { id: 'stream', label: 'Stream', icon: 'fa-code-branch' },
  { id: 'cgpa', label: 'CGPA', icon: 'fa-chart-bar' },
  { id: 'graduation', label: 'Graduation', icon: 'fa-calendar' },
  { id: 'university', label: 'University', icon: 'fa-university' },
  { id: 'mismatch', label: 'Mismatch', icon: 'fa-triangle-exclamation' },
];

// Helper to get scenarios by ID from the central resumeScenarios file
const getScenario = (id) => resumeScenarios.find(s => s.id === id);

export const auditScenarios = [
  {
    ...getScenario('s17'),
    id: 'audit-1',
    title: 'Case #AUD-2024-001',
    alert: 'Clean Application',
    difficulty: 'easy',
    evidenceTokens: 2,
    evidence: [
      { id: 'e1', label: 'University Verification', content: 'Gujarat University is a recognized state university. Degree conferred in 2022.' },
      { id: 'e2', label: 'Transcript Audit', content: 'CGPA of 8.2 matches the official transcript records exactly.' }
    ],
    correctRisks: [],
    correctDecision: 'proceed',
    strongJustificationKeywords: ['clean', 'matches', 'verified', 'recognized'],
    misleadingClue: 'A perfectly clean profile. Don\'t search for faults where none exist.',
    ruleApplied: 'Standard valid SDE profile. Proceed when all fundamentals match and are verified.'
  },
  {
    ...getScenario('s18'),
    id: 'audit-2',
    title: 'Case #AUD-2024-002',
    alert: 'Non-Tech Background',
    difficulty: 'medium',
    evidenceTokens: 2,
    evidence: [
      { id: 'e1', label: 'Policy Check', content: 'Warehouse Manager roles accept any Bachelor\'s degree from a recognized university.' },
      { id: 'e2', label: 'Degree Verification', content: 'B.A. from Delhi University is fully accredited and valid.' }
    ],
    correctRisks: [],
    correctDecision: 'proceed',
    strongJustificationKeywords: ['warehouse role', 'any bachelor', 'valid', 'proceed'],
    misleadingClue: 'While it\'s not a tech degree, the target role is Warehouse Manager, which has broader criteria.',
    ruleApplied: 'Warehouse roles accept any bachelor\'s degree. B.A. Political Science is perfectly valid here.'
  },
  {
    ...getScenario('s19'),
    id: 'audit-3',
    title: 'Case #AUD-2024-003',
    alert: 'High Prestige / Missing Data',
    difficulty: 'hard',
    evidenceTokens: 3,
    evidence: [
      { id: 'e1', label: 'Stream Audit', content: 'Development Studies is a social science stream, not related to Computer Science.' },
      { id: 'e2', label: 'Missing Info', content: 'Candidate omitted CGPA. Best judgment: Prestige of Cambridge doesn\'t override stream requirements.' },
      { id: 'e3', label: 'Policy', content: 'SDE roles strictly require CS or related technical degrees.' }
    ],
    correctRisks: ['stream'],
    correctDecision: 'reject',
    strongJustificationKeywords: ['wrong stream', 'not CS', 'social science', 'reject'],
    misleadingClue: 'The university (Cambridge) is world-class, but the degree is in the wrong field for an SDE role.',
    ruleApplied: 'Prestige cannot override stream eligibility. Reject for stream mismatch.'
  },
  {
    ...getScenario('s20'),
    id: 'audit-4',
    title: 'Case #AUD-2024-004',
    alert: 'Core Engineering Stream',
    difficulty: 'medium',
    evidenceTokens: 2,
    evidence: [
      { id: 'e1', label: 'Stream Policy', content: 'Mechanical Engineering is explicitly listed as an invalid stream for SDE roles.' },
      { id: 'e2', label: 'Minor Check', content: 'No CS minor or relevant software electives found on transcript.' }
    ],
    correctRisks: ['stream'],
    correctDecision: 'reject',
    strongJustificationKeywords: ['mechanical', 'wrong stream', 'not eligible'],
    misleadingClue: 'An IIT degree is prestigious, but "Mechanical" is not "Computer Science".',
    ruleApplied: 'Mechanical Engineering is an ineligible stream for technical SDE roles.'
  },
  {
    ...getScenario('s21'),
    id: 'audit-5',
    title: 'Case #AUD-2024-005',
    alert: 'Missing Grade Data',
    difficulty: 'hard',
    evidenceTokens: 2,
    evidence: [
      { id: 'e1', label: 'Guidance', content: 'SOP Section 16: For missing data, use best judgment. If degree is valid, proceed.' },
      { id: 'e2', label: 'Degree Check', content: 'M.A. from Calcutta University is a valid postgraduate degree.' }
    ],
    correctRisks: [],
    correctDecision: 'proceed',
    strongJustificationKeywords: ['best judgment', 'warehouse manager', 'valid degree', 'proceed'],
    misleadingClue: 'The missing CGPA might feel like a "risk", but for this role, the degree itself is the primary filter.',
    ruleApplied: 'Apply "Best Judgment" for missing data. Since the degree is valid for a Warehouse role, proceed.'
  },
  {
    ...getScenario('s22'),
    id: 'audit-6',
    title: 'Case #AUD-2024-006',
    alert: 'Technical Non-CS Stream',
    difficulty: 'medium',
    evidenceTokens: 2,
    evidence: [
      { id: 'e1', label: 'Stream Check', content: 'Metallurgy is not a recognized computer science or information technology stream.' },
      { id: 'e2', label: 'Minor Search', content: 'Candidate has experience at Google but the degree itself fails the initial filter.' }
    ],
    correctRisks: ['stream'],
    correctDecision: 'reject',
    strongJustificationKeywords: ['metallurgy', 'not CS', 'wrong stream'],
    misleadingClue: 'High-profile experience (CEO of Google) can be distracting; focus strictly on the degree eligibility rules.',
    ruleApplied: 'Metallurgical Engineering is not a valid stream for SDE roles.'
  },
  {
    ...getScenario('s23'),
    id: 'audit-7',
    title: 'Case #AUD-2024-007',
    alert: 'Electrical Background',
    difficulty: 'easy',
    evidenceTokens: 2,
    evidence: [
      { id: 'e1', label: 'Degree Check', content: 'B.E. Electrical Engineering is a formal 4-year technical bachelor\'s degree.' },
      { id: 'e2', label: 'Role Context', content: 'Warehouse Manager roles accept all technical and non-technical bachelor\'s degrees.' }
    ],
    correctRisks: [],
    correctDecision: 'proceed',
    strongJustificationKeywords: ['valid degree', 'any stream', 'warehouse role', 'proceed'],
    misleadingClue: 'Electrical is a strong tech degree, making this an easy "Proceed" for a Warehouse role.',
    ruleApplied: 'All bachelor\'s degrees from recognized universities are valid for Warehouse Manager positions.'
  },
  {
    ...getScenario('s24'),
    id: 'audit-8',
    title: 'Case #AUD-2024-008',
    alert: 'Science/Economics Background',
    difficulty: 'medium',
    evidenceTokens: 2,
    evidence: [
      { id: 'e1', label: 'Stream Audit', content: 'Physics and Economics are not recognized CS/IT streams for the SDE role.' },
      { id: 'e2', label: 'Policy Check', content: 'B.A. and B.S. in non-tech fields are listed as invalid for SDE eligibility.' }
    ],
    correctRisks: ['stream'],
    correctDecision: 'reject',
    strongJustificationKeywords: ['physics', 'economics', 'wrong stream', 'reject'],
    misleadingClue: 'A 4.0 GPA from an Ivy League school is impressive, but it doesn\'t change the field of study.',
    ruleApplied: 'Pure science and economics degrees are ineligible for technical SDE screening.'
  },
  {
    ...getScenario('s25'),
    id: 'audit-9',
    title: 'Case #AUD-2024-009',
    alert: 'Top-Tier Tech Background',
    difficulty: 'easy',
    evidenceTokens: 2,
    evidence: [
      { id: 'e1', label: 'Degree Check', content: 'B.S.E. in EECS is a highly relevant technical degree.' },
      { id: 'e2', label: 'Accreditation', content: 'Princeton University is an Ivy League institution with top-tier accreditation.' }
    ],
    correctRisks: [],
    correctDecision: 'proceed',
    strongJustificationKeywords: ['eecs', 'valid', 'top tier', 'warehouse role'],
    misleadingClue: 'This candidate is overqualified for a Warehouse role, but they are definitely eligible.',
    ruleApplied: 'EECS is a valid bachelor\'s degree. Proceed for Warehouse Manager role.'
  },
  {
    ...getScenario('s16'),
    id: 'audit-10',
    title: 'Case #AUD-2024-010',
    alert: 'Multiple Red Flags',
    difficulty: 'hard',
    evidenceTokens: 3,
    evidence: [
      { id: 'e1', label: 'Stream Check', content: 'B.Sc Physics is not a recognized CS/IT stream for SDE roles.' },
      { id: 'e2', label: 'CGPA Mismatch', content: 'Resume claims 9.0, but portal/transcript confirms 7.5. Major discrepancy.' },
      { id: 'e3', label: 'Integrity Policy', content: 'Discrepancies > 0.5 are considered data falsification.' }
    ],
    correctRisks: ['stream', 'cgpa', 'mismatch'],
    correctDecision: 'reject',
    strongJustificationKeywords: ['wrong stream', 'CGPA inflation', 'integrity issue', 'reject'],
    misleadingClue: 'The candidate has "React" skills, but the combination of wrong degree and a grade lie makes this an easy reject.',
    ruleApplied: 'Reject for both stream mismatch and data integrity issues (CGPA inflation).'
  }
];

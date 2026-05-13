import { resumeScenarios } from './resumeScenarios';

// Education Audit Challenge — Final Simulation Data
// This is the capstone for Day 3. 10 complex scenarios.

export const riskTags = [
  { id: 'degree', label: 'Degree', icon: 'Scroll' },
  { id: 'stream', label: 'Stream', icon: 'GitBranch' },
  { id: 'cgpa', label: 'CGPA', icon: 'BarChart3' },
  { id: 'graduation', label: 'Graduation', icon: 'Calendar' },
  { id: 'university', label: 'University', icon: 'Building2' },
  { id: 'mismatch', label: 'Mismatch', icon: 'AlertTriangle' },
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
      { id: 'e1', label: 'University Verification', content: 'MIT is a recognized world-class university. Degree conferred in 2022.' },
      { id: 'e2', label: 'Transcript Audit', content: 'GPA of 3.8 matches the official transcript records exactly.' }
    ],
    correctRisks: [],
    correctDecision: 'proceed',
    strongJustificationKeywords: ['clean', 'matches', 'verified', 'recognized'],
    misleadingClue: 'A perfectly clean profile. Don\'t search for faults where none exist.',
    ruleApplied: 'Standard valid SDE profile. Proceed when all fundamentals match and are verified.',
    sopReference: 'SOP Sec 1.1: Standard Tech Eligibility',
    reasoningChain: [
      'Degree: B.S. in Computer Science is a primary technical stream.',
      'University: MIT is a tier-1 recognized institution.',
      'Data Integrity: Resume GPA (3.8) matches portal data exactly.',
      'Timeline: Graduation year (2022) is within the eligible 2022-2025 window.'
    ],
    commonMistakes: [
      'Searching for defects in a clean profile.',
      'Hesitating due to the high prestige of the institution.'
    ],
    nextTimeGuidance: 'When all 4 core pillars (Degree, Stream, GPA, Timeline) match and are valid, process the candidate immediately.'
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
      { id: 'e2', label: 'Degree Verification', content: 'B.A. from CU Boulder is fully accredited and valid.' }
    ],
    correctRisks: [],
    correctDecision: 'proceed',
    strongJustificationKeywords: ['warehouse role', 'any bachelor', 'valid', 'proceed'],
    misleadingClue: 'While it\'s not a tech degree, the target role is Warehouse Manager, which has broader criteria.',
    ruleApplied: 'Warehouse roles accept any bachelor\'s degree. B.A. Political Science is perfectly valid here.',
    sopReference: 'SOP Sec 2.4: Warehouse Operations Criteria',
    reasoningChain: [
      'Role Type: Warehouse Manager has "Generalist" education requirements.',
      'Degree: B.A. is a valid bachelor\'s degree level.',
      'Stream: Any stream (including PolSci) is acceptable for this specific role.',
      'Accreditation: CU Boulder is a recognized accredited university.'
    ],
    commonMistakes: [
      'Applying SDE stream restrictions to Warehouse roles.',
      'Rejecting because the degree isn\'t "Business" or "Logistics".'
    ],
    nextTimeGuidance: 'Always check the Target Role first. "Generalist" roles have much broader stream acceptance than "Specialist" technical roles.'
  },
  {
    ...getScenario('s19'),
    id: 'audit-3',
    title: 'Case #AUD-2024-003',
    alert: 'High Prestige / Missing Data',
    difficulty: 'hard',
    evidenceTokens: 3,
    evidence: [
      { id: 'e1', label: 'Stream Audit', content: 'Public Policy is a social science stream, not related to Computer Science.' },
      { id: 'e2', label: 'Missing Info', content: 'Candidate provided valid GPA but stream is the blocker. Prestige of Georgia Tech doesn\'t override stream requirements.' },
      { id: 'e3', label: 'Policy', content: 'SDE roles strictly require CS or related technical degrees.' }
    ],
    correctRisks: ['stream'],
    correctDecision: 'reject',
    strongJustificationKeywords: ['wrong stream', 'not CS', 'social science', 'reject'],
    misleadingClue: 'The university (Cambridge) is world-class, but the degree is in the wrong field for an SDE role.',
    ruleApplied: 'Prestige cannot override stream eligibility. Reject for stream mismatch.',
    sopReference: 'SOP Sec 1.2: Technical Stream Requirements',
    reasoningChain: [
      'Role Type: SDE requires specialized technical education.',
      'Stream Check: Public Policy is a Social Science, not a Technical/Engineering stream.',
      'Prestige Factor: Georgia Tech prestige does not waive the requirement for a CS/IT related degree.',
      'Decision: Reject due to ineligible academic stream.'
    ],
    commonMistakes: [
      'Assuming prestige at a tech-heavy school implies a tech degree.',
      'Overlooking the "Public Policy" label due to the "M.S." prefix.'
    ],
    nextTimeGuidance: 'Read the "Field of Study" carefully. An M.S. in a non-technical field does not qualify for an SDE position.'
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
      { id: 'e2', label: 'Minor Check', content: 'No CS minor or relevant software electives found on transcript from Oregon State.' }
    ],
    correctRisks: ['stream'],
    correctDecision: 'reject',
    strongJustificationKeywords: ['mechanical', 'wrong stream', 'not eligible'],
    misleadingClue: 'An IIT degree is prestigious, but "Mechanical" is not "Computer Science".',
    ruleApplied: 'Mechanical Engineering is an ineligible stream for technical SDE roles.',
    sopReference: 'SOP Sec 1.2.3: Ineligible Engineering Streams',
    reasoningChain: [
      'Stream Audit: Mechanical Engineering is classified as a "Core Engineering" branch.',
      'Policy: Core Engineering branches (Mech, Civil, Chem) are ineligible for SDE roles without a formal CS minor.',
      'Minor Check: No evidence of CS minor found in transcripts.',
      'Decision: Reject for stream mismatch.'
    ],
    commonMistakes: [
      'Thinking "Engineering" automatically equals "SDE Eligible".',
      'Missing the absence of a CS minor.'
    ],
    nextTimeGuidance: 'Check the specific Engineering branch. Only CS, IT, ECE (with minor), and Software Engineering are typically eligible.'
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
      { id: 'e2', label: 'Degree Check', content: 'M.A. from UPenn is a valid postgraduate degree.' }
    ],
    correctRisks: [],
    correctDecision: 'proceed',
    strongJustificationKeywords: ['best judgment', 'warehouse manager', 'valid degree', 'proceed'],
    misleadingClue: 'The missing CGPA might feel like a "risk", but for this role, the degree itself is the primary filter.',
    ruleApplied: 'Apply "Best Judgment" for missing data. Since the degree is valid for a Warehouse role, proceed.',
    sopReference: 'SOP Sec 16.1: Missing Data Handling',
    reasoningChain: [
      'Issue: CGPA is missing from the portal application.',
      'SOP Rule: If the primary blocker (Degree) is valid and others are unknown, use "Best Judgment".',
      'Role Context: For a Warehouse role, a valid M.A. from UPenn is a strong enough indicator.',
      'Decision: Proceed based on verified degree and institution.'
    ],
    commonMistakes: [
      'Rejecting solely because a field is empty.',
      'Failing to apply the "Best Judgment" rule for non-critical missing data.'
    ],
    nextTimeGuidance: 'If a field is missing but isn\'t a confirmed "Fail", check if other verified data points (like a Master\'s degree) provide enough confidence to proceed.'
  },
  {
    ...getScenario('s22'),
    id: 'audit-6',
    title: 'Case #AUD-2024-006',
    alert: 'Technical Non-CS Stream',
    difficulty: 'medium',
    evidenceTokens: 2,
    evidence: [
      { id: 'e1', label: 'Stream Check', content: 'Materials Engineering is not a recognized computer science or information technology stream.' },
      { id: 'e2', label: 'Experience Context', content: 'Candidate has experience at a major tech corp but the degree itself fails the initial filter.' }
    ],
    correctRisks: ['stream'],
    correctDecision: 'reject',
    strongJustificationKeywords: ['metallurgy', 'not CS', 'wrong stream'],
    misleadingClue: 'High-profile experience can be distracting; focus strictly on the degree eligibility rules.',
    ruleApplied: 'Materials Engineering is not a valid stream for SDE roles.',
    sopReference: 'SOP Sec 1.2.4: Materials & Metallurgy Policy',
    reasoningChain: [
      'Stream Check: Materials Engineering (formerly Metallurgy) is not a CS/IT stream.',
      'Experience Offset: Work experience (even at big tech) does not bypass the initial educational filter in this protocol.',
      'Certification Check: The Stanford certification is in Materials, not CS.',
      'Decision: Reject for stream mismatch.'
    ],
    commonMistakes: [
      'Letting "Big Tech" work experience override the "Wrong Degree" rule.',
      'Confusion between "Engineering" and "Software Engineering".'
    ],
    nextTimeGuidance: 'The educational filter is the first gate. Experience only matters if the candidate passes the degree/stream gate first.'
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
    ruleApplied: 'All bachelor\'s degrees from recognized universities are valid for Warehouse Manager positions.',
    sopReference: 'SOP Sec 2.1: General Degree Acceptance',
    reasoningChain: [
      'Role: Warehouse Manager (Generalist).',
      'Degree: B.E. (Bachelor of Engineering) is a valid 4-year degree.',
      'Stream: Electrical is a valid technical stream (accepted for all roles).',
      'Decision: Clear Proceed.'
    ],
    commonMistakes: [
      'Over-analyzing a perfectly valid profile.',
      'Checking for CS requirements on a non-CS role.'
    ],
    nextTimeGuidance: 'Technical degrees (Engineering/Science) are always valid for Generalist roles. Don\'t hesitate.'
  },
  {
    ...getScenario('s24'),
    id: 'audit-8',
    title: 'Case #AUD-2024-008',
    alert: 'Science/Economics Background',
    difficulty: 'medium',
    evidenceTokens: 2,
    evidence: [
      { id: 'e1', label: 'Stream Audit', content: 'Physics is not a recognized CS/IT stream for the SDE role.' },
      { id: 'e2', label: 'Policy Check', content: 'B.S. in non-tech fields are listed as invalid for SDE eligibility.' }
    ],
    correctRisks: ['stream'],
    correctDecision: 'reject',
    strongJustificationKeywords: ['physics', 'economics', 'wrong stream', 'reject'],
    misleadingClue: 'A 4.0 GPA from an Ivy League school is impressive, but it doesn\'t change the field of study.',
    ruleApplied: 'Pure science and economics degrees are ineligible for technical SDE screening.',
    sopReference: 'SOP Sec 1.3: Non-Technical Degree Policy',
    reasoningChain: [
      'Target Role: SDE (Technical Specialist).',
      'Stream Check: B.S. Physics is a Pure Science, not an Applied Technical stream like CS/IT.',
      'Institution: Stanford prestige is noted, but policy strictly requires technical stream parity.',
      'Decision: Reject for stream mismatch.'
    ],
    commonMistakes: [
      'Assuming "Science" (B.S.) always qualifies for "Software Engineering".',
      'Being biased by the "Stanford" name.'
    ],
    nextTimeGuidance: 'B.S. in Physics, Math, or Chemistry requires an accompanying CS minor or Master\'s in CS to be eligible for SDE roles.'
  },
  {
    ...getScenario('s25'),
    id: 'audit-9',
    title: 'Case #AUD-2024-009',
    alert: 'Top-Tier Tech Background',
    difficulty: 'easy',
    evidenceTokens: 2,
    evidence: [
      { id: 'e1', label: 'Degree Check', content: 'B.S. in Electrical Engineering is a highly relevant technical degree.' },
      { id: 'e2', label: 'Accreditation', content: 'University of Miami is a recognized institution with top-tier accreditation.' }
    ],
    correctRisks: [],
    correctDecision: 'proceed',
    strongJustificationKeywords: ['eecs', 'valid', 'top tier', 'warehouse role'],
    misleadingClue: 'This candidate is highly qualified for a Warehouse role, and they are definitely eligible.',
    ruleApplied: 'Electrical Engineering is a valid bachelor\'s degree. Proceed for Warehouse Manager role.',
    sopReference: 'SOP Sec 2.1.2: Technical Degree Acceptance',
    reasoningChain: [
      'Role: Warehouse Manager.',
      'Degree: B.S. in Electrical Engineering is a valid 4-year degree.',
      'University: University of Miami is a recognized accredited institution.',
      'Decision: Proceed.'
    ],
    commonMistakes: [
      'Hesitating on a high-quality candidate for a generalist role.',
      'Misidentifying Electrical Engineering as a "too technical" risk.'
    ],
    nextTimeGuidance: 'High-quality technical graduates are excellent fits for operations roles. There is no risk here.'
  },
  {
    ...getScenario('s16'),
    id: 'audit-10',
    title: 'Case #AUD-2024-010',
    alert: 'Multiple Red Flags',
    difficulty: 'hard',
    evidenceTokens: 3,
    evidence: [
      { id: 'e1', label: 'Stream Check', content: 'B.S. Physics is not a recognized CS/IT stream for SDE roles.' },
      { id: 'e2', label: 'GPA Mismatch', content: 'Resume claims 3.8, but portal/transcript confirms 3.1. Major discrepancy.' },
      { id: 'e3', label: 'Integrity Policy', content: 'Discrepancies > 0.5 are considered data falsification.' }
    ],
    correctRisks: ['stream', 'cgpa', 'mismatch'],
    correctDecision: 'reject',
    strongJustificationKeywords: ['wrong stream', 'CGPA inflation', 'integrity issue', 'reject'],
    misleadingClue: 'The candidate has "React" skills, but the combination of wrong degree and a grade lie makes this an easy reject.',
    ruleApplied: 'Reject for both stream mismatch and data integrity issues (GPA inflation).',
    sopReference: 'SOP Sec 8.2: Data Falsification Policy',
    reasoningChain: [
      'Stream Check: B.S. Physics is ineligible for SDE roles.',
      'Data Integrity: Resume (3.8) vs Portal (3.1) shows a 0.7 point inflation.',
      'Integrity Rule: Any discrepancy > 0.5 is an automatic "Major Risk" and rejection.',
      'Decision: Reject for multiple critical failures.'
    ],
    commonMistakes: [
      'Focusing only on the stream and missing the GPA lie.',
      'Accepting a "small" lie because the candidate has the right skills.'
    ],
    nextTimeGuidance: 'Always compare Resume values against Portal values. Data integrity is the most important check for a screening agent.'
  }
];

export const contextCards = {
  'eligibility-basics': {
    title: 'Eligibility Basics',
    icon: 'Lightbulb',
    illustration: 'assets/illustrations/eligibility-basics.png',
    objective: 'Master the fundamental "Go/No-Go" rules of candidate eligibility.',
    content: "Before we look at resumes, we need to know the rules. Eligibility is the first filter in screening. It's about three things: the right degree, the right time, and the right background.",
    sopRules: [
      "SDE: B.Tech/B.E. CS, IT, BCA/MCA, M.Sc CS, or BS CS degrees only.",
      "Warehouse: Any 3-4 year Bachelor's degree is acceptable.",
      "Graduation Year: Must be within the 2022-2025 window.",
      "Accreditation: University must be UGC/AICTE (India) or Regionally Accredited (US/Canada)."
    ],
    tips: [
      "Academic Stream refers to the field of study (e.g., CS, IT).",
      "Graduation Year must fall within the specific window for the role.",
      "CGPA/GPA thresholds are hard requirements — no exceptions!",
      "For warehouse roles, ANY bachelor's degree is valid, regardless of major."
    ],
    buttonText: "Start Learning",
    decisionTree: {
      steps: [
        { question: 'Is the Degree type valid for this role?', yes: 'Check Stream', no: 'Reject' },
        { question: 'Is the Stream (CS/IT etc.) approved?', yes: 'Check Grad Year', no: 'Reject' },
        { question: 'Is the Graduation Year in 2022-2025?', yes: 'PROCEED', no: 'REJECT' }
      ]
    }
  },
  'degree-detective': {
    title: 'Degree Detective',
    icon: 'GraduationCap',
    illustration: 'assets/illustrations/degree-detective.png',
    objective: 'Learn to distinguish between valid tech degrees and ineligible ones.',
    content: "Different roles have different degree requirements. SDE roles require a Computer Science background, while Warehouse roles are more flexible. Your job is to match the degree to the role's rules.",
    sopRules: [
      "SDE Valid: CS, IT, BCA, MCA, M.Sc CS. (ECE requires 15+ CS credits).",
      "SDE Invalid: Mechanical, Civil, B.Com, B.A., or Associate degrees.",
      "Warehouse: All Bachelor's degrees valid (B.A., B.Com, BBA, etc.).",
      "All Roles: Diplomas and Certificates are strictly NOT eligible."
    ],
    tips: [
      "B.Tech CS, B.E. CS, and BCA are all valid CS degrees.",
      "ECE (Electronics) only counts if they have a formal CS Minor.",
      "Watch out for 'Computer & Information Science' — it sounds like CS, but it's often different!"
    ],
    buttonText: "Start Scouting",
    decisionTree: {
      steps: [
        { question: 'Is it a 4-year Bachelor\'s degree?', yes: 'Check Specialization', no: 'Reject (Ineligible Level)' },
        { question: 'Is the stream CS, IT, or Related?', yes: 'Verify Credits/Minor', no: 'Reject (Ineligible Stream)' },
        { question: 'Are there 15+ CS credits (for ECE)?', yes: 'PROCEED', no: 'REJECT' }
      ]
    }
  },
  'graduation-gate': {
    title: 'Graduation Gate',
    icon: 'CalendarCheck',
    illustration: 'assets/illustrations/graduation-gate.png',
    objective: 'Spot conflicts between resume dates and application data.',
    content: "Candidates often list different dates in different places. Your job is to find the truth. If the resume says 2023 but the portal says 2024, you've got a conflict.",
    sopRules: [
      "Target Window: Graduation year must be between 2022 and 2025.",
      "Effective Date: Use the year the final degree/backlog was cleared.",
      "Future Dates: If graduation is in the future, candidate is ineligible.",
      "Verification: Always cross-reference Resume dates against Portal data."
    ],
    tips: [
      "Always compare the Resume date with the Portal date.",
      "A graduation date in the future means they haven't graduated yet!",
      "Backlogs cleared after the ceremony change the 'effective' graduation date."
    ],
    buttonText: "Verify Dates",
    decisionTree: {
      steps: [
        { question: 'Does Resume match Portal date?', yes: 'Check Window', no: 'Investigate Discrepancy' },
        { question: 'Is the effective year in 2022-2025?', yes: 'Check Backlogs', no: 'Reject (Out of Window)' },
        { question: 'Are all backlogs cleared in window?', yes: 'PROCEED', no: 'REJECT' }
      ]
    }
  },
  'university-validator': {
    title: 'University Validator',
    icon: 'Building2',
    illustration: 'assets/illustrations/university-validator.png',
    objective: 'Verify the legitimacy and location of educational institutions.',
    content: "A degree is only as good as the school that gave it. We need to ensure the university is accredited, in the right region, and not a 'diploma mill'.",
    sopRules: [
      "Accreditation: UGC/AICTE for India, Regional (NECHE/SACS) for US.",
      "Degree Type: Community College Bachelor's OK, Associate's NOT.",
      "Location: Campus must be in the target country (India/US/Canada).",
      "Online: Only valid if the university has full national accreditation."
    ],
    tips: [
      "Check if the university is in the official accreditation database (like UGC).",
      "Community College Bachelor's degrees are OK; Associate's degrees are NOT.",
      "Official satellite campuses are valid, but must be in the required country."
    ],
    buttonText: "Check Accreditation",
    decisionTree: {
      steps: [
        { question: 'Is University in UGC/Regional list?', yes: 'Check Campus Location', no: 'Reject (Diploma Mill)' },
        { question: 'Is the campus in the required country?', yes: 'Check Degree Prefix', no: 'Reject (Region Mismatch)' },
        { question: 'Is it a Bachelor\'s degree (B.E./B.S.)?', yes: 'PROCEED', no: 'REJECT' }
      ]
    }
  },
  'education-audit': {
    title: 'Education Audit',
    icon: 'FileCheck',
    illustration: 'assets/illustrations/education-audit.png',
    objective: 'Apply everything you\'ve learned to perform a full profile review.',
    content: "Now it's time to put it all together. You'll review complete education profiles and decide: Proceed or Reject? No more hints — just your expert judgment.",
    sopRules: [
      "Checklist: Valid Degree? + Valid Year? + Valid University?",
      "Conflicts: Any Resume vs Portal mismatch is a High Risk flag.",
      "Decision: One failure in any category = Reject Candidate.",
      "Audit: Provide clear reasoning for your final Go/No-Go decision."
    ],
    tips: [
      "Check the degree type first.",
      "Verify the graduation year matches the portal.",
      "Confirm the university is recognized and valid.",
      "Real resumes often have gaps. Use best judgment with available info."
    ],
    buttonText: "Begin Final Review",
    decisionTree: {
      steps: [
        { question: 'Passed Degree, Date, & Uni checks?', yes: 'Check Data Integrity', no: 'Reject Immediate' },
        { question: 'Does Resume match Portal exactly?', yes: 'Final Approval', no: 'Reject (Integrity Risk)' },
        { question: 'Ready to make the final decision?', yes: 'PROCEED', no: 'REJECT' }
      ]
    }
  },
  'audit-final': {
    title: 'Final Certification Audit',
    icon: 'ShieldCheck',
    illustration: 'assets/illustrations/education-audit.png',
    objective: 'The ultimate test. Clear 5 complex cases to earn your Screening Certification.',
    content: "This is the final stage. You will face 5 highly complex scenarios with multiple red flags, conflicting dates, and non-standard degrees. Your performance here determines your final score.",
    sopRules: [
      "Zero Guidance: No more rule hints or expert tips during the game.",
      "Justification: You must provide a clear reasoning for your decision.",
      "Time Pressure: You have 150 seconds per case. Use it wisely.",
      "Accuracy: High-impact mistakes will significantly increase your risk meter."
    ],
    tips: [
      "Trust your training. If a degree level is wrong, it's a reject.",
      "Always check the portal data for backlogs or date mismatches.",
      "University accreditation is non-negotiable.",
      "If something feels wrong, investigate the evidence before deciding."
    ],
    buttonText: "Begin Certification",
    decisionTree: {
      steps: [
        { question: 'Degree, Date, and University all verified?', yes: 'Check for Data Integrity', no: 'Hard Reject' },
        { question: 'Any mismatch between Resume & Portal?', yes: 'Verify Evidence/Justify', no: 'Approve Profile' },
        { question: 'Is the reasoning chain complete and valid?', yes: 'PROCEED', no: 'REJECT' }
      ]
    }
  }
};

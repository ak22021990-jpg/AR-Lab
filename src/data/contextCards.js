export const contextCards = {
  'eligibility-basics': {
    title: 'Eligibility Basics',
    icon: 'fa-lightbulb',
    illustration: '/assets/illustrations/eligibility-basics.png',
    objective: 'Master the fundamental "Go/No-Go" rules of candidate eligibility.',
    content: "Before we look at resumes, we need to know the rules. Eligibility is the first filter in screening. It's about three things: the right degree, the right time, and the right background.",
    tips: [
      "Academic Stream refers to the field of study (e.g., CS, IT).",
      "Graduation Year must fall within the specific window for the role.",
      "CGPA/GPA thresholds are hard requirements — no exceptions!",
      "For warehouse roles, ANY bachelor's degree is valid, regardless of major."
    ],
    buttonText: "Start Learning"
  },
  'degree-detective': {
    title: 'Degree Detective',
    icon: 'fa-user-graduate',
    illustration: '/assets/illustrations/degree-detective.png',
    objective: 'Learn to distinguish between valid tech degrees and ineligible ones.',
    content: "Different roles have different degree requirements. SDE roles require a Computer Science background, while Warehouse roles are more flexible. Your job is to match the degree to the role's rules.",
    tips: [
      "B.Tech CS, B.E. CS, and BCA are all valid CS degrees.",
      "ECE (Electronics) only counts if they have a formal CS Minor.",
      "Watch out for 'Computer & Information Science' — it sounds like CS, but it's often different!"
    ],
    buttonText: "Start Scouting"
  },
  'graduation-gate': {
    title: 'Graduation Gate',
    icon: 'fa-calendar-check',
    illustration: '/assets/illustrations/graduation-gate.png',
    objective: 'Spot conflicts between resume dates and application data.',
    content: "Candidates often list different dates in different places. Your job is to find the truth. If the resume says 2023 but the portal says 2024, you've got a conflict.",
    tips: [
      "Always compare the Resume date with the Portal date.",
      "A graduation date in the future means they haven't graduated yet!",
      "Backlogs cleared after the ceremony change the 'effective' graduation date."
    ],
    buttonText: "Verify Dates"
  },
  'university-validator': {
    title: 'University Validator',
    icon: 'fa-university',
    illustration: '/assets/illustrations/university-validator.png',
    objective: 'Verify the legitimacy and location of educational institutions.',
    content: "A degree is only as good as the school that gave it. We need to ensure the university is accredited, in the right region, and not a 'diploma mill'.",
    tips: [
      "Check if the university is in the official accreditation database (like UGC).",
      "Community College Bachelor's degrees are OK; Associate's degrees are NOT.",
      "Official satellite campuses are valid, but must be in the required country."
    ],
    buttonText: "Check Accreditation"
  },
  'education-audit': {
    title: 'Education Audit',
    icon: 'fa-file-invoice',
    illustration: '/assets/illustrations/education-audit.png',
    objective: 'Apply everything you\'ve learned to perform a full profile review.',
    content: "Now it's time to put it all together. You'll review complete education profiles and decide: Proceed or Reject? No more hints — just your expert judgment.",
    tips: [
      "Check the degree type first.",
      "Verify the graduation year matches the portal.",
      "Confirm the university is recognized and valid.",
      "Real resumes often have gaps. Use best judgment with available info."
    ],
    buttonText: "Begin Final Review"
  }
};

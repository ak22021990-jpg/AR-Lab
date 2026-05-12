export const eligibilityRules = {
  roles: {
    sde: {
      degrees: {
        valid: [
          "B.Tech Computer Science",
          "B.E. Computer Science",
          "B.Tech Information Technology",
          "B.Tech IT",
          "BCA (Bachelor of Computer Applications)",
          "MCA (Master of Computer Applications)",
          "M.Sc Computer Science",
          "BS Computer Science",
          "BS CS",
          "B.Tech CSE"
        ],
        edgeCase: [
          {
            type: "Electronics & Communication (ECE)",
            rule: "Valid ONLY with a formal CS Minor (15+ credits). Open electives don't count.",
            reasoning: "Core ECE lacks sufficient software engineering depth without a structured minor."
          },
          {
            type: "Computer & Information Science",
            rule: "Typically Invalid unless degree is 80%+ CS subjects.",
            reasoning: "Often more data-entry or library-science focused than software engineering."
          },
          {
            type: "Combined Specialization (e.g., CSE + Mechanical)",
            rule: "Valid if 'Computer Science' is one of the two core streams.",
            reasoning: "Formal dual specializations provide enough CS coverage."
          }
        ],
        invalid: [
          "Mechanical Engineering",
          "Civil Engineering",
          "B.Com",
          "B.A.",
          "Associate Degree",
          "Diploma",
          "Certificate of Completion"
        ]
      }
    },
    'warehouse-manager': {
      degrees: {
        valid: [
          "B.Tech (Any stream)",
          "B.E. (Any stream)",
          "B.Sc (Any stream)",
          "B.Com",
          "B.A.",
          "BBA",
          "BMS",
          "Any other 3-4 year Bachelor's Degree"
        ],
        edgeCase: [],
        invalid: [
          "Associate Degree",
          "Diploma",
          "Certificate of Completion",
          "High School / 12th Standard"
        ]
      },
      reasoning: "Warehouse management roles accept any formal Bachelor's degree as they value general aptitude and management potential over specific technical streams."
    }
  },
  graduation: {
    requiredRange: {
      min: 2022,
      max: 2025
    },
    commonIssues: [
      "Future Date: Candidate hasn't graduated yet.",
      "Backlog Date: Effective graduation is when the final backlog is cleared.",
      "Mismatch: Resume date differs from Portal date."
    ]
  },
  universities: {
    accreditation: [
      "UGC (University Grants Commission) - India",
      "AICTE (Technical Education) - India",
      "Regional Accreditation (e.g., NECHE, SACS) - US",
      "NAAC A++ or A+ is preferred but not mandatory if UGC recognized."
    ],
    types: {
      "Community College": "Valid for Bachelor's, Invalid for Associate's.",
      "Satellite Campus": "Valid if official, but must be in the correct country/region.",
      "Online University": "Check for specific accreditation; many are invalid 'diploma mills'."
    }
  },
  guidance: {
    missingData: "Use best judgment with available information. If a field like CGPA or Graduation Year is missing from the resume but present in the portal, check for internal consistency. Do not automatically disqualify for missing resume fields unless the SOP explicitly requires it."
  }
};

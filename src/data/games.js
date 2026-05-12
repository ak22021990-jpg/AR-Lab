// Day 3: Education & Eligibility Games
// Revised structure with 5 training labs + 1 final audit

export const miniGames = [
  {
    id: 'eligibility-basics',
    title: 'Eligibility Basics',
    format: 'mcq',
    icon: 'fa-lightbulb',
    illustration: '/assets/illustrations/eligibility-basics.png',
    badge: 'Basics',
    color: '#FF9900',
    description: 'Learn the fundamental "Go/No-Go" rules of candidate eligibility.',
    completionMessage: 'You have mastered the eligibility fundamentals!',
    items: [
      {
        question: "A candidate for an SDE role graduated in 2019 but the role requires graduation between 2022-2025. What do you do?",
        context: "SDE roles have strict graduation windows. Use the SDE rule set.",
        options: [
          { title: "Proceed", detail: "Accept them anyway if they have good experience." },
          { title: "Reject", detail: "They do not meet the graduation year requirement." }
        ],
        targetRole: 'sde',
        answer: 1,
        explanation: "Graduation ranges are hard requirements. If they fall outside the 2022-2025 window, they must be rejected."
      },
      {
        question: "What does 'academic stream' mean when screening for technical roles?",
        context: "Role-specific requirements often hinge on the 'stream' or field of study.",
        options: [
          { title: "The university's location", detail: "Where the candidate studied." },
          { title: "The field of study", detail: "The major or specialization (e.g., CS, IT)." },
          { title: "The candidate's GPA", detail: "Their academic performance." }
        ],
        targetRole: 'sde',
        answer: 1,
        explanation: "Academic stream refers to the field of study, such as Computer Science, Information Technology, or Mechanical Engineering."
      },
      {
        question: "A Warehouse Manager candidate's CGPA is 5.5/10, but the minimum required is 6.0/10. Can they proceed?",
        context: "Even for non-tech roles, performance thresholds are usually non-negotiable.",
        options: [
          { title: "Yes", detail: "If they have a great degree type." },
          { title: "No", detail: "They are below the mandatory threshold." },
          { title: "Only if they are from an IIT", detail: "Prestige can sometimes override grades." }
        ],
        targetRole: 'warehouse-manager',
        answer: 1,
        explanation: "CGPA thresholds are hard requirements. Even for Warehouse Manager roles, candidates must meet the minimum grade requirement."
      },
      {
        question: "Which of these is the first thing you check when an application for a Warehouse role comes in?",
        context: "Efficiency in screening comes from checking the most likely 'blockers' first.",
        options: [
          { title: "Resume formatting", detail: "Is the resume easy to read?" },
          { title: "Eligibility fundamentals", detail: "Degree, Grad Year, and Stream." },
          { title: "Candidate's hobbies", detail: "What they do in their free time." }
        ],
        targetRole: 'warehouse-manager',
        answer: 1,
        explanation: "Checking eligibility fundamentals first saves time. If they aren't eligible, there's no need to review the rest of the profile."
      },
      {
        question: "A candidate has a B.Tech in Mechanical Engineering and no CS minor. They applied for an SDE role. Decision?",
        context: "SDE roles require CS or IT related degrees. Mechanical is considered 'Non-CS'.",
        options: [
          { title: "Proceed", detail: "Mechanical engineers can also code." },
          { title: "Reject", detail: "Wrong stream for a technical SDE role." }
        ],
        targetRole: 'sde',
        answer: 1,
        explanation: "For SDE roles, the degree must be CS or IT related. Mechanical Engineering without a CS minor is not eligible."
      }
    ]
  },
  {
    id: 'degree-detective',
    title: 'Degree Detective',
    format: 'audit',
    icon: 'fa-user-graduate',
    illustration: '/assets/illustrations/degree-detective.png',
    badge: 'Degrees',
    color: '#00d4ff',
    description: 'Identify valid tech degrees and master the "CS Rule".',
    completionMessage: 'You can now accurately validate degree eligibility.',
    scenarios: [
      {
        id: 'dd-1',
        title: 'Case #DEG-101',
        alert: 'New Application',
        difficulty: 'easy',
        targetRole: 'sde',
        templateStyle: 'modern',
        resume: {
          name: 'Rahul Khanna',
          email: 'rahul.k@example.com',
          phone: '+91 99887 76655',
          address: 'Mumbai, Maharashtra',
          careerObjective: 'Software enthusiast with B.Tech in IT.',
          education: [
            { institution: 'IIT Bombay', degree: 'B.Tech', field: 'Information Technology', graduationYear: '2023', result: '9.2', resultType: 'CGPA' }
          ],
          experience: [],
          skills: ['C++', 'Python', 'Data Structures'],
          certifications: [],
          languages: ['English', 'Hindi']
        },
        portal: { degree: 'B.Tech IT', field: 'Information Technology', graduationYear: '2023', cgpa: '9.2' },
        evidenceTokens: 1,
        evidence: [
          { id: 'e1', label: 'Certificate', content: 'Official certificate confirms B.Tech in CS. All good.' }
        ],
        correctRisks: [],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['CS degree', 'matches', 'clean'],
        misleadingClue: 'Everything is perfectly clean. Don\'t search for problems that aren\'t there!',
        ruleApplied: 'B.Tech CS/IT is the gold standard for SDE eligibility. Proceed immediately.'
      },
      {
        id: 'dd-2',
        title: 'Case #DEG-102',
        alert: 'Check Specialization',
        difficulty: 'medium',
        targetRole: 'sde',
        templateStyle: 'creative',
        resume: {
          name: 'Anjali Menon',
          email: 'anjali.m@example.com',
          phone: '+91 88776 65544',
          address: 'Chennai, Tamil Nadu',
          careerObjective: 'ECE graduate with a minor in Computer Science.',
          education: [
            { institution: 'NIT Trichy', degree: 'B.Tech', field: 'Electronics & Communication', graduationYear: '2022', result: '8.5', resultType: 'CGPA' }
          ],
          experience: [],
          skills: ['Java', 'Embedded Systems', 'SQL'],
          certifications: ['Certified CS Minor from NIT Trichy'],
          languages: ['English', 'Tamil']
        },
        portal: { degree: 'B.Tech ECE', field: 'Electronics', graduationYear: '2022', cgpa: '8.5' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Transcript', content: 'Shows a formal CS Minor program completed with 18 credits in CS subjects.' },
          { id: 'e2', label: 'Policy', content: 'ECE is valid ONLY with a formal CS Minor (min 15 credits).' }
        ],
        correctRisks: [],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['formal minor', '18 credits', 'CS minor', 'eligible'],
        misleadingClue: 'While it\'s ECE, the formal CS minor makes this candidate eligible for SDE roles.',
        ruleApplied: 'ECE with a verified CS minor (15+ credits) satisfies the CS requirement for SDE roles.'
      },
      {
        id: 'dd-3',
        title: 'Case #DEG-103',
        alert: 'Naming Conflict',
        difficulty: 'hard',
        targetRole: 'sde',
        templateStyle: 'traditional',
        resume: {
          name: 'Vikram Singh',
          email: 'vikram.s@example.com',
          phone: '+91 77665 54433',
          address: 'Delhi',
          careerObjective: 'Experienced in business and tech.',
          education: [
            { institution: 'Delhi University', degree: 'B.Sc', field: 'Information Systems', graduationYear: '2021', result: '7.8', resultType: 'CGPA' }
          ],
          experience: [],
          skills: ['Office 365', 'Basic Java'],
          certifications: [],
          languages: ['English', 'Hindi']
        },
        portal: { degree: 'B.Sc CS', field: 'Computer Science', graduationYear: '2021', cgpa: '7.8' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Curriculum', content: 'Only 30% of credits are in programming/algorithms. Focus is on data management and office tools.' },
          { id: 'e2', label: 'SOP Reference', content: 'Computer & Information Science (CIS) ≠ Computer Science (CS). CIS is typically invalid.' }
        ],
        correctRisks: ['stream'],
        correctDecision: 'reject',
        strongJustificationKeywords: ['CIS not CS', 'wrong stream', 'insufficient software credits'],
        misleadingClue: 'The names look almost identical, but CIS is often not a software engineering degree.',
        ruleApplied: 'Computer & Information Science is not equivalent to Computer Science for SDE roles. Reject due to stream mismatch.'
      }
    ]
  },
  {
    id: 'graduation-gate',
    title: 'Graduation Gate',
    format: 'audit',
    icon: 'fa-calendar-check',
    illustration: '/assets/illustrations/graduation-gate.png',
    badge: 'Timelines',
    color: '#a855f7',
    description: 'Spot conflicts between resume dates and application data.',
    completionMessage: 'You can now spot graduation timeline issues and data conflicts.',
    scenarios: [
      {
        id: 'gg-1',
        title: 'Case #TIM-101',
        alert: 'Date Mismatch',
        difficulty: 'medium',
        targetRole: 'sde',
        templateStyle: 'modern',
        resume: {
          name: 'Ishaan Gupta',
          email: 'ishaan.g@example.com',
          phone: '+91 66554 43322',
          address: 'Gurgaon',
          careerObjective: 'CS graduate.',
          education: [
            { institution: 'NSUT Delhi', degree: 'B.E.', field: 'Computer Engineering', graduationYear: '2023', result: '8.0', resultType: 'CGPA' }
          ],
          experience: [],
          skills: ['React', 'Node.js'],
          certifications: [],
          languages: ['English']
        },
        portal: { degree: 'B.E. CE', field: 'Computer Engineering', graduationYear: '2024', cgpa: '8.0' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'University Check', content: 'Candidate has a pending backlog in the final year. Expected completion is now 2024.' },
          { id: 'e2', label: 'Resume Check', content: 'Candidate failed to update their resume after the backlog occurred.' }
        ],
        correctRisks: ['graduation', 'mismatch'],
        correctDecision: 'reject',
        strongJustificationKeywords: ['mismatch', 'backlog', '2024', 'not yet graduated'],
        misleadingClue: 'The resume says 2023, which is in range, but the truth is in the portal: they haven\'t graduated yet.',
        ruleApplied: 'Always trust the later date if it indicates the candidate has not yet graduated.'
      },
      {
        id: 'gg-2',
        title: 'Case #TIM-102',
        alert: 'Future Graduate',
        difficulty: 'easy',
        targetRole: 'warehouse-manager',
        templateStyle: 'traditional',
        resume: {
          name: 'Rohan Deshmukh',
          email: 'rohan.d@example.com',
          phone: '+91 55443 32211',
          address: 'Nagpur',
          careerObjective: 'Operations lead.',
          education: [
            { institution: 'Nagpur University', degree: 'B.A.', field: 'Economics', graduationYear: '2022', result: '6.5', resultType: 'CGPA' }
          ],
          experience: [],
          skills: ['Management'],
          certifications: [],
          languages: ['English', 'Marathi']
        },
        portal: { degree: 'B.A.', field: 'Economics', graduationYear: '2022', cgpa: '6.5' },
        evidenceTokens: 1,
        evidence: [
          { id: 'e1', label: 'Range Check', content: 'Role requires graduation between 2022 and 2025.' }
        ],
        correctRisks: [],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['valid degree', 'matches', 'within range'],
        misleadingClue: 'For Warehouse roles, any bachelor\'s degree is valid, including B.A. Economics.',
        ruleApplied: 'Warehouse Manager roles accept any bachelor\'s degree. Proceed if dates match.'
      },
      {
        id: 'gg-3',
        title: 'Case #TIM-103',
        alert: 'Recent Backlog',
        difficulty: 'hard',
        targetRole: 'sde',
        templateStyle: 'creative',
        resume: {
          name: 'Meera Iyer',
          email: 'meera.i@example.com',
          phone: '+91 44332 21100',
          address: 'Bangalore',
          careerObjective: 'Passionate coder.',
          education: [
            { institution: 'PES University', degree: 'B.Tech', field: 'CS', graduationYear: '2025', result: '9.5', resultType: 'CGPA' }
          ],
          experience: [],
          skills: ['Python', 'ML'],
          certifications: [],
          languages: ['English', 'Tamil']
        },
        portal: { degree: 'B.Tech CS', field: 'CS', graduationYear: '2025', cgpa: '9.5' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Transcript', content: 'Student failed 2 subjects in final semester (May 2023). Cleared them in August 2023.' },
          { id: 'e2', label: 'Degree Date', content: 'Official degree certificate issued in September 2023.' }
        ],
        correctRisks: ['graduation'],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['cleared backlog', '2023', 'eligible', 'September certificate'],
        misleadingClue: 'The backlog might make you want to reject, but they cleared it within the same year (2023), which is in range.',
        ruleApplied: 'Candidates who clear backlogs within the required graduation window (2022-2025) are eligible.'
      }
    ]
  },
  {
    id: 'university-validator',
    title: 'University Validator',
    format: 'audit',
    icon: 'fa-university',
    illustration: '/assets/illustrations/university-validator.png',
    badge: 'Accreditation',
    color: '#ef4444',
    description: 'Verify the legitimacy and location of educational institutions.',
    completionMessage: 'You can now verify institutional credibility across regions.',
    scenarios: [
      {
        id: 'uv-1',
        title: 'Case #UNI-101',
        alert: 'Unknown Institution',
        difficulty: 'hard',
        targetRole: 'sde',
        templateStyle: 'modern',
        resume: {
          name: 'Aditya Birla',
          email: 'aditya.b@example.com',
          phone: '+91 33221 10099',
          address: 'Noida',
          careerObjective: 'Tech lead.',
          education: [
            { institution: 'Global Tech Online University', degree: 'B.Tech', field: 'CS', graduationYear: '2022', result: '9.8', resultType: 'CGPA' }
          ],
          experience: [],
          skills: ['Full Stack'],
          certifications: [],
          languages: ['English']
        },
        portal: { degree: 'B.Tech CS', field: 'CS', graduationYear: '2022', cgpa: '9.8' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'UGC Search', content: '"Apex Tech Institute" is not found in the list of recognized universities.' },
          { id: 'e2', label: 'Web Research', content: 'No physical campus found. Website looks like a template with no faculty listed.' }
        ],
        correctRisks: ['university'],
        correctDecision: 'reject',
        strongJustificationKeywords: ['unrecognized', 'UGC', 'not accredited', 'diploma mill'],
        misleadingClue: 'The degree name and year are perfect, but the university itself isn\'t legitimate.',
        ruleApplied: 'Degrees from unrecognized institutions cannot be accepted. Reject for accreditation failure.'
      },
      {
        id: 'uv-2',
        title: 'Case #UNI-102',
        alert: 'Satellite Campus',
        difficulty: 'medium',
        targetRole: 'warehouse-manager',
        templateStyle: 'traditional',
        resume: {
          name: 'Suresh Raina',
          email: 'suresh.r@example.com',
          phone: '+91 22110 09988',
          address: 'Ghaziabad',
          careerObjective: 'Warehouse expert.',
          education: [
            { institution: 'IGNOU', degree: 'B.A.', field: 'History', graduationYear: '2021', result: '6.0', resultType: 'CGPA' }
          ],
          experience: [],
          skills: ['Logistics'],
          certifications: [],
          languages: ['English', 'Hindi']
        },
        portal: { degree: 'B.A.', field: 'History', graduationYear: '2021', cgpa: '6.0' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Campus Check', content: 'Amity Dubai is an official international branch campus of Amity University (India).' },
          { id: 'e2', label: 'Region Policy', content: 'International campuses of recognized Indian universities are valid for this role.' }
        ],
        correctRisks: [],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['official branch', 'Dubai', 'legitimate', 'recognized'],
        misleadingClue: 'The location is outside India, which might cause hesitation, but it\'s an official branch.',
        ruleApplied: 'Official international branch campuses of recognized universities are valid.'
      },
      {
        id: 'uv-3',
        title: 'Case #UNI-103',
        alert: 'Community College',
        difficulty: 'medium',
        targetRole: 'sde',
        templateStyle: 'creative',
        resume: {
          name: 'Tanya Goel',
          email: 'tanya.g@example.com',
          phone: '+91 11009 98877',
          address: 'Indore',
          careerObjective: 'Aspiring dev.',
          education: [
            { institution: 'SGSITS Indore', degree: 'B.E.', field: 'CS', graduationYear: '2023', result: '8.4', resultType: 'CGPA' }
          ],
          experience: [],
          skills: ['Java'],
          certifications: [],
          languages: ['English']
        },
        portal: { degree: 'B.E. CS', field: 'CS', graduationYear: '2023', cgpa: '8.4' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Degree Level', content: 'Associate degree (2-year). Role requires Bachelor\'s degree (4-year) minimum.' },
          { id: 'e2', label: 'Policy', content: 'Associate degrees do not meet the minimum educational requirement.' }
        ],
        correctRisks: ['degree'],
        correctDecision: 'reject',
        strongJustificationKeywords: ['associate', 'not bachelor', 'insufficient level'],
        misleadingClue: 'De Anza is a very famous community college, but the degree level is the issue.',
        ruleApplied: 'Associate degrees are ineligible for roles requiring a Bachelor\'s degree.'
      }
    ]
  },
  {
    id: 'education-audit',
    title: 'Education Audit',
    format: 'audit',
    icon: 'fa-file-invoice',
    illustration: '/assets/illustrations/education-audit.png',
    badge: 'Final Review',
    color: '#22c55e',
    description: 'Perform a full education profile review and make the final call.',
    completionMessage: 'You are ready for the Final Challenge!',
    scenarios: [
      {
        id: 'ea-1',
        title: 'Case #AUD-101',
        alert: 'Full Profile Review',
        difficulty: 'medium',
        targetRole: 'sde',
        templateStyle: 'modern',
        resume: {
          name: 'Karan Johar',
          email: 'karan.j@example.com',
          phone: '+91 90000 11111',
          address: 'Mumbai',
          careerObjective: 'Director of code.',
          education: [
            { institution: 'BITS Pilani', degree: 'B.E.', field: 'CS', graduationYear: '2022', result: '8.9', resultType: 'CGPA' }
          ],
          experience: [],
          skills: ['Management', 'Coding'],
          certifications: [],
          languages: ['English']
        },
        portal: { degree: 'B.E. CS', field: 'CS', graduationYear: '2022', cgpa: '8.9' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'UGC Check', content: 'Bangalore University is a recognized state university.' },
          { id: 'e2', label: 'Verification', content: 'All data points confirmed by third-party background check.' }
        ],
        correctRisks: [],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['all clean', 'verified', 'recognized', 'matches'],
        misleadingClue: 'This is a test of your ability to NOT find problems when none exist.',
        ruleApplied: 'Clean profiles should be processed quickly to avoid candidate delay.'
      },
      {
        id: 'ea-2',
        title: 'Case #AUD-102',
        alert: 'Multiple Red Flags',
        difficulty: 'hard',
        targetRole: 'sde',
        templateStyle: 'traditional',
        resume: {
          name: 'Ekta Kapoor',
          email: 'ekta.k@example.com',
          phone: '+91 80000 22222',
          address: 'Mumbai',
          careerObjective: 'Series of code.',
          education: [
            { institution: 'Mithibai College', degree: 'B.Sc', field: 'Physics', graduationYear: '2023', result: '9.0', resultType: 'CGPA' }
          ],
          experience: [],
          skills: ['Drama', 'React'],
          certifications: [],
          languages: ['English']
        },
        portal: { degree: 'B.Sc Physics', field: 'Physics', graduationYear: '2023', cgpa: '7.5' },
        evidenceTokens: 3,
        evidence: [
          { id: 'e1', label: 'Stream Check', content: 'Mechanical Engineering without CS minor is ineligible.' },
          { id: 'e2', label: 'CGPA Check', content: 'Resume says 9.0, but transcript confirms 7.5. Inflation detected.' },
          { id: 'e3', label: 'University Check', content: 'College is AICTE approved but CGPA mismatch is a major integrity issue.' }
        ],
        correctRisks: ['stream', 'cgpa', 'mismatch'],
        correctDecision: 'reject',
        strongJustificationKeywords: ['wrong stream', 'CGPA inflation', 'multiple issues', 'reject'],
        misleadingClue: 'The high CGPA on the resume might look good, but it\'s both the wrong stream and a lie.',
        ruleApplied: 'Reject candidates with wrong stream and data integrity issues (CGPA inflation).'
      }
    ]
  }
];

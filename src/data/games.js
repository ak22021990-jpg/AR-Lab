// Day 3: Education & Eligibility Games
// Revised structure with 5 training labs + 1 final audit

export const miniGames = [
  {
    id: 'eligibility-basics',
    title: 'Eligibility Basics',
    format: 'mcq',
    icon: 'Lightbulb',
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
          { title: "Only if they are from an Ivy League", detail: "Prestige can sometimes override grades." }
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
    icon: 'GraduationCap',
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
          name: 'Jason Reed',
          email: 'jason.r@example.com',
          phone: '+1 206-555-0122',
          address: 'Seattle, WA',
          linkedIn: 'linkedin.com/in/jasonreed-dev',
          portfolio: 'jason-codes.io',
          careerObjective: 'Software enthusiast with B.S. in CS.',
          education: [
            { institution: 'University of Washington', degree: 'B.S.', field: 'Computer Science', graduationYear: '2023', result: '3.8', resultType: 'GPA' }
          ],
          experience: [],
          projects: [
            { name: 'SafePass', description: 'Encrypted password manager.', technologies: ['C++', 'Qt'] }
          ],
          skills: ['C++', 'Python', 'Data Structures'],
          certifications: [],
          languages: [
            { language: 'English', proficiency: 'Native' }
          ]
        },
        portal: { degree: 'B.S. CS', field: 'Computer Science', graduationYear: '2023', cgpa: '3.8' },
        evidenceTokens: 1,
        evidence: [
          { id: 'e1', label: 'Certificate', content: 'Official certificate confirms B.S. in CS. All good.' }
        ],
        correctRisks: [],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['CS degree', 'matches', 'clean'],
        misleadingClue: 'Everything is perfectly clean. Don\'t search for problems that aren\'t there!',
        ruleApplied: 'B.S. CS/IT is the gold standard for SDE eligibility. Proceed immediately.',
        sopReference: 'SOP Sec 1.1: Technical Foundations',
        reasoningChain: [
          'Degree Check: B.S. is the required level.',
          'Stream Check: Computer Science is a primary technical stream.',
          'Verification: Resume and Portal data are in perfect sync.',
          'Decision: Clear Proceed.'
        ],
        commonMistakes: [
          'Delaying the candidate by performing redundant checks.',
          'Over-scrutinizing a perfectly standard application.'
        ],
        nextTimeGuidance: 'When the degree and stream are both from the "Gold Standard" list (CS/IT), move to the next check immediately.'
      },
      {
        id: 'dd-2',
        title: 'Case #DEG-102',
        alert: 'Check Specialization',
        difficulty: 'medium',
        targetRole: 'sde',
        templateStyle: 'creative',
        resume: {
          name: 'Chloe Sutherland',
          email: 'chloe.s@example.com',
          phone: '+1 416-555-0177',
          address: 'Toronto, ON',
          linkedIn: 'linkedin.com/in/chloe-sutherland-eng',
          careerObjective: 'Engineering graduate with a minor in Computer Science.',
          education: [
            { institution: 'University of Toronto', degree: 'B.A.Sc.', field: 'Electrical Engineering', graduationYear: '2022', result: '3.6', resultType: 'GPA' }
          ],
          experience: [],
          skills: ['Java', 'Embedded Systems', 'SQL'],
          certifications: [
            { name: 'Certified CS Minor', provider: 'U of T', issueDate: '2022' }
          ],
          languages: [
            { language: 'English', proficiency: 'Native' },
            { language: 'French', proficiency: 'Conversational' }
          ]
        },
        portal: { degree: 'B.A.Sc.', field: 'Electrical Engineering', graduationYear: '2022', cgpa: '3.6' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Transcript', content: 'Shows a formal CS Minor program completed with 18 credits in CS subjects.' },
          { id: 'e2', label: 'Policy', content: 'Electrical Engineering is valid ONLY with a formal CS Minor (min 15 credits).' }
        ],
        correctRisks: [],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['formal minor', '18 credits', 'CS minor', 'eligible'],
        misleadingClue: 'While it\'s ECE, the formal CS minor makes this candidate eligible for SDE roles.',
        ruleApplied: 'Electrical Engineering with a verified CS minor (15+ credits) satisfies the CS requirement for SDE roles.',
        sopReference: 'SOP Sec 1.2.2: CS Minor Policy',
        reasoningChain: [
          'Initial Check: Electrical Engineering is a "Related" stream, not "Primary".',
          'Policy Check: Related streams require a verified CS Minor.',
          'Evidence: Transcript confirms 18 CS credits (above the 15-credit minimum).',
          'Decision: Proceed due to valid CS minor.'
        ],
        commonMistakes: [
          'Rejecting based on the major alone without checking for a minor.',
          'Miscounting credits on the transcript.'
        ],
        nextTimeGuidance: 'Always check the "Certifications" or "Minor" section for candidates with EEE/ECE degrees.'
      },
      {
        id: 'dd-3',
        title: 'Case #DEG-103',
        alert: 'Naming Conflict',
        difficulty: 'hard',
        targetRole: 'sde',
        templateStyle: 'traditional',
        resume: {
          name: 'Tyler Morgan',
          email: 'tyler.m@example.com',
          phone: '+1 512-555-0133',
          address: 'Austin, TX',
          linkedIn: 'linkedin.com/in/tylermorgan-is',
          careerObjective: 'Experienced in business and tech.',
          education: [
            { institution: 'UT Austin', degree: 'B.A.', field: 'Information Systems', graduationYear: '2021', result: '3.1', resultType: 'GPA' }
          ],
          experience: [],
          skills: ['Office 365', 'Basic Java'],
          certifications: [],
          languages: [
            { language: 'English', proficiency: 'Native' }
          ]
        },
        portal: { degree: 'B.S. CS', field: 'Computer Science', graduationYear: '2021', cgpa: '3.1' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Curriculum', content: 'Only 30% of credits are in programming/algorithms. Focus is on data management and office tools.' },
          { id: 'e2', label: 'SOP Reference', content: 'Computer & Information Science (CIS) ≠ Computer Science (CS). CIS is typically invalid.' }
        ],
        correctRisks: ['stream'],
        correctDecision: 'reject',
        strongJustificationKeywords: ['CIS not CS', 'wrong stream', 'insufficient software credits'],
        misleadingClue: 'The names look almost identical, but CIS is often not a software engineering degree.',
        ruleApplied: 'Computer & Information Science is not equivalent to Computer Science for SDE roles. Reject due to stream mismatch.',
        sopReference: 'SOP Sec 1.2.5: CIS vs CS Distinction',
        reasoningChain: [
          'Target Role: SDE (Software Development).',
          'Stream Analysis: Information Systems (IS/CIS) focuses on tools, not algorithms/architecture.',
          'Credit Audit: Only 30% of credits are in core programming.',
          'Decision: Reject for stream mismatch.'
        ],
        commonMistakes: [
          'Confusing Information Systems with Computer Science.',
          'Assuming all "Computer" degrees are equal.'
        ],
        nextTimeGuidance: 'Look for core CS subjects: Algorithms, OS, Compilers. If they are missing, it is likely not an SDE-eligible degree.'
      }
    ]
  },
  {
    id: 'graduation-gate',
    title: 'Graduation Gate',
    format: 'audit',
    icon: 'CalendarCheck',
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
          name: 'Ryan O\'Connor',
          email: 'ryan.oc@example.com',
          phone: '+1 312-555-0166',
          address: 'Chicago, IL',
          linkedIn: 'linkedin.com/in/ryanoconnor-dev',
          careerObjective: 'CS graduate.',
          education: [
            { institution: 'Northwestern University', degree: 'B.S.', field: 'Computer Engineering', graduationYear: '2023', result: '3.5', resultType: 'GPA' }
          ],
          experience: [],
          skills: ['React', 'Node.js'],
          certifications: [],
          languages: [
            { language: 'English', proficiency: 'Native' }
          ]
        },
        portal: { degree: 'B.S. CE', field: 'Computer Engineering', graduationYear: '2024', cgpa: '3.5' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'University Check', content: 'Candidate has a pending backlog in the final year. Expected completion is now 2024.' },
          { id: 'e2', label: 'Resume Check', content: 'Candidate failed to update their resume after the backlog occurred.' }
        ],
        correctRisks: ['graduation', 'mismatch'],
        correctDecision: 'reject',
        strongJustificationKeywords: ['mismatch', 'backlog', '2024', 'not yet graduated'],
        misleadingClue: 'The resume says 2023, which is in range, but the truth is in the portal: they haven\'t graduated yet.',
        ruleApplied: 'Always trust the later date if it indicates the candidate has not yet graduated.',
        sopReference: 'SOP Sec 3.2: Date Conflict Resolution',
        reasoningChain: [
          'Resume: States 2023 graduation.',
          'Portal: States 2024 graduation (due to backlog).',
          'Integrity Check: The portal data reveals a recent status change not yet on the resume.',
          'Policy: Candidates with active backlogs cannot be processed as "Graduated".',
          'Decision: Reject for pending graduation.'
        ],
        commonMistakes: [
          'Assuming the resume is the single source of truth.',
          'Ignoring the "Expected" vs "Actual" graduation status.'
        ],
        nextTimeGuidance: 'Whenever a date mismatch occurs, look for "Backlog" or "Pending" indicators in the portal data.'
      },
      {
        id: 'gg-2',
        title: 'Case #TIM-102',
        alert: 'Future Graduate',
        difficulty: 'easy',
        targetRole: 'warehouse-manager',
        templateStyle: 'traditional',
        resume: {
          name: 'Emily Chen',
          email: 'emily.chen@example.ca',
          phone: '+1 416-555-0199',
          address: 'Toronto, ON',
          linkedIn: 'linkedin.com/in/emily-chen-ops',
          careerObjective: 'Operations lead with a background in economics. Passionate about supply chain optimization.',
          education: [
            { institution: 'University of Toronto', degree: 'B.A.', field: 'Economics', graduationYear: '2022', result: '3.2', resultType: 'GPA' }
          ],
          experience: [],
          skills: ['Management', 'Data Analysis', 'Logistics'],
          certifications: [],
          languages: [
            { language: 'English', proficiency: 'Native' },
            { language: 'Mandarin', proficiency: 'Fluent' }
          ]
        },
        portal: { degree: 'B.A.', field: 'Economics', graduationYear: '2022', cgpa: '3.2' },
        evidenceTokens: 1,
        evidence: [
          { id: 'e1', label: 'Range Check', content: 'Role requires graduation between 2022 and 2025.' }
        ],
        correctRisks: [],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['valid degree', 'matches', 'within range'],
        misleadingClue: 'For Warehouse roles, any bachelor\'s degree is valid, including B.A. Economics.',
        ruleApplied: 'Warehouse Manager roles accept any bachelor\'s degree. Proceed if dates match.',
        sopReference: 'SOP Sec 2.1: Generalist Eligibility',
        reasoningChain: [
          'Role Check: Warehouse Manager.',
          'Degree Check: B.A. Economics is a valid bachelor\'s degree.',
          'Timeline: 2022 is within the required window.',
          'Decision: Proceed.'
        ],
        commonMistakes: [
          'Searching for tech requirements in a non-tech role.',
          'Thinking Economics is an ineligible "Arts" degree.'
        ],
        nextTimeGuidance: 'Remember that Warehouse roles are "Generalist" entry points. Almost any accredited degree is valid.'
      },
      {
        id: 'gg-3',
        title: 'Case #TIM-103',
        alert: 'Recent Backlog',
        difficulty: 'hard',
        targetRole: 'sde',
        templateStyle: 'creative',
        resume: {
          name: 'Sofia Rodriguez',
          email: 'sofia.r@example.com',
          phone: '+1 650-555-0122',
          address: 'San Francisco, CA',
          linkedIn: 'linkedin.com/in/sofiarodriguez-dev',
          portfolio: 'sofia-codes.github.io',
          careerObjective: 'Passionate coder.',
          education: [
            { institution: 'Stanford University', degree: 'B.S.', field: 'Computer Science', graduationYear: '2025', result: '3.9', resultType: 'GPA' }
          ],
          experience: [],
          projects: [
            { name: 'Voice Emotion Analyzer', description: 'ML model to detect emotion from audio.', technologies: ['Python', 'TensorFlow', 'Librosa'] }
          ],
          skills: ['Python', 'ML'],
          certifications: [],
          languages: [
            { language: 'English', proficiency: 'Native' },
            { language: 'Spanish', proficiency: 'Native' }
          ]
        },
        portal: { degree: 'B.S. CS', field: 'Computer Science', graduationYear: '2025', cgpa: '3.9' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Transcript', content: 'Student failed 2 subjects in final semester (May 2023). Cleared them in August 2023.' },
          { id: 'e2', label: 'Degree Date', content: 'Official degree certificate issued in September 2023.' }
        ],
        correctRisks: ['graduation'],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['cleared backlog', '2023', 'eligible', 'September certificate'],
        misleadingClue: 'The backlog might make you want to reject, but they cleared it within the same year (2023), which is in range.',
        ruleApplied: 'Candidates who clear backlogs within the required graduation window (2022-2025) are eligible.',
        sopReference: 'SOP Sec 3.4: Backlog Clearance Policy',
        reasoningChain: [
          'Observation: Backlog occurred in May 2023.',
          'Action: Backlog cleared in August 2023.',
          'Final Status: Degree conferred in September 2023.',
          'Policy: 2023 is within the eligible window (2022-2025).',
          'Decision: Proceed.'
        ],
        commonMistakes: [
          'Rejecting because a backlog *existed*, even though it was cleared.',
          'Missing the official certificate date.'
        ],
        nextTimeGuidance: 'A past backlog is not a disqualifier if the final degree certificate date falls within the eligible window.'
      }
    ]
  },
  {
    id: 'university-validator',
    title: 'University Validator',
    format: 'audit',
    icon: 'Building2',
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
          name: 'Nathaniel West',
          email: 'nathan.w@example.com',
          phone: '+1 212-555-0199',
          address: 'New York, NY',
          linkedIn: 'linkedin.com/in/nathanielwest-dev',
          careerObjective: 'Tech lead.',
          education: [
            { institution: 'Columbia University', degree: 'B.S.', field: 'Computer Science', graduationYear: '2022', result: '3.9', resultType: 'GPA' }
          ],
          experience: [],
          skills: ['Full Stack'],
          certifications: [],
          languages: [
            { language: 'English', proficiency: 'Native' }
          ]
        },
        portal: { degree: 'B.S. CS', field: 'Computer Science', graduationYear: '2022', cgpa: '3.9' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Accreditation Search', content: '"Global Tech Online" is not found in the list of recognized universities.' },
          { id: 'e2', label: 'Web Research', content: 'No physical campus found. Website looks like a template with no faculty listed.' }
        ],
        correctRisks: ['university'],
        correctDecision: 'reject',
        strongJustificationKeywords: ['unrecognized', 'UGC', 'not accredited', 'diploma mill'],
        misleadingClue: 'The degree name and year are perfect, but the university itself isn\'t legitimate.',
        ruleApplied: 'Degrees from unrecognized institutions cannot be accepted. Reject for accreditation failure.',
        sopReference: 'SOP Sec 4.1: Accreditation Standards',
        reasoningChain: [
          'University Search: "Global Tech Online" not in approved lists.',
          'Visual Audit: Website lacks faculty, physical address, and research history.',
          'Policy: Only UGC/ABET/Accredited institutions are valid.',
          'Decision: Reject for invalid institution.'
        ],
        commonMistakes: [
          'Focusing on the degree title (B.S. CS) and ignoring the school name.',
          'Trusting online-only "diploma mills".'
        ],
        nextTimeGuidance: 'If a university name sounds generic or "Too good to be true", always run it through the accreditation database.'
      },
      {
        id: 'uv-2',
        title: 'Case #UNI-102',
        alert: 'Satellite Campus',
        difficulty: 'medium',
        targetRole: 'warehouse-manager',
        templateStyle: 'traditional',
        resume: {
          name: 'Alex Rivera',
          email: 'a.rivera@example.com',
          phone: '+1 416-555-0188',
          address: 'Toronto, ON',
          linkedIn: 'linkedin.com/in/alex-rivera-ops',
          careerObjective: 'Warehouse expert with a passion for efficiency.',
          education: [
            { institution: 'Northeastern University', degree: 'B.S.', field: 'Operations', graduationYear: '2021', result: '3.0', resultType: 'GPA' }
          ],
          experience: [],
          skills: ['Logistics', 'Inventory Management', 'Team Leadership'],
          certifications: [],
          languages: [
            { language: 'English', proficiency: 'Native' },
            { language: 'Spanish', proficiency: 'Fluent' }
          ]
        },
        portal: { degree: 'B.S.', field: 'Operations', graduationYear: '2021', cgpa: '3.0' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Campus Check', content: 'The Toronto campus is an official regional branch of Northeastern University (Boston).' },
          { id: 'e2', label: 'Region Policy', content: 'Official regional campuses of recognized universities are valid for this role.' }
        ],
        correctRisks: [],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['official branch', 'Toronto', 'legitimate', 'recognized'],
        misleadingClue: 'The location is a satellite campus, which might cause hesitation, but it\'s an official branch.',
        ruleApplied: 'Official regional branch campuses of recognized universities are valid.',
        sopReference: 'SOP Sec 4.3: Satellite Campus Policy',
        reasoningChain: [
          'Institution: Northeastern University (Tier-1).',
          'Location: Toronto (Satellite Campus).',
          'Verification: Confirmed as an official, non-franchise branch.',
          'Decision: Proceed.'
        ],
        commonMistakes: [
          'Confusing official branches with "Study Centers" or franchises.',
          'Thinking only the main campus is valid.'
        ],
        nextTimeGuidance: 'Regional campuses (e.g., Northeastern Toronto, BITS Dubai) are valid if they are owned and operated by the parent university.'
      },
      {
        id: 'uv-3',
        title: 'Case #UNI-103',
        alert: 'Community College',
        difficulty: 'medium',
        targetRole: 'sde',
        templateStyle: 'creative',
        resume: {
          name: 'Isabella Ross',
          email: 'isabella.r@example.com',
          phone: '+1 408-555-0155',
          address: 'Cupertino, CA',
          linkedIn: 'linkedin.com/in/isabellaross-dev',
          careerObjective: 'Aspiring dev.',
          education: [
            { institution: 'De Anza College', degree: 'Associate Degree', field: 'Computer Science', graduationYear: '2023', result: '3.4', resultType: 'GPA' }
          ],
          experience: [],
          skills: ['Java'],
          certifications: [],
          languages: [
            { language: 'English', proficiency: 'Native' }
          ]
        },
        portal: { degree: 'A.S. CS', field: 'Computer Science', graduationYear: '2023', cgpa: '3.4' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Degree Level', content: 'Associate degree (2-year). Role requires Bachelor\'s degree (4-year) minimum.' },
          { id: 'e2', label: 'Policy', content: 'Associate degrees do not meet the minimum educational requirement.' }
        ],
        correctRisks: ['degree'],
        correctDecision: 'reject',
        strongJustificationKeywords: ['associate', 'not bachelor', 'insufficient level'],
        misleadingClue: 'De Anza is a very famous community college, but the degree level is the issue.',
        ruleApplied: 'Associate degrees are ineligible for roles requiring a Bachelor\'s degree.',
        sopReference: 'SOP Sec 1.1.2: Degree Level Minimums',
        reasoningChain: [
          'Requirement: Minimum 4-year Bachelor\'s degree.',
          'Actual: 2-year Associate Degree (A.S.).',
          'Policy: Associate degrees do not satisfy the Bachelor\'s requirement.',
          'Decision: Reject for degree level mismatch.'
        ],
        commonMistakes: [
          'Accepting a 2-year degree because the field (CS) is correct.',
          'Assuming "College" always means "4-year University".'
        ],
        nextTimeGuidance: 'Check the degree prefix. B.S./B.E./B.Tech are valid. A.S./A.A. are Associate degrees and usually invalid.'
      }
    ]
  },
  {
    id: 'education-audit',
    title: 'Education Audit',
    format: 'audit',
    icon: 'FileCheck',
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
          name: 'Lucas Bennett',
          email: 'lucas.b@example.com',
          phone: '+1 213-555-0111',
          address: 'Los Angeles, CA',
          linkedIn: 'linkedin.com/in/lucasbennett-dev',
          careerObjective: 'Software engineer.',
          education: [
            { institution: 'UCLA', degree: 'B.S.', field: 'Computer Science', graduationYear: '2022', result: '3.7', resultType: 'GPA' }
          ],
          experience: [],
          skills: ['Management', 'Coding'],
          certifications: [],
          languages: [
            { language: 'English', proficiency: 'Native' }
          ]
        },
        portal: { degree: 'B.S. CS', field: 'Computer Science', graduationYear: '2022', cgpa: '3.7' },
        evidenceTokens: 2,
        evidence: [
          { id: 'e1', label: 'Accreditation Check', content: 'UCLA is a recognized world-class university.' },
          { id: 'e2', label: 'Verification', content: 'All data points confirmed by third-party background check.' }
        ],
        correctRisks: [],
        correctDecision: 'proceed',
        strongJustificationKeywords: ['all clean', 'verified', 'recognized', 'matches'],
        misleadingClue: 'This is a test of your ability to NOT find problems when none exist.',
        ruleApplied: 'Clean profiles should be processed quickly to avoid candidate delay.',
        sopReference: 'SOP Sec 0.1: Efficiency Protocols',
        reasoningChain: [
          'Stream: CS (Valid).',
          'Degree: B.S. (Valid).',
          'University: UCLA (Valid).',
          'Integrity: No mismatches found.',
          'Decision: Proceed.'
        ],
        commonMistakes: [
          'Taking too long to verify a high-quality, clean profile.',
          'Second-guessing simple data points.'
        ],
        nextTimeGuidance: 'When a profile has zero "Alerts", focus on speed and accuracy. Don\'t hunt for non-existent red flags.'
      },
      {
        id: 'ea-2',
        title: 'Case #AUD-102',
        alert: 'Multiple Red Flags',
        difficulty: 'hard',
        targetRole: 'sde',
        templateStyle: 'traditional',
        resume: {
          name: 'Maya Patel',
          email: 'maya.p@example.com',
          phone: '+1 619-555-0122',
          address: 'San Diego, CA',
          linkedIn: 'linkedin.com/in/mayapatel-physics',
          careerObjective: 'Physics graduate with coding skills.',
          education: [
            { institution: 'UC San Diego', degree: 'B.S.', field: 'Physics', graduationYear: '2023', result: '3.8', resultType: 'GPA' }
          ],
          experience: [],
          skills: ['Data Analysis', 'React'],
          certifications: [],
          languages: [
            { language: 'English', proficiency: 'Native' },
            { language: 'Gujarati', proficiency: 'Fluent' }
          ]
        },
        portal: { degree: 'B.S. Physics', field: 'Physics', graduationYear: '2023', cgpa: '3.1' },
        evidenceTokens: 3,
        evidence: [
          { id: 'e1', label: 'Stream Check', content: 'Physics without CS minor is ineligible for SDE.' },
          { id: 'e2', label: 'GPA Check', content: 'Resume says 3.8, but transcript confirms 3.1. Inflation detected.' },
          { id: 'e3', label: 'University Check', content: 'University is accredited but GPA mismatch is a major integrity issue.' }
        ],
        correctRisks: ['stream', 'cgpa', 'mismatch'],
        correctDecision: 'reject',
        strongJustificationKeywords: ['wrong stream', 'GPA inflation', 'multiple issues', 'reject'],
        misleadingClue: 'The high GPA on the resume might look good, but it\'s both the wrong stream and a lie.',
        ruleApplied: 'Reject candidates with wrong stream and data integrity issues (GPA inflation).',
        sopReference: 'SOP Sec 8.1: Compound Integrity Failures',
        reasoningChain: [
          'Stream Check: Physics is ineligible for SDE.',
          'Grade Audit: 3.8 (Resume) vs 3.1 (Portal). Major discrepancy.',
          'Policy: Multiple failures (Stream + Integrity) require a "Hard Reject".',
          'Decision: Reject.'
        ],
        commonMistakes: [
          'Letting the candidate\'s skills (React) distract from the integrity lie.',
          'Failing to cross-reference the GPA.'
        ],
        nextTimeGuidance: 'Always trust the Portal over the Resume. If the candidate lies about grades, they are an automatic reject regardless of skills.'
      }
    ]
  }
];

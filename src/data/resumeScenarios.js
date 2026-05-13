/**
 * Curated resume scenarios for AMZ3 Upgrade
 * Sourced/inspired by AMZ5 dataset (filtered_resumes.csv)
 */

export const resumeScenarios = [
  // ==========================================
  // PHASE 1: MCQ SCENARIOS (5 total)
  // ==========================================
  {
    id: 's1',
    targetRole: 'sde',
    templateStyle: 'modern',
    resume: {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      address: 'Bangalore, Karnataka',
      linkedIn: 'linkedin.com/in/priyasharma-dev',
      portfolio: 'github.com/priyasharma',
      careerObjective: 'Aspiring software engineer with strong foundations in Java and Python. Eager to contribute to scalable web applications.',
      education: [
        { institution: 'VIT Vellore', degree: 'B.Tech', field: 'Computer Science', graduationYear: '2022', result: '8.8', resultType: 'CGPA' }
      ],
      experience: [
        { company: 'TechSolutions Corp', position: 'SDE Intern', location: 'Bangalore, India', startDate: 'Jan 2022', endDate: 'June 2022', responsibilities: 'Developed REST APIs using Spring Boot. Collaborated with frontend teams.' }
      ],
      projects: [
        { name: 'Campus Connect', description: 'Social networking platform for university students.', technologies: ['React', 'Firebase', 'Tailwind'] }
      ],
      skills: ['Java', 'Spring Boot', 'Python', 'React', 'SQL'],
      certifications: [
        { name: 'AWS Certified Cloud Practitioner', provider: 'AWS', issueDate: '2022' }
      ],
      languages: [
        { language: 'English', proficiency: 'Fluent' },
        { language: 'Hindi', proficiency: 'Native' }
      ]
    },
    portal: {
      degree: 'B.Tech',
      field: 'Computer Science',
      graduationYear: '2022',
      cgpa: '8.8'
    }
  },
  {
    id: 's2',
    targetRole: 'warehouse-manager',
    templateStyle: 'traditional',
    resume: {
      name: 'Alex Thompson',
      email: 'alex.t@example.com',
      phone: '+1 312-555-0144',
      address: 'Chicago, IL',
      linkedIn: 'linkedin.com/in/alext-logistics',
      careerObjective: 'Experienced logistics professional looking for a management role in warehouse operations.',
      education: [
        { institution: 'DePaul University', degree: 'B.A.', field: 'Business', graduationYear: '2021', result: '3.4', resultType: 'GPA' }
      ],
      experience: [
        { company: 'Midwest Logistics', position: 'Floor Supervisor', location: 'Chicago, IL', startDate: 'Aug 2021', endDate: 'Present', responsibilities: 'Managed inventory tracking. Supervised a team of 15 staff members.' }
      ],
      skills: ['Inventory Management', 'Supply Chain', 'Team Leadership', 'ERP'],
      extraCurricular: [
        { type: 'Sports', organization: 'University Baseball Team', role: 'Captain' }
      ],
      certifications: [
        { name: 'Six Sigma Yellow Belt', provider: 'ASQ', issueDate: '2021' }
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Spanish', proficiency: 'Conversational' }
      ]
    },
    portal: {
      degree: 'B.A.',
      field: 'Business',
      graduationYear: '2021',
      cgpa: '3.4'
    }
  },
  {
    id: 's3',
    targetRole: 'sde',
    templateStyle: 'creative',
    resume: {
      name: 'Jordan Smith',
      email: 'jordan.s@example.com',
      phone: '+1 206-555-0188',
      address: 'Seattle, WA',
      linkedIn: 'linkedin.com/in/jordansmith-dev',
      careerObjective: 'Creative thinker transitioning into tech. Passionate about software development and UI design.',
      education: [
        { institution: 'University of Washington', degree: 'B.A.', field: 'Graphic Design', graduationYear: '2020', result: '3.2', resultType: 'GPA' }
      ],
      experience: [
        { company: 'Pixel Art Agency', position: 'Content Writer', location: 'Seattle, WA', startDate: 'Nov 2020', endDate: 'Dec 2021', responsibilities: 'Wrote technical blogs. Managed social media accounts.' }
      ],
      volunteerWork: [
        { organization: 'Tech For All', role: 'Volunteer Tutor', duration: '6 months' }
      ],
      skills: ['HTML', 'CSS', 'JavaScript', 'Copywriting'],
      certifications: [
        { name: 'Full Stack Development Bootcamp', provider: 'Udemy', issueDate: '2021' }
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'French', proficiency: 'Conversational' }
      ]
    },
    portal: {
      degree: 'B.A.',
      field: 'Graphic Design',
      graduationYear: '2020',
      cgpa: '3.2'
    }
  },
  {
    id: 's4',
    targetRole: 'warehouse-manager',
    templateStyle: 'modern',
    resume: {
      name: 'David Miller',
      email: 'd.miller@example.com',
      phone: '+1 555-0123',
      address: 'Chicago, IL',
      linkedIn: 'linkedin.com/in/david-miller-ops',
      careerObjective: 'Motivated individual with a strong academic background in sciences, seeking a role in operations management.',
      education: [
        { institution: 'University of Illinois', degree: 'M.Sc', field: 'Physics', graduationYear: '2019', result: '3.8', resultType: 'GPA' }
      ],
      experience: [
        { company: 'Retail Hub', position: 'Stock Lead', location: 'Chicago, IL', startDate: 'Jan 2020', endDate: 'Present', responsibilities: 'Optimized stock placement. Reduced inventory loss by 15%.' }
      ],
      extraCurricular: [
        { type: 'Academic', organization: 'Physics Society', role: 'Member' }
      ],
      skills: ['Data Analysis', 'Problem Solving', 'Strategic Planning'],
      certifications: [],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'German', proficiency: 'Conversational' }
      ]
    },
    portal: {
      degree: 'M.Sc',
      field: 'Physics',
      graduationYear: '2019',
      cgpa: '3.8'
    }
  },
  {
    id: 's5',
    targetRole: 'sde',
    templateStyle: 'traditional',
    resume: {
      name: 'Kevin Hart',
      email: 'kevin.h@example.com',
      phone: '+1 555-4567',
      address: 'Austin, TX',
      linkedIn: 'linkedin.com/in/kevin-hart-cloud',
      portfolio: 'kevin-hart.dev',
      careerObjective: 'SDE with focus on backend systems. Always looking to learn and grow in a fast-paced environment.',
      education: [
        { institution: 'UT Austin', degree: 'B.S.', field: 'Computer Science', graduationYear: '2022', result: '3.9', resultType: 'GPA' }
      ],
      experience: [
        { company: 'CloudWorks', position: 'Software Developer', location: 'Austin, TX', startDate: 'May 2022', endDate: 'Present', responsibilities: 'Maintained cloud infrastructure. Optimized database queries.' }
      ],
      projects: [
        { name: 'Kubernetes Dashboard', description: 'Monitoring tool for cluster health.', technologies: ['Go', 'React', 'Docker'] }
      ],
      skills: ['Go', 'Docker', 'Kubernetes', 'PostgreSQL'],
      certifications: [],
      languages: [
        { language: 'English', proficiency: 'Native' }
      ]
    },
    portal: {
      degree: 'B.S.',
      field: 'Computer Science',
      graduationYear: '2022',
      cgpa: '3.9'
    }
  },

  // ==========================================
  // PHASE 2: AUDIT GAMES (11 total)
  // ==========================================
  
  // Game 2: Degree Detective (3 scenarios: s6-s8)
  {
    id: 's6',
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
    portal: { degree: 'B.S. CS', field: 'Computer Science', graduationYear: '2023', cgpa: '3.8' }
  },
  {
    id: 's7',
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
    portal: { degree: 'B.A.Sc.', field: 'Electrical Engineering', graduationYear: '2022', cgpa: '3.6' }
  },
  {
    id: 's8',
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
    portal: { degree: 'B.S. CS', field: 'Computer Science', graduationYear: '2021', cgpa: '3.1' }
  },

  // Game 3: Graduation Gate (3 scenarios: s9-s11)
  {
    id: 's9',
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
    portal: { degree: 'B.S. CE', field: 'Computer Engineering', graduationYear: '2024', cgpa: '3.5' }
  },
  {
    id: 's10',
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
    portal: { degree: 'B.A.', field: 'Economics', graduationYear: '2022', cgpa: '3.2' }
  },
  {
    id: 's11',
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
    portal: { degree: 'B.S. CS', field: 'Computer Science', graduationYear: '2025', cgpa: '3.9' }
  },

  // Game 4: University Validator (3 scenarios: s12-s14)
  {
    id: 's12',
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
    portal: { degree: 'B.S. CS', field: 'Computer Science', graduationYear: '2022', cgpa: '3.9' }
  },
  {
    id: 's13',
    targetRole: 'warehouse-manager',
    templateStyle: 'traditional',
    resume: {
      name: 'James Thompson',
      email: 'j.thompson@example.ca',
      phone: '+1 604-555-0122',
      address: 'Vancouver, BC',
      linkedIn: 'linkedin.com/in/james-t-vancouver',
      careerObjective: 'Warehouse expert with a passion for efficiency. Looking to lead operations in a high-growth environment.',
      education: [
        { institution: 'University of British Columbia', degree: 'B.A.', field: 'History', graduationYear: '2021', result: '3.0', resultType: 'GPA' }
      ],
      experience: [],
      skills: ['Logistics', 'Inventory Management', 'Team Leadership'],
      certifications: [],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'French', proficiency: 'Elementary' }
      ]
    },
    portal: { degree: 'B.A.', field: 'History', graduationYear: '2021', cgpa: '3.0' }
  },
  {
    id: 's14',
    targetRole: 'sde',
    templateStyle: 'creative',
    resume: {
      name: 'Isabella Ross',
      email: 'isabella.r@example.com',
      phone: '+1 604-555-0155',
      address: 'Vancouver, BC',
      linkedIn: 'linkedin.com/in/isabellaross-dev',
      careerObjective: 'Aspiring dev.',
      education: [
        { institution: 'University of British Columbia', degree: 'B.A.Sc.', field: 'Computer Engineering', graduationYear: '2023', result: '3.4', resultType: 'GPA' }
      ],
      experience: [],
      skills: ['Java'],
      certifications: [],
      languages: [
        { language: 'English', proficiency: 'Native' }
      ]
    },
    portal: { degree: 'B.A.Sc. CE', field: 'Computer Engineering', graduationYear: '2023', cgpa: '3.4' }
  },

  // Game 5: Education Audit (2 scenarios: s15-s16)
  {
    id: 's15',
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
    portal: { degree: 'B.S. CS', field: 'Computer Science', graduationYear: '2022', cgpa: '3.7' }
  },
  {
    id: 's16',
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
    portal: { degree: 'B.S. Physics', field: 'Physics', graduationYear: '2023', cgpa: '3.1' }
  },

  // ==========================================
  // PHASE 3: FINAL AUDIT (9 total: s17-s25)
  // ==========================================
  {
    id: 's17',
    targetRole: 'sde',
    templateStyle: 'modern',
    resume: {
      name: 'Marcus Thorne',
      email: 'marcus.t@example.com',
      phone: '+1 617-555-0133',
      address: 'Boston, MA',
      linkedIn: 'linkedin.com/in/marcusthorne-dev',
      careerObjective: 'Strategic dev.',
      education: [
        { institution: 'MIT', degree: 'B.S.', field: 'Computer Science', graduationYear: '2022', result: '3.8', resultType: 'GPA' }
      ],
      experience: [],
      skills: ['Python'],
      certifications: [],
      languages: [
        { language: 'English', proficiency: 'Native' }
      ]
    },
    portal: { degree: 'B.S. CS', field: 'Computer Science', graduationYear: '2022', cgpa: '3.8' }
  },
  {
    id: 's18',
    targetRole: 'warehouse-manager',
    templateStyle: 'traditional',
    resume: {
      name: 'Robert Harrison',
      email: 'robert.h@example.com',
      phone: '+1 303-555-0144',
      address: 'Denver, CO',
      linkedIn: 'linkedin.com/in/robertharrison-ops',
      careerObjective: 'Operations management.',
      education: [
        { institution: 'CU Boulder', degree: 'B.A.', field: 'Political Science', graduationYear: '2020', result: '3.2', resultType: 'GPA' }
      ],
      experience: [],
      skills: ['Leadership'],
      certifications: [],
      languages: [
        { language: 'English', proficiency: 'Native' }
      ]
    },
    portal: { degree: 'B.A.', field: 'Political Science', graduationYear: '2020', cgpa: '3.2' }
  },
  {
    id: 's19',
    targetRole: 'sde',
    templateStyle: 'creative',
    resume: {
      name: 'William Vance',
      email: 'william.v@example.com',
      phone: '+1 404-555-0155',
      address: 'Atlanta, GA',
      linkedIn: 'linkedin.com/in/williamvance-dev',
      careerObjective: 'Visionary dev.',
      education: [
        { institution: 'Georgia Tech', degree: 'M.S.', field: 'Public Policy', graduationYear: '2018', result: '3.5', resultType: 'GPA' }
      ],
      experience: [],
      skills: ['Communication'],
      certifications: [],
      languages: [
        { language: 'English', proficiency: 'Native' }
      ]
    },
    portal: { degree: 'M.S.', field: 'Public Policy', graduationYear: '2018', cgpa: '3.5' }
  },
  {
    id: 's20',
    targetRole: 'sde',
    templateStyle: 'modern',
    resume: {
      name: 'Stephen Brooks',
      email: 'stephen.b@example.com',
      phone: '+1 503-555-0166',
      address: 'Portland, OR',
      linkedIn: 'linkedin.com/in/stephenbrooks-eng',
      careerObjective: 'Mechanical engineer.',
      education: [
        { institution: 'Oregon State University', degree: 'B.S.', field: 'Mechanical Engineering', graduationYear: '2021', result: '3.4', resultType: 'GPA' }
      ],
      experience: [],
      skills: ['Analysis'],
      certifications: [],
      languages: [
        { language: 'English', proficiency: 'Native' }
      ]
    },
    portal: { degree: 'B.S. Mechanical', field: 'Mechanical', graduationYear: '2021', cgpa: '3.4' }
  },
  {
    id: 's21',
    targetRole: 'warehouse-manager',
    templateStyle: 'traditional',
    resume: {
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      phone: '+1 215-555-0177',
      address: 'Philadelphia, PA',
      linkedIn: 'linkedin.com/in/sarahjenkins-ops',
      careerObjective: 'Regional operations.',
      education: [
        { institution: 'UPenn', degree: 'M.A.', field: 'History', graduationYear: '2019', result: '3.6', resultType: 'GPA' }
      ],
      experience: [],
      skills: [ 'Management' ],
      certifications: [],
      languages: [
        { language: 'English', proficiency: 'Native' }
      ]
    },
    portal: { degree: 'M.A.', field: 'History', graduationYear: '2019', cgpa: '3.6' }
  },
  {
    id: 's22',
    targetRole: 'sde',
    templateStyle: 'creative',
    resume: {
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      phone: '+1 408-555-0188',
      address: 'San Jose, CA',
      linkedIn: 'linkedin.com/in/michaelchen-eng',
      careerObjective: 'Tech lead.',
      education: [
        { institution: 'San Jose State', degree: 'B.S.', field: 'Materials Engineering', graduationYear: '2021', result: '3.8', resultType: 'GPA' }
      ],
      experience: [
        { company: 'Tech Corp', position: 'Engineer', location: 'San Jose, CA', startDate: '2021', endDate: 'Present', responsibilities: 'Materials research.' }
      ],
      skills: ['Strategy', 'Tech'],
      certifications: [
        { name: 'M.S. Materials', provider: 'Stanford University', issueDate: '2023' }
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Mandarin', proficiency: 'Fluent' }
      ]
    },
    portal: { degree: 'B.S. Materials', field: 'Materials', graduationYear: '2021', cgpa: '3.8' }
  },
  {
    id: 's23',
    targetRole: 'warehouse-manager',
    templateStyle: 'modern',
    resume: {
      name: 'Daniel Park',
      email: 'daniel.p@example.com',
      phone: '+1 425-555-0199',
      address: 'Bellevue, WA',
      linkedIn: 'linkedin.com/in/danielpark-ops',
      careerObjective: 'Operations lead.',
      education: [
        { institution: 'Bellevue College', degree: 'B.S.', field: 'Electrical Engineering', graduationYear: '2019', result: '3.5', resultType: 'GPA' }
      ],
      experience: [
        { company: 'Northwest Tech', position: 'Operations Manager', location: 'Bellevue, WA', startDate: '2019', endDate: 'Present', responsibilities: 'Supply chain management.' }
      ],
      skills: ['Cloud', 'AI'],
      certifications: [
        { name: 'Project Management Professional', provider: 'PMI', issueDate: '2021' }
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Korean', proficiency: 'Native' }
      ]
    },
    portal: { degree: 'B.S. Electrical', field: 'Electrical', graduationYear: '2019', cgpa: '3.5' }
  },
  {
    id: 's24',
    targetRole: 'sde',
    templateStyle: 'traditional',
    resume: {
      name: 'Thomas Sterling',
      email: 'thomas.s@example.com',
      phone: '+1 650-555-0144',
      address: 'Palo Alto, CA',
      linkedIn: 'linkedin.com/in/thomassterling-dev',
      careerObjective: 'Physics graduate.',
      education: [
        { institution: 'Stanford University', degree: 'B.S.', field: 'Physics', graduationYear: '2020', result: '3.9', resultType: 'GPA' }
      ],
      experience: [
        { company: 'Space Labs', position: 'Researcher', location: 'Palo Alto, CA', startDate: '2020', endDate: 'Present', responsibilities: 'Data analysis.' }
      ],
      skills: ['Physics', 'Eng'],
      certifications: [],
      languages: [
        { language: 'English', proficiency: 'Native' }
      ]
    },
    portal: { degree: 'B.S. Physics', field: 'Physics', graduationYear: '2020', cgpa: '3.9' }
  },
  {
    id: 's25',
    targetRole: 'warehouse-manager',
    templateStyle: 'creative',
    resume: {
      name: 'James Blackwell',
      email: 'james.b@example.com',
      phone: '+1 305-555-0155',
      address: 'Miami, FL',
      linkedIn: 'linkedin.com/in/jamesblackwell-ops',
      careerObjective: 'Operations management.',
      education: [
        { institution: 'University of Miami', degree: 'B.S.', field: 'Electrical Engineering', graduationYear: '2021', result: '3.8', resultType: 'GPA' }
      ],
      experience: [
        { company: 'Global Logistics', position: 'Manager', location: 'Miami, FL', startDate: '2021', endDate: 'Present', responsibilities: 'Operations.' }
      ],
      skills: ['Ops', 'Logistics'],
      certifications: [],
      languages: [
        { language: 'English', proficiency: 'Native' }
      ]
    },
    portal: { degree: 'B.S. EE', field: 'Electrical Engineering', graduationYear: '2021', cgpa: '3.8' }
  },
];

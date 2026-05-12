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
      careerObjective: 'Aspiring software engineer with strong foundations in Java and Python. Eager to contribute to scalable web applications.',
      education: [
        { institution: 'VIT Vellore', degree: 'B.Tech', field: 'Computer Science', graduationYear: '2022', result: '8.8', resultType: 'CGPA' }
      ],
      experience: [
        { company: 'TechSolutions Corp', position: 'SDE Intern', startDate: 'Jan 2022', endDate: 'June 2022', responsibilities: 'Developed REST APIs using Spring Boot. Collaborated with frontend teams.' }
      ],
      skills: ['Java', 'Spring Boot', 'Python', 'React', 'SQL'],
      certifications: ['AWS Certified Cloud Practitioner'],
      languages: ['English', 'Hindi', 'Kannada']
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
      name: 'Arjun Varma',
      email: 'arjun.v@example.com',
      phone: '+91 87654 32109',
      address: 'Hyderabad, Telangana',
      careerObjective: 'Experienced logistics professional looking for a management role in warehouse operations.',
      education: [
        { institution: 'Osmania University', degree: 'B.Com', field: 'Commerce', graduationYear: '2021', result: '7.5', resultType: 'CGPA' }
      ],
      experience: [
        { company: 'Global Logistics Ltd', position: 'Floor Supervisor', startDate: 'Aug 2021', endDate: 'Present', responsibilities: 'Managed inventory tracking. Supervised a team of 15 staff members.' }
      ],
      skills: ['Inventory Management', 'Supply Chain', 'Team Leadership', 'ERP'],
      certifications: ['Six Sigma Yellow Belt'],
      languages: ['English', 'Hindi', 'Telugu']
    },
    portal: {
      degree: 'B.Com',
      field: 'Commerce',
      graduationYear: '2021',
      cgpa: '7.5'
    }
  },
  {
    id: 's3',
    targetRole: 'sde',
    templateStyle: 'creative',
    resume: {
      name: 'Sneha Rao',
      email: 'sneha.rao@example.com',
      phone: '+91 76543 21098',
      address: 'Pune, Maharashtra',
      careerObjective: 'Creative thinker transitioning into tech. Passionate about software development and UI design.',
      education: [
        { institution: 'Pune University', degree: 'B.A.', field: 'History', graduationYear: '2020', result: '7.2', resultType: 'CGPA' }
      ],
      experience: [
        { company: 'Creative Agency', position: 'Content Writer', startDate: 'Nov 2020', endDate: 'Dec 2021', responsibilities: 'Wrote technical blogs. Managed social media accounts.' }
      ],
      skills: ['HTML', 'CSS', 'JavaScript', 'Copywriting'],
      certifications: ['Full Stack Development Bootcamp'],
      languages: ['English', 'Hindi', 'Marathi']
    },
    portal: {
      degree: 'B.A.',
      field: 'History',
      graduationYear: '2020',
      cgpa: '7.2'
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
      careerObjective: 'Motivated individual with a strong academic background in sciences, seeking a role in operations management.',
      education: [
        { institution: 'University of Illinois', degree: 'M.Sc', field: 'Physics', graduationYear: '2019', result: '3.8', resultType: 'GPA' }
      ],
      experience: [
        { company: 'Retail Hub', position: 'Stock Lead', startDate: 'Jan 2020', endDate: 'Present', responsibilities: 'Optimized stock placement. Reduced inventory loss by 15%.' }
      ],
      skills: ['Data Analysis', 'Problem Solving', 'Strategic Planning'],
      certifications: [],
      languages: ['English', 'German']
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
      careerObjective: 'SDE with focus on backend systems. Always looking to learn and grow in a fast-paced environment.',
      education: [
        { institution: 'UT Austin', degree: 'B.S.', field: 'Computer Science', graduationYear: null, result: '3.9', resultType: 'GPA' }
      ],
      experience: [
        { company: 'CloudWorks', position: 'Software Developer', startDate: 'May 2022', endDate: 'Present', responsibilities: 'Maintained cloud infrastructure. Optimized database queries.' }
      ],
      skills: ['Go', 'Docker', 'Kubernetes', 'PostgreSQL'],
      certifications: [],
      languages: ['English']
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
    portal: { degree: 'B.Tech IT', field: 'Information Technology', graduationYear: '2023', cgpa: '9.2' }
  },
  {
    id: 's7',
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
    portal: { degree: 'B.Tech ECE', field: 'Electronics', graduationYear: '2022', cgpa: '8.5' }
  },
  {
    id: 's8',
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
    portal: { degree: 'B.Sc CS', field: 'Computer Science', graduationYear: '2021', cgpa: '7.8' }
  },

  // Game 3: Graduation Gate (3 scenarios: s9-s11)
  {
    id: 's9',
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
    portal: { degree: 'B.E. CE', field: 'Computer Engineering', graduationYear: '2024', cgpa: '8.0' }
  },
  {
    id: 's10',
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
    portal: { degree: 'B.A.', field: 'Economics', graduationYear: '2022', cgpa: '6.5' }
  },
  {
    id: 's11',
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
    portal: { degree: 'B.Tech CS', field: 'CS', graduationYear: '2025', cgpa: '9.5' }
  },

  // Game 4: University Validator (3 scenarios: s12-s14)
  {
    id: 's12',
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
    portal: { degree: 'B.Tech CS', field: 'CS', graduationYear: '2022', cgpa: '9.8' }
  },
  {
    id: 's13',
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
    portal: { degree: 'B.A.', field: 'History', graduationYear: '2021', cgpa: '6.0' }
  },
  {
    id: 's14',
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
    portal: { degree: 'B.E. CS', field: 'CS', graduationYear: '2023', cgpa: '8.4' }
  },

  // Game 5: Education Audit (2 scenarios: s15-s16)
  {
    id: 's15',
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
    portal: { degree: 'B.E. CS', field: 'CS', graduationYear: '2022', cgpa: '8.9' }
  },
  {
    id: 's16',
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
    portal: { degree: 'B.Sc Physics', field: 'Physics', graduationYear: '2023', cgpa: '7.5' }
  },

  // ==========================================
  // PHASE 3: FINAL AUDIT (9 total: s17-s25)
  // ==========================================
  {
    id: 's17',
    targetRole: 'sde',
    templateStyle: 'modern',
    resume: {
      name: 'Amit Shah',
      email: 'amit.s@example.com',
      phone: '+91 70000 33333',
      address: 'Ahmedabad',
      careerObjective: 'Strategic dev.',
      education: [
        { institution: 'Gujarat University', degree: 'B.Tech', field: 'CS', graduationYear: '2022', result: '8.2', resultType: 'CGPA' }
      ],
      experience: [],
      skills: ['Python'],
      certifications: [],
      languages: ['English', 'Gujarati']
    },
    portal: { degree: 'B.Tech CS', field: 'CS', graduationYear: '2022', cgpa: '8.2' }
  },
  {
    id: 's18',
    targetRole: 'warehouse-manager',
    templateStyle: 'traditional',
    resume: {
      name: 'Narendra Modi',
      email: 'n.modi@example.com',
      phone: '+91 60000 44444',
      address: 'Varanasi',
      careerObjective: 'National operations.',
      education: [
        { institution: 'Delhi University', degree: 'B.A.', field: 'Political Science', graduationYear: '1978', result: 'Pass', resultType: 'Grade' }
      ],
      experience: [],
      skills: ['Leadership'],
      certifications: [],
      languages: ['English', 'Hindi', 'Gujarati']
    },
    portal: { degree: 'B.A.', field: 'Political Science', graduationYear: '1978', cgpa: 'Pass' }
  },
  {
    id: 's19',
    targetRole: 'sde',
    templateStyle: 'creative',
    resume: {
      name: 'Rahul Gandhi',
      email: 'rahul.g@example.com',
      phone: '+91 50000 55555',
      address: 'Wayanad',
      careerObjective: 'Visionary dev.',
      education: [
        { institution: 'Cambridge', degree: 'M.Phil', field: 'Development Studies', graduationYear: '1995', result: null, resultType: null }
      ],
      experience: [],
      skills: ['Communication'],
      certifications: [],
      languages: ['English', 'Hindi']
    },
    portal: { degree: 'M.Phil', field: 'Development Studies', graduationYear: '1995', cgpa: null }
  },
  {
    id: 's20',
    targetRole: 'sde',
    templateStyle: 'modern',
    resume: {
      name: 'Arvind Kejriwal',
      email: 'arvind.k@example.com',
      phone: '+91 40000 66666',
      address: 'Delhi',
      careerObjective: 'Anti-bug dev.',
      education: [
        { institution: 'IIT Kharagpur', degree: 'B.Tech', field: 'Mechanical Engineering', graduationYear: '1989', result: '8.5', resultType: 'CGPA' }
      ],
      experience: [],
      skills: ['Analysis'],
      certifications: [],
      languages: ['English', 'Hindi']
    },
    portal: { degree: 'B.Tech Mechanical', field: 'Mechanical', graduationYear: '1989', cgpa: '8.5' }
  },
  {
    id: 's21',
    targetRole: 'warehouse-manager',
    templateStyle: 'traditional',
    resume: {
      name: 'Mamata Banerjee',
      email: 'mamata.b@example.com',
      phone: '+91 30000 77777',
      address: 'Kolkata',
      careerObjective: 'Regional operations.',
      education: [
        { institution: 'Calcutta University', degree: 'M.A.', field: 'Islamic History', graduationYear: '1977', result: null, resultType: null }
      ],
      experience: [],
      skills: ['Management'],
      certifications: [],
      languages: ['English', 'Bengali']
    },
    portal: { degree: 'M.A.', field: 'Islamic History', graduationYear: '1977', cgpa: null }
  },
  {
    id: 's22',
    targetRole: 'sde',
    templateStyle: 'creative',
    resume: {
      name: 'Sundar Pichai',
      email: 'sundar.p@example.com',
      phone: '+1 400-500-6000',
      address: 'Mountain View, CA',
      careerObjective: 'Global tech lead.',
      education: [
        { institution: 'IIT Kharagpur', degree: 'B.Tech', field: 'Metallurgical Engineering', graduationYear: '1993', result: '9.5', resultType: 'CGPA' }
      ],
      experience: [
        { company: 'Google', position: 'CEO', startDate: '2015', endDate: 'Present', responsibilities: 'Leading Alphabet and Google.' }
      ],
      skills: ['Strategy', 'Tech'],
      certifications: ['Stanford M.S.', 'Wharton MBA'],
      languages: ['English', 'Tamil']
    },
    portal: { degree: 'B.Tech Metallurgy', field: 'Metallurgy', graduationYear: '1993', cgpa: '9.5' }
  },
  {
    id: 's23',
    targetRole: 'warehouse-manager',
    templateStyle: 'modern',
    resume: {
      name: 'Satya Nadella',
      email: 'satya.n@example.com',
      phone: '+1 300-400-5000',
      address: 'Redmond, WA',
      careerObjective: 'Cloud visionary.',
      education: [
        { institution: 'Manipal Institute of Technology', degree: 'B.E.', field: 'Electrical Engineering', graduationYear: '1988', result: '8.8', resultType: 'CGPA' }
      ],
      experience: [
        { company: 'Microsoft', position: 'CEO', startDate: '2014', endDate: 'Present', responsibilities: 'Cloud and AI lead.' }
      ],
      skills: ['Cloud', 'AI'],
      certifications: ['UWM M.S.', 'Chicago Booth MBA'],
      languages: ['English', 'Telugu']
    },
    portal: { degree: 'B.E. Electrical', field: 'Electrical', graduationYear: '1988', cgpa: '8.8' }
  },
  {
    id: 's24',
    targetRole: 'sde',
    templateStyle: 'traditional',
    resume: {
      name: 'Elon Musk',
      email: 'elon.m@example.com',
      phone: '+1 200-300-4000',
      address: 'Austin, TX',
      careerObjective: 'Multi-planetary dev.',
      education: [
        { institution: 'University of Pennsylvania', degree: 'B.A.', field: 'Physics', graduationYear: '1997', result: '4.0', resultType: 'GPA' },
        { institution: 'University of Pennsylvania', degree: 'B.S.', field: 'Economics', graduationYear: '1997', result: '4.0', resultType: 'GPA' }
      ],
      experience: [
        { company: 'SpaceX', position: 'CEO', startDate: '2002', endDate: 'Present', responsibilities: 'Rocket science.' }
      ],
      skills: ['Physics', 'Eng'],
      certifications: [],
      languages: ['English']
    },
    portal: { degree: 'B.A. Physics', field: 'Physics', graduationYear: '1997', cgpa: '4.0' }
  },
  {
    id: 's25',
    targetRole: 'warehouse-manager',
    templateStyle: 'creative',
    resume: {
      name: 'Jeff Bezos',
      email: 'jeff.b@example.com',
      phone: '+1 100-200-3000',
      address: 'Seattle, WA',
      careerObjective: 'Customer obsession.',
      education: [
        { institution: 'Princeton University', degree: 'B.S.E.', field: 'Electrical Engineering and Computer Science', graduationYear: '1986', result: '4.2', resultType: 'GPA' }
      ],
      experience: [
        { company: 'Amazon', position: 'Founder', startDate: '1994', endDate: '2021', responsibilities: 'Building the everything store.' }
      ],
      skills: ['Ops', 'Logistics'],
      certifications: [],
      languages: ['English']
    },
    portal: { degree: 'B.S.E. EECS', field: 'EECS', graduationYear: '1986', cgpa: '4.2' }
  }
];

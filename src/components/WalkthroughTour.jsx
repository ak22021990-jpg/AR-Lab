import React, { useState } from 'react';
import { Joyride, STATUS } from 'react-joyride';
import { X } from 'lucide-react';
import ResumeView from './ResumeView';

const dummyResume = {
  name: "Alex Doe",
  email: "alex.doe@example.com",
  phone: "(555) 123-4567",
  address: "Seattle, WA",
  careerObjective: "Dedicated professional looking to apply analytical skills.",
  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationYear: "2023",
      resultType: "CGPA",
      result: "3.8/4.0"
    }
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Data Analyst Intern",
      startDate: "Jun 2022",
      endDate: "Aug 2022",
      responsibilities: "Analyzed data and created reports. Assisted in database management."
    }
  ],
  skills: ["React", "JavaScript", "Data Analysis"]
};

const WalkthroughTour = ({ onComplete }) => {
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: '.walkthrough-header',
      content: 'Welcome to the Resume Screening Walkthrough! Let\'s look at key areas to verify.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '#resume-field-graduationYear',
      content: 'Check the Graduation Year. Ensure it makes sense with their work history and the graduation window rules!',
      placement: 'bottom',
    },
    {
      target: '#resume-field-institution',
      content: 'Verify the Institution. Is it on the approved list? Watch out for diploma mills!',
      placement: 'bottom',
    },
    {
      target: '#resume-field-degree',
      content: 'Ensure the Degree matches the job requirements. Pay attention to misspellings or mismatched majors.',
      placement: 'bottom',
    },
    {
      target: '#resume-field-endDate',
      content: 'Cross-reference employment dates. Do they overlap suspiciously with full-time schooling without explanation?',
      placement: 'top',
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-bg-base/90 backdrop-blur-md">
      <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-white rounded-3xl shadow-2xl relative walkthrough-header">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b-2 border-border p-4 flex justify-between items-center">
          <h2 className="text-xl font-black text-text-primary uppercase tracking-widest">Interactive Walkthrough</h2>
          <button 
            onClick={onComplete}
            className="p-2 bg-bg-muted hover:bg-error/10 hover:text-error rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8">
          <ResumeView resumeData={dummyResume} templateStyle="modern" />
        </div>
      </div>
      <Joyride
        steps={steps}
        run={run}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#FF9900',
            textColor: '#333',
            zIndex: 1000,
          },
          tooltipContainer: {
            fontFamily: '"Nunito", sans-serif',
            textAlign: 'left'
          },
          buttonNext: {
            fontWeight: '900',
            borderRadius: '12px'
          },
          buttonBack: {
            marginRight: 10
          }
        }}
      />
    </div>
  );
};

export default WalkthroughTour;

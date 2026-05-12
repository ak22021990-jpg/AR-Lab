import React from 'react';

/**
 * ResumeView Component
 * Renders a realistic resume document with multiple template styles.
 * 
 * Props:
 * - resumeData: Object containing name, email, education, experience, etc.
 * - templateStyle: 'modern' | 'traditional' | 'creative'
 * - highlightFields: Array of field names to highlight (e.g. ['degree', 'cgpa'])
 */
const ResumeView = ({ resumeData, templateStyle = 'modern', highlightFields = [] }) => {
  if (!resumeData) return (
    <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 text-gray-400 text-center italic">
      No resume data available to display.
    </div>
  );

  const {
    name, email, phone, address, careerObjective,
    education = [], experience = [], skills = [],
    certifications = [], languages = []
  } = resumeData;

  const isHighlighted = (field) => highlightFields.includes(field);

  const renderValue = (value, fieldName) => {
    if (value === null || value === undefined || value === '') {
      return (
        <span className="opacity-40 italic border-l border-dashed border-gray-400 pl-2 inline-block">
          -- Not provided --
        </span>
      );
    }
    
    const highlightClass = isHighlighted(fieldName) 
      ? "bg-amz-orange/20 font-bold px-1 rounded ring-1 ring-amz-orange/30 text-gray-900" 
      : "";
      
    return <span className={highlightClass}>{value}</span>;
  };

  const SectionTitle = ({ title, className = "" }) => {
    const styles = {
      modern: "text-cyber-cyan font-bold uppercase tracking-wider text-xs mb-3 border-b border-cyber-cyan/20 pb-1 flex items-center gap-2",
      traditional: "text-gray-900 font-serif font-bold text-base mb-2 border-b border-gray-900 pb-0.5 text-center uppercase tracking-tight",
      creative: "text-amz-orange font-black text-lg mb-4 flex items-center gap-2 border-l-4 border-amz-orange pl-3"
    };

    return <h3 className={`${styles[templateStyle] || styles.modern} ${className}`}>{title}</h3>;
  };

  // ─── Modern Template ───
  // Left-aligned, sans-serif, cyan accents, skill pills
  const ModernTemplate = () => (
    <div className="space-y-8 font-inter text-[13px]">
      <header className="border-l-8 border-cyber-cyan pl-6 py-2">
        <h1 className="text-4xl font-outfit font-black text-gray-900 tracking-tight leading-none">
          {renderValue(name, 'name')}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="text-cyber-cyan">@</span> {renderValue(email, 'email')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-cyber-cyan">#</span> {renderValue(phone, 'phone')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-cyber-cyan">📍</span> {renderValue(address, 'address')}
          </span>
        </div>
      </header>

      {careerObjective && (
        <section className="animate-fade-in-up">
          <SectionTitle title="Executive Summary" />
          <p className="text-gray-700 leading-relaxed text-sm">
            {renderValue(careerObjective, 'careerObjective')}
          </p>
        </section>
      )}

      <section className="animate-fade-in-up delay-100">
        <SectionTitle title="Educational Background" />
        <div className="space-y-5">
          {education.map((edu, idx) => (
            <div key={idx} className="relative pl-6 border-l-2 border-gray-100 hover:border-cyber-cyan/40 transition-colors">
              <div className="absolute -left-[5px] top-1 w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-900 text-sm">
                  {renderValue(edu.degree, 'degree')} in {renderValue(edu.field, 'field')}
                </h4>
                <span className="text-cyber-cyan font-bold">{renderValue(edu.graduationYear, 'graduationYear')}</span>
              </div>
              <p className="text-gray-600 font-medium">{renderValue(edu.institution, 'institution')}</p>
              <div className="mt-1 flex items-center gap-3">
                <span className="px-2 py-0.5 bg-gray-100 rounded text-[11px] font-bold text-gray-700">
                  {renderValue(edu.resultType, 'resultType')}: {renderValue(edu.result, 'result')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {experience.length > 0 && (
        <section className="animate-fade-in-up delay-200">
          <SectionTitle title="Professional Experience" />
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-cyber-cyan transition-colors">
                    {renderValue(exp.position, 'position')}
                  </h4>
                  <span className="text-gray-400 font-mono text-[11px]">
                    {renderValue(exp.startDate, 'startDate')} — {renderValue(exp.endDate, 'endDate')}
                  </span>
                </div>
                <p className="text-gray-600 font-bold text-xs mb-2">{renderValue(exp.company, 'company')}</p>
                <p className="text-gray-600 leading-relaxed italic">
                  {renderValue(exp.responsibilities, 'responsibilities')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {skills.length > 0 && (
          <section className="animate-fade-in-up delay-300">
            <SectionTitle title="Technical Competencies" />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-cyber-cyan/5 text-cyber-cyan text-[11px] font-black rounded border border-cyber-cyan/20 uppercase tracking-tighter">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-8">
          {certifications.length > 0 && (
            <section className="animate-fade-in-up delay-400">
              <SectionTitle title="Certifications" />
              <ul className="space-y-2">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-cyber-cyan mt-1">▹</span>
                    {renderValue(cert, 'certification')}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section className="animate-fade-in-up delay-500">
              <SectionTitle title="Languages" />
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {languages.map((lang, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 text-gray-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan/40"></span>
                    {lang}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  // ─── Traditional Template ───
  // Centered header, serif headings, horizontal rules, dense layout
  const TraditionalTemplate = () => (
    <div className="space-y-5 font-serif text-[12px] text-gray-800 leading-tight">
      <header className="text-center space-y-1 border-b-2 border-gray-900 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-widest leading-none">
          {renderValue(name, 'name')}
        </h1>
        <div className="flex justify-center flex-wrap gap-x-3 text-gray-700">
          <span>{renderValue(address, 'address')}</span>
          <span className="text-gray-300">|</span>
          <span>{renderValue(phone, 'phone')}</span>
          <span className="text-gray-300">|</span>
          <span className="underline">{renderValue(email, 'email')}</span>
        </div>
      </header>

      {careerObjective && (
        <section>
          <SectionTitle title="Professional Summary" />
          <p className="text-justify indent-8">
            {renderValue(careerObjective, 'careerObjective')}
          </p>
        </section>
      )}

      <section>
        <SectionTitle title="Education" />
        <div className="space-y-3">
          {education.map((edu, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-baseline font-bold text-gray-900">
                <span className="text-[13px]">{renderValue(edu.institution, 'institution')}</span>
                <span>{renderValue(edu.graduationYear, 'graduationYear')}</span>
              </div>
              <div className="flex justify-between items-baseline italic">
                <span>{renderValue(edu.degree, 'degree')} in {renderValue(edu.field, 'field')}</span>
                <span className="not-italic text-[11px] font-bold">
                  {renderValue(edu.resultType, 'resultType')}: {renderValue(edu.result, 'result')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {experience.length > 0 && (
        <section>
          <SectionTitle title="Professional Experience" />
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <span className="text-[13px] uppercase">{renderValue(exp.company, 'company')}</span>
                  <span className="font-normal italic">{renderValue(exp.startDate, 'startDate')} – {renderValue(exp.endDate, 'endDate')}</span>
                </div>
                <div className="italic font-medium text-gray-700 mb-1">{renderValue(exp.position, 'position')}</div>
                <p className="text-gray-700 text-justify leading-snug">
                  {renderValue(exp.responsibilities, 'responsibilities')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionTitle title="Additional Information" />
        <div className="space-y-1.5">
          {skills.length > 0 && (
            <p><span className="font-bold uppercase text-[11px] tracking-tighter mr-2">Skills:</span> {skills.join(', ')}</p>
          )}
          {certifications.length > 0 && (
            <p><span className="font-bold uppercase text-[11px] tracking-tighter mr-2">Certifications:</span> {certifications.join('; ')}</p>
          )}
          {languages.length > 0 && (
            <p><span className="font-bold uppercase text-[11px] tracking-tighter mr-2">Languages:</span> {languages.join(', ')}</p>
          )}
        </div>
      </section>
    </div>
  );

  // ─── Creative Template ───
  // Two-column (sidebar for skills/contact, main for education/experience), orange accent
  const CreativeTemplate = () => (
    <div className="flex flex-col md:flex-row min-h-[500px] font-inter border border-gray-100 rounded-lg overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-[32%] bg-amz-dark text-white p-6 space-y-8 shrink-0">
        <div className="space-y-6">
          <h1 className="text-3xl font-black leading-tight tracking-tighter uppercase italic text-amz-orange">
            {renderValue(name, 'name')}
          </h1>
          <div className="space-y-4 text-xs font-medium">
            <div className="space-y-1 opacity-80">
              <p className="uppercase text-[10px] text-amz-orange font-black">Email</p>
              <p className="break-all">{renderValue(email, 'email')}</p>
            </div>
            <div className="space-y-1 opacity-80">
              <p className="uppercase text-[10px] text-amz-orange font-black">Phone</p>
              <p>{renderValue(phone, 'phone')}</p>
            </div>
            <div className="space-y-1 opacity-80">
              <p className="uppercase text-[10px] text-amz-orange font-black">Location</p>
              <p>{renderValue(address, 'address')}</p>
            </div>
          </div>
        </div>

        {skills.length > 0 && (
          <section className="pt-4 border-t border-white/10">
            <h3 className="text-amz-orange font-black uppercase text-[10px] tracking-[0.2em] mb-4">Core Strengths</h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, idx) => (
                <span key={idx} className="px-2 py-1 bg-white/10 text-white text-[9px] font-black rounded-sm uppercase tracking-tighter hover:bg-amz-orange transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section className="pt-4 border-t border-white/10">
            <h3 className="text-amz-orange font-black uppercase text-[10px] tracking-[0.2em] mb-3">Languages</h3>
            <div className="space-y-2">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px] opacity-90">
                  <span>{lang}</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-1 rounded-full ${i <= 4 ? 'bg-amz-orange' : 'bg-white/20'}`}></div>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-10 bg-white text-[13px]">
        {careerObjective && (
          <section>
            <SectionTitle title="Vision" />
            <p className="text-gray-600 leading-relaxed font-medium italic relative pl-6 before:absolute before:left-0 before:top-0 before:content-['“'] before:text-4xl before:text-amz-orange/20 before:leading-none">
              {renderValue(careerObjective, 'careerObjective')}
            </p>
          </section>
        )}

        <section>
          <SectionTitle title="Education" />
          <div className="space-y-8">
            {education.map((edu, idx) => (
              <div key={idx} className="group relative">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black text-gray-900 text-base leading-tight">
                    {renderValue(edu.degree, 'degree')} <span className="text-amz-orange">/</span> {renderValue(edu.field, 'field')}
                  </h4>
                  <span className="shrink-0 ml-4 px-2.5 py-1 bg-amz-dark text-white text-[10px] font-black rounded uppercase">
                    {renderValue(edu.graduationYear, 'graduationYear')}
                  </span>
                </div>
                <p className="text-gray-500 font-bold uppercase text-[11px] tracking-wider">{renderValue(edu.institution, 'institution')}</p>
                <div className="mt-3 inline-flex items-center gap-4 py-1 px-3 bg-gray-50 rounded-full border border-gray-100">
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Performance</span>
                  <span className="text-gray-900 font-black text-sm">{renderValue(edu.result, 'result')}</span>
                  <span className="text-amz-orange font-black text-[10px] uppercase">{renderValue(edu.resultType, 'resultType')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {experience.length > 0 && (
          <section>
            <SectionTitle title="Experience" />
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative group pl-2">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-black text-gray-900 text-sm group-hover:text-amz-orange transition-colors">
                      {renderValue(exp.position, 'position')}
                    </h4>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {renderValue(exp.startDate, 'startDate')} — {renderValue(exp.endDate, 'endDate')}
                    </span>
                  </div>
                  <p className="text-amz-orange text-[11px] font-black uppercase tracking-widest mb-3">{renderValue(exp.company, 'company')}</p>
                  <p className="text-gray-600 leading-relaxed text-xs">
                    {renderValue(exp.responsibilities, 'responsibilities')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );

  return (
    <div className="bg-white text-gray-900 shadow-2xl rounded-2xl overflow-hidden border border-white/20 relative group/resume">
      {/* Decorative Browser-like header */}
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-1.5 border-b border-gray-200">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
        <div className="ml-4 bg-white px-3 py-0.5 rounded text-[10px] font-bold text-gray-400 flex-1 max-w-xs truncate">
          {name?.replace(/\s+/g, '_').toLowerCase()}_resume_v2.pdf
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        <div className="p-1"> {/* Tiny padding to show shadow inside scroll area if any */}
          <div className="p-8 md:p-12">
            {templateStyle === 'modern' && <ModernTemplate />}
            {templateStyle === 'traditional' && <TraditionalTemplate />}
            {templateStyle === 'creative' && <CreativeTemplate />}
          </div>
        </div>
      </div>

      {/* Template Indicator */}
      <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/10 backdrop-blur-md rounded text-[9px] font-black uppercase tracking-widest text-gray-400 pointer-events-none border border-black/5 opacity-0 group-hover/resume:opacity-100 transition-opacity">
        Style: {templateStyle}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8f9fa;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
          border: 2px solid #f8f9fa;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}} />
    </div>
  );
};

export default ResumeView;

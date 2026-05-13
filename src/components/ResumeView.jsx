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
    <div className="bg-white p-8 rounded-xl border-2 border-dashed border-border text-text-muted text-center italic font-nunito">
      No resume data available to display.
    </div>
  );

  const {
    name, email, phone, address, careerObjective,
    linkedIn, portfolio,
    education = [], experience = [], skills = [],
    certifications = [], languages = [],
    projects = [], volunteerWork = [], extraCurricular = []
  } = resumeData;

  const formatLang = (lang) => typeof lang === 'string' ? lang : `${lang.language} (${lang.proficiency})`;
  const formatCert = (cert) => typeof cert === 'string' ? cert : `${cert.name} — ${cert.provider} (${cert.issueDate})`;

  const isHighlighted = (field) => highlightFields.includes(field);

  const renderValue = (value, fieldName) => {
    if (value === null || value === undefined || value === '') {
      return (
        <span className="opacity-25 italic font-medium text-[11px]">
          Not specified
        </span>
      );
    }
    
    const highlightClass = isHighlighted(fieldName) 
      ? "bg-primary/10 font-black px-1.5 rounded-md ring-2 ring-primary/20 text-primary transition-all duration-300" 
      : "";
      
    return <span id={`resume-field-${fieldName}`} className={highlightClass}>{value}</span>;
  };

  const SectionTitle = ({ title, className = "" }) => {
    const styles = {
      modern: "text-info font-nunito font-black uppercase tracking-widest text-[11px] mb-4 border-b-2 border-info/10 pb-2 flex items-center gap-2",
      traditional: "text-text-primary font-serif font-black text-base mb-3 border-b-2 border-text-primary pb-1 text-center uppercase tracking-tight",
      creative: "text-primary font-nunito font-black text-lg mb-4 flex items-center gap-3 border-l-4 border-primary pl-4"
    };

    return <h3 className={`${styles[templateStyle] || styles.modern} ${className}`}>{title}</h3>;
  };

  // ─── Modern Template ───
  const ModernTemplate = () => (
    <div className="space-y-8 font-nunito text-[13px]">
      <header className="border-l-[10px] border-info pl-8 py-3">
        <h1 className="text-4xl font-nunito font-black text-text-primary tracking-tight leading-none">
          {renderValue(name, 'name')}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-text-secondary font-bold">
          <span className="flex items-center gap-1.5">
            <span className="text-info font-black">@</span> {renderValue(email, 'email')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-info font-black">#</span> {renderValue(phone, 'phone')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-info">📍</span> {renderValue(address, 'address')}
          </span>
          {linkedIn && (
            <span className="flex items-center gap-1.5">
              <span className="text-info font-black italic">in</span> {renderValue(linkedIn, 'linkedIn')}
            </span>
          )}
          {portfolio && (
            <span className="flex items-center gap-1.5">
              <span className="text-info">🔗</span> {renderValue(portfolio, 'portfolio')}
            </span>
          )}
        </div>
      </header>

      {careerObjective && (
        <section>
          <SectionTitle title="Executive Summary" />
          <p className="text-text-secondary leading-relaxed text-sm font-medium">
            {renderValue(careerObjective, 'careerObjective')}
          </p>
        </section>
      )}

      <section>
        <SectionTitle title="Educational Background" />
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div key={idx} className="relative pl-8 border-l-2 border-border hover:border-info/40 transition-colors">
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 bg-info rounded-full shadow-sm"></div>
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-black text-text-primary text-sm">
                  {renderValue(edu.degree, 'degree')} in {renderValue(edu.field, 'field')}
                </h4>
                <span className="text-info font-black">{renderValue(edu.graduationYear, 'graduationYear')}</span>
              </div>
              <p className="text-text-secondary font-bold">{renderValue(edu.institution, 'institution')}</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="px-3 py-1 bg-bg-muted rounded-full text-[11px] font-black text-text-secondary border-2 border-border shadow-sm">
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
          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-black text-text-primary text-sm group-hover:text-info transition-colors">
                    {renderValue(exp.position, 'position')}
                  </h4>
                  <span className="text-text-muted font-black text-[11px] uppercase tracking-widest">
                    {renderValue(exp.startDate, 'startDate')} — {renderValue(exp.endDate, 'endDate')}
                  </span>
                </div>
                <p className="text-text-secondary font-black text-xs mb-2 uppercase tracking-wide">{renderValue(exp.company, 'company')}</p>
                {exp.location && <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-1">📍 {exp.location}</p>}
                <p className="text-text-secondary leading-relaxed font-medium italic bg-bg-muted/30 p-3 rounded-xl border border-border">
                  {renderValue(exp.responsibilities, 'responsibilities')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <SectionTitle title="Key Projects" />
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-bg-muted/50 p-4 rounded-2xl border-2 border-border">
                <h4 className="font-black text-text-primary text-sm mb-1">{renderValue(proj.name, 'projectName')}</h4>
                <p className="text-text-secondary text-xs mb-3 italic font-medium">{renderValue(proj.description, 'projectDesc')}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.technologies?.map((tech, tidx) => (
                    <span key={tidx} className="text-[10px] font-black bg-white px-2.5 py-1 rounded-full border-2 border-border text-text-muted uppercase tracking-tighter">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
        {skills.length > 0 && (
          <section>
            <SectionTitle title="Technical Competencies" />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-info/5 text-info text-[11px] font-black rounded-xl border-2 border-info/10 uppercase tracking-tighter">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-8">
          {certifications.length > 0 && (
            <section>
              <SectionTitle title="Certifications" />
              <ul className="space-y-3">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-text-secondary text-xs font-bold">
                    <span className="text-info font-black mt-0.5">▹</span>
                    {formatCert(cert)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <SectionTitle title="Languages" />
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {languages.map((lang, idx) => (
                  <span key={idx} className="flex items-center gap-2 text-text-secondary font-black text-xs uppercase tracking-tight">
                    <span className="w-2 h-2 rounded-full bg-info/40"></span>
                    {formatLang(lang)}
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
  const TraditionalTemplate = () => (
    <div className="space-y-6 font-serif text-[12px] text-text-secondary leading-tight">
      <header className="text-center space-y-2 border-b-4 border-text-primary pb-6">
        <h1 className="text-3xl font-black text-text-primary uppercase tracking-widest leading-none">
          {renderValue(name, 'name')}
        </h1>
        <div className="flex justify-center flex-wrap gap-x-4 text-text-secondary font-bold uppercase tracking-tighter">
          <span>{renderValue(address, 'address')}</span>
          <span className="text-border">|</span>
          <span>{renderValue(phone, 'phone')}</span>
          <span className="text-border">|</span>
          <span className="underline decoration-2">{renderValue(email, 'email')}</span>
          {linkedIn && <><span className="text-border">|</span> <span>LinkedIn: {linkedIn}</span></>}
        </div>
      </header>

      {careerObjective && (
        <section>
          <SectionTitle title="Professional Summary" />
          <p className="text-justify indent-8 leading-relaxed font-medium">
            {renderValue(careerObjective, 'careerObjective')}
          </p>
        </section>
      )}

      <section>
        <SectionTitle title="Education" />
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-baseline font-black text-text-primary">
                <span className="text-[14px] uppercase">{renderValue(edu.institution, 'institution')}</span>
                <span className="font-bold">{renderValue(edu.graduationYear, 'graduationYear')}</span>
              </div>
              <div className="flex justify-between items-baseline italic font-bold">
                <span className="text-text-secondary">{renderValue(edu.degree, 'degree')} in {renderValue(edu.field, 'field')}</span>
                <span className="not-italic text-[11px] font-black bg-bg-muted px-2 py-0.5 rounded uppercase">
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
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline font-black text-text-primary mb-1">
                  <span className="text-[14px] uppercase tracking-wide">{renderValue(exp.company, 'company')}</span>
                  <span className="font-bold italic text-text-muted">{renderValue(exp.startDate, 'startDate')} – {renderValue(exp.endDate, 'endDate')}</span>
                </div>
                <div className="flex justify-between items-baseline italic font-black text-text-secondary mb-1.5">
                  <span className="text-sm">{renderValue(exp.position, 'position')}</span>
                  {exp.location && <span className="font-black not-italic uppercase text-[10px] tracking-widest text-text-muted">{exp.location}</span>}
                </div>
                <p className="text-text-secondary text-justify leading-relaxed font-medium border-l-2 border-border pl-4">
                  {renderValue(exp.responsibilities, 'responsibilities')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionTitle title="Additional Information" />
        <div className="space-y-2.5 font-bold">
          {skills.length > 0 && (
            <p><span className="font-black uppercase text-[11px] tracking-tighter mr-3 text-text-primary">Skills:</span> {skills.join(', ')}</p>
          )}
          {certifications.length > 0 && (
            <p><span className="font-black uppercase text-[11px] tracking-tighter mr-3 text-text-primary">Certifications:</span> {certifications.map(c => formatCert(c)).join('; ')}</p>
          )}
          {languages.length > 0 && (
            <p><span className="font-black uppercase text-[11px] tracking-tighter mr-3 text-text-primary">Languages:</span> {languages.map(l => formatLang(l)).join(', ')}</p>
          )}
        </div>
      </section>
    </div>
  );

  // ─── Creative Template ───
  const CreativeTemplate = () => (
    <div className="flex flex-col md:flex-row min-h-[500px] font-nunito border-4 border-border rounded-3xl overflow-hidden shadow-2xl">
      {/* Sidebar */}
      <aside className="w-full md:w-[35%] bg-text-primary text-white p-8 space-y-10 shrink-0">
        <div className="space-y-8">
          <h1 className="text-4xl font-black leading-tight tracking-tighter uppercase italic text-primary">
            {renderValue(name, 'name')}
          </h1>
          <div className="space-y-6 text-xs font-black uppercase tracking-widest">
            <div className="space-y-1.5 opacity-90">
              <p className="text-[10px] text-primary">Email</p>
              <p className="break-all">{renderValue(email, 'email')}</p>
            </div>
            <div className="space-y-1.5 opacity-90">
              <p className="text-[10px] text-primary">Phone</p>
              <p>{renderValue(phone, 'phone')}</p>
            </div>
            <div className="space-y-1.5 opacity-90">
              <p className="text-[10px] text-primary">Location</p>
              <p>{renderValue(address, 'address')}</p>
            </div>
            {linkedIn && (
              <div className="space-y-1.5 opacity-90">
                <p className="text-[10px] text-primary">LinkedIn</p>
                <p className="break-all">{linkedIn}</p>
              </div>
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <section className="pt-8 border-t-2 border-white/10">
            <h3 className="text-primary font-black uppercase text-[11px] tracking-[0.25em] mb-6">Core Strengths</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-white/10 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter hover:bg-primary transition-colors cursor-default border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section className="pt-8 border-t-2 border-white/10">
            <h3 className="text-primary font-black uppercase text-[11px] tracking-[0.25em] mb-5">Languages</h3>
            <div className="space-y-4">
              {languages.map((lang, idx) => {
                const proficiency = typeof lang === 'string' ? 'Native' : (lang.proficiency || 'Native');
                const proficiencyMap = {
                  'Native': 5,
                  'Bilingual': 5,
                  'Fluent': 4,
                  'Professional': 4,
                  'Intermediate': 3,
                  'Conversational': 3,
                  'Basic': 2,
                  'Elementary': 2,
                  'Beginner': 1
                };
                const level = proficiencyMap[proficiency] || 4;

                return (
                  <div key={idx} className="space-y-2 text-[11px] font-black uppercase tracking-tight">
                    <div className="flex justify-between items-center opacity-90">
                      <span>{typeof lang === 'string' ? lang : lang.language}</span>
                      <span className="text-[9px] text-primary">{typeof lang === 'string' ? '' : lang.proficiency}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {[1,2,3,4,5].map(i => (
                        <div 
                          key={i} 
                          className={`h-1.5 flex-1 rounded-full ${i <= level ? 'bg-primary' : 'bg-white/20'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-12 bg-white text-[13px]">
        {careerObjective && (
          <section>
            <SectionTitle title="Mission Statement" />
            <p className="text-text-secondary leading-relaxed font-black italic relative pl-8 before:absolute before:left-0 before:top-0 before:content-['“'] before:text-5xl before:text-primary/20 before:leading-none">
              {renderValue(careerObjective, 'careerObjective')}
            </p>
          </section>
        )}

        <section>
          <SectionTitle title="Education" />
          <div className="space-y-10">
            {education.map((edu, idx) => (
              <div key={idx} className="group relative">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-black text-text-primary text-xl tracking-tight leading-tight uppercase">
                    {renderValue(edu.degree, 'degree')} <span className="text-primary mx-1">/</span> {renderValue(edu.field, 'field')}
                  </h4>
                  <span className="shrink-0 ml-4 px-3 py-1 bg-text-primary text-white text-[11px] font-black rounded-xl uppercase tracking-widest shadow-lg">
                    {renderValue(edu.graduationYear, 'graduationYear')}
                  </span>
                </div>
                <p className="text-text-muted font-black uppercase text-xs tracking-[0.15em] mb-4">{renderValue(edu.institution, 'institution')}</p>
                <div className="inline-flex items-center gap-5 py-2 px-5 bg-bg-muted rounded-2xl border-2 border-border shadow-sm">
                  <span className="text-text-muted text-[10px] font-black uppercase tracking-widest">CREDENTIALS</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-primary font-black text-base">{renderValue(edu.result, 'result')}</span>
                    <span className="text-primary font-black text-[11px] uppercase">{renderValue(edu.resultType, 'resultType')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {experience.length > 0 && (
          <section>
            <SectionTitle title="Experience" />
            <div className="space-y-10">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative group">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-black text-text-primary text-base uppercase tracking-tight group-hover:text-primary transition-colors">
                      {renderValue(exp.position, 'position')}
                    </h4>
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">
                      {renderValue(exp.startDate, 'startDate')} — {renderValue(exp.endDate, 'endDate')}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-4">
                    <p className="text-primary text-[12px] font-black uppercase tracking-widest">{renderValue(exp.company, 'company')}</p>
                    {exp.location && <span className="text-[10px] font-black text-text-muted uppercase italic">@{exp.location}</span>}
                  </div>
                  <p className="text-text-secondary leading-relaxed font-bold border-l-4 border-bg-muted pl-6 italic">
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
    <div className="bg-white text-text-primary shadow-2xl rounded-[2.5rem] overflow-hidden border-4 border-border relative group/resume">
      {/* Decorative Browser-like header */}
      <div className="bg-bg-muted px-6 py-4 flex items-center gap-2 border-b-4 border-border">
        <div className="w-3 h-3 rounded-full bg-error/40 border-2 border-error/20"></div>
        <div className="w-3 h-3 rounded-full bg-primary/40 border-2 border-primary/20"></div>
        <div className="w-3 h-3 rounded-full bg-success/40 border-2 border-success/20"></div>
        <div className="ml-6 bg-white px-4 py-1.5 rounded-2xl text-[11px] font-black text-text-muted flex-1 max-w-xs truncate border-2 border-border shadow-inner">
          {name?.replace(/\s+/g, '_').toLowerCase()}_v2.pdf
        </div>
      </div>

      <div className="max-h-[650px] overflow-y-auto custom-scrollbar bg-bg-base">
        <div className="p-8 md:p-14">
          {templateStyle === 'modern' && <ModernTemplate />}
          {templateStyle === 'traditional' && <TraditionalTemplate />}
          {templateStyle === 'creative' && <CreativeTemplate />}
        </div>
      </div>
    </div>
  );
};

export default ResumeView;

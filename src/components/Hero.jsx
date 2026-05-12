import Mascot from './Mascot';

export default function Hero({ onStart }) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4 py-20 overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amz-orange/20 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-cyber-cyan/10 blur-[100px]"></div>
      </div>

      {/* Hero Illustration & Mascot Container */}
      <div className="relative w-full max-w-2xl mb-12 animate-slide-up-bounce">
        <div className="relative z-10 p-4 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-sm">
          <img 
            src="/assets/illustrations/hero.png"
            alt="AMZ3 Training" 
            className="w-full h-auto drop-shadow-2xl rounded-3xl"
          />
        </div>
        
        {/* Mascot Overlaid */}
        <div className="absolute -bottom-12 -right-6 md:-right-16 z-20 hover:scale-105 transition-transform duration-500">
          <Mascot 
            state="neutral" 
            message="Welcome to the Lab! Ready to learn?" 
            size="lg"
            position="right"
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 w-24 h-24 bg-amz-orange/20 blur-3xl rounded-full"></div>
        <div className="absolute top-0 right-0 translate-x-1/2 w-32 h-32 bg-cyber-cyan/20 blur-3xl rounded-full"></div>
      </div>

      {/* Title */}
      <div className="animate-fade-in-up">
        <p className="text-sm text-amz-orange font-mono font-black mb-4 tracking-[0.4em] uppercase">
          Elite Screening Protocol
        </p>
        <h1 className="text-5xl md:text-7xl font-outfit font-black mb-6 leading-[1.1] tracking-tight">
          Education & <span className="glow-orange">Eligibility</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Master the fundamentals of high-stakes candidate screening. Learn to verify degrees, 
          graduation timelines, and accreditation with clinical precision.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mb-16 px-4">
        {[
          { ill: '/assets/illustrations/eligibility-basics.png', label: 'Learn', desc: '5 Specialized Labs', color: 'var(--color-amz-orange)', icon: 'fa-book-open' },
          { ill: '/assets/illustrations/degree-detective.png', label: 'Verify', desc: 'Real-world Scenarios', color: 'var(--color-cyber-cyan)', icon: 'fa-magnifying-glass' },
          { ill: '/assets/illustrations/university-validator.png', label: 'Certify', desc: 'Final Audit Lab', color: 'var(--color-risk-green)', icon: 'fa-certificate' },
        ].map((item, i) => (
          <div key={i} className={`glass-card-elevated p-0 overflow-hidden animate-fade-in-up border-white/5 group hover:border-white/20 transition-all duration-500`} style={{ animationDelay: `${(i + 1) * 150}ms` }}>
            <div className="h-40 w-full relative overflow-hidden">
              <img src={item.ill} className="w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-lab-card via-lab-card/60 to-transparent"></div>
              
              {/* Floating Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i className={`fa-solid ${item.icon} text-xs`} style={{ color: item.color }}></i>
              </div>
            </div>
            <div className="p-8 text-left relative">
              <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 rounded-2xl flex items-center justify-center bg-lab-card border border-white/10 shadow-2xl group-hover:scale-110 transition-transform">
                 <div className="w-3 h-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ backgroundColor: item.color }}></div>
              </div>
              <div className="font-outfit font-black text-xl text-white mb-1">{item.label}</div>
              <div className="text-xs text-slate-500 font-bold tracking-widest uppercase">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Start Button */}
      <button 
        onClick={onStart} 
        className="btn-primary text-xl py-5 px-12 animate-glow-pulse group relative overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-3">
          <i className="fa-solid fa-rocket transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"></i>
          Start Training Hub
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-amz-orange-hover to-amz-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
    </section>
  );
}

export default function Hero({ onStart }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in-up">
      {/* Icon */}
      <div className="relative mb-8">
        <div className="w-28 h-28 rounded-3xl bg-amz-orange/10 border border-amz-orange/30 flex items-center justify-center animate-float">
          <i className="fa-solid fa-shield-virus text-5xl text-amz-orange"></i>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-risk-red/20 border border-risk-red/50 flex items-center justify-center animate-glow-pulse">
          <i className="fa-solid fa-exclamation text-risk-red text-xs"></i>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-outfit font-black mb-4 leading-tight">
        Academic Risk <span className="glow-orange">Lab</span>
      </h1>
      <p className="text-xl text-amz-orange font-outfit font-semibold mb-2 tracking-wider uppercase">
        Breach Prevention Protocol
      </p>
      <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
        Investigate candidate education profiles. Detect inconsistencies. 
        Make audit-ready decisions. Your screening accuracy is on the line.
      </p>

      {/* Objectives */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mb-12">
        {[
          { icon: 'fa-magnifying-glass', label: 'Investigate', desc: '5 Training Labs' },
          { icon: 'fa-crosshairs', label: 'Detect Risks', desc: 'Tag & Flag Issues' },
          { icon: 'fa-gavel', label: 'Decide', desc: 'Proceed / Reject / Escalate' },
        ].map((item, i) => (
          <div key={i} className={`glass-card p-4 animate-fade-in-up delay-${(i + 1) * 100}`}>
            <i className={`fa-solid ${item.icon} text-amz-orange text-xl mb-2`}></i>
            <div className="font-outfit font-bold text-sm">{item.label}</div>
            <div className="text-xs text-gray-400">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Start Button */}
      <button onClick={onStart} className="btn-primary text-lg py-4 px-10 animate-glow-pulse">
        <i className="fa-solid fa-play"></i> Begin Investigation
      </button>
    </section>
  );
}

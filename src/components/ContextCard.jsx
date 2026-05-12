import Mascot from './Mascot';

/**
 * ContextCard component displays a learning overlay before a mini-game starts.
 * It introduces the concept, objectives, and tips for the upcoming game.
 * 
 * @param {Object} props
 * @param {Object} props.cardData - The data for the context card (from contextCards.js)
 * @param {Function} props.onStart - Callback function to start the game
 */
const ContextCard = ({ cardData, onStart }) => {
  if (!cardData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-lab-base/80 backdrop-blur-sm animate-scale-in">
      <div className="glass-card-elevated max-w-2xl w-full p-8 md:p-10 flex flex-col gap-8 relative">
        {/* Mascot Hint */}
        <div className="absolute -top-12 -right-12 hidden md:block">
          <Mascot 
            state="thinking" 
            message="Remember to check the SOP if you're unsure!" 
            size="md"
            position="bottom"
          />
        </div>
        {/* Illustration Header */}
        <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-white/5 border border-white/10 -mt-2">
          <img 
            src={cardData.illustration} 
            alt={cardData.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lab-card to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amz-orange/20 border border-amz-orange/30 flex items-center justify-center text-amz-orange text-3xl shadow-2xl backdrop-blur-md">
              <i className={`fa-solid ${cardData.icon}`}></i>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-1 drop-shadow-md">
                {cardData.title}
              </h2>
              <p className="text-amz-orange font-mono text-xs tracking-widest uppercase font-bold">
                Phase: {cardData.title.split(' ')[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-cyber-cyan text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <i className="fa-solid fa-crosshairs text-xs"></i>
              Objective
            </h3>
            <p className="text-lg text-slate-200 leading-relaxed">
              {cardData.objective}
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-slate-400 leading-relaxed italic">
              "{cardData.content}"
            </p>
          </div>

          {/* Tips Grid */}
          <div className="grid gap-3">
            <h3 className="text-amz-orange text-sm font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
              <i className="fa-solid fa-lightbulb text-xs"></i>
              Key Learnings
            </h3>
            {cardData.tips.map((tip, index) => (
              <div 
                key={index}
                className="flex gap-4 items-start p-3 rounded-lg bg-white/5 border border-white/5 animate-slide-in-right"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amz-orange shrink-0"></div>
                <p className="text-sm text-slate-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex justify-end">
          <button 
            onClick={onStart}
            className="btn-primary w-full md:w-auto min-w-[200px] group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {cardData.buttonText || "Begin Training"}
              <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amz-orange-hover to-amz-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextCard;

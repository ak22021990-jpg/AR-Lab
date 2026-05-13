import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, GitCommit, GitBranch, ArrowDown } from 'lucide-react';

const DecisionFlow = ({ data }) => {
  if (!data || !data.steps) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-text-primary text-[10px] font-black uppercase tracking-[0.2em] px-2 flex items-center gap-2">
        <GitBranch size={14} className="text-primary" /> SOP DECISION FRAMEWORK
      </h3>
      
      <div className="grid gap-3 relative">
        {data.steps.map((step, index) => (
          <div key={index} className="relative group">
            {/* Connection Line */}
            {index < data.steps.length - 1 && (
              <div className="absolute left-[23px] top-[48px] bottom-[-20px] w-1 bg-border group-hover:bg-primary/20 transition-colors z-0" />
            )}

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 flex gap-4"
            >
              {/* Step Number / Icon */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-white border-4 border-border shadow-sm flex items-center justify-center text-text-primary font-black group-hover:border-primary/30 transition-all">
                  {index + 1}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 bg-white p-5 rounded-3xl border-2 border-border shadow-sm group-hover:shadow-md transition-all group-hover:border-primary/10">
                <p className="text-sm font-black text-text-primary mb-4 leading-tight">
                  {step.question}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {/* Yes Branch */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-success/5 border border-success/10 group-hover:bg-success/10 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                      <Check size={10} className="text-white" strokeWidth={4} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-success uppercase leading-none mb-0.5">IF YES</span>
                      <span className="text-[10px] font-extrabold text-text-primary leading-none uppercase">{step.yes}</span>
                    </div>
                  </div>

                  {/* No Branch */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-error/5 border border-error/10 group-hover:bg-error/10 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-error flex items-center justify-center">
                      <X size={10} className="text-white" strokeWidth={4} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-error uppercase leading-none mb-0.5">IF NO</span>
                      <span className="text-[10px] font-extrabold text-text-primary leading-none uppercase">{step.no}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}

        {/* Final Indicator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: data.steps.length * 0.1 }}
          className="flex justify-center pt-2"
        >
          <div className="px-6 py-2 rounded-full bg-primary/10 border-2 border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <ArrowDown size={12} /> Decision Reached
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DecisionFlow;

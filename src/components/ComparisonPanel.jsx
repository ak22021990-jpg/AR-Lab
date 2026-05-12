import React from 'react';

/**
 * ComparisonPanel component shows side-by-side data (e.g., Resume vs Portal).
 * It highlights differences to help users spot conflicts.
 * 
 * @param {Object} props
 * @param {Object} props.leftData - Data for the left panel (label, value)
 * @param {Object} props.rightData - Data for the right panel (label, value)
 * @param {string} props.title - Optional title for the panel
 */
const ComparisonPanel = ({ leftData, rightData, title = "Data Validation" }) => {
  const isConflict = leftData.value !== rightData.value;

  return (
    <div className="space-y-4 animate-fade-in-up">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
          {title}
        </h3>
        {isConflict && (
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase bg-risk-red/10 text-risk-red border border-risk-red/20 px-2 py-1 rounded-md animate-pulse">
            <i className="fa-solid fa-triangle-exclamation"></i>
            Conflict Detected
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left Panel (Resume) */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 ${isConflict ? 'bg-risk-red/5 border-risk-red/20' : 'bg-white/5 border-white/10'}`}>
          <div className="flex items-center gap-2 mb-4 text-slate-500">
            <i className="fa-solid fa-file-invoice text-xs"></i>
            <span className="text-[10px] font-bold uppercase tracking-wider">{leftData.label || 'Resume Data'}</span>
          </div>
          <div className="font-mono text-xl text-white font-bold break-words">
            {leftData.value}
          </div>
        </div>

        {/* Right Panel (Portal) */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 ${isConflict ? 'bg-risk-red/5 border-risk-red/20' : 'bg-white/5 border-white/10'}`}>
          <div className="flex items-center gap-2 mb-4 text-slate-500">
            <i className="fa-solid fa-laptop-code text-xs"></i>
            <span className="text-[10px] font-bold uppercase tracking-wider">{rightData.label || 'Portal Data'}</span>
          </div>
          <div className="font-mono text-xl text-white font-bold break-words">
            {rightData.value}
          </div>
        </div>
      </div>

      {isConflict && (
        <p className="text-xs text-risk-red/80 italic px-2">
          * Information mismatch detected. Verify the correct source according to SOP.
        </p>
      )}
    </div>
  );
};

export default ComparisonPanel;

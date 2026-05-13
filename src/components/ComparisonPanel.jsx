import React from 'react';
import { AlertTriangle, FileText, Layout } from 'lucide-react';

/**
 * ComparisonPanel component shows side-by-side data (e.g., Resume vs Portal).
 * It highlights differences to help users spot conflicts.
 */
const ComparisonPanel = ({ leftData, rightData, title = "Data Validation" }) => {
  const isConflict = leftData.value !== rightData.value;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-black uppercase tracking-wider text-text-secondary">
          {title}
        </h3>
        {isConflict && (
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase bg-red-50 text-error border-2 border-error/20 px-3 py-1 rounded-full shadow-sm shadow-red-100">
            <AlertTriangle size={12} strokeWidth={3} />
            CONFLICT DETECTED
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left Panel (Resume) */}
        <div className={`p-5 rounded-2xl border-2 transition-all duration-300 ${isConflict ? 'bg-red-50 border-error/30 shadow-sm' : 'bg-white border-border shadow-sm'}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-1.5 rounded-lg ${isConflict ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
              <FileText size={14} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wide text-text-secondary">{leftData.label || 'RESUME DATA'}</span>
          </div>
          <div className={`font-mono text-lg font-black break-words ${isConflict ? 'text-error' : 'text-text-primary'}`}>
            {leftData.value}
          </div>
        </div>

        {/* Right Panel (Portal) */}
        <div className={`p-5 rounded-2xl border-2 transition-all duration-300 ${isConflict ? 'bg-red-50 border-error/30 shadow-sm' : 'bg-white border-border shadow-sm'}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-1.5 rounded-lg ${isConflict ? 'bg-error/10 text-error' : 'bg-info/10 text-info'}`}>
              <Layout size={14} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wide text-text-secondary">{rightData.label || 'PORTAL DATA'}</span>
          </div>
          <div className={`font-mono text-lg font-black break-words ${isConflict ? 'text-error' : 'text-text-primary'}`}>
            {rightData.value}
          </div>
        </div>
      </div>

      {isConflict && (
        <p className="text-[13px] text-error font-extrabold px-2 flex items-center gap-2 bg-red-50/50 py-2 rounded-xl border border-error/10">
          <AlertTriangle size={14} strokeWidth={3} className="shrink-0" />
          Information mismatch detected. Verify source via SOP.
        </p>
      )}
    </div>
  );
};

export default ComparisonPanel;

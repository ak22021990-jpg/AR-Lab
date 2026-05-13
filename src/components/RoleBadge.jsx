import React from 'react';
import { Code, Warehouse } from 'lucide-react';

/**
 * RoleBadge Component
 * Displays the target role for the current screening scenario.
 */
const RoleBadge = ({ role }) => {
  const isSDE = role?.toLowerCase() === 'sde';
  
  return (
    <div className={`
      inline-flex items-center gap-3 px-3 py-1.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider
      border-2 transition-all duration-300 shadow-sm
      ${isSDE 
        ? 'bg-blue-50 text-info border-info/20' 
        : 'bg-orange-50 text-primary border-primary/20'
      }
    `}>
      <div className={`
        flex items-center justify-center w-7 h-7 rounded-lg
        ${isSDE ? 'bg-info text-white shadow-blue-200' : 'bg-primary text-white shadow-orange-200'}
        shadow-sm
      `}>
        {isSDE ? <Code size={16} strokeWidth={2.5} /> : <Warehouse size={16} strokeWidth={2.5} />}
      </div>
      <span className="flex items-center gap-1.5 opacity-80">
        Target Role: <span className="font-black text-text-primary">{isSDE ? 'SDE' : 'Warehouse Mgr'}</span>
      </span>
    </div>
  );
};

export default RoleBadge;

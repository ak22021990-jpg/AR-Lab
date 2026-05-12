import React from 'react';

/**
 * RoleBadge Component
 * Displays the target role for the current screening scenario.
 * 
 * @param {Object} props
 * @param {string} props.role - The target role ('sde' or 'warehouse-manager')
 */
const RoleBadge = ({ role }) => {
  const isSDE = role?.toLowerCase() === 'sde';
  
  return (
    <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 animate-scale-in ${
      isSDE 
        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' 
        : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
    }`}>
      <span className="flex items-center justify-center w-5 h-5 rounded bg-current/10 mr-2">
        <i className={`fas ${isSDE ? 'fa-code' : 'fa-warehouse'}`}></i>
      </span>
      <span>
        Screening for: <span className="text-white">{isSDE ? 'SDE Role' : 'Warehouse Manager'}</span>
      </span>
    </div>
  );
};

export default RoleBadge;

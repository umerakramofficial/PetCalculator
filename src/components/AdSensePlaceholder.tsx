import React from 'react';

interface AdProps {
  slot?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export const AdSensePlaceholder: React.FC<AdProps> = ({ slot = 'default-slot', format = 'horizontal', className = '' }) => {
  const formatClasses = {
    horizontal: 'w-full h-24 sm:h-28',
    vertical: 'w-64 h-[600px]',
    rectangle: 'w-full sm:w-[336px] h-72'
  };

  return (
    <div className={`my-8 mx-auto flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden p-2 text-center select-none ${formatClasses[format]} ${className}`}>
      <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold mb-1">
        Sponsored Advertisement
      </span>
      <div className="w-full flex-grow flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded bg-slate-100/50 dark:bg-slate-950/30 text-xs text-slate-400 dark:text-slate-500">
        Ad Slot #{slot} ({format.toUpperCase()})
      </div>
    </div>
  );
};
export default AdSensePlaceholder;

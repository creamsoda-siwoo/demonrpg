import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  colorClass: string;
  label?: string;
  height?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, colorClass, label, height = "h-4" }) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));

  return (
    <div className="w-full relative">
      <div className={`w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700 ${height}`}>
        <div
          className={`${colorClass} ${height} transition-all duration-300 ease-out flex items-center justify-center`}
          style={{ width: `${percentage}%` }}
        >
        </div>
      </div>
      {label && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs font-bold text-white drop-shadow-md tracking-wider uppercase">{label}</span>
        </div>
      )}
    </div>
  );
};

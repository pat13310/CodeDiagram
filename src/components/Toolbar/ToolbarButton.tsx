import React from 'react';
import { Tooltip } from '../Tooltip';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip: string;
  className?: string;
}

export function ToolbarButton({ icon, onClick, tooltip, className = 'text-stone-200 hover:text-white hover:bg-stone-700/50' }: ToolbarButtonProps) {
  return (
    <Tooltip content={tooltip}>
      <button
        onClick={onClick}
        className={`p-2 rounded-md transition-colors duration-200 ${className}`}
      >
        {icon}
      </button>
    </Tooltip>
  );
}
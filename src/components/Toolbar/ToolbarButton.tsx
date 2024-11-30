import React from 'react';
import { Tooltip } from '../Tooltip';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip: string;
}

export function ToolbarButton({ icon, onClick, tooltip }: ToolbarButtonProps) {
  return (
    <Tooltip content={tooltip}>
      <button
        onClick={onClick}
        className="p-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
      >
        {icon}
      </button>
    </Tooltip>
  );
}
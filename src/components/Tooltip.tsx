import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {content}
        <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}
import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="relative group">
      {children}        
    </div>
  );
}